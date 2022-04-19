import React, { useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function NomadVox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/nomad-vox.glb");
  const {route} = props
    // useFrame((state, delta) =>
    // group.current
    //   ? (group.current.rotation.y += 0.01)
    //   : null
    // )

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0.01, 0, -0.01]} rotation={[2, 0.1, 2.13]}>
        <directionalLight
          intensity={0.5}
          color="#FF61E6"
          decay={2}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.nomad.geometry}
        material={materials.palette}
        rotation={[Math.PI * 0.5, -Math.PI / 0.05, 0]}
        onClick={() => router.push(route)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        // scale={hovered ? 1.1 : 1}
      />
      {/* <axesHelper /> */}
    </group>
  );
}

useGLTF.preload("/assets/models/nomad-vox.glb");