import React, {useRef} from "react";
import { Text } from "@react-three/drei";

export const CanvasLoader = () => {
  const group = useRef(null);

  return (
    <group ref={group} position={[0,0,0]}>
      <Text
        scale={[10, 10, 10]}
        color={
          "rgb(255, 255, 255)"
        }
        anchorX="center"
        anchorY="middle"
      >Loading...</Text>
    </group>
  );
};