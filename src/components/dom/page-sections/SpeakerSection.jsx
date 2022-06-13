import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Link,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
  keyframes,
  useBreakpointValue
} from "@chakra-ui/react";
import axios from 'axios';
import { DateTime, Duration } from 'luxon';

import { getSpeakers, htmlDecode } from "@mf/utils/helpers";
import { useGetSpeakers, useOnScreen } from "@mf/utils/hooks";

export const SpeakersSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  // const list = getSpeakers();
  const pageDisplayLimit = useBreakpointValue({ base: 9, '2xl': 14 });
  const resultLimit = useBreakpointValue({ base: 18, '2xl': 30 });
  const getSpeakersList = getSpeakers(resultLimit);
  const [loading, setLoading] = useState(false);
  const speakersList = useRef(null);
  const currentDateTime = DateTime.now();
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const popoverBtnSize = useBreakpointValue({ base: 'xs', '2xl': 'sm' });
  // console.log('times', currentDateTime.hour, halfHourAgo.values.minutes);
  const streamingBlink = keyframes`
  50% {
    opacity: 0;
  }
	`;

  const makeList = useCallback(async () => {
    try {
      setLoading(true);
      const list = await getSpeakersList;
      if (list) {
        speakersList.current = list.map(speaker => {
          return speaker
        });
        const findSpeaker = speakersList.current && speakersList.current.map(speaker => {
          const startTime = DateTime.fromISO(speaker.start.dateTime);
          const endTime = DateTime.fromISO(speaker.end.dateTime);
          if (startTime <= currentDateTime && endTime >= currentDateTime) {
            // console.log('current', speaker);
            return speaker;
          }
        });
        if (findSpeaker && findSpeaker.length > 0) {
          setCurrentSpeaker(findSpeaker[0]);
          // console.log('cur speaker updated', findSpeaker);
        }
        // console.log('speakersListUpdated', speakersList.current[0], currentSpeaker);
      }
      setLoading(false);

    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  }, [currentDateTime, getSpeakersList]);

  useEffect(() => {
    if (!loading && !speakersList.current) {
      makeList();
    }

  }, [getSpeakersList, loading, makeList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (speakersList.current && currentSpeaker) {
        // console.log({ speakersList, currentSpeaker });
        const curStartTime = DateTime.fromISO(currentSpeaker.start.dateTime);
        const curEndTime = DateTime.fromISO(currentSpeaker.end.dateTime);
        const now = DateTime.now();
        const dur = Duration.fromObject({ minutes: 45 });
        // console.log('curStartTime', curStartTime, curEndTime, currentDateTime);
        if (now > curEndTime) {
          makeList();
          console.log('makeList');
        }
        // console.log('curStartTime', curEndTime, now);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, [currentDateTime, currentSpeaker, makeList]);

  return (
    <Box as="section" id="speakers">
      <Box
        ref={ref}
        className="__content"
        transform={`translate3d(${onScreen ? 0 : "70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
        width="100%"
        pt={{ base: 20, xl: 0 }}
      >
        <Text as="h2">Speakers</Text>
        <Box className="__content__body">
          <Text>
            Here&apos;s who&apos;s on over the next few days? For full schedule info, check the <Link href="#schedule">schedule</Link>.
          </Text>

          <Box w="100%" h="auto" mt={3}>
            <Text as="h3" className="gradient2">Coming up...</Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <SimpleGrid spacing={{base: 2, xl: 5}} columns={{ base: 2, lg: 2, xl: 5 }} mt={{base: 3, xl: 6}}>
                {speakersList.current &&
                  speakersList.current.length > 0 &&
                  speakersList.current.map((speaker, i) => {
                    const startDate = DateTime.fromISO(speaker.start.dateTime);
                    const endDate = DateTime.fromISO(speaker.end.dateTime);
                    const key = DateTime.fromISO(speaker.start.dateTime).toFormat('x');
                    const limit = resultLimit;
                    if (i <= pageDisplayLimit) {
                      return (
                        <Box key={`speaker-${key}`}
                          sx={{
                            borderRadius: "lg",
                            border: endDate <= currentDateTime || startDate <= currentDateTime ? '1px solid #FF61E6' : 'none',
                            bgColor: endDate <= currentDateTime || startDate <= currentDateTime ? 'rgba(255,255,255,0.05)' : 'transparent',
                          }}
                        >
                          <VStack align="flex-start" spacing={{ base: 1, xl: 2 }} position="relative" p={{base: 0, lg: 3}}>
                            <Tooltip
                              label={`${speaker.summary}`}
                              hasArrow
                              variant="ghost"
                              color="white"
                              bgColor="purple.800"
                              aria-label={`${speaker.description}`}
                            >
                              <Text as="h4" fontSize={{ base: "sm", sm: 'sm', '2xl': 'md' }} fontWeight={{base: 300, xl: 700}}>
                                {speaker.summary}</Text>
                            </Tooltip>
                            {endDate <= currentDateTime || startDate <= currentDateTime && (
                              <Text as="span" fontSize={{ base: 'xs', '2xl': "sm" }} className="gradient" position="absolute" top={0} right={0} variant="outline" animation={`2s ${streamingBlink} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`} transform={{ base: "translateY(-20px)", xl: 'translateY(-35px)', '2xl': "translateY(-38px)" }}>Streaming now...</Text>
                            )}
                            <Text as="span" fontSize={{ base: 'xs', '2xl': "sm" }}>{startDate.toFormat('ccc')}, {startDate.toLocaleString(DateTime.DATETIME_FULL)}</Text>
                            <Popover key={speaker.id} zIndex={100} colorScheme="purple" >
                              <PopoverTrigger>
                                <Button size={popoverBtnSize} colorScheme="purple">More info</Button>
                              </PopoverTrigger>
                              <PopoverContent as="div" bgColor="rgba(41,2,80,1)">
                                <PopoverCloseButton />
                                <PopoverArrow bgColor="rgba(41,2,80,1)" />
                                <PopoverHeader fontWeight={900} className="gradient2" pointerEvents="none">{speaker.summary}</PopoverHeader>
                                <PopoverBody>
                                  <Text as="span" fontSize={{ base: 'xs', '2xl': "sm" }} fontWeight={700}>On stage with:</Text>
                                  <Box fontSize={{ base: 'xs', '2xl': 'sm' }} mb={2}>
                                    <div dangerouslySetInnerHTML={{ __html: htmlDecode(speaker.description) }} />
                                    </Box>
                                  <Text>Start: {startDate.toFormat('ccc')}, {startDate.toLocaleString(DateTime.DATETIME_FULL)}</Text>
                                  <Text>Finish: {endDate.toFormat('ccc')}, {endDate.toLocaleString(DateTime.DATETIME_FULL)}</Text>
                                </PopoverBody>
                                <PopoverFooter
                                  border='0'
                                  display='flex'
                                  alignItems='center'
                                  justifyContent='space-between'
                                  pb={4}
                                  fontSize={{ base: 'sm', xl: 'sm', '2xl': "lg" }}
                                >
                                  <Box fontSize='sm'>Want more?</Box>
                                  <HStack >
                                    <Link href={speaker.htmlLink} isExternal>Calendar</Link>
                                    <Link href="https://discord.gg/g3KnY4sXXP" isExternal>Chat</Link>
                                    {endDate <= currentDateTime || startDate <= currentDateTime && <Link href="/#live">Watch</Link>}
                                  </HStack>
                                </PopoverFooter>
                              </PopoverContent>
                            </Popover>
                          </VStack>
                        </Box>
                      );
                    }
                  })}
              </SimpleGrid>
            )}
          </Box>

        </Box>
      </Box>
    </Box>
  );
};
