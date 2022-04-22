import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import * as THREE from "three";
import { Environment, OrbitControls, Preload } from '@react-three/drei'
import {
  Box
} from '@chakra-ui/react'
import useStore from '@/helpers/store'
import { Suspense, useEffect, useRef } from 'react'

// const { OctoEasterEggR3F } = dynamic(() => import('@/components/canvas/EasterEgg.r3f'), {
//   ssr: false,
// })
import {CanvasLoader} from '@/components/canvas/Loader'

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
      shadow="true"
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
      <Suspense fallback={<CanvasLoader />}>
        {children}
        <Environment preset="forest" />
      </Suspense>
    </Canvas>
  )
}

export default LCanvas

