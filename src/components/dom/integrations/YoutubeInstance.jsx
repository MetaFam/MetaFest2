import React, { useEffect, useState } from 'react'

import {useBreakpointValue} from '@chakra-ui/react'

function YoutubeInstance () {
  const [youtubeRoom] = useState('UC6gdZ6Q7Fwfvn-Uu4QKDyhg')
  const mobile = useBreakpointValue({base: true, lg: false})


  return (
    <iframe
      title='Youtube Livestream'
      width={!mobile ? '100%' : '365px'}
      height={!mobile ? '100%' : '536px'}
      src={`https://www.youtube.com/embed/live_stream?channel=${youtubeRoom}&amp;autoplay=1`}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  )
}

export default YoutubeInstance