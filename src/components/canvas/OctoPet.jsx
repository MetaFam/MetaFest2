import React, { useRef, useState } from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import gsap from "gsap";
import * as THREE from "three";

import useStore from '@mf/helpers/store'

export default function OctoPetVox(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/assets/models/babyocto-vox.glb");
  const { animate } = props
  const clock = new THREE.Clock();
  let previousTime = 0;
  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (group.current && animate) {
      group.current.position.x = -3.5 + Math.sin(elapsedTime * 0.9) * Math.PI * 0.05;
      group.current.position.y = 4 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
      group.current.position.z = -2.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;
      group.current.rotation.y = elapsedTime * 0.005;
      // group.current.rotation.z = -elapsedTime * 0.05;
    }
  })
  return (
    <group ref={group} {...props} name="OctoPet" dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["cuteocto-pet"].geometry}
        material={materials['palette.004']}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={0.5}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/babyocto-vox.glb");