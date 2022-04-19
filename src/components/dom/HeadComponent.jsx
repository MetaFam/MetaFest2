import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { settings } from '@/seo.config';

export const HeadComponent = (props) => {
  const { title, description, image } = props;
  const router = useRouter();
  // console.log(router);

  return (

    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        property="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta name="title" property="title" content={title} />
      <meta name="description" property="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      <meta name="theme-color" property="theme-color" content="#5a32e6" />

      {socialTags(props).map(({ name, content }) => {
        return <meta key={name} name={name} content={content} />;
      })}

      <link rel="icon" href="/favicon.ico" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;500;700&amp;display=swap" rel="stylesheet" />
    </Head>

  );
}

HeadComponent.defaultProps = {
  title: settings && settings.meta && settings.meta.title,
  description: settings && settings.meta && settings.meta.description,
  image:
    settings &&
    settings.meta &&
    settings.meta.social &&
    settings.meta.social.graphic,
};

const socialTags = ({
  openGraphType,
  url,
  title,
  description,
  image,
  createdAt,
  updatedAt,
}) => {
  const metaTags = [
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:site",
      content:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.twitter,
    },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    {
      name: "twitter:creator",
      content:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.twitter,
    },
    { name: "twitter:image:src", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "og:title", content: title },
    { name: "og:type", content: openGraphType },
    { name: "og:url", content: url },
    { name: "og:image", content: image },
    { name: "og:description", content: description },
    {
      name: "og:site_name",
      content: settings && settings.meta && settings.meta.title,
    },
    {
      name: "og:published_time",
      content: createdAt || new Date().toISOString(),
    },
    {
      name: "og:modified_time",
      content: updatedAt || new Date().toISOString(),
    },
  ];

  return metaTags;
};

