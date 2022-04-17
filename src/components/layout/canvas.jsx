import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import * as THREE from "three";
import { OrbitControls, Preload } from '@react-three/drei'
import {
  Box
} from '@chakra-ui/react'
import useStore from '@/helpers/store'
import { Suspense, useEffect, useRef } from 'react'

// const { OctoEasterEggR3F } = dynamic(() => import('@/components/canvas/EasterEgg.r3f'), {
//   ssr: false,
// })
import { OctoEasterEggR3F } from '@/components/canvas/EasterEgg.r3f';

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])


  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        zIndex: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      {/* <LControl /> */}
      <Preload all />
      <Suspense fallback={<OctoEasterEggR3F />}>
        {children}
        </Suspense>
    </Canvas>
  )
}

export default LCanvas

