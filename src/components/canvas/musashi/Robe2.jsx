import React, { useRef, useState } from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import gsap from "gsap";
import * as THREE from "three";

import useStore from '@/helpers/store'

export default function Robe2Vox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const material = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/musashi/robe2.glb");
  const { route, animate } = props
  const clock = new THREE.Clock();
  let previousTime = 0;


  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (group.current && animate) {
    }
  })

  // if (hovered) {
  //   gsap.to(group.current.position, {
  //     x: 2,
  //     y: 0,
  //     z: 0
  //   })
  // } else {
  //       gsap.to(group.current.position, {
  //     x: 0,
  //     y: 0,
  //     z: 0
  //   })
  // }

  return (
    <group ref={group} {...props} name="Robe2" dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Robe1.geometry}
        material={materials.palette}
        rotation={[Math.PI * 0.5, 0, 0]}
        onClick={() => router.push(route)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      />

      <pointLight
        intensity={3}
        distance={3}
        decay={2}
        color="0xffffff"
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/assets/models/musashi/robe2.glb");