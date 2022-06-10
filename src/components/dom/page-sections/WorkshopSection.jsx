import React, { useRef } from "react";

import {
  Box,
  Link,
  Text,
} from "@chakra-ui/react";

import { useOnScreen } from "@mf/utils/hooks";


export const WorkshopsSection = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  return (
    <Box as="section" id="workshops">
      <Box
        ref={ref}
        className="__content"
        maxW={{base: '100%', md: "2xl"}}
        transform={`translate3d(${onScreen ? 0 : "-70px"}, 0, 0)`}
        opacity={onScreen ? 1 : 0}
        transition="transform 0.3s 0.4s ease-in-out, opacity 0.6s 0.5s ease-in"
      >
        <Text as="h2">Workshops</Text>
        <Box className="__content__body">
          <p>Welcome to a week of pretty sweet workshops...</p>
          <Box>
            <Text as="h3" className="gradient2">
              When and What?
            </Text>
            <Text>
              The <Link href="#schedule">Schedule</Link> is packed. The Learn to DAO like a boss, find a new career, fall down Metaverse rabbit holes &amp; even find your soul...
            </Text>
            <Text>
              Head to the <Link href="#schedule">Schedule</Link> for the latest
              info, calendar<sup>*</sup>. <br />Application forms can be found on the <Link href="#apply">Applications page</Link>.
            </Text>
            <Text fontSize="xxs">
              <em>
                <sup>*</sup> All times shown in UTC
              </em>
            </Text>

            <Text as="h3" className="gradient2">
              Where?
            </Text>
            <Text>
              All workshops happen in MetaFest2 Discord{" "}
              <Link href="#chat">#metastage</Link>
              <sup>*</sup>
            </Text>
            <Text fontSize="xxs">
              <em>
                <sup>*</sup> no reservation required. (but you will need to verify you&apos;re not a 🤖)
              </em>
            </Text>

            <Text as="h3" className="gradient2">
              Open Quests / Help Needed!
            </Text>
            <Text>Get involved in the event! Who knows what will come of it?</Text>
            <Text>
              Watch this space for active quests and ways to help out with
              MetaFest2 or just hop into the <Link href="https://discord.gg/g3KnY4sXXP" isExternal>MetaFest2 Discord</Link> and ask how to help - it is a great way to play MetaGame.
            </Text>
            <Text>
              Check the <Link href="#apply">Applications page</Link> for the
              contributors application form and as always, you can {" "}
              <Link href="https://discord.gg/g3KnY4sXXP" isExternal>
                join our Discord</Link>,{" "}
              tag an &apos;@Innkeeper&apos; or &apos;@Octo Facilitator&apos; and see what needs doing.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
