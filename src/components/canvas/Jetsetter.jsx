import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function JetsetterVox(props) {
  const router = useStore((s) => s.router)
  const [originalPos, setOriginalPos] = useState(null)
  const group = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/jetsetter-vox.glb");
  const { route, animate } = props
  const clock = new THREE.Clock();
  let previousTime = 0;


  const storeOriginalPos = useCallback((pos) => {

    if (originalPos !== null) return;
    setOriginalPos(pos)
  }, [originalPos, setOriginalPos])

  useFrame((state, delta) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    if (group.current && animate) {
      group.current.rotation.y = (Math.PI * 0.4) + elapsedTime * 0.03
    }
  })

// useEffect(() => {
//   let z = null;
//   if (group.current) {
//     storeOriginalPos(group.current.position)

//     if (hovered) {
//       console.log('origpos', originalPos.z);
//       gsap.to(group.current.position, {
//         duration: 1.5,
//         ease: "power2.inOut",
//         z: 1
//       })
//     }
//       console.log(originalPos);
//       gsap.to(group.current.position, {
//         duration: 1.5,
//         ease: "power2.inOut",
//         z: 0
//       })

//   }

// }, [group, hovered, originalPos, storeOriginalPos]);
  // gsap

  return (
    <group ref={group} {...props} name="Jetsetter" dispose={null}>
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