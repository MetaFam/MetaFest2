import React, { Suspense, createRef, useEffect, useLayoutEffect, useMemo, useRef } from "react";

import { PerspectiveCamera, Stats, useProgress } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import gsap from "gsap";
import dynamic from 'next/dynamic'
import * as THREE from "three";


import {
  ApplySection,
  ChatSection,
  HomeSection,
  LivestreamSection,
  MetaverseSection,
  ScheduleSection,
  SpeakersSection,
  WorkshopsSection
} from "@mfdom/page-sections";

import {
  galaxy1Params,
  galaxy2Params,
  galaxy3Params,
  galaxy4Params,
  galaxy5Params,
} from '../components/canvas/galaxies';




// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const NomadVox = dynamic(() => import('@mf/components/canvas/Nomad'), {
  ssr: false,
})
const JetsetterVox = dynamic(() => import('@mf/components/canvas/Jetsetter'), {
  ssr: false,
})
const BabyEarthVox = dynamic(() => import('@mf/components/canvas/BabyEarth'), {
  ssr: false,
})
const OctoPetVox = dynamic(() => import('@mf/components/canvas/OctoPet'), {
  ssr: false,
})
const OctoEasterEgg = dynamic(() => import('@mf/components/canvas/EasterEgg'), {
  ssr: false,
})
const Galaxy = dynamic(() => import('@mf/components/canvas/Galaxy'), {
  ssr: false,
})

// dom components goes here
function DOM() {
  return <>
    <HomeSection />
    <LivestreamSection />
      <ScheduleSection />
      <WorkshopsSection />
      <SpeakersSection />
      <MetaverseSection />
      <ChatSection />
      <ApplySection />
    </>
}

export const objectsDistance = 4;


export function R3FSceneSection({ name, count, children, ...props }) {
  const group = useRef(null);
  // const { layers } = props;
  // useLayoutEffect(() => {
  //   group.current.layers.enable(layers);
  // }, [layers])
  // if (group.current) {
  //   console.log('section grp cur: ', group.current);
  // }
  return (
    <group ref={group} name={name} position={[0, -objectsDistance * count, 0]} {...props}>{children}</group>
  )
}

// canvas components goes here
function R3F() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const dof = useRef(null);
  const dof1 = useRef(null);
  const dof2 = useRef(null);
  const dof3 = useRef(null);
  const dof4 = useRef(null);
  const galaxy1 = useRef(null);
  const nomad = useRef(null);
  const jetsetter = useRef(null);
  const octoEasterEgg = useRef(null);
  const camera = useRef();
  const cameraGroup = useRef();
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
          if (cameraGroup.current) {
            switch (currentSection) {
              case 0:
                gsap.to(cameraGroup.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: "0",
                  y: "0",
                  z: "0",
                });
                gsap.to(cameraGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  z: 0,
                });
                break;
              case 1:
                gsap.to(cameraGroup.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: 0,
                  y: 0,
                  z: 0,
                });
                gsap.to(cameraGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  z: -9,
                });
                break;
              // Schedule
              case 2:
                gsap.to(cameraGroup.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: 0,
                  y: "0.33",
                  z: 0,
                });
                gsap.to(cameraGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  z: -10,
                });
                break;

              // Workshops
              case 3:
                gsap.to(cameraGroup.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: 0,
                  y: "0.55",
                  z: "0",
                });
                gsap.to(cameraGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  z: -10,
                });
                break;

              // Speakers
              case 4:
                gsap.to(cameraGroup.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: 0,
                  y: "0.22",
                  z: "0.1",
                });
                gsap.to(cameraGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  z: 0,
                });
                break;

              // Metaverse
              case 5:
                gsap.to(cameraGroup.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: 0,
                  y: "0",
                  z: "0",
                });
                gsap.to(cameraGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  z: 0,
                });
                break;

              // Chat
              case 6:
                gsap.to(cameraGroup.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: Math.PI * 0.25,
                  y: 0,
                  z: 0,
                });
                gsap.to(cameraGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  z: -0.2,
                });
                break;

              // Chat
              case 7:
                gsap.to(cameraGroup.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: 0,
                  y: 0,
                  z: 0,
                });
                gsap.to(cameraGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  z: 0,
                });
                break;

              default:
                gsap.to(cameraGroup.current.rotation, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  x: "0",
                  y: "0",
                  z: "0",
                });
                gsap.to(cameraGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  z: 0,
                });
                break;

            }

          }
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

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    const parallaxX = cursor.current.x * 0.5;
    const parallaxY = cursor.current.y * 0.5;


    camera.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;
    cameraGroup.current.position.x +=
      (parallaxX - cameraGroup.current.position.x) * 5 * deltaTime;
    cameraGroup.current.position.y +=
      (parallaxY - cameraGroup.current.position.y) * 5 * deltaTime;

    // rimLight.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;

    if (nomad.current) {
      // console.log('mob?', isMobile);

      nomad.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.05;

      // group.current.rotation.y = elapsedTime * 0.03;
      nomad.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
    }

    if (jetsetter.current) {
      jetsetter.current.position.y = -1 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.05;

      // group.current.rotation.y = elapsedTime * 0.03;
      jetsetter.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
    }
    if (octoEasterEgg.current) {
      octoEasterEgg.current.position.x = -3.5 + Math.sin(elapsedTime * 0.9) * Math.PI * 0.05;
      octoEasterEgg.current.position.y = -1.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
      octoEasterEgg.current.rotation.z = -elapsedTime * 0.06;
    }

  });

  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera ref={camera} makeDefault aspect={sizes.width / sizes.height} position={[0, 0, 6]} far={1000} filmGauge={53} />

        {/* <Stats /> */}
      </group>

      <Galaxy
        dof={dof}
        parameters={galaxy5Params}
        nucleus={false} helper={false}
        position={[0, -3, -17]} />

      <R3FSceneSection name="SectionOne" count={0}>
        <group ref={octoEasterEgg} dispose={null}>
          <OctoEasterEgg />
        </group>
        <Galaxy dof={dof1} parameters={galaxy1Params} position={[6, 0, -13]} rotation={[4.8, 4.15, 4.75]} />
      </R3FSceneSection>
      <R3FSceneSection name="SectionTwo" count={1} />
      <R3FSceneSection name="SectionThree" count={2} />

      <R3FSceneSection name="SectionFour" count={3}>
        <Galaxy dof={dof2} parameters={galaxy2Params} position={[0, -3, -15]} />
      </R3FSceneSection>

      <R3FSceneSection name="SectionFive" count={4} />

      <R3FSceneSection name="SectionSix" count={5}>
        <group ref={nomad} receiveShadow>
          <NomadVox route='/cv' position={[1.75, 0.5, 0.3]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
        </group>
      </R3FSceneSection>

      <R3FSceneSection name="SectionSeven" count={6}>
        <OctoPetVox position={[0, -1.8, 0]} animate rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
        <BabyEarthVox position={[-1.5, -.8, -2]} animate rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
        <Galaxy dof={dof3} parameters={galaxy3Params} position={[6, -6.5, -15]} />
      </R3FSceneSection>

      <R3FSceneSection name="SectionEight" count={7}>
        <group ref={jetsetter}>
          <JetsetterVox animate position={[-2, -1.8, 0]} rotation={[-Math.PI / .1, Math.PI / 6.5, 0]}
          />
        </group>
        <Galaxy dof={dof4} parameters={galaxy4Params} position={[3, -1.5, -2]} />
      </R3FSceneSection>
    </>
  )
}

function Page() {
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
