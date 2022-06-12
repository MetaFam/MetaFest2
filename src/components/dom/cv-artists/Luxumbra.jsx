import React, { useRef, useState } from "react";

import {
  Box,
  Text,
} from "@chakra-ui/react";

import { useOnScreen } from "@mf/utils/hooks";


export const ArtistLuxumbra = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  return (
    <Box
      as="section"
      id="artist-luxumbra"
      justifyContent={{base: 'flex-end', lg: 'inherit'}}
    >
      <Box
        ref={ref}
        className="__content"
        maxW={{base: '100%', md: "2xl"}}
        transform={`translate3d(${onScreen ? 0 : "-70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
        willChange
        zIndex={2001}
      >
        <Box className="__content__body--no-firstof" textAlign="right" mt={6}>
          <Text as="h2">luxumbra</Text>
          <Text fontWeight={700}>
            Some Voxels by lux.
          </Text>
          <Text>
            lux is a buidler, innkeeper and dabbler in many things...{" "}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};