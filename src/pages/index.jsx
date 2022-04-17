import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, extend } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import dynamic from 'next/dynamic'
import {
  HomeSection,
  ScheduleSection,
  WorkshopsSection,
  SpeakersSection,
  MetaverseSection,
  ChatSection,
  ApplySection,
} from "@/components/dom/page-sections";
import useStore from '@/helpers/store'

import { OctoEasterEggR3F } from '@/components/canvas/EasterEgg.r3f';




// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})
const NomadVox = dynamic(() => import('@/components/canvas/Nomad'), {
  ssr: false,
})

const LuxVox = dynamic(() => import('@/components/canvas/Lux'), {
  ssr: false,
})

const JetsetterVox = dynamic(() => import('@/components/canvas/Jetsetter'), {
  ssr: false,
})

// dom components goes here
const DOM = () => {
  return (
    <>
      <HomeSection />
      <ScheduleSection />
      <WorkshopsSection />
      <SpeakersSection />
      <MetaverseSection />
      <ChatSection />
      <ApplySection />
    </>
  )
}

export const objectsDistance = 4;
export const R3FSceneSection = ({ name, count, children }) => {
  const group = useRef(null);
  return (
    <group ref={group} name={name} position={[0, -objectsDistance * count, 0]}>{children}</group>
  )
}

// canvas components goes here
const R3F = () => {
  const camera = useRef({ x: 0, y: 0 });
  const cameraGroup = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0)
  const sizes = useRef({ width: 0, height: 0 })
  const cursor = useRef({ x: 0, y: 0 })
  const mousePos = useRef(new THREE.Vector2())
  const rayMousePos = useRef(new THREE.Vector2())
  const mouse = new THREE.Vector2();
  const rayMouse = new THREE.Vector2();
  /**
   * Animate
   */
  const clock = new THREE.Clock();
  let previousTime = 0;
  /**
         * Cursor / Mouse
         */
  // const cursor = useMemo({
  //   x: 0,
  //   y: 0
  // }, []);


  useEffect(() => {

    if (typeof window !== "undefined") {
      sizes.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };



      // Scroll
      scrollY.current = window.scrollY;
      let currentSection = 0;
      window.addEventListener("resize", () => {
        // Update sizes
        sizes.current.width = window.innerWidth;
        sizes.current.height = window.innerHeight;
      });


      window.addEventListener("scroll", () => {
        scrollY.current = window.scrollY;

        // console.log(scrollY);

        const newSection = Math.round(scrollY.current / sizes.current.height);
        if (newSection !== currentSection) {
          currentSection = newSection;
          console.log(currentSection);
        }
      });

            // Mouse move
      window.addEventListener("mousemove", (event) => {
        cursor.current.x = (event.clientX / sizes.current.width) - 0.3;
        cursor.current.y = -(event.clientY / sizes.current.height) - 0.3;
        // console.log('curCursor', cursor.current);

        mousePos.current.x = (event.clientX / sizes.current.width) * 2 - 1;
        mousePos.current.y = -(event.clientY / sizes.current.height) * 2 - 1;
        // console.log('mousePos', mousePos.current);
        rayMousePos.current.x = event.clientX / sizes.current.width;
        rayMousePos.current.y = event.clientY / sizes.current.height;

        // console.log('sizes', sizes.current);
      });
    }
  }, [])

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // const galaxy2Angle = elapsedTime * 0.3;
    const parallaxX = cursor.current.x * 0.5;
    const parallaxY = cursor.current.y * 0.5;
    // camera.updateMatrixWorld();
    // Animate camera
    camera.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;
    cameraGroup.current.position.x +=
      (parallaxX - cameraGroup.current.position.x) * 5 * deltaTime;
    cameraGroup.current.position.y +=
      (parallaxY - cameraGroup.current.position.y) * 5 * deltaTime;

    // console.log('camg', camera.current.position);

  });

  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 6]} />
      </group>
      <R3FSceneSection name="SectionOne" count={0}>
        <LuxVox route='/cv' position={[1, -1, -2]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
      </R3FSceneSection>
      <R3FSceneSection name="SectionTwo" count={1}>
        <NomadVox route='/cv' position={[1, -0.4, 2]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
      </R3FSceneSection>
      <R3FSceneSection name="SectionTwo" count={4}>
        <JetsetterVox route='/cv' position={[1, -2.4, 2]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
      </R3FSceneSection>
      <R3FSceneSection name="SectionSeven" count={6}>
                <Shader />
        <OctoEasterEggR3F position={[0, 0, 0]} />
      </R3FSceneSection>
    </>
  )
}

const Page = () => {
  return (
    <>

      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
