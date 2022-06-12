import React, { useContext, useEffect, useState } from 'react'


function SpeakerCardInstance ({ roomData }) {

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
      title='Current event'
      width='100%'
      height='100%'
      src={`https://mf2speakers.sites.247420.xyz/`}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
    />
  )
}

export default SpeakerCardInstance
