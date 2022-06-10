import React, { useRef, useState } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Link, Text } from "@chakra-ui/react";

import { useOnScreen } from "@/utils/hooks";
import YoutubeInstance from "@mfdom/integrations/YoutubeInstance";


export function LivestreamSection() {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const [open, setOpen] = useState(false);

  const toggleStream = () => {
    setOpen(!open);
    if (typeof window !== "undefined") {
      const body = document.querySelector("body");
      body.classList.toggle("stream-open");
    }
  };

  return (
    <Box
      as="section"
      id="livestream"
      justifyContent={{ base: "flex-end", lg: "inherit" }}
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
