import { PerspectiveCamera, Stats } from '@react-three/drei'
import React, { useEffect, useMemo, useRef, forwardRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { useFrame, extend } from '@react-three/fiber'
import dynamic from 'next/dynamic'

import {
  ArtistsIntro,
  Artist,
  ArtistLuxumbra,
  ArtistMusashi,
} from "@/components/dom/cv-artists";

import {
  galaxy1Params,
  galaxy2Params,
  galaxy3Params,
  galaxy4Params,
  galaxy5Params,
} from '@/components/canvas/galaxies';
import { Effects, Nucleus } from "@/components/canvas/Galaxy";

const NomadVox = dynamic(() => import('@/components/canvas/Nomad'), {
  ssr: false,
})
const LuxVox = dynamic(() => import('@/components/canvas/Lux'), {
  ssr: false,
})
const JetsetterVox = dynamic(() => import('@/components/canvas/Jetsetter'), {
  ssr: false,
})
const HouseholdVox = dynamic(() => import('@/components/canvas/Household'), {
  ssr: false,
})
const IndustrialVox = dynamic(() => import('@/components/canvas/Industrial'), {
  ssr: false,
})
const BabyEarthVox = dynamic(() => import('@/components/canvas/BabyEarth'), {
  ssr: false,
})
const OctoPetVox = dynamic(() => import('@/components/canvas/OctoPet'), {
  ssr: false,
})
const Galaxy = dynamic(() => import('@/components/canvas/Galaxy'), {
  ssr: false,
})

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

const DOM = () => {
  return (
    <>
      <ArtistsIntro />
      <ArtistLuxumbra />
      <ArtistMusashi artist={artists[1]} />
      {/* {artists && artists.map((artist, index) => {
        <Artist key={artist.slug} artist={artist} />
      }
      )} */}
    </>
  )
}

const R3F = () => {
  const camera = useRef({ x: 0, y: 0 });
  const cameraGroup = useRef({ x: 0, y: 0 });
  const dof = useRef(null);
  const rimLight = useRef({ x: 0, y: 0 });
  const rimLight2 = useRef({ x: 0, y: 0 });
  const rimLight3 = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0)
  const sizes = useRef({ width: 0, height: 0 })
  const cursor = useRef({ x: 0, y: 0 })
  const mousePos = useRef(new THREE.Vector2())
  const rayMousePos = useRef(new THREE.Vector2())
  const mouse = new THREE.Vector2();
  const rayMouse = new THREE.Vector2();
  const section = useRef(0);
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
        // console.log('layers: ', camera.current.layers, section.current + 1);
        const newSection = Math.round(scrollY.current / sizes.current.height);
        if (newSection !== currentSection) {
          currentSection = newSection;
          section.current = currentSection;
          // camera.current.layers.set(section.current);

          console.log('Current section: ', section.current);
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
        // console.log('mouse pos', mouse.position);
      });
    }
  }, [mouse.position])

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
    rimLight2.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;
    // rimLight3.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;
    // rimLight.current.position.x +=
    //   (parallaxX - rimLight.current.position.x) ;
    // rimLight.current.position.y =
    //   (parallaxY - rimLight.current.position.y);

    // console.log('camg', rimLight.current.position);

  });
  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 6]} />
        <rectAreaLight
          ref={rimLight}
          width={6}
          height={2}
          intensity={2}
          color="#fffccc'"
          position={[0, 0, 1.5]}
          rotation={[0, 0, 0]}
          castShadow
        />
        <rectAreaLight
          ref={rimLight2}
          width={6}
          height={2}
          intensity={5}
          color="blue"
          position={[0, 0, 1.5]}
          rotation={[0, 0, 0]}
          castShadow
        />
        <rectAreaLight
          ref={rimLight3}
          width={1}
          height={1}
          intensity={2}
          color="#76EBF2"
          position={[-1.6, -1, 0.5]}
          rotation={[0, 0, 0]}
          castShadow
        />
        <axesHelper />
        <Stats />
      </group>

      <Galaxy
        dof={dof}
        parameters={galaxy5Params}
        nucleus={false} helper={false}
        position={[0, -3, -20]} />

      <R3FSceneSection name="SectionOne" count={0} >
        {/* <JetsetterVox route='/' position={[1, -2.4, -2]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} /> */}
      </R3FSceneSection>

      <R3FSceneSection name="SectionTwo" count={1} >

        <LuxVox route='/' position={[-3.5, -1.5, -1.5]} rotation={[-Math.PI / 0.51, Math.PI / 3.25, 0]} />
        <OctoPetVox route='/' position={[-3, -2, -2]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
        <BabyEarthVox route='/' animate={true} position={[-2, -1, -0.25]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
        <NomadVox route='/' position={[-1.5, 0, -2]} rotation={[-Math.PI / 0.51, Math.PI / 3.5, 0]} />
        <HouseholdVox route='/' position={[2, 2, -4]} rotation={[-Math.PI / 0.55, Math.PI / 3, 0]} />
        <JetsetterVox route='/' position={[1, -2.4, -3]} rotation={[-Math.PI / 0.51, Math.PI / 2.75, 0]} />
        <IndustrialVox route='/' position={[5, -1.4, -3]} rotation={[-Math.PI / 0.55, Math.PI / 3, 0]} />

      </R3FSceneSection>
      <R3FSceneSection name="SectionThree" count={2}>
        <Galaxy dof={dof} parameters={galaxy2Params} position={[0, -6, -20]} />
        {/* <group position={[5, 0, 3]} rotation={[0, 0.1, 0]}>
        <directionalLight
          intensity={0.3}
            decay={2}
            color="cyan"
          rotation={[0, 0, 0]}
        />
        <axesHelper />
      </group> */}
        {/* <LuxVox route='/' position={[-3, -2, -1]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
        <NomadVox route='/' position={[3, -1.5, -0.5]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
        <JetsetterVox route='/' position={[1, -2.4, -3]} rotation={[-Math.PI / 0.55, Math.PI / 3, 0]} /> */}
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
      title: 'Box',
    },
  }
}


export const artists = [
  {
    slug: 'luxumbra',
    name: 'luxumbra',
    strapline: 'Some voxels made by lux',
    description: 'lux is a buidler, innkeeper and dabbler in many things...',
  },
  {
    slug: 'musashi',
    name: 'Musashi',
    strapline: 'Some voxels made by Musashi',
    description: 'to follow...',
  }
];

function RimLight({ brightness, color, camPos }) {
  return (
    <rectAreaLight
      width={4}
      height={4}
      intensity={brightness}
      color={color}
      position={[1, camPos.y, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
}