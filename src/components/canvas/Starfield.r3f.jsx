import { Box } from '@chakra-ui/react';
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import babyOctoGif from "../../static/assets/textures/baby_octo_alpha_0001.png";
import babyOctoAlpha from "../../static/assets/textures/baby_octo_alpha_map.png";

export const StarfieldR3F = (props) => {
  const mesh = useRef();
  const particlesCount = 35000;
  const positions = new Float32Array(particlesCount * 3);
  const objectsDistance = 4;

  /**
 * Colors
 */
    const count = 20;
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      // positions[i] = (Math.random() - 0.5) * 10
      colors[i] = Math.random();
    }

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    positions[i3 + 0] = (Math.random() - 0.5) * 40;
    positions[i3 + 1] =
      objectsDistance * 0.8 -
      Math.random() * objectsDistance * (sections.length * 2);
    positions[i3 + 2] = (Math.random() - 0.5) * 40;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    map: planeColorTexture,
    alphaMap: planeAlphaTexture,
    // color: parameters.particleColor,
    transparent: true,
    sizeAttenuation: true,
    size: 0.03,
  });

  // Points
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);




  return (
    <point
      {...props}
      ref={mesh}
      name="Starfield"
    >
      <bufferGeometry attach="geometry" position={new THREE.BufferAttribute(positions, 3)} />
    </point>
  )
};
