import { PerspectiveCamera, Stats } from '@react-three/drei'
import React, { useEffect, useMemo, useRef, forwardRef, useLayoutEffect, Suspense } from "react";
import * as THREE from "three";
import gsap from "gsap";
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
import { CanvasLoader } from '@/components/canvas/Loader';

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
// Musashi
const Robe = dynamic(() => import('@/components/canvas/musashi/Robe'), {
  ssr: false,
})
const Robe2 = dynamic(() => import('@/components/canvas/musashi/Robe2'), {
  ssr: false,
})
const ILB = dynamic(() => import('@/components/canvas/musashi/Ilb'), {
  ssr: false,
})
const MolochPet1 = dynamic(() => import('@/components/canvas/musashi/MolochPet1'), {
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

  // Model groups
  const musashiGroup = useRef(null);
  const ilbRef = useRef(null);
  const molochPet1 = useRef(null);

  const luxGroup = useRef(null);

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  let previousTime = 0;
  const isOdd = (num) => !!num % 2;
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
          if (musashiGroup.current) {
            let tl = gsap.timeline();
            switch (currentSection) {
              // Workshops
              case 2:
                tl.to(musashiGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  y: 0,
                  z: 0,
                });
                break;

              default:
                tl.to(musashiGroup.current.position, {
                  duration: 1.5,
                  ease: "power2.inOut",
                  y: -10,
                  z: 0,
                });
                break;
            }
          }

          if (luxGroup.current) {
            let tl2 = gsap.timeline();
            switch (currentSection) {
              // Workshops
              case 1:
                tl2.to(luxGroup.current.position, {
                  duration: 1.5,
                  delay: 0.3,
                  ease: "power2.inOut",
                  y: 0,
                  z: 0,
                });
                break;

              default:
                tl2.to(luxGroup.current.position, {
                  duration: 1.5,
                  delay: 0.3,
                  ease: "power2.inOut",
                  y: 0,
                  z: -10,
                });
                break;
            }
          }
        }
      });

      if (musashiGroup.current) {
        let tl = gsap.timeline();
        switch (section.current) {
          // Workshops
          case 2:
            tl.to(musashiGroup.current.position, {
              duration: 1.5,
              ease: "power2.inOut",
              y: 0,
              z: 0,
            });
            break;

          default:
            tl.to(musashiGroup.current.position, {
              duration: 1.5,
              ease: "power2.inOut",
              y: -10,
              z: 0,
            });
            break;
        }
      }

      if (luxGroup.current) {
        let tl2 = gsap.timeline();
        switch (currentSection) {
          // Workshops
          case 1:
            tl2.to(luxGroup.current.position, {
              duration: 1.5,
              delay: 0.3,
              ease: "power2.inOut",
              y: 0,
              z: 0,
            });
            break;

          default:
            tl2.to(luxGroup.current.position, {
              duration: 1.5,
              delay: 0.3,
              ease: "power2.inOut",
              y: 0,
              z: -10,
            });
            break;
        }
      }

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

    // rimLight.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;
    // rimLight2.current.position.y = (-scrollY.current / sizes.current.height) * objectsDistance;

    if (ilbRef.current) {
      ilbRef.current.position.x = 1 + Math.sin(elapsedTime * 0.8) * Math.PI * 0.03;
      ilbRef.current.position.y = 1 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;
      // group.current.position.z = -0.25 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;

      // ilbRef.current.rotation.z = -0.5 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
      ilbRef.current.rotation.y = -elapsedTime * 0.006;
    }

    if (molochPet1.current) {
      molochPet1.current.position.x = -1 + Math.sin(elapsedTime * 0.6) * Math.PI * 0.03;
      molochPet1.current.position.y = 1 + Math.cos(elapsedTime * 0.07) * Math.PI * 0.5;
      // group.current.position.z = -0.25 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;

      molochPet1.current.rotation.z = -0.05 - Math.sin(elapsedTime * 0.3) * Math.PI * 0.03;
      // molochPet1.current.rotation.y = elapsedTime * 0.03;
    }

    if (luxGroup.current) {
      luxGroup.current.children.map((child, i) => {
        // console.log(child);
        if (child.name === 'LuxVoxGroup' || child.name === 'OctoPetGroup' || child.name === 'BabyEarthGroup') {
        } else {
          // console.log(child.name)
          child.position.y = -1.5 - Math.cos(elapsedTime * (0.1)) * Math.PI * (0.05 - i*0.1) ;
          child.position.z = isOdd(i) ? -2 : -4;
          // group.current.rotation.y = elapsedTime * 0.03;
          child.rotation.z = 0.2 - Math.sin(elapsedTime * 0.3) * Math.PI * (0.03 - i * 0.001);
        }
      })
      // console.log(luxGroup.current.children);

    }

  });


  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 6]} />

        {/* <Stats /> */}
      </group>

      <Suspense fallback={<CanvasLoader />}>
      <Galaxy
        dof={dof}
        parameters={galaxy5Params}
        position={[0, -3, -10]}
        rotation={[Math.PI * 0.3, 0, 0]}
      />

      <R3FSceneSection name="SectionOne" count={0} >
        {/* <JetsetterVox route='/' position={[1, -2.4, -2]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} /> */}
      </R3FSceneSection>

      <R3FSceneSection name="SectionTwo" count={1} >
        <group ref={luxGroup} name="LuxGroup" position={[0, 0, -10]}>
          <group name="LuxVoxGroup">
            <LuxVox route='/' position={[-3.5, -1.5, -1.5]} rotation={[-Math.PI / 0.51, Math.PI / 3.25, 0]} />
          </group>
          <group name="OctoPetGroup">
            <OctoPetVox route='/' position={[-3, -2, -2]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
          </group>
          <group name="BabyEarthGroup">
            <BabyEarthVox route='/' animate={true} position={[-2, -1, -0.25]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
          </group>
          <group name="NomadGroup">
            <NomadVox route='/' position={[-1.5, 0, -2]} rotation={[-Math.PI / 0.51, Math.PI / 3.5, 0]} />
          </group>
          <group name="HouseholdGroup">
            <HouseholdVox route='/' position={[2, 2, -4]} rotation={[-Math.PI / 0.55, Math.PI / 3, 0]} />
          </group>
          <group name="JetsetterGroup">
            <JetsetterVox route='/' position={[1, -2.4, -3]} rotation={[-Math.PI / 0.51, Math.PI / 2.75, 0]} />
          </group>
          <group name="IndustrialGroup">
            <IndustrialVox route='/' position={[5, -1.4, -3]} rotation={[-Math.PI / 0.55, Math.PI / 3, 0]} />
          </group>
        </group>
      </R3FSceneSection>

      <R3FSceneSection name="SectionThree" count={2}>
        <Galaxy dof={dof} parameters={galaxy2Params} position={[0, -6, -20]} />
        <group ref={musashiGroup} name="MusashiGroup" position={[0, 0, 0]}>
          <Robe route='/' animate={false} position={[-2.25, -2, 0]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
          <Robe2 route='/' animate={false} position={[-2.25, -2, 0]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
          <group ref={ilbRef}>
            <ILB position={[2, -2.5, -1]} rotation={[0, 0, 0]} />
          </group>
          <group ref={molochPet1}>
            <MolochPet1 position={[1, -2.5, 0]} rotation={[-Math.PI / 0.51, Math.PI / 4.5, 0]} />
          </group>
        </group>
        </R3FSceneSection>
        </Suspense>
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
    description: 'Member of MG writers guild and bridgebuilder & cross-pollination extraordinaire',
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