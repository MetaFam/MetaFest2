import React, { createRef, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree, extend } from '@react-three/fiber'
import { PerspectiveCamera, Stats } from '@react-three/drei'
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

import {
  galaxy1Params,
  galaxy2Params,
  galaxy3Params,
  galaxy4Params,
  galaxy5Params,
} from '@/components/canvas/galaxies';
import { OctoEasterEggR3F } from '@/components/canvas/EasterEgg.r3f';
import { Effects, Nucleus } from "@/components/canvas/Galaxy";
import { starfieldParams } from "@/components/canvas/Starfield";


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
const BabyEarthVox = dynamic(() => import('@/components/canvas/BabyEarth'), {
  ssr: false,
})
const OctoPetVox = dynamic(() => import('@/components/canvas/OctoPet'), {
  ssr: false,
})
const Starfield = dynamic(() => import('@/components/canvas/Starfield'), {
  ssr: false,
})
const Galaxy = dynamic(() => import('@/components/canvas/Galaxy'), {
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

export const R3FSceneSection = ({ name, count, children, ...props }) => {
  const group = useRef(null);
  // const { layers } = props;
  // useLayoutEffect(() => {
  //   group.current.layers.enable(layers);
  // }, [layers])

  return (
    <group ref={group} name={name} position={[0, -objectsDistance * count, 0]} {...props}>{children}</group>
  )
}

// canvas components goes here
const R3F = () => {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const dof = useRef(null);
  const dof1 = useRef(null);
  const dof2 = useRef(null);
  const dof3 = useRef(null);
  const dof4 = useRef(null);
  const galaxy1 = useRef(null);
  const camera = useRef({ x: 0, y: 0 });
  const cameraGroup = useRef({ x: 0, y: 0 });
  const rimLight = useRef({ x: 0, y: 0 });
  const rimLight2 = useRef({ x: 0, y: 0 });
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
          console.log('Current section:', currentSection);
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

        // mouse.position.x = event.clientX / sizes.current.width
        // mouse.position.y = event.clientY / sizes.current.height
        // console.log('mouse pos', mouse);
      });
    }
  }, [])
  console.log('galaxy1 grp: ', galaxy1.current);
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

    rimLight.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;
    // galaxy1.current.rotation.y = -elapsedTime * 0.005;
    // console.log(dof2);
    // debugger;

  });

  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera ref={camera} makeDefault aspect={sizes.width / sizes.height} position={[0, 0, 6]}/>
        <rectAreaLight
          ref={rimLight}
          width={6}
          height={2}
          intensity={6}
          color="pink"
          position={[0, 0, 1.5]}
          rotation={[0, 0, 0]}
          castShadow
        />



        <Stats />
      </group>
      {/* <group ref={galaxy1} position={[0, -5, -20]}> */}
        <Galaxy dof={dof} parameters={galaxy5Params} nucleus={false} helper={false} effects={true} position={[0, -5, -20]} />
      {/* </group> */}
      <R3FSceneSection name="SectionOne" count={0}>
          <Galaxy dof={dof} parameters={galaxy1Params} position={[6, 0, -13]} rotation={[4.18, 4.15, 4.75]} />
      </R3FSceneSection>

      <R3FSceneSection name="SectionTwo" count={2}>
        <Galaxy dof={dof} parameters={galaxy2Params} position={[6, 0, 0]} />
        {/* <LuxVox route='/cv#artist-luxumbra' position={[2.5, -2, -1]} /> */}
      </R3FSceneSection>

      <R3FSceneSection name="SectionTwo" count={4}>
        <Galaxy dof={dof} parameters={galaxy2Params} position={[6, 0, 0]} />

        <NomadVox route='/cv' position={[2, -1, -0.8]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
      </R3FSceneSection>

      <R3FSceneSection name="SectionSix" count={5}>
        <OctoPetVox route='/cv' position={[0, -.8, 0]} animate={true} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
        <BabyEarthVox route='/cv' position={[-1.5, -.8, -2]} animate={true} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />

        {/* <Shader /> */}
      </R3FSceneSection>

      <R3FSceneSection name="SectionSeven" count={6}>
        <JetsetterVox route='/cv' position={[0, -1.8, 0]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
        {/* <Shader /> */}
        {/* <OctoEasterEggR3F position={[0, 0, 0]} /> */}
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
