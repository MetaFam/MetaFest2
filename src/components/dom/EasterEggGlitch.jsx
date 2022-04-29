import React, {useState, useRef} from 'react'
import {
  Text,
  Button,
  Image,
  IconButton,
  Container,
  Box,
  Link,
  useBreakpointValue
} from '@chakra-ui/react'
import { CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { BoxedNextImage } from "@/components/dom/BoxedNextImage";

export const EasterEggGlitch = () => {
  const [toggle, setToggle] = useState(false);
  const [openClaim, setOpenClaim] = useState(false);
  const ee2Ref = useRef(null);
  const claim2Ref = useRef(null);
  const responsiveButtonSize = useBreakpointValue({base: 'sm', lg: 'md'})
  const handleToggle = () => {
    if (typeof window !== "undefined") {
      setToggle(false);
      const el = ee2Ref.current
      if (el.classList.contains('found')) {
        el.classList.remove('found')
      } else {
        el.classList.add('found')
      }
    }
  }


  return (
    <>
      <Box
        ref={ee2Ref}
        className="ee2"
        bg="rgba(0,0,0,0.3)"
        boxShadow="0 0 15px rgba(0,0,0,0.6)"
        backdropFilter="blur(7px)"
        color="white"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        maxW="100vw"
        textAlign="center"
        height={{base: '150px', md: "auto"}}
        opacity={toggle ? 1 : 0}
        transform={toggle ? "translateY(0)" : "translateY(100px)"}
        transition="transform 0.3s 0.2s ease-in-out, opacity 0.3s 0.3s ease-in-out"
        zIndex={toggle ? 2003 : 0}
        overflowX="clip"
        sx={{
          h4: {
            fontSize: "2vmax",
            fontWeight: 700,
          },
          "&.found": {
            opacity: 1,
            transform: "translateY(0)",
            zIndex: 2003,
          },
        }}
      >
        {openClaim ? (
          <Button
            position="absolute"
            bottom={20}
            right={6}
            colorScheme="pink"
            bg="#FF61E6"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.6)"
            size="sm"
            transition="all 0.3s 0.8s ease"
            // transform={`translateY(${openClaim ? 0 : "-70px"})`}
            onClick={() => setOpenClaim(!openClaim)}
            zIndex={2004}
          >
            Close the claimer
          </Button>
        ) : null}
        <Box
          d="flex"
          position="relative"
          alignItems="center"
          justifyContent="space-around"
          flexFlow="row nowrap"
          mx="auto"
          maxW={{base: '100%', md: "5xl"}}
          py={3}
        >
          <BoxedNextImage src={'assets/img/baby_octo_alpha.gif'} alt="Baby Octo mascot" boxSize={{base: '35px', xl:"100px"}} objectFit="cover" />
          <Box flex={1}>
            <Text as="h3">
              <span role="img" aria-label="Octo emoji">
                🐙
              </span>{" "}
              Nova&apos;s glitchin!!{" "}
              <span role="img" aria-label="Octo emoji">
                🐙
              </span>
            </Text>
            <Text as="p" fontWeight={500}>
              Welcome Anon!{" "}
              <span role="img" aria-label="Cheers/Clinking glasses emoji">
                🍻
              </span>
              <br />
              You managed to glitch the site.{" "}
              <span role="img" aria-label="Loved up emoji">
                🤖
              </span>{" "}
              <br /> You win a MetaFest2 Glitch NFT! Do you wish
              to accept your prize?
              <br />
            </Text>
            <Button
              href="#"
              colorScheme="pink"
              bg="#FF61E6"
              size={responsiveButtonSize}
              mt={5}
              onClick={() => setOpenClaim(!openClaim)}
            >
              Claim your NFT
            </Button>
          </Box>

          <BoxedNextImage src={'assets/img/baby_octo_alpha.gif'} alt="Baby Octo mascot" boxSize={{base: '35px', xl:"100px"}} objectFit="cover" />
          <IconButton
            onClick={handleToggle}
            colorScheme="ghost"
            pos="absolute"
            top={3}
            right={0}
            size="sm"
            aria-label="Close easter egg"
            icon={<CloseIcon />}
            zIndex={2001}
          />
        </Box>
      </Box>
      {openClaim ? (
        <Box
          ref={claim2Ref}
          position="fixed"
          top="12.5vh"
          left={0}
          height="75vh"
          minH="75vh"
          width="100vw"
          boxShadow="0 0 30px rgba(0,0,0,0.8)"
          // opacity={onScreen ? 1 : 0}
          transition="opacity 1.2s 0.8s ease-in-out"
          zIndex={2003}
          sx={{
            bg: "rgba(25,0,50,0.4)",
            backdropFilter: "blur(7px)",
          }}
        >
          <Container maxW={{base: '100%', md: "2xl"}} height="100%" py={12} align="center">
            <MinterInstance />
          </Container>
          <Box
            display="flex"
            position="absolute"
            bottom={0}
            right={0}
            width="100%"
            textAlign="center"
          >
            <Link
              href="https://testnets.opensea.io/assets?search[query]=0x91BBa1e0EE2DCC8d78Fa017588614f328d6d1885"
              isExternal
              fontWeight={700}
              fontSize="0.7vmax"
              // d="inline-block"
              mx="auto"
              p={3}
              bg="linear-gradient(90.24deg, #640DFB99 0.3%, rgba(100, 13, 251, 0.9) 80.16%)"
              borderRadius="5px 5px 0 0"
              boxShadow="0 0 5px rgba(0,0,0,0.6)"
              overflow="clip"
            >
              <span role="img" aria-label="Attention!">
                📢
              </span>{" "}
              Need more NFTs? View the contract on OpenSea. <ExternalLinkIcon />
            </Link>
          </Box>
        </Box>
      ):null}
    </>
  );
};


export const MinterInstance = () => {
  return (
    <iframe
      title="Claim Easter Egg NFT"
      src="https://gateway.ipfscdn.io/ipfs/QmQpHkDDWGJPBHFKkpX1DsfzvwZXQYNVoaW4R1Lhenp6T5/bundledrop.html?contract=0x91BBa1e0EE2DCC8d78Fa017588614f328d6d1885&amp;chainId=80001&amp;tokenId=1"
      width="100%"
      height="100%"
      frameBorder="0"
    ></iframe>
  );
};