import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Box } from '@chakra-ui/react';
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

import { textures } from '@/utils/constants';


const OctoEasterEgg = (props) => {
  const mesh = useRef(null);
  const material = useRef(null);
  const [active, setActive] = useState(false);
  const mapTexture = useLoader(TextureLoader, textures.octo.map);
  const alphaTexture = useLoader(TextureLoader, textures.octo.alpha);
  // const [textures] = useState({map: textures.octo.map, alpha: textures.octo.alpha })
  const { animate } = props;
  const clock = new THREE.Clock();
  let previousTime = 0;

  alphaTexture.minFilter = THREE.NearestFilter;
  alphaTexture.magFilter = THREE.NearestFilter;
  alphaTexture.generateMipmaps = true;

  const toggleActive = useCallback(() => {
    setActive(!active);
  }, [setActive, active])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const easterEgg1 = document.querySelectorAll(".ee1");
      if (active) {
        easterEgg1[0].classList.toggle("found");
        toggleActive()
      }
    }

  }, [active, toggleActive]);

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

  })
  if (material.current) {
    material.current.map = mapTexture;
    material.current.alphaMap = alphaTexture;
    material.current.sizeAttenuation = true;
    material.current.transparent = true;
  }


  return (
    <mesh
      {...props}
      ref={mesh}
      name="BabyOcto"
      // scale={active ? [2, 2, 2] : [1.5, 1.5, 1.5]}
      rotation={[0, 0, 0]}
      onClick={(e) => setActive(!active)}
      dispose={null}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" ref={material} />
    </mesh>
  )
};

export default OctoEasterEgg;