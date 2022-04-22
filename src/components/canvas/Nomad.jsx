import React, { useEffect, useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function NomadVox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/nomad-vox.glb");
  const { route } = props
  useEffect(() => {
    if (group.current.children) {
      console.log(group.current.children);
      // group.current.children[0].geometry.computeFaceNormals();
      // group.current.children[0].geometry.computeVertextNormals();
      // group.current.children[0].geometry.normalsNeedUpdate = true;

    }
  }, []);
  return (
    <group
      ref={group}
      {...props}
      name="Nomad"
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.nomad.geometry}
        material={materials.palette}
        rotation={[Math.PI * 0.5, -Math.PI / 0.05, 0]}
        onClick={() => router.push(route)}
      />
      {/* <axesHelper /> */}
    </group>
  );
}


useGLTF.preload("/assets/models/nomad-vox.glb");