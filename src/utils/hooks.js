import { useCallback, useEffect, useRef, useState } from "react";

import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import { DateTime, Duration } from 'luxon';

import useStore from "@mf/helpers/store";


export const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

// TODO: I know this is bad and needs re-factoring.
export const useDisabledGeneralNotify = (type) => {
  const notice = useToast({
    title: "Anon, I can't do that. 🥲",
      description: "We are in alpha rn & some features are disabled while we plug stuff in. Updates will be coming in pretty fast. 🚀 Stay stronk octo.",
    status: "info",
    duration: 8000,
    isClosable: true,
  });
  return notice;
};
export const useDisabledMobileNotify = (type) => {
  const notice = useToast({
    title: "Oh noes! Forgive us, Anon. 🥲",
    description: "We are in alpha rn & some features are disabled on mobile devices while we plug stuff in. You should be able to do it on the desktop version though. 👀 See you there.",
    status: "info",
    duration: 8000,
    isClosable: true,
  });
  return notice;
};

// Tests for Mac users so we can degrade the 3D experience due to Mac/WebGL issues.
export const useIsMac = () => {
  const { os } = useStore();
  if (os) {
    return os.indexOf('MAC') >= 0 ?? false;
  }
  return false;
}

export const useGetSpeakers = async (maxResults) => {
  const today = new Date();
  const aBitEarlierThanNow = new Date(today.getTime() - (0.5 * 60 * 60 * 1000));
  const next2Days = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));
  const calUrl = `https://www.googleapis.com/calendar/v3/calendars/85ftetvc3cdl0qop7a36iguacc@group.calendar.google.com/events?key=AIzaSyDo07MSotIB3Q4ETlx_7yxVUB2YKU3MySs&maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${aBitEarlierThanNow.toISOString()}&timeMax=${next2Days.toISOString()}`;
  const [got, setGot] = useState(false);
  const speakerList = useRef([]);

  const getSpeakers = useCallback(async () => {
    try {
      const res = await axios.get(calUrl)

      const speakers = res.data.items.filter((item, i) => {
        // const itemDate = new Date(item.start.dateTime);
        // if (itemDate > aBitEarlierThanNow && itemDate < next2Days) {
        if (item.status === 'confirmed' && !item.summary.includes('FREE') && item.description !== undefined) {
          // if (!item.description.includes('<html-blob>')) {
          // console.log('item', item.description);
          return item
        }
        // }
        // }
      });
      setGot(true);
      if (speakerList.current) {
        speakerList.current = speakers.length ? speakers : [];
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error fetching calendar', error);
    }
  }, [calUrl]);

  useEffect(() => {
    const resetGot = setInterval(() => {
      setGot(false);
    }, 1000);
    if (!got) {
      getSpeakers();
    }

    return () => {
      clearInterval(resetGot);
    }
  }, [getSpeakers, got]);

  if (speakerList.current.length === 0) {
    return speakerList.current;
  }
  return []
};