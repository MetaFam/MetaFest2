import React, {useEffect, useState} from 'react';

import { Box, Flex, Tooltip, keyframes } from '@chakra-ui/react';


const calUrl = "https://www.googleapis.com/calendar/v3/calendars/85ftetvc3cdl0qop7a36iguacc@group.calendar.google.com/events?key=AIzaSyDo07MSotIB3Q4ETlx_7yxVUB2YKU3MySs";
export const StatusIndicator = ({ text }) => {
  const activeColor = 'green.500';
  const inactiveColor = 'gray.400';
  const ringScaleMin = 0.33;
  const ringScaleMax = 0.66;
  const nowTime = new Date();
  const dayStartTime = new Date('14:00:00', 'UTC+0');
  const dayEndTime = new Date('21:00:00', 'UTC+0');
  const [streaming, setStreaming] = useState(!!(dayStartTime <= nowTime || dayEndTime >= nowTime));
  // console.log('streaming', streaming);
  // try {
  //   const res = await axios.get(`${calUrl}&amp;timeMin=${dayStartTime.toISOString()}&amp;timeMax=${dayEndTime.toISOString()}`)

  //   const speakers = res.data.items.filter((item, i) => {
  //     const itemDate = new Date(item.start.dateTime);
  //     if (itemDate > nowTime) {
  //       if (item.status === 'confirmed' && !item.summary.includes('FREE') && item.description !== undefined) {
  //         // if (!item.description.includes('<html-blob>')) {
  //         console.log('item', item.description);
  //         return item
  //       }
  //       // }
  //     }
  //   });
  //   return speakers.length ? speakers : [];
  // } catch (error) {
  //   console.log('error fetching calendar', error);
  // }

  const pulseRing = keyframes`
	0% {
    transform: scale(${ringScaleMin});
  }
	30% {
		transform: scale(${ringScaleMax});
	},
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

  const pulseDot = keyframes`
	0% {
    transform: scale(0.9);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.9);
  }
	`;

  return (

      <Tooltip label={streaming ? `Status: Active` : `Status: Inactive`} textTransform="capitalize">
        <Box
          as="div"
          h="24px"
          w="24px"
          position="absolute"
          bgColor={activeColor}
          borderRadius="50%"
          _before={{
            content: "''",
            position: 'relative',
            display: 'block',
            width: '300%',
            height: '300%',
            boxSizing: 'border-box',
            marginLeft: '-100%',
            marginTop: '-100%',
            borderRadius: '50%',
            bgColor: streaming ? activeColor : inactiveColor,
            animation: streaming ? `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite` : 'none',
          }}
          _after={{
            animation: streaming ? `2.25s ${pulseDot} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite` : 'none',
          }}
        />
      </Tooltip>
  );
}