import useStore from '@/helpers/store'
import { useEffect, useRef, useState } from 'react'
import {
  Box,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaToggleOn, FaToggleOff } from 'react-icons/fa'
import { useIsMac } from "@/utils/hooks";
import { SiteHeader } from "@/components/dom/Header";
import { SiteFooter } from "@/components/dom/Footer";
import { AlphaNotice } from '@/components/dom/AlphaNotice';
import { EasterEgg } from '@/components/dom/EasterEgg';
import { EasterEggGlitch } from '@/components/dom/EasterEggGlitch';

const Dom = ({ children }) => {
  const ref = useRef(null)
  const macOS = useIsMac();

  useEffect(() => {
    if (macOS) {
      gracefulDegradation(macOS)
      useStore.setState({ dom: ref })
    } else {
      useStore.setState({ dom: ref })
    }
  }, [macOS])

  return (
    <Box
      ref={ref}
      sx={{
        scrollSnapType: { base: "y proximity", md: "unset" },
        d: 'block',
        position: "relative",
        width: '100%',
        height: 'auto',
        overflowX: "hidden",
        zIndex: 2,
        m: 0,
        p: 0,
        section: {
          scrollSnapAlign: { base: "start", lg: 'unset' },
          scrollSnapStop: { base: "smooth", lg: 'unset' },
        },
      }}
    >
      <SiteHeader />
      {children}
      <SiteFooter />
      <UIToggles />
      <AlphaNotice  />
      <EasterEgg />
      <EasterEggGlitch />
    </Box>
  )
}

export default Dom

export const UIToggles = () => {
  const [uiOn, setUiOn] = useState(true);
  const macOS = useIsMac();
  const [canvasOn, setCanvasOn] = useState(macOS ? false : true)
  const { dom } = useStore()

  const toggleUI = () => {
    if (typeof window !== 'undefined') {
      const ui = document.querySelectorAll('.ui')
      const content = document.querySelectorAll('section')
      ui.forEach((item, i) => {
        item.style.transition = 'transform 0.3s 0.1s ease, opacity 0.3s 0.2s'
        // console.log(item);
        if (uiOn) {
          item.style.opacity = 0
        } else {
          item.style.opacity = 1
        }
      })
      content.forEach((item, i) => {
        item.style.transition = 'opacity 0.3s 0.4s ease'
        // console.log(item);
        if (uiOn) {
          item.style.opacity = 0
        } else {
          item.style.opacity = 1
        }
      })
      setUiOn(!uiOn)
    }
    return
  }

  const toggleCanvas = () => {
    if(macOS) return
    setCanvasOn(!canvasOn)
    gracefulDegradation(canvasOn)
  }


  return (
    <HStack fontSize={{ base: '3vw', lg: '0.7vw' }} fontWeight={500} position="fixed" bottom={5} right={{ base: 3, lg: 5 }} opacity={0.5} transition="opacity 0.3s ease" zIndex={3000} _hover={{
      opacity: 1
    }}>
      <VStack spacing={0}>
        <IconButton
          icon={uiOn ? <FaToggleOn /> : <FaToggleOff />}
          aria-label="Toggle UI"
          flex={0}
          fontSize={{ base: '12vmin', lg: "2vmax" }}
          colorScheme="ghost"
          color={uiOn ? "#FF61E6" : "#7C56FF"}
          alignSelf="center"
          onClick={toggleUI}
          isDisabled={macOS}
        />
        <Text as="span">UI</Text>
      </VStack>
      <VStack spacing={0}>
        <IconButton
          icon={canvasOn && !macOS ? <FaToggleOn /> : <FaToggleOff />}
          aria-label="Toggle Effects"
          flex={0}
          fontSize={{ base: '12vmin', lg: "2vmax" }}
          colorScheme="ghost"
          color={canvasOn && !macOS ? "#FF61E6" : "#7C56FF"}
          alignSelf="center"
          onClick={toggleCanvas}
          isDisabled={macOS}
        />
        <Text as="span">Effects</Text>
      </VStack>
    </HStack>
  )
}

/**
 * MacOS has an issue with performance related to various aspects of ThreeJS/WebGL.
 * I *think* using `useMemo` for the particles in Galaxy.jsx would be more performant.
 *  */
export const gracefulDegradation = (isOn) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const mob = isMobile ? '-mob' : ''
  const homeBg = `assets/img/home-bg${mob}.jpg`
  const scheduleBg = `assets/img/schedule-bg${mob}.jpg`
  const workshopsBg = `assets/img/workshops-bg${mob}.jpg`
  const speakersBg = `assets/img/speakers-bg${mob}.jpg`
  const metaverseBg = `assets/img/metaverse-bg${mob}.jpg`
  const chatBg = `assets/img/chat-bg${mob}.jpg`
  const applyBg = `assets/img/apply-bg${mob}.jpg`


  if (typeof window !== 'undefined') {
    const content = document.querySelectorAll('section')
    const canvas = document.querySelector('canvas')
    if (isOn) {
      console.log('degrading features');
      if (content) {
        content[0].style.backgroundImage = `url(${homeBg})`
        content[1].style.backgroundImage = `url(${scheduleBg}) `
        content[2].style.backgroundImage = `url(${workshopsBg}) `
        content[3].style.backgroundImage = `url(${speakersBg}) `
        content[4].style.backgroundImage = `url(${metaverseBg})`
        content[5].style.backgroundImage = `url(${chatBg})`
        content[6].style.backgroundImage = `url(${applyBg})`
      }

      if (canvas) {
        canvas.style.display = 'none'
      }

    } else {
      if (content) {
        content.forEach(item => {
          item.style.backgroundImage = `unset`
        })
      }
      if (canvas) {
        canvas.style.display = 'block'
      }
    }

  }
}