import React, { useCallback, useEffect, useRef, useState } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Link, Spinner, Text, VStack, keyframes } from "@chakra-ui/react";
import { DateTime, Duration } from 'luxon';

import { getSpeakers } from "@mf/utils/helpers";
import { useOnScreen } from "@mf/utils/hooks";
import { BoxedNextImage } from "@mfdom/BoxedNextImage";
import YoutubeInstance from "@mfdom/integrations/YoutubeInstance";

const ringScaleMin = 0.98;
const ringScaleMax = 1;
const pulseRing = keyframes`
	0% {
    transform: scale(${ringScaleMin});
  }
	30% {
		transform: scale(${ringScaleMax});
	},
  40%,
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
	`;
export function LivestreamSection() {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const [open, setOpen] = useState(false);
  const speaker = getSpeakers(1);
  const [currentSpeaker, setCurrentspeaker] = useState(null);
  const [loadingSpeaker, setLoadingSpeaker] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const dateTime = DateTime.now();
  const toggleStream = () => {
    setOpen(!open);
    if (typeof window !== "undefined") {
      const body = document.querySelector("body");
      body.classList.toggle("stream-open");
    }
  };

  const updateCurrentSpeaker = useCallback(async () => {
    try {
      const n = await getSpeakers(2);
      console.log("n", n);

      if (n !== null) {
        // console.log('compareForNextSpeaker', n);
          setCurrentspeaker(n[0]);
          console.log('speakerChange', n[0]);
          if (DateTime.fromISO(n[0]?.end.dateTime) > DateTime.now()) {
            setStreaming(true);
          } else {
            setStreaming(false);
          }
      }
      console.log('no speakerChange');
      setCurrentspeaker(null);
      setLoadingSpeaker(false);

    } catch (error) {
      console.log('compareForNextSpeaker error', error);
    }

  }, [speaker]);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (currentSpeaker !== null) {
          if (DateTime.fromISO(currentSpeaker.end.dateTime) < DateTime.now()) {
            updateCurrentSpeaker();
          }
        }
      } catch (error) {
        console.log('speakerChange error', error);
      }

    }, 5000);

    return () => {
      clearInterval(interval);
    }

  }, [updateCurrentSpeaker, currentSpeaker]);

  useEffect(() => {
    // console.log('current speaker', currentSpeaker);
    try {

      if (currentSpeaker === null) {
        setLoadingSpeaker(true);
        if (speaker !== null) {
          speaker.then(s => {
            if (s) {
              setCurrentspeaker(s[0]);
              console.log('speaker set', s);
              setLoadingSpeaker(false);
            }
          }).then(() => {
            if (currentSpeaker !== null) {
              if (DateTime.fromISO(currentSpeaker.start.dateTime) < DateTime.now()) {
                setStreaming(true);
              } else {
                setStreaming(false);
              }
            }
          })
        }
        setLoadingSpeaker(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [currentSpeaker, speaker]);

  useEffect(() => {
    try {
      // if (!currentSpeaker) return;
      if(currentSpeaker === null) return;
      if (DateTime.fromISO(currentSpeaker.start.dateTime) < DateTime.now() && DateTime.fromISO(currentSpeaker.end.dateTime) > DateTime.now()) {
        setStreaming(true);
        // return;
      } else {
        setStreaming(false);
        // return;
      }

    } catch (error) {
      console.log('error', error);
    }
  }, [currentSpeaker]);

  return (
    <Box
      as="section"
      id="livestream"
      justifyContent={{ base: "flex-end", lg: "space-between" }}
    >
      {open && (
        <Button
          position="absolute"
          bottom={20}
          right={6}
          colorScheme="pink"
          bg="#FF61E6"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.6)"
          size="sm"
          transition="all 0.3s 0.8s ease"
          transform={`translateY(${open ? 0 : "-70px"})`}
          willChange
          onClick={toggleStream}
          zIndex={2002}
        >
          Close stream
        </Button>
      )}
      <Box
        ref={ref}
        className="__content"
        transform={`translate3d(${!open ? 0 : "-70px"}, 0, 0)`}
        opacity={!open ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
      >
        <Box className="__content__body" textAlign="right" mt={6}>
          <Text as="h2">LiveStream</Text>
          <Text as="p" className="gradient">
            Watch the action live.
          </Text>
          <Text as="p">
            <Button variant="ghost" colorScheme="ghost" onClick={toggleStream}>
              Open Stream
            </Button>
          </Text>
        </Box>
      </Box>
      <Box className="__support"
        mt={6}
        flex="0 1 50%"
        transform={`translate3d(${!open ? 0 : "70px"}, 0, 0)`}
        opacity={!open ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
      >
        <Box
          border="5px solid #FF61E699"
          borderRadius="2xl"
          boxShadow="0 0 30px rgba(0,0,0,0.98) inset"
          p={{ base: 6, xl: 8 }}
          background={`url(/assets/img/speakercard.gif) no-repeat center`}
          backgroundSize="cover"
        >
          {currentSpeaker === null && (
            <VStack w="100%" textAlign="center">
            <Text as="span" className="gradient2">No events</Text>
          </VStack>
          )}

          {loadingSpeaker && (
            <VStack w="100%" textAlign="center">
              <Spinner fontSize="xl" color="#FF61E6" emptyColor="#76EBF2" />
              <Text as="span" className="gradient2">Loading...</Text>
            </VStack>
          )}
          {currentSpeaker !== null && !loadingSpeaker && (
              <VStack textAlign="center" justify="center" p={5} bgColor="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(7px)" borderRadius="2xl" textTransform="capitalize" onClick={toggleStream}
                title="Open stream"
                sx={{
                  _hover: {
                    cursor: 'pointer'
                  }
                }}
              >

                <BoxedNextImage
                  src="assets/img/mf2-logo.png"
                  alt="MetaGame Logo"
                  boxSize={{ base: "200px", md: "300px" }}
                  objectFit="cover"
                  textAlign="center"
                  animation={streaming && `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`}
                  sx={{
                    transition: 'all 0.2s 0.1s ease',
                    filter: "drop-shadow(0 0 15px rgba(0,0,0,0.6))",
                    'img': {
                      mx: 'auto'
                    }
                  }}
                />
                <Text as="h3" fontSize="lg" fontWeight={500} color={streaming && '#FF61E6'}>{streaming ? 'On stage now' : 'Up next...'}</Text>
                <Text as="h4" className="gradient2" fontSize="3xl" fontWeight={500} mt={3}>{currentSpeaker.summary}</Text>
                <Text fontSize="xl" >Start: {DateTime.fromISO(currentSpeaker.start.dateTime).toRelativeCalendar()}, {DateTime.fromISO(currentSpeaker.start.dateTime).toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}</Text>
                <Text fontSize="xl">End: {DateTime.fromISO(currentSpeaker.end.dateTime).toRelativeCalendar()}, {DateTime.fromISO(currentSpeaker.end.dateTime).toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}</Text>
                    {streaming && <Text fontSize="xl">Click to Open Stream</Text>}
                  </VStack>
          )}
        </Box>
      </Box>
      {open && (
        <Box
          ref={ref}
          position="absolute"
          top="12.5vh"
          left={0}
          height="75vh"
          minH="75vh"
          width="100vw"
          boxShadow="0 0 30px rgba(0,0,0,0.8)"
          opacity={onScreen ? 1 : 0}
          transition="opacity 1.2s 0.8s ease-in-out"
          zIndex={2001}
        >
          <YoutubeInstance />
          <Box
            display="flex"
            position="absolute"
            bottom={0}
            right={0}
            width="100%"
            textAlign="center"
          >
            <Link
              href="https://www.youtube.com/embed/live_stream?channel=UC6gdZ6Q7Fwfvn-Uu4QKDyhg"
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
              Hey Anon, need more Stream? Open it up in a new tab.{" "}
              <ExternalLinkIcon />
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
}
