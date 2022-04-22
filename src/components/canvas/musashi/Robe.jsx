import React, { useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function RobeVox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const material = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/musashi/robe.glb");
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


  return (
    <group ref={group} {...props} name="Robe" dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Robe.geometry}
        material={materials['palette.001']}
        rotation={[Math.PI * 0.5, 0, 0]}
        onClick={() => router.push(route)}
        // onPointerOver={(e) => setHover(true)}
        // onPointerOut={(e) => setHover(false)}
      />

      <pointLight
        intensity={3}
        distance={3}
        decay={2}
        color={'0xfff'}
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/assets/models/musashi/robe.glb");