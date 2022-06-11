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
  keyframes
} from "@chakra-ui/react";
import axios from 'axios';
import { DateTime, Duration } from 'luxon';

import { useGetSpeakers, useOnScreen } from "@mf/utils/hooks";


export const SpeakersSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  // const list = getSpeakers();
  const getSpeakersList = getSpeakers(20);
  const [loading, setLoading] = useState(false);
  const speakersList = useRef(null);
  const currentDateTime = DateTime.now();
  const halfHourAgo = Duration.fromObject({ minutes: 30 }).negate();
  const comfortBreak = Duration.fromObject({ minutes: 30 });
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
        console.log('speakersList', speakersList.current);
      }
      setLoading(false);

    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  }, [getSpeakersList]);

  useEffect(() => {
    if (!loading  && !speakersList.current) {
      makeList();
    }

  }, [getSpeakersList, loading, makeList]);


  return (
    <Box as="section" id="speakers">
      <Box
        ref={ref}
        className="__content"
        transform={`translate3d(${onScreen ? 0 : "70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
        width="100%"
        pt={{ base: 20, '2xl': 0 }}
      >
        <Text as="h2">Speakers</Text>
        <Box className="__content__body">
          <Text>
            Here&apos;s who&apos;s on over the next few days? For full schedule info, check the <Link href="#schedule">schedule</Link>.
          </Text>

          <Box w="100%" h="auto" mt={3}>
              <Text as="h3" className="gradient2">Coming up...the next 48 hours</Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
                  <SimpleGrid spacing={5} columns={{ base: 1, xl: 5 }} mt={6}>
                  {speakersList.current &&
                    speakersList.current.length > 0 &&
                    speakersList.current.map((speaker, i) => {
                      const startDate = DateTime.fromISO(speaker.start.dateTime);
                      const endDate = DateTime.fromISO(speaker.end.dateTime);
                      // console.log('date', { startDate, endDate, currentDateTime, halfHourAgo, comfortBreak });
                      if (i <= 9) {
                        return (
                          <Box key={speaker.id}
                            sx={{
                            borderRadius: "lg",
                                  border: endDate <= halfHourAgo || startDate <= currentDateTime ? '1px solid #FF61E6' : 'none',
                                }}
                          >
                            <VStack align="flex-start" spacing={2} position="relative" p={3}
                              // sx={{
                              //   bgColor: 'rgba(0,0,0, 0.1)',
                              //   backdropFilter: 'blur(7px)',
                              //   borderRadius: 'lg',
                              //   zIndex: 0,
                              // }}
                            >
                              <Tooltip
                                label={`${speaker.summary}`}
                                hasArrow
                                variant="ghost"
                                color="white"
                                bgColor="purple.800"
                                aria-label={`${speaker.description}`}
                              >
                                <Text as="h4" fontSize={{ base: "md", sm: 'sm', '2xl': 'md' }} >
                                  {speaker.description ?? speaker.summary}</Text>
                              </Tooltip>
                              {endDate <= halfHourAgo || startDate <= currentDateTime && (
                                <Text as="span" className="gradient" position="absolute" top={0} right={0} variant="outline" animation={`2s ${streamingBlink} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`} transform={{base: "translateY(-20px)", '2xl': "translateY(-38px)"}}>Streaming now...</Text>
                              )}
                              <Text as="span" fontSize="sm">{startDate.toFormat('ccc')}, {startDate.toLocaleString(DateTime.DATETIME_FULL)}</Text>
                              <Popover key={speaker.id} zIndex={100} colorScheme="purple" >
                                <PopoverTrigger>
                                  <Button size="sm" bg="#FF61E6" colorScheme="pink">More info</Button>
                                </PopoverTrigger>
                                <PopoverContent as="div" bgColor="rgba(41,2,80,1)">
                                  <PopoverCloseButton />
                                  <PopoverArrow bgColor="rgba(41,2,80,1)"/>
                                  <PopoverHeader fontWeight={900} className="gradient2" pointerEvents="none">{speaker.description}</PopoverHeader>
                                  <PopoverBody>
                                    <Box as="span" fontWeight="700">Title: {speaker.summary} </Box>
                                    <Text>Start: {startDate.toFormat('ccc')}, {startDate.toLocaleString(DateTime.DATETIME_FULL)}</Text>
                                    <Text>Finish: {endDate.toFormat('ccc')}, {endDate.toLocaleString(DateTime.DATETIME_FULL)}</Text>
                                  </PopoverBody>
                                  <PopoverFooter
                                    border='0'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    pb={4}
                                  >
                                    <Box fontSize='sm'>Want more?</Box>
                                    <HStack>
                                      <Link href={speaker.htmlLink} isExternal>Calendar</Link>
                                      <Link href="https://discord.gg/g3KnY4sXXP" isExternal>Chat</Link>
                                      {endDate <= halfHourAgo || startDate <= currentDateTime && <Link href="/live">Watch</Link>}
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

const calUrl = "https://www.googleapis.com/calendar/v3/calendars/85ftetvc3cdl0qop7a36iguacc@group.calendar.google.com/events?key=AIzaSyDo07MSotIB3Q4ETlx_7yxVUB2YKU3MySs";
export const getSpeakers = async (num) => {
  const today = DateTime.now();
  const aBitEarlierThanNow = Duration.fromObject({ minutes: 30 }).negate();
  const next2Days = Duration.fromObject({ days: 3 });

  try {
    const res = await axios.get(calUrl, {
      params: {
        maxResults: num,
        timeMin: today.plus(aBitEarlierThanNow).toISO(),
        timeMax: today.plus(next2Days).toISO(),
        singleEvents: true,
        orderBy: "startTime",
        fields: "items(description,end,start,summary,htmlLink,location, status)",
      }
    });
    if (res.status === 200) {
      const speakers = res.data.items.filter((item, i) => {
        if (item.status === 'confirmed' && !item.summary.includes('FREE') && item.description !== undefined) {
          return item
        }
      });
      return speakers.length > 0 ? speakers : [];
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error fetching calendar', error);
  }
};

// TODO: finish this
export const getStreamStatus = async () => {
  const nowTime = new Date();

  try {
    const res = await axios.get(calUrl)

    const speakers = res.data.items.filter((item, i) => {
      const itemDate = new Date(item.start.dateTime);
      if (itemDate > nowTime) {
        if (item.status === 'confirmed' && !item.summary.includes('FREE') && item.description !== undefined) {
          return item
        }
      }
    });
    return speakers.length ? speakers : [];
  } catch (error) {
    console.log('error fetching calendar', error);
  }
};