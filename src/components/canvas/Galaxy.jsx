import * as THREE from 'three'
import React, { Suspense, useRef, forwardRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { useControls, folder } from 'leva'

import { CanvasLoader } from '@/components/canvas/Loader'

function Galaxy({ dof, parameters, nucleus = false, helper = false, effects = false, ...props }) {
  const group = useRef();
  const particles = useRef()
  //const [movement] = useState(() => new THREE.Vector3())
  const [temp] = useState(() => new THREE.Vector3())
  const [focus] = useState(() => new THREE.Vector3())
  // const { animationRef } = props
  useEffect(() => {
    generateGalaxy()
    // console.log(animationRef);
  })

  useFrame((state, delta) => {
    //dof.current.target = focus.lerp(particles.current.position, 0.05)
    //movement.lerp(temp.set(state.mouse.x, state.mouse.y * 0.2, 0), 0.2)
    if (dof.current) {
      dof.current.circleOfConfusionMaterial.uniforms.focusDistance.value = parameters.focusDistance
      dof.current.circleOfConfusionMaterial.uniforms.focalLength.value = parameters.focalLength
      dof.current.resolution.height = parameters.height
      dof.current.resolution.width = parameters.width
      dof.current.target = new THREE.Vector3(parameters.focusX, parameters.focusY, parameters.focusZ)
      dof.current.blendMode.opacity.value = parameters.opacity
    }
  })

  const generateGalaxy = () => {
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    const sections = 6;
    const objectsDistance = 4;

    // Type 1
    if (parameters.type === 1) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = Math.sin(spinAngle + radius) * (radius - Math.PI * 2)
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 1.1)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        if (i < 20) {
          console.log(i, branchAngle)
        }
      }
    } else if (parameters.type === 2) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = (Math.PI * 0.12) * radius + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 1.1)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        if (i < 20) {
          console.log(i, branchAngle)
        }
      }

    } else if (parameters.type === 3) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = Math.cos(spinAngle + radius) * radius + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 1.05)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        if (i < 20) {
          console.log(i, branchAngle)
        }
      }
    } else if (parameters.type === 4) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = Math.sin(branchAngle - spinAngle) * radius + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 1.5)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        if (i < 20) {
          console.log(i, branchAngle)
        }
      }
    } else if (parameters.type === 5) {
      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = (Math.random() - 0.5) * 10;
        positions[i3 + 1] =
          objectsDistance * 0.8 -
          Math.random() * objectsDistance * (sections.length * 2);
        positions[i3 + 2] = (Math.random() - 0.5) * 10;

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius * 1.5)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b


        if (i < 20) {
          console.log(i, branchAngle)
        }
      }
    }

    particles.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  }

  return (
    <>
      <Suspense fallback={<CanvasLoader />}>
        <group ref={group} {...props}>
          <points ref={particles}>
            <bufferGeometry />
            <pointsMaterial size={parameters.size} sizeAttenuation={true} depthWrite={true} vertexColors={true} blending={THREE.AdditiveBlending} />
          </points>
          {nucleus && (
            <Nucleus size={0.125} />
          )}
          {helper && (
            <axesHelper args={[2, 2, 2]} />
          )}
        </group>
      </Suspense>
      {/* {effects && (
        // <Effects ref={dof} />
      )} */}

    </>
  )
}

export default Galaxy

//function BlackHoleNucleus({ size }) {
//  const meshRef = useRef();
//
//  return (
//    <mesh ref={meshRef} scale={[size, size, size]} position={[0, 0, 0]}>
//      <sphereBufferGeometry
//        attach="geometry"
//        args={[0.5, 32, 32, 0, 6.4, 0, 6.3]}
//      />
//      <meshBasicMaterial attach="material" color="#000" />
//    </mesh>
//  );
//}

export const galaxyColors = {
  inside: '#462080',
  outside: '#FF61E6'
}
export const galaxy2Colors = {
  inside: '#462080',
  outside: '#7C56FF'
}
export const galaxy3Colors = {
  inside: '#76EBF2',
  outside: '#7C56FF'
}
export const galaxy4Colors = {
  inside: '#462080',
  outside: '#7C56FF'
}

export function Nucleus({ size }) {
  const nucleusRef = useRef()
  const color = new THREE.Color()
  color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05)

  return (
    <mesh ref={nucleusRef} position={[0, 0, 0]} scale={[size, size, size]} layers={THREE.BLOOM_SCENE}>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32, 0, 6.4, 0, 6.3]} />
      <meshBasicMaterial attach="material" color={'#fff'} />
    </mesh>
  )

  //const geometry = new THREE.IcosahedronGeometry( 1, 15 );

  //		for ( let i = 0; i < 50; i ++ ) {

  //			const color = new THREE.Color();
  //			color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );

  //			const material = new THREE.MeshBasicMaterial( { color: color } );
  //			const sphere = new THREE.Mesh( geometry, material );
  //			sphere.position.normalize().multiplyScalar( Math.random() * 4.0 + 2.0 );
  //			sphere.scale.setScalar( Math.random() * Math.random() + 0.5 );
  //			scene.add( sphere );

  //			if ( Math.random() < 0.25 ) sphere.layers.enable( BLOOM_SCENE );

  //    }
}

// eslint-disable-next-line react/display-name
export const Effects = forwardRef((props, ref) => {
  const bokehScale = {
    min: 0,
    max: 10,
    value: 1,
  };

  return (
    <EffectComposer multisampling={0}>
      <DepthOfField ref={ref} bokehScale={bokehScale} />
    </EffectComposer>
  )
})
