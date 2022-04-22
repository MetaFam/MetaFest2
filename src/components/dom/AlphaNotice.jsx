import { useState, useRef } from 'react'
import {
  Text,
  IconButton,
  Box,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

export function AlphaNotice() {
  const [toggle, setToggle] = useState(true);
  const notice= useRef(null);

  return (
    <Box
      ref={notice}
      // display="none"
      bg="linear-gradient(90.24deg, #640DFB80 0.3%, rgba(100, 13, 251, 0.1) 80.16%)"
      backdropFilter="blur(7px)"
      boxShadow="0 0 15px rgba(0,0,0,0.6)"
      color="#FF61E6"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      width="100%"
      textAlign="center"
      height="auto"
      opacity={toggle ? 1 : 0}
      transform={`translateY(${toggle ? 0 : 100}px)`}
      transition="transform 0.3s 0.2s ease-in-out, opacity 0.3s 0.3s ease-in-out"
      zIndex={3000}
    >
      <Box
        d="flex"
        position="relative"
        alignItems="center"
        justifyContent="space-around"
        flexFlow="row nowrap"
        mx="auto"
        maxW={{base: '75%', md: '66%', '2xl': "6xl"}}
        px={{base: 5, lg: 3}}
        py={3}
      >
        {/* <Image src={BabyOctoGif} boxSize="25px" objectFit="cover" /> */}
        <Text fontSize={{base: "2vmin", lg: '0.7vmax'}} fontWeight={700}>
          The site is in{" "}
          <Text as="span" color="#76EBF2" fontWeight="700">
            Alpha
          </Text>
          .{" "}
          <span role="img" aria-label="watchful eyes">
            👀
          </span>{" "}
          We&apos;re still working on content, there&apos;s no Web3 connectivity (or is there...?) and there
          are some bugs. <br /> We&apos;re working to get it
          all ship shape ASAP!
        </Text>
        {/* <Image src={BabyOctoGif} boxSize="35px" objectFit="cover" /> */}
        <IconButton
          onClick={() => setToggle(!toggle)}
          colorScheme="ghost"
          color="#927CFF"
          pos="fixed"
          bottom={3}
          right={{base: 2, lg: 6}}
          size="sm"
          aria-label="Close easter egg"
          icon={<CloseIcon />}
          zIndex={2001}
        />
      </Box>
    </Box>
  );
};

