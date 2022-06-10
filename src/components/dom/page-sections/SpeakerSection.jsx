import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Badge,
  Box,
  Button,
  Flex,
  Link,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
  Tooltip,
  UnorderedList,
  VStack,
  keyframes
} from "@chakra-ui/react";
import axios from 'axios';

import { useOnScreen } from "@mf/utils/hooks";
import StatusIndicator from "@mfdom/StatusIndicator";


export const SpeakersSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  // const list = getSpeakers();
  const getSpeakersList = getSpeakers();
  const [loading, setLoading] = useState(false);
  const speakersList = useRef([]);
  const currentDateTime = new Date();
  const halfHourAgo = new Date(currentDateTime - 30 * 60 * 1000);
  const streamingBlink = keyframes`
  50% {
    opacity: 0;
  }
	`;

  useEffect(() => {
    if (!loading && speakersList.current) {
      setLoading(true);
      getSpeakersList.then((list) => {
        list.sort((a, b) => {
          const dateA = new Date(a.start.dateTime);
          const dateB = new Date(b.start.dateTime);

          return dateA - dateB;
        });
        speakersList.current = list;
      }).then(() => {
        setLoading(false);
      });
    }
    setLoading(false);
  }, [getSpeakersList, loading]);



  return (
    <Box as="section" id="speakers">
      <Box
        ref={ref}
        className="__content"
        transform={`translate3d(${onScreen ? 0 : "70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
        width="100%"

      >
        <Text as="h2">Speakers</Text>
        <Box className="__content__body">
          <Text>
            Here&apos;s who&apos;s on over the next few days? For full schedule info, check the <Link href="#schedule">schedule</Link>.
          </Text>

          <Box w="100%" h="auto" mt={3}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <>
                <Text as="h3" className="gradient2">Coming up...</Text>
                <SimpleGrid spacing={5} columns={5} mt={6}>
                  {speakersList.current &&
                    speakersList.current.length > 0 &&
                    speakersList.current.map((speaker, i) => {
                      const date = new Date(speaker.start.dateTime);
                      if (i <= 9) {
                        return (
                          <VStack key={speaker.id} align="flex-start" spacing={2} position="relative">
                          {/* <Box p={1}  wordWrap="break-word"> */}
                          <Tooltip
                            label={`${speaker.summary}`}
                            hasArrow
                            aria-label={`${speaker.description}`}
                          >
                            <Text as="h4" fontSize="md" wordWrap="break-word">
                              {speaker.description ?? speaker.summary}</Text>
                          </Tooltip>
                          {date <= halfHourAgo && (
                            <Text as="span" className="gradient" position="absolute" top={0} right={0} variant="outline" animation={`2s ${streamingBlink} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`} transform="translateY(-30px)">Streaming now...</Text>
                          )}
                          <Text as="span">{date.toDateString()}</Text>
                          <Popover key={speaker.id} >
                            <PopoverTrigger>
                              <Button size="sm" overflow="hidden">More info</Button>
                            </PopoverTrigger>
                            <PopoverContent as="div" bgColor="rgba(41,2,80,1)">
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverHeader fontWeight={900} className="gradient2">{speaker.description}</PopoverHeader>
                              <PopoverBody>
                                <Box as="span" fontWeight="700">Title: {speaker.summary} </Box>
                                <Text>Starts: {date.toTimeString()}</Text>
                                <Link href={speaker.htmlLink} isExternal>Calendar link</Link>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                          {/* </Box> */}
                          </VStack>
                        );
                      }
                    })}
                </SimpleGrid>
              </>
            )}
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

const calUrl = "https://www.googleapis.com/calendar/v3/calendars/85ftetvc3cdl0qop7a36iguacc@group.calendar.google.com/events?key=AIzaSyDo07MSotIB3Q4ETlx_7yxVUB2YKU3MySs";
export const getSpeakers = async () => {
  const today = new Date();
  const aBitEarlierThanNow = new Date(today.getTime() - (60 * 60 * 1000));
  const next2Days = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));

  try {
    const res = await axios.get(calUrl)

    const speakers = res.data.items.filter((item, i) => {
      const itemDate = new Date(item.start.dateTime);
      if (itemDate > aBitEarlierThanNow && itemDate < next2Days) {
        if (item.status === 'confirmed' && !item.summary.includes('FREE') && item.description !== undefined) {
          // if (!item.description.includes('<html-blob>')) {
          console.log('item', item.description);
          return item
        }
        // }
      }
    });
    return speakers.length ? speakers : [];
  } catch (error) {
    console.log('error fetching calendar', error);
  }
};

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