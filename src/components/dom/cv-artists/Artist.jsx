import React, { useRef, useState } from "react";
import {
  Box,
  Text,
} from "@chakra-ui/react";
import { useOnScreen } from "@/utils/hooks";


export const Artist = ({artist}) => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const {slug, name, strapline, description} = artist;
  return (
    <Box
      as="section"
      id={`artist-${slug}`}
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
          <Text as="h2">{name}</Text>
          <Text className="gradient">
            {strapline}
          </Text>
          <Text>
            {description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};