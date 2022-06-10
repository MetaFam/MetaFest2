import React, { useRef, useState } from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import gsap from "gsap";
import * as THREE from "three";

import useStore from '@/helpers/store'

export default function IndustrialVox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/industrial-vox.glb");
  const { route } = props
  const clock = new THREE.Clock();
  let previousTime = 0;
  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (group.current) {
      // group.current.position.x = -3.5 + Math.sin(elapsedTime * 0.9) * Math.PI * 0.05;
      // group.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
      // group.current.rotation.y = elapsedTime * 0.6;
    }
  })
  return (
    <group ref={group} {...props} name="Industrial" dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.industrial.geometry}
        material={materials['palette.002']}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={() => router.push(route)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/industrial-vox.glb");