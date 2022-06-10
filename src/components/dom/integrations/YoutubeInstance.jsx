import React, { useContext, useEffect, useState } from 'react'


function YoutubeInstance ({ roomData }) {
  const [youtubeRoom, setYoutubeRoom] = useState('UC6gdZ6Q7Fwfvn-Uu4QKDyhg')

  // useEffect(() => {
  //   if (space.indexOf('stage') > -1) {
  //     setYoutubeRoom('hvH17490YkY')
  //   } else {
  //     setYoutubeRoom('hvH17490YkY')
  //   }
  //   return console.log(youtubeRoom)
  // }, [space, youtubeRoom])
  return (
    <iframe
      title='Youtube Livestream'
      width='100%'
      height='100%'
      src={`https://www.youtube.com/embed/live_stream?channel=${youtubeRoom}`}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  )
}

export default YoutubeInstance
