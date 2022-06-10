import React, { useCallback, useEffect, useRef, useState } from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import gsap from "gsap";
import * as THREE from "three";

import useStore from '@mf/helpers/store'

export default function JetsetterVox(props) {
  const router = useStore((s) => s.router)
  const [originalPos, setOriginalPos] = useState(null)
  const group = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/jetsetter-vox.glb");
  const { route, animate, isExternal } = props
  const clock = new THREE.Clock();
  let previousTime = 0;


  const storeOriginalPos = useCallback((pos) => {

    if (originalPos !== null) return;
    setOriginalPos(pos)
  }, [originalPos, setOriginalPos])

  const handleClick = (url, isExternal) => {
    if(!url) return
    if (url && isExternal) {
      if (typeof window !== 'undefined') {
        window.open(url, '_blank')
      }
      return
    }
    if (url && !isExternal) {
      () => router.push(url)

    }

  }

  useFrame((state, delta) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    if (group.current && animate) {
      group.current.rotation.y = (Math.PI * 0.4) + elapsedTime * 0.03
    }
  })


  return (
    <group ref={group} {...props} name="Jetsetter" dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.jetsetter.geometry}
        material={materials.palette}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => handleClick(route, isExternal)}
        // onPointerOver={(e) => setHover(true)}
        // onPointerOut={(e) => setHover(false)}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/jetsetter-vox.glb");