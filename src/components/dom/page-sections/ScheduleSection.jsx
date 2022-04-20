import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { CalendarIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import CalendarInstance from "@/components/dom/integrations/CalendarInstance";
import { useDisabledMobileNotify, useOnScreen } from "@/utils/hooks";

import ScheduleIcon from '@/static/assets/img/icons/events.svg';


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
            colorScheme="ghost"
            onClick={() => setOpenCal(!openCal)}
            alignSelf="center"
            filter="drop-shadow(0 0 15px #FF61E6)"
          />
          <Text flex="1 0 100%" width="100%" alignSelf="flex-end" justifySelf="flex-start" fontWeight={500}>
            Our community members are busy rn, booking guests &amp; organising
            workshops. <br /> Watch this space
            <Text as="span" className="gradient2">
              ...it&apos;s gonna blow your mind!
            </Text>
          </Text>
        </Box>

        <Box className="__content__body">

          <Box
            d="flex"
            alignContent="flex-start"
            justifyContent="space-between"
            flexFlow="row wrap"
            w="100%"
          >
            {timeBlocks.map((block, i) => <DayBlock key={`dayBlock-${i}`} block={block} />)}
          </Box>
          <Box mt={5}>
            <Text>
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
              </a>
            </Text>
            <Text>jk jk just enter!</Text>
            <Button
              d={{ md: "none" }}
              colorScheme="pink"
              bg="#FF61E6"
              size={"sm"}
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
              href="https://calendar.google.com/calendar/embed?src=9lieknu5pnes1l51ej6n2916u0%40group.calendar.google.com&amp;ctz=Europe%2FLondon"
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
              Need more Calendar? Open it up in a new tab. <ExternalLinkIcon />
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
};


export const DayBlock = ({ block }) => {
  const { dates, title, strapline, description, extra } = block
  return (
    <Box className="time-block"
      sx={{
        'h3 + p': {
          fontSize: { base: "2.6vmin", md: "1vmax" },
        },
        flex: {
          base: '0 0 50%', xl: '0 0 32%'
        },
        W: { base: '50%', xl: '32%' }
      }}
    >
      <Box d="inline-block">
        <Text as="span" className="fest-dates">
          <span>{dates}</span>
        </Text>
        <Text as="h3" className="gradient2" my={0}>
          <span>{title}</span>
        </Text>
      </Box>
      <Text fontSize={{ base: "2.6vmin", md: "1vmax" }} fontWeight={500}>{strapline}</Text>
      <Text>{description}</Text>
      {!extra && <Text>{extra}</Text>}
    </Box>
  )
}

const timeBlocks = [
  {
    dates: 'Thursday June 9th',
    title: 'Opening Ceremonies!',
    strapline: 'Get ready for a jam-packed 2 weeks! 55+ plus speakers, panels, workshops, and more...',
    description: 'Welcome to MetaFest2!  Let’s break the ice with some social games and fun.  Time to start the festivities.  Game-on!',
    extra: `If you missed out last year, I can feel your <span className="gradient">FOMO</span> from here!!`
  },
  {
    dates: 'Friday-Saturday June 10th-11th',
    title: 'Tooling Days',
    strapline: 'How do you stay organized and productive?',
    description: 'Two days of an open toolbox. Learn useful Web3, DAO, organizational dApps often from the creators.',
    extra: `If you missed out last year, I can feel your <span className="gradient">FOMO</span> from here!!`
  },
  {
    dates: 'Sunday-Monday June 12th-13th',
    title: 'Metaverse Days',
    strapline: 'Whoa, the MetaVerse, what’s that?',
    description: 'There’s a lot happening in the MetaVerse.  MetaGamers have a presence in Neos, Cryptovoxels, Atlantis World, Decentraland, Aavegotchi Gotchiverse, and more.  Come join us and see what we’ve been building!  Learn some new skills to start playing in your MetaVerse of choice.  It may be a new trend word, but we’ve been digging in for than a year. :)',
    extra: `If you missed out last year, I can feel your <span className="gradient">FOMO</span> from here!!`
  },
  {
    dates: 'Tuesday-Friday June 14th-17th',
    title: 'MetaAlliance and Regen Days',
    strapline: 'Speakers! Panels! Workshops!',
    description: 'Learn about the guilds and embassies in our greater ecosystem!  MetaAlliance is a partnership of DAOs and projects, together building the new Web3 future.  Regen Days will cover new regenerative projects, ReFi, and more.  We will take a look into what on-the-ground expansion of Web3 looks like.',
    extra: `If you missed out last year, I can feel your <span className="gradient">FOMO</span> from here!!`
  },
  {
    dates: 'Saturday June 18th',
    title: 'Tooling Follow-up Presentations',
    strapline: 'Well I got this shiny new toolbox, now what?',
    description: 'Need some extra pointers on how to swing that hammer or run that decentralized workflow space?  Get the gritty details on how to use your growing toolbox.',
    extra: `If you missed out last year, I can feel your <span className="gradient">FOMO</span> from here!!`
  },
  {
    dates: 'Sunday June 19th',
    title: 'Sunday Funday: Live Concerts & Entertainment',
    strapline: 'All work and no play, makes Nova swim in circles.',
    description: 'Sunday Funday is our weekend day of play and entertainment.  Join us for live events in MetaVerse worlds, games, possible Poaps, and more!',
    extra: `If you missed out last year, I can feel your <span className="gradient">FOMO</span> from here!!`
  },
  {
    dates: 'Monday June 20th',
    title: 'DeFi Day',
    strapline: 'We know, we could do a whole Fest on just DeFi.  But look at how much we’ve stacked in one day!',
    description: 'All things Decentralized Finance.  Are you a full-on deGen?  Just dabbling?  Learn tips and tricks straight from the creators of DeFi platforms.',
    extra: `If you missed out last year, I can feel your <span className="gradient">FOMO</span> from here!!`
  },
  {
    dates: 'Tuesday-Wednesday June 21st-22nd',
    title: 'Job Fair and Meta-Days',
    strapline: 'So, how do I start working in a DAO?',
    description: 'Join us for the DAO JobFair!  Meet other DAOs that are part of our MetaAlliance and more!  Learn how to get started now.  Add your unique contributions and join the new web3 workforce.  Welcome.',
    extra: `If you missed out last year, I can feel your <span className="gradient">FOMO</span> from here!!`
  },
  {
    dates: 'Thursday June 23rd',
    title: 'Closing Ceremonies and Awards',
    strapline: 'Well that was fun!  Can we stay here forever??',
    description: 'Whoa, so much was covered.  How do we wrap this up?  Awards!  You get an Oprah nft, you get a Octo, you get the point.  If you came for the Poap, don’t miss this day.',
    extra: `If you missed out last year, I can feel your <span className="gradient">FOMO</span> from here!!`
  },
]
