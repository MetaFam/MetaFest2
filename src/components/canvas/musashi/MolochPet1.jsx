import React, { useRef, useState } from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import gsap from "gsap";
import * as THREE from "three";

import useStore from '@/helpers/store'

export default function ILBVox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const material = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/musashi/moloch-pet-1.glb");
  const { route, animate } = props
  const clock = new THREE.Clock();
  let previousTime = 0;


  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (group.current && animate) {
      group.current.position.x = 1 + Math.sin(elapsedTime * 0.6) * Math.PI * 0.03;
      group.current.position.y = -1 - Math.cos(elapsedTime * 0.07) * Math.PI * 0.5;
      // group.current.position.z = -0.25 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;

      group.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
      group.current.rotation.y = elapsedTime * 0.03;
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
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MolochPet1.geometry}
        material={materials["palette.003"]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={[0.5,0.5,0.5]}
        onClick={() => router.push(route)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      />

      <pointLight
        intensity={0.6}
        distance={3}
        decay={2}
        color="0xffffff"
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/assets/models/musashi/moloch-pet-1.glb");