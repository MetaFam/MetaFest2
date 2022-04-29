import * as THREE from 'three'
import React, { Suspense, useRef, forwardRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { useControls, folder } from 'leva'

import { CanvasLoader } from '@/components/canvas/Loader'

// eslint-disable-next-line react/display-name
const Galaxy = ({ dof, parameters, nucleus, helper, effects, ...props }) => {
  const group = useRef();
  const particles = useRef()
  const material = useRef()
  //const [movement] = useState(() => new THREE.Vector3())
  const [temp] = useState(() => new THREE.Vector3())
  const [focus] = useState(() => new THREE.Vector3())
  const clock = new THREE.Clock();
  let previousTime = 0;


  /**
   * Textures
   */
  const planeColorTexture = useLoader(TextureLoader, '/assets/textures/particles/seed_logo.png');
  const planeAlphaTexture = useLoader(TextureLoader, '/assets/textures/particles/seed_logo_alpha_map.png');
  planeAlphaTexture.minFilter = THREE.NearestFilter;
  planeAlphaTexture.magFilter = THREE.NearestFilter;
  planeAlphaTexture.generateMipmaps = true;


  // const { animationRef } = props
  useEffect(() => {
    generateGalaxy()
    // console.log(dof);
  })

  useFrame((state, delta) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    //dof.current.target = focus.lerp(particles.current.position, 0.05)
    //movement.lerp(temp.set(state.mouse.x, state.mouse.y * 0.2, 0), 0.2)
    if (dof.current) {
      dof.current.circleOfConfusionMaterial.uniforms.focusDistance.value = parameters.focusDistance
      dof.current.circleOfConfusionMaterial.uniforms.focalLength.value = parameters.focalLength
      dof.current.resolution.height = parameters.height
      dof.current.resolution.width = parameters.width
      dof.current.target = new THREE.Vector3(parameters.focusX, parameters.focusY, parameters.focusZ)
      dof.current.blendMode.opacity.value = parameters.opacity
    }
    if (particles.current) {
      if (parameters.type === 1) {
        particles.current.position.y = -scrollY * 0.0005;
        // galaxy1.rotation.y += (parallaxX - cameraGroup.position.x) * 2 * deltaTime
        particles.current.rotation.z = scrollY * 0.0004;
        particles.current.rotation.y = -elapsedTime * 0.006;
      } else if (parameters.type === 2) {
        particles.current.rotation.y = -elapsedTime * 0.007;
      } else if (parameters.type == 3) {
        particles.current.position.y = scrollY * 0.0004;
        particles.current.rotation.y = Math.cos(elapsedTime * 0.03) * Math.PI * 0.05;
      } else if (parameters.type == 4) {
        particles.current.position.z = -scrollY * 0.0004;
        particles.current.rotation.y = Math.cos(elapsedTime * 0.03) * Math.PI * 0.05;
      }
    }

  })

  const generateGalaxy = () => {
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    const sections = 6;
    const objectsDistance = 4;


    const particlesMaterial = new THREE.PointsMaterial({
      map: planeColorTexture,
      alphaMap: planeAlphaTexture,
      // color: parameters.particleColor,
      transparent: true,
      sizeAttenuation: true,
      size: 0.03,
    });

    // Type 1
    if (parameters.type === 1) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = Math.sin(spinAngle + radius) * (radius - Math.PI * 2)
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 1.1)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        // if (i < 20) {
        //   console.log(i, branchAngle)
        // }
      }
    } else if (parameters.type === 2) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = (Math.PI * 0.12) * radius + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 1.1)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        // if (i < 20) {
        //   console.log(i, branchAngle)
        // }
      }

    } else if (parameters.type === 3) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = Math.cos(spinAngle + radius) * radius + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 2)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        // if (i < 20) {
        //   console.log(i, branchAngle)
        // }
      }
    } else if (parameters.type === 4) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = Math.sin(branchAngle - spinAngle) * radius + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 1.5)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        // if (i < 20) {
        //   console.log(i, branchAngle)
        // }
      }
    } else if (parameters.type === 5) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = (Math.random() - 0.5) * 10;
        positions[i3 + 1] =
          objectsDistance * 0.8 -
          Math.random() * objectsDistance * (sections.length * 2);
        positions[i3 + 2] = (Math.random() - 0.5) * 10;

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 1.5)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        // if (i < 20) {
        //   console.log(i, branchAngle)
        // }
      }
    }

    particles.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    if (parameters.type === 3) {

      material.current.map = planeColorTexture
      material.current.alphaMap = planeAlphaTexture
      material.current.transparent = true
      material.current.sizeAttenuation = true
      material.current.opacity = parameters.opacity
    }
    // if (parameters.type === 3) {
    //   material.current.transparent = true
    //   material.current.sizeAttenuation = true
    //   material.current.opacity = parameters.opacity

    // }
  }

  return (
    <>
      <Suspense fallback={<CanvasLoader />}>
        <group ref={group} {...props}>
          <points ref={particles}>
            <bufferGeometry />
            <pointsMaterial ref={material} size={parameters.size} sizeAttenuation={true} depthWrite={true} vertexColors={true} blending={THREE.AdditiveBlending} />
          </points>
          {nucleus && (
            <Nucleus size={0.125} />
          )}
          {helper && (
            <axesHelper args={[2, 2, 2]} />
          )}
        </group>
      </Suspense>
      {/* {effects && (
        <Effects ref={dof} />
      )} */}

    </>
  )
}

