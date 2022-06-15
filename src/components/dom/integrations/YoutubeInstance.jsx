import React, { useContext, useEffect, useState } from 'react'


function YoutubeInstance () {
  const [youtubeRoom, setYoutubeRoom] = useState('XCRh2p13mbM')


  return (
    <iframe
      title='Youtube Livestream'
      width='100%'
      height='100%'
      src={`https://www.youtube.com/embed/${youtubeRoom}`}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  )
}

export default YoutubeInstance