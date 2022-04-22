import React, { useState } from 'react'
import { Box, Text } from "@chakra-ui/react";
// import TimezonePicker from 'react-timezone'
import styled from '@emotion/styled'

const InstanceContainer = styled.div`
  grid-template-rows: 1fr auto;
  li {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #aaaaaa;
    color: '#310C4FDD';
  }
`

function CalendarInstance () {
  const [timezone, changeTimezone] = useState('Europe/London')
  const [viewTip, setViewTip] = useState(false)

  return (
    <>
      <iframe
        title='MetaFest2: Schedule'
        src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%238E24AA&ctz=UTC&mode=AGENDA&showTabs=0&src=OWxpZWtudTVwbmVzMWw1MWVqNm4yOTE2dTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E`}
        style={{
          minHeight: '500px',
          height: '100%',
          width: '100%',
          border: '0px'
        }}
      />
      <Box
      bg="linear-gradient(90.24deg, #640DFB99 0.3%, rgba(100, 13, 251, 0.9) 80.16%)"
        borderRadius="0 8px 8px 0"
        boxShadow="0 0 5px rgba(0,0,0,0.6)"
        p={2}
        w="auto"
        maxW="200px"
        mt={3}
        textAlign="center">
      <Text sx={{ color: '#fff', fontWeight: 500}}>
        All times are in UTC
      </Text>

      </Box>
      <Box
        bg="linear-gradient(90.24deg, #640DFB99 0.3%, rgba(100, 13, 251, 0.9) 80.16%)"
        borderRadius="0 8px 8px 0"
        boxShadow="0 0 5px rgba(0,0,0,0.6)"
        p={2}
        position="fixed"
        top="12%"
        left={0}
        maxW="225px">
        <Text fontSize="sm" fontWeight={500}>Google fail. Click &#39;Look for more&#39; to view the calendar dates for MetaFest2. <br />We will improve this UX soon <span role="img" aria-label="trademark">™️</span></Text>
      </Box>
      {/* <TimezonePicker
        value={timezone}
        onChange={picktimezone => changeTimezone(picktimezone)}
        inputProps={{
          placeholder: 'Select your Timezone...',
          name: 'picktimezone'
        }}
        style={{
          position: 'relative',
          left: 0,
          marginRight: 'auto',
          width: '70%'
        }}
      /> */}
    </>
  )
}

export default CalendarInstance
