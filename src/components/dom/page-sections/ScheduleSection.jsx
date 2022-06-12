import React, { useRef, useState } from "react";

import { CalendarIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Link,
  SimpleGrid,
  Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure
} from "@chakra-ui/react";

import CalendarInstance from "@mf/components/dom/integrations/CalendarInstance";
import ScheduleIcon from '@mf/static/assets/img/icons/events.svg';
import { timeBlocks } from "@mf/utils/constants";
import { useDisabledMobileNotify, useOnScreen } from "@mf/utils/hooks";


export const ScheduleSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const [openCal, setOpenCal] = useState(false);
  const disabledMobNotify = useDisabledMobileNotify();

  return (
    <Box
      as="section"
      id="schedule"
      flexFlow="row nowrap"
      justifyContent="space-between"
      // alignItems={{base: "flex-start", '2xl': 'center'}}
    >
      {openCal && (
        <Button
          position="absolute"
          bottom={20}
          right={6}
          colorScheme="pink"
          bg="#FF61E6"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.6)"
          size="sm"
          transition="all 0.3s 0.8s ease"
          onClick={() => setOpenCal(!openCal)}
          zIndex={2002}
        >
          Close Calendar
        </Button>
      )}

      <Box
        ref={ref}
        className="__content"
        w={{ base: "full" }}
        transform={`translate3d(${onScreen ? 0 : "-70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
        pt={{base: 20, '2xl': 0}}
      >
        <Box
          position="relative"
          d="inline-flex"
          flexFlow="row wrap"
          alignItems="flex-start"
          justifyContent="space-between"
          w={{ base: "full", xl: "2xl" }}
        >
          <Text as="h2" d="inline-block">
            Schedule
          </Text>
          <IconButton
            icon={<CalendarIcon />}
            aria-label="Open event calendar"
            flex={0}
            fontSize={{ base: '8vmin', lg: "2vmax" }}
            variant="ghost"
            onClick={() => setOpenCal(!openCal)}
            alignSelf="center"
            filter="drop-shadow(0 0 15px #FF61E6)"
          />
        </Box>

        <Box className="__content__body">
          <WeekTabs blocks={timeBlocks} />

          <Box mt={5}>
            <Text as="em" fontSize={{base: 'xs', lg: 'inherit'}}>
              To enter MetaFest2, you will have to{" "}
              <a
                href="https://gitcoin.co/grants/213/metagame"
                target="_blank"
                rel="noopener noreferrer"
              >
                donate to our Gitcoin grant
              </a>{" "}
              or{" "}
              <a
                href="https://giveth.io/project/metagame-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                donate to our Giveth project
              </a>...{' '}
              jk jk just enter!
            </Text>

            <Button
              d={{ md: "none" }}
              colorScheme="pink"
              bg="#FF61E6"
              size="sm"
              mt={5}
              onClick={disabledMobNotify}
            >
              <span role="img" aria-label="Yay, come join us!">
                🎉
              </span>{" "}
              Join the party!{" "}
              <span role="img" aria-label="Yay, come join us!">
                🎉
              </span>
            </Button>
          </Box>
        </Box>
      </Box>
      {openCal && (
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
          sx={{
            bg: "rgba(25,0,50,0.4)",
            backdropFilter: "blur(7px)",
          }}
        >
          <CalendarInstance />
          <Box
            display="flex"
            position="absolute"
            bottom={0}
            right={0}
            width="100%"
            textAlign="center"
          >
            <Link
              href="https://calendar.google.com/calendar/embed?src=85ftetvc3cdl0qop7a36iguacc%40group.calendar.google.com&amp;ctz=Europe%2FLondon"
              isExternal
              fontWeight={700}
              fontSize="0.7vmax"
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
              Hey Anon, need more Calendar? Open it up in a new tab. <ExternalLinkIcon />
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
};


export const WeekTabs = ({ blocks }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const week1 = blocks.filter(block => block.week === 1)
  const week2 = blocks.filter(block => block.week === 2)
  return (
    <Tabs
      mt={0}
      maxW={{ base: 'full', lg: 'full' }}
      height="-webkit-fit-content"
      defaultIndex={0}
      variant="unstyled"
      isFitted
      onChange={(index) => setTabIndex(index)}
    >
      <TabList fontSize={{ base: '2.6vmin', lg: '2vmax' }} w={{base: '100%', xl: "50%"}} flex={{base: '0 0 100%', xl: "0 0 50%"}} justifyContent="flex-start" justifyItems="center" borderBottom="none">
        <Box p={5} pl={0}>
          <Tab
            borderBottom={tabIndex === 0 ? "4px solid #640DFB99" : "2px solid transparent"}
          >
            <Text as="h3" className="gradient2" my={0}>Week One</Text></Tab>
        </Box>
        <Box p={5} pl={0}>
          <Tab  borderBottom={tabIndex === 1 ? "4px solid #640DFB99" : "2px solid transparent"}><Text as="h3" className="gradient2" my={0}>Week Two</Text></Tab>
        </Box>

      </TabList>

      <TabPanels>
        <TabPanel px={{base: 0, lg: 4}} pt={{base: 0, lg: 'inherit'}}>
          {/* <Box
            d="flex"
            alignContent="flex-start"
            justifyContent="space-between"
            flexFlow="row wrap"
            w="100%"
            opacity={tabIndex === 0 ? 1 : 0}
            transform={tabIndex === 0 ? 'translateX(0)' : 'translateX(-200px)'}
            transition="transform 0.3s 1s ease-in-out,  opacity 0.3s 1.1s ease-in-out"
          > */}
          <SimpleGrid columns={{base: 1, md: 2, xl: 3}} gap={{base: 4, xl: 6}}>
            {
              week1 && week1.map((day, i) => (
                <DayBlock key={i} day={day} />
              ))
            }
          </SimpleGrid>
          {/* </Box> */}
        </TabPanel>
        <TabPanel px={{base: 0, lg: 4}} pt={{base: 0, lg: 'inherit'}}>
          <SimpleGrid columns={{base: 1, md: 2, xl: 3}} gap={{base: 4, xl: 6}}>
            {
              week2 && week2.map((day, i) => (
                <DayBlock key={i} day={day} />
              ))
            }
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}


export const DayBlock = ({ day }) => {
  const { dates, title, strapline, description, extra } = day
  return (
    <Box className="time-block"
      sx={{
        flex: {
          base: '0 0 48%', xl: '0 0 32%'
        },
        W: { base: '48%', xl: '32%' }
      }}
    >
      <Box d="flex" flexFlow="column wrap">
        <Text as="span" className="fest-dates">
          <span>{dates}</span>
        </Text>
        <Text as="h4" className="gradient2" my={0}>
          <span>{title}</span>
        </Text>
      </Box>
      <Text fontSize={{ base: "2.6vmin", md: "1vmax", '2xl': "1vmax" }} fontWeight={700} mb={1}>{strapline}</Text>
      <Text>{description}</Text>
      {!extra && <Text>{extra}</Text>}
    </Box>
  )
}
