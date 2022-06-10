import React, { useRef } from "react";

import {
  Box,
  Button,
  HStack,
  Link,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";

import { useOnScreen } from "@mf/utils/hooks";


export const ArtistsIntro = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'lg' })


  return (
    <Box
      as="section"
      id="cv-intro"
      alignContent="center"
      justifyContent="flex-start"
    >
      <Box
        ref={ref}
        position="relative"
        className="__content"
        maxW={{base: '100%', md: "2xl"}}
        opacity={onScreen ? 1 : 0}
        transform={`translate3d(${onScreen ? 0 : "-70px"}, 0, 0)`}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"

      >
        <Box
          d="inline-flex"
          flexFlow="column-reverse wrap"
          alignItems="flex-start"
          width="auto"
        >
          <Text
            as="h1"
            className="gradient-cone"
            lineHeight={1}
            overflow="visible"
            sx={{
              position: "relative",
              fontWeight: 700,
              mb: 0,
              strong: {
                d: "block",
                fontWeight: 700,
              },
              em: {
                fontStyle: "normal",
              },
            }}
          >
            CV Artists of MetaGame
          </Text>
          {/* <span className="fest-dates">9th - 23rd JUNE</span> */}
        </Box>
        <Box className="__content__body" maxW={{base: '66vw', lg: 'unset'}}>
          <Text as="p" fontWeight={300} mt={-2}>
            powered by{" "}
            <Text as="strong" className="gradient">
              MagicaVoxels, Blender, etc
            </Text>
          </Text>
          <HStack mt={5}>
            <Link href="#artist-luxumbra"><Button colorScheme="pink" bg="#FF61E6" size={buttonSize}>Browse</Button></Link>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};