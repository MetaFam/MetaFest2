import React, { useEffect, useRef } from "react";
import { Html, useProgress } from "@react-three/drei";
import {
  Box,
  Text,
} from "@chakra-ui/react";
import gsap from "gsap";
import useStore from '@/helpers/store'

export const CanvasLoader = () => {
  const { dom } = useStore();
  const group = useRef(null);
  const loadingBar = useRef(null);
  const { active, progress, errors, item, loaded, total } = useProgress();
  let ratioLoaded = loaded / total

  useEffect(() => {
    if (ratioLoaded < 1) {
      // console.log(ratioLoaded);
      if (loadingBar.current) {
        // console.log(loadingBar.current);
        // loadingBar.current.style.transform = `scaleX(${ratioLoaded})`

      }
    } else {
      // loadingBar.current.style.transform = ''
    }

  }, [ratioLoaded]);

  return (
    <Html center background="linear-gradient(0deg, rgba(41,2,80,1) 0%, rgba(25,0,50,1) 40%)" >
      <Box width="100vw" height="100vh" d="flex" flexFlow="column wrap" alignItems="center" justifyContent="center" opacity={ratioLoaded < 1 ? 0.7 : 0} color="#FF61E6" sx={{
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
      }}>
        <Box d="flex" flexFlow="column wrap" w="100%" textAlign="center">
          <Text fontSize="5vw" className="gradient" mb={0}>
            {progress.toFixed()}% loaded
          </Text>
        <Box ref={loadingBar} className="loading-bar" mb={2} height="5px" width="100%" bg="linear-gradient(90.24deg, #79F8FB 0.3%, #9032E6 55.76%, #E839B7 106.78%)" sx={{
          opacity: ratioLoaded < 1 ? 0.7 : 0,
          transform: ratioLoaded < 1 ? `scaleX(${ratioLoaded})` : 0,
          transformOrigin: ratioLoaded < 1 ? 'top left' : 'top right',
          transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
        }} />
          <Text fontSize="0.5vw" mt={2}>{item} / {total}</Text>
        </Box>

      </Box>
    </Html>
  );
};