import { useCallback, useEffect, useRef , useState } from 'react'
import {
  Box,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import useStore, {getFromLS, localStore, saveToLS} from '@/helpers/store'
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
  const macOS = useIsMac();
  const [canvasOn, setCanvasOn] = useState(!macOS)
  const { on } = localStore.get('MF2Effects') || { on: canvasOn };

  const [uiOn, setUiOn] = useState(true);

  const toggleUI = () => {
    if (typeof window !== 'undefined') {
      const ui = document.querySelectorAll('.ui')
      const content = document.querySelectorAll('section')
      if (!canvasOn) return;
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
    
  }

  const toggleCanvas = useCallback(() => {
    if (macOS || !uiOn) return
    setCanvasOn(!canvasOn)
    gracefulDegradation(canvasOn)
    localStore.set('MF2Effects', { on: !canvasOn })
  }, [canvasOn, macOS, uiOn])

  useEffect(() => {
    if(!on && !macOS ) {
      setCanvasOn(on)
      gracefulDegradation(!on)
    } else if(!macOS) {
        setCanvasOn(on)
        gracefulDegradation(!on)
      }
  }, [on, canvasOn, macOS, toggleCanvas]);

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
          isDisabled={macOS || !canvasOn}
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
          onClick={() => toggleCanvas()}
          isDisabled={macOS || !uiOn}
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
  const homeBg = `/assets/img/home-bg${mob}.jpg`
  const scheduleBg = `/assets/img/schedule-bg${mob}.jpg`
  const workshopsBg = `/assets/img/workshops-bg${mob}.jpg`
  const speakersBg = `/assets/img/speakers-bg${mob}.jpg`
  const metaverseBg = `/assets/img/metaverse-bg${mob}.jpg`
  const chatBg = `/assets/img/chat-bg${mob}.jpg`
  const applyBg = `/assets/img/apply-bg${mob}.jpg`


  if (typeof window !== 'undefined') {
    const content = document.querySelectorAll('section')
    const canvas = document.querySelector('canvas')
    if (isOn) {
      console.log('degrading features');
      if (content && content.length > 0) {
        content.forEach((item, i) => {
          switch (i) {
            case 0:
              item.style.backgroundImage = `url(${homeBg})`
              break;
            case 1:
              item.style.backgroundImage = `url(${scheduleBg}) `
              break;
            case 2:
              item.style.backgroundImage = `url(${workshopsBg}) `
              break;
            case 3:
              item.style.backgroundImage = `url(${speakersBg}) `
              break;
            case 4:
              item.style.backgroundImage = `url(${metaverseBg})`
              break;
            case 5:
              item.style.backgroundImage = `url(${chatBg})`
              break;
            case 6:
              item.style.backgroundImage = `url(${applyBg})`
            default:
              item.style.backgroundImage = `url(${homeBg})`
              break;
          }
        });
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