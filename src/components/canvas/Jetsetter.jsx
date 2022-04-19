import React, { useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function JetsetterVox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/jetsetter-vox.glb");
  const { route, animate } = props
  const clock = new THREE.Clock();
  let previousTime = 0;

  useFrame((state, delta) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (group.current && animate && !route) {
      // group.current.position.x = -3.5 + Math.sin(elapsedTime * 0.9) * Math.PI * 1;
      // group.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
      // group.current.position.z = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 3;
      group.current.rotation.y = elapsedTime * 0.3;
    }
  })

  // gsap
  if (group.current && animate === false) {
    if (hovered) {
      gsap.to(group.current.position, {
        duration: 1.5,
        ease: "power2.inOut",
        z: 1
      })
    } else {
      gsap.to(group.current.position, {
        duration: 1.5,
        ease: "power2.inOut",
        z: 0
      })
    }
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.jetsetter.geometry}
        material={materials.palette}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={() => router.push(route)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/jetsetter-vox.glb");