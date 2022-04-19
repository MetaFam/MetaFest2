import React, { useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function BabyEarthVox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const material = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/babyearth-vox.glb");
  const { route, animate } = props
  const clock = new THREE.Clock();
  let previousTime = 0;

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (group.current && animate) {
      group.current.position.x = -2 + Math.sin(elapsedTime * 0.8) * Math.PI * 0.03;
      group.current.position.y = -1 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
      group.current.position.z = -0.25 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;
      group.current.rotation.y = elapsedTime * 0.3;
    }
  })


  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["voxel-earth"].geometry}
        material={materials['palette.003']}
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

