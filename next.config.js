const plugins = require('next-compose-plugins')
const path = require('path')
const withImages = require('next-images');
// const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withOffline = require('next-offline');

const nextConfig = {
  webpack(config, { webpack, isServer }) {
    // eslint-disable-next-line no-unused-labels
    webpack5: false
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })

    config.plugins = config.plugins || [];

    config.optimization.providedExports = true;

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./src/"),
      "@mf": path.resolve(__dirname, "./src/"),
      "@mfdom": path.resolve(__dirname, "./src/components/dom/"),
      "@mfcanvas": path.resolve(__dirname, "./src/components/canvas/"),
      "@mflayout": path.resolve(__dirname, "./src/components/layout/")
    };

    return config
  },
}

// module.exports = withImages({
//   images: {
//     loader: "custom",
//     path: "/public/",
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     nextImageExportOptimizer: {
//       imageFolderPath: "public",
//       exportFolderPath: "out",
//       quality: 75,
//     },
//   },
//   env: {
//     storePicturesInWEBP: true,
//   },
// })

module.exports = plugins(
  [
    [
      withOffline,
      {
        workboxOpts: {
          swDest: process.env.NEXT_EXPORT
            ? 'service-worker.js'
            : 'static/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'offlineCache',
                expiration: {
                  maxEntries: 200,
                },
              },
            },
          ],
        },
        async rewrites() {
          return [
            {
              source: '/service-worker.js',
              destination: '/_next/static/service-worker.js',
            },
          ]
        },
      },
    ],
    // withImages,
    withBundleAnalyzer,
  ],
  nextConfig
)
