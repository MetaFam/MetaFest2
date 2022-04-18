import { Box } from '@chakra-ui/react';
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import babyOctoGif from "@/static/assets/textures/baby_octo_alpha_0001.png";
import babyOctoAlpha from "@/static/assets/textures/baby_octo_alpha_map.png";

export const OctoEasterEggR3F = (props) => {
  const mesh = useRef();
  const [active, setActive] = useState(false);
  const clock = new THREE.Clock();
  const textureLoader = new THREE.TextureLoader();
  let previousTime = 0;

  const texture = useMemo(() => textureLoader.load(babyOctoGif),[textureLoader]);
  const alphaTexture = useMemo(() => textureLoader.load(babyOctoAlpha), [textureLoader]);
  alphaTexture.minFilter = THREE.NearestFilter;
  alphaTexture.magFilter = THREE.NearestFilter;
  alphaTexture.generateMipmaps = true;

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (mesh.current) {
        mesh.current.position.x = -3.5 + Math.sin(elapsedTime * 0.9) * Math.PI * 0.05;
        mesh.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
        mesh.current.rotation.z = -elapsedTime * 0.06;
    }
  })




  return (
    <mesh
      {...props}
      ref={mesh}
      name="BabyOcto"
      scale={active ? [2, 2, 2] : [1.5, 1.5, 1.5]}
      rotation={[0,0,0]}
      onClick={(e) => setActive(!active)}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material"color="green"  />
    </mesh>
  )
};
