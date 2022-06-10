import { Suspense, useCallback, useEffect, useRef, useState } from 'react'

import { Environment, OrbitControls, Preload } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { DepthOfField, EffectComposer, Glitch, Scanline, Vignette } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing'
import * as THREE from "three";


import { CanvasLoader } from '@/components/canvas/Loader'
import useStore from '@/helpers/store'
import { useIsMac } from '@/utils/hooks';

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
  const { dom } = useStore()
  const [on, setOn] = useState(false)
  const macOS = useIsMac();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const canvas = useRef();
  const delay = (() => { });
  const glitchEgg = dom.current ? dom.current.querySelector('.ee2') : undefined;

  const onPointerUp = useCallback(() => {

    if (delay.current) clearTimeout(delay.current)
    if (on && glitchEgg) {
      glitchEgg.classList.add('found');
    }

    setOn(false)
  }, [glitchEgg, on, setOn]);

  const onPointerDown = useCallback(() => {
    delay.current = setTimeout(() => {
      if (!on && glitchEgg) {
        glitchEgg.classList.remove('found');
      }
      setOn(true);
    }, 1000);
  }, [glitchEgg, on, setOn]);

  // Detect user interaction for glitch, disable for mob
  useEffect(() => {
    if (typeof window !== 'undefined' && dom.current) {
      const el = dom.current
      if (isMobile) return
      el.addEventListener('pointerup', onPointerUp)
      el.addEventListener('pointerdown', onPointerDown)

      return () => {
        el.removeEventListener('pointerup', onPointerUp)
        el.removeEventListener('pointerdown', onPointerDown)
      }
    }


  }, [on, dom, isMobile, onPointerUp, onPointerDown]);


  return (
    <Canvas
      ref={canvas}
      mode='concurrent'
      shadows="PCFSoft"
      dpr={Math.min(2, isMobile && typeof window !== 'undefined' ? window.devicePixelRatio : 1)}
      style={{
        display: macOS ? 'none' : 'block',
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
      <Suspense fallback={<CanvasLoader />}>
        <Preload all />
        <Environment preset="forest" />
        {children}
        <Effect on={on} />
      </Suspense>
    </Canvas>
  )
}

export default LCanvas

export const Effect = ({ on }) => {
  const [material, setMaterial] = useState()
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const clock = new THREE.Clock();
  let previousTime = 0;
  console.log('mob?', isMobile);
  if (isMobile) on = false;

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
  })

  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.004} darkness={on ? 1.2 : 1} />

      <Glitch active ratio={0.89} delay={[0.5, 35]} duration={[0.1, 0.3]} strength={[0.1, 0.5]} mode={GlitchMode.SPORADIC} />
      {on && (
        <Scanline density={on ? 3.5 : 50} blendFunction={BlendFunction.OVERLAY} />,
        <DepthOfField focusDistance={2} focalLength={0.5} bokehScale={6} />,
        <Scanline density={on ? 3.5 : 0} blendFunction={on && BlendFunction.OVERLAY} />
      )}

      <Glitch active={on} ratio={0.89} delay={[0.5, 2]} strength={[0.1, 0.5]} mode={GlitchMode.CONSTANT_WILD} />
    </EffectComposer>

  )
}