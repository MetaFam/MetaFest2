import { useEffect, useRef, useState } from 'react'

import { CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  IconButton,
  Text,
} from '@chakra-ui/react'

import {localStore} from '@/helpers/store'
import { useIsMac } from '@/utils/hooks';

export function AlphaNotice() {
  const [toggle, setToggle] = useState(false);
  const { dismiss } = localStore.get('MF2AlphaNotice') || { dismiss: toggle };
  const notice = useRef(null);
  const macOS = useIsMac();

  const handleClick = () => {
    setToggle(false);
    localStore.set('MF2AlphaNotice', { dismiss: true });
  }

  useEffect(() => {
    if (!dismiss) {
      setToggle(true);
    }
  }, [dismiss]);

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
        maxW={{ base: '75%', md: '66%', '2xl': "6xl" }}
        px={{ base: 5, lg: 3 }}
        py={3}
      >
        {/* <Image src={BabyOctoGif} boxSize="25px" objectFit="cover" /> */}
        {!macOS ? (
          <Text fontSize={{ base: "2vmin", lg: '0.7vmax' }} fontWeight={700}>
            The site is in{" "}
            <Text as="span" color="cyan" fontWeight="700">
              Beta
            </Text>
            .{" "}
            <span role="img" aria-label="watchful eyes">
              👀
            </span>{" "}
            We&apos;re still working on content, there&apos;s no Web3 connectivity (or is there...?) and there are some bugs. <br /> We&apos;re working to get it all ship shape ASAP!
          </Text>
        ) : (
          <Text fontSize={{ base: "2vmin", lg: '0.7vmax' }} fontWeight={700}>
            It would appear that you&apos;re on a{" "}
            <Text as="span" color="cyan" fontWeight="700">
              Mac
            </Text>

            .{" "}
            <span role="img" aria-label="watchful eyes">
              👀
            </span>{" "}
            <br />
            There&apos;s an issue with ThreeJS and OSX where some features cause issues in the browser so we have disabled this functionality for the time being. Apologies.
          </Text>

        )}
        {/* <Image src={BabyOctoGif} boxSize="35px" objectFit="cover" /> */}
        <IconButton
          onClick={handleClick}
          colorScheme="ghost"
          color="#927CFF"
          pos="fixed"
          bottom={3}
          right={{ base: 2, lg: 6 }}
          size="sm"
          aria-label="Close notice"
          icon={<CloseIcon />}
          zIndex={2001}
        />
      </Box>
    </Box>
  );
};

