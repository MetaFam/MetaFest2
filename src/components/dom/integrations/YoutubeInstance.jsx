import React, { useContext, useEffect, useState } from 'react'


function YoutubeInstance () {
  const [youtubeRoom, setYoutubeRoom] = useState('UC6gdZ6Q7Fwfvn-Uu4QKDyhg')


  return (
    <iframe
      title='Youtube Livestream'
      width='100%'
      height='100%'
      src={`https://www.youtube.com/embed/live_stream?channel=${youtubeRoom}&amp;autoplay=1`}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  )
}

export default YoutubeInstance
