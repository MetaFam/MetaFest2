import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import {
  Box,
} from "@chakra-ui/react";
import {SiteHeader} from "@/components/dom/Header";
import { SiteFooter } from "@/components/dom/Footer";
import { AlphaNotice } from '@/components/dom/AlphaNotice';
import { EasterEgg } from '@/components/dom/EasterEgg';

const Dom = ({ children }) => {
  const ref = useRef(null)
  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])

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
          scrollSnapAlign: { base: "start" },
          scrollSnapStop: { base: "smooth" },
        },
      }}
    >
      <SiteHeader />
      {children}
      <SiteFooter />
      <AlphaNotice />
      <EasterEgg />
    </Box>
  )
}

export default Dom
