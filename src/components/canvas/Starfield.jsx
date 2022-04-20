import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'


import SeedLogo from "@/static/assets/textures/particles/seed_logo.png";
// import BabyOctoImg from "../static/assets/textures/baby_octo_alpha_0001.png";
// import BabyOctoAlpha from "../static/assets/textures/baby_octo_alpha_map.png";
export const starfieldParams = {
  count: 35000,
  size: 0.01
}

export default function Starfield({ parameters, ...props }) {
  const group = useRef();
  const particles = useRef();
  const clock = new THREE.Clock();
  let previousTime = 0;
  const sections = 6;
  const objectsDistance = 4;

  const particleTextures = useTexture({
    map: '/assets/textures/particles/seed_logo.png'
  })

  useEffect(() => {
    console.log(parameters);
    generateStarfield();
  });

  function generateStarfield() {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] =
        objectsDistance * 0.8 -
        Math.random() * objectsDistance * (sections.length * 2);
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    // if (particles.current) {
      console.log('pc:', particles);
      particles.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particles.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // }
  }

  // useFrame(() => {
  //   const elapsedTime = clock.getElapsedTime();
  //   const deltaTime = elapsedTime - previousTime;
  //   previousTime = elapsedTime;

  //   // if (group.current) {
  //   //   // group.current.position.x = -3.5 + Math.sin(elapsedTime * 0.9) * Math.PI * 0.05;
  //   //   // group.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
  //   //   // group.current.rotation.y = elapsedTime * 0.6;
  //   // }
  // })
  return (
    // <Suspense fallback={null}>
    //   <group ref={group} {...props}>
    <points ref={particles}>
      <bufferGeometry attach="geometry" />
      <pointsMaterial attach="material" size={parameters.size} {...particleTextures} sizeAttenuation={true} depthWrite={true} vertexColors={true} blending={THREE.AdditiveBlending} />
    </points>
    //   </group>
    // </Suspense>
  );
}