export default Galaxy

//function BlackHoleNucleus({ size }) {
//  const meshRef = useRef();
//
//  return (
//    <mesh ref={meshRef} scale={[size, size, size]} position={[0, 0, 0]}>
//      <sphereBufferGeometry
//        attach="geometry"
//        args={[0.5, 32, 32, 0, 6.4, 0, 6.3]}
//      />
//      <meshBasicMaterial attach="material" color="#000" />
//    </mesh>
//  );
//}


export function Nucleus({ size }) {
  const nucleusRef = useRef()
  const color = new THREE.Color()
  color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05)

  return (
    <mesh ref={nucleusRef} position={[0, 0, 0]} scale={[size, size, size]}>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32, 0, 6.4, 0, 6.3]} />
      <meshBasicMaterial attach="material" color={'#fff'} />
    </mesh>
  )

  //const geometry = new THREE.IcosahedronGeometry( 1, 15 );

  //		for ( let i = 0; i < 50; i ++ ) {

  //			const color = new THREE.Color();
  //			color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );

  //			const material = new THREE.MeshBasicMaterial( { color: color } );
  //			const sphere = new THREE.Mesh( geometry, material );
  //			sphere.position.normalize().multiplyScalar( Math.random() * 4.0 + 2.0 );
  //			sphere.scale.setScalar( Math.random() * Math.random() + 0.5 );
  //			scene.add( sphere );

  //			if ( Math.random() < 0.25 ) sphere.layers.enable( BLOOM_SCENE );

  //    }
}

// eslint-disable-next-line react/display-name
export const Effects = forwardRef((props, ref) => {
})


export const galaxyColors = {
  inside: '#462080',
  outside: '#FF61E6'
}
export const galaxy2Colors = {
  inside: '#462080',
  outside: '#7C56FF'
}
export const galaxy3Colors = {
  inside: '#76EBF2',
  outside: '#7C56FF'
}
export const galaxy4Colors = {
  inside: '#462080',
  outside: '#7C56FF'
}
/**
 * Galaxy
 */
export const galaxy1Params = {
  count: 500000,
  size: 0.033,
  radius: 4.86,
  branches: 8,
  spin: 8,
  randomness: 1,
  randomnessPower: 8,
  insideColor: galaxyColors.inside,
  outsideColor: galaxyColors.outside,
  type: 1,
  opacity: 1,
  focusDistance: 0.05,
  focalLength: 0.05,
  width: 480,
  height: 480,
  focusX: 0,
  focusY: 0,
  focusZ: 0,
}
export const galaxy2Params = {
  count: 2000000,
  size: 0.01,
  radius: 12,
  branches: 8,
  spin: 8,
  randomness: 9,
  randomnessPower: 8,
  insideColor: galaxy2Colors.inside,
  outsideColor: galaxy2Colors.outside,
  type: 2,
  opacity: 1,
  focusDistance: 0.05,
  focalLength: 0.05,
  width: 480,
  height: 480,
  focusX: 0,
  focusY: 0,
  focusZ: 0,
}
// gui.addColor(galaxy2Params, 'insideColor').onFinishChange()

export const galaxy3Params = {
  count: 600000,
  size: 0.01,
  radius: 1.86,
  branches: 3,
  spin: 32,
  randomness: 13,
  randomnessPower: 20,
  insideColor: galaxy3Colors.inside,
  outsideColor: galaxy3Colors.outside,
  type: 3,
  opacity: 1,
  focusDistance: 0.05,
  focalLength: 0.05,
  width: 480,
  height: 480,
  focusX: 0,
  focusY: 0,
  focusZ: 0,
}

export const galaxy4Params = {
  count: 100000,
  size: 0.005,
  radius: 1,
  branches: 8,
  spin: 5,
  randomness: 4,
  randomnessPower: 20,
  insideColor: galaxy4Colors.inside,
  outsideColor: galaxy4Colors.outside,
  type: 4,
  opacity: 1,
  focusDistance: 0.05,
  focalLength: 0.05,
  width: 480,
  height: 480,
  focusX: 0,
  focusY: 0,
  focusZ: 0,
}

export const galaxy5Params = {
  count: 35000,
  size: 0.03,
  radius: 5,
  branches: 8,
  spin: 5,
  randomness: 4,
  randomnessPower: 20,
  insideColor: galaxy4Colors.inside,
  outsideColor: galaxy4Colors.outside,
  type: 3,
  opacity: 1,
  focusDistance: 0.05,
  focalLength: 0.05,
  width: 480,
  height: 480,
  focusX: 0,
  focusY: 0,
  focusZ: 0,
}