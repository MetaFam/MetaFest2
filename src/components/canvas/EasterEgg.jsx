import { Box } from '@chakra-ui/react';
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from "three";


const OctoEasterEgg = (props) => {
  const mesh = useRef();
  const material = useRef();
  const [active, setActive] = useState(false);
  const { animate } = props;
  const clock = new THREE.Clock();
  let previousTime = 0;

  const mapTexture = useLoader(TextureLoader, '/assets/textures/baby_octo_alpha_0001.png');
  const alphaTexture = useLoader(TextureLoader, '/assets/textures/baby_octo_alpha_map.png');
  alphaTexture.minFilter = THREE.NearestFilter;
  alphaTexture.magFilter = THREE.NearestFilter;
  alphaTexture.generateMipmaps = true;

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (mesh.current && animate) {
        mesh.current.position.x = -3.5 + Math.sin(elapsedTime * 0.9) * Math.PI * 0.05;
        mesh.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
        mesh.current.rotation.z = -elapsedTime * 0.06;
    }
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
      rotation={[0,0,0]}
      onClick={(e) => setActive(!active)}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" ref={material}  />
    </mesh>
  )
};

export default OctoEasterEgg;