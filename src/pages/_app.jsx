// import "module-alias/register";
import "@/styles/App.css";
import React, { useEffect, useRef, useState } from 'react'

import { CSSReset, ChakraProvider, extendTheme, useBreakpointValue } from "@chakra-ui/react";
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import partition from '@/helpers/partition'
import useStore from '@/helpers/store'
import { useIsMac } from "@/utils/hooks";
import { HeadComponent } from "@mfdom/HeadComponent";
import Dom from '@mflayout/dom'


const theme = extendTheme({
  styles: {
    global: {
      html: {
        bg: "linear-gradient(0deg, rgba(41,2,80,1) 0%, rgba(25,0,50,1) 40%)",
        scrollBehavior: "smooth",
      },
      body: {
        bg: "linear-gradient(0deg, rgba(41,2,80,1) 0%, rgba(25,0,50,1) 40%)",
        color: "#ffeded",
        fontFamily: '"Exo 2", sans-serif',
        fontSize: "16px",
        fontWeight: 400,
        p: 0,
        m: '0 auto',
        minH: "100vh",
        width: '100%',
        // overflowY: "auto",
        'canvas': {
          display: 'block',
          '&.off': {
            display: 'none'
          }
        },
        '.loading-canvas': {
          '.dom-loader': {
            opacity: 1,
            zIndex: 4000,
          }
        },
        '.dom-loader': {
          position: 'fixed',
          opacity: 0,
          top: 0,
          left: 0,
          zIndex: -200,
          transition: 'all 0.5s ease'
        }
      },
      // "body *": {
      //   outline: "1px solid red",
      // },
      // '#root': {
      //   width: '100%',
      // },
      a: {
        color: "#FF61E6",
        textDecoration: "none",
        transition: "color 0.2s ease",
        _hover: {
          color: "#76EBF2",
          textDecoration: "none",
        },
        "&.chakra-link": {
          color: "#FF61E6",
          _hover: {
            color: "#76EBF2",
            textDecoration: "none",
          },
        },
        "&.livestreamLink": {
          color: "#FF61E6",
          position: "relative",
          "&--live": {
            "&:after": {
              content: "'Streaming now...'",
              position: 'absolute',
              top: 0,
              right: 0,
              color: "#FF61E6",
              fontSize: "xs",
              transform: 'translateY(-10px)',
              width: '200px',
              textAlign: 'right',
            }
          }
        }
      },
      h1: {
        color: "#fff",
        fontSize: "4vmax",
        fontWeight: 700,
        "& span": {
          color: "#fff",
          fontSize: "4vmax",
          fontWeight: 700,
        },
        '& + .fest-dates': {
          fontWeight: 700,
          justifyContent: "right",
          opacity: 1,
          transform: {
            base: "translateY(5px)",
            lg: "translateY(9px)",
            "2xl": "translateY(10px)",
          },
        }
      },
      h2: {
        color: "#fff",
        fontSize: "4vmax",
        fontweight: 500,
        textShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
      },
      h3: {
        fontSize: { base: "4vmin", md: "1.5vmax" },
        fontWeight: 700,
        mt: { base: 2, md: 5 },
        "& + p": {
          fontSize: { base: "2.8vmin", md: "1.1vmax", '2xl': "1vmax" },
          lineHeight: { base: "1.2", md: "inherit" },
          fontWeight: 700,
          mt: 0,
          mb: 1,
        },
      },
      h4: {
        fontSize: { base: "3vmin", md: "1.1vmax", '2xl': "1vmax" },
        fontWeight: 700,
      },
      p: {
        fontSize: { base: "2.6vmin", md: '1vmax', '2xl': ".8vmax" },
        textShadow: "0 0 5px rgba(0, 0, 0, 0.6)",
      },
      button: {
        '&.ghost': {
          color: '#fff'
        },

      },
      section: {
        position: "relative",
        display: 'flex',
        // display: 'none',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        alignItems: "center",
        height: '100vh',
        w: '100vw',
        m: 0,
        py: 0,
        px: { base: 4, lg: '10%' },
        zIndex: 2000,
      },
      ".__content__body": {
        "& > p:first-of-type": {
          fontSize: { base: "2.6vmin", md: "1vmax" },
          fontWeight: 500,
        },
        "&--no-firstof": {
          p: {
            fontSize: { base: "2.6vmin", md: "0.9vmax" },
            fontWeight: 500,
            "& + p": {
              fontWeight: 400,
            },
          },
        },
      },
      // Gradients
      ".gradient": {
        display: "inline-block",
        background: "linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textFillColor: "transparent",
        textShadow: 'unset',
        filter: "drop-shadow(0 0 5px rgba(0,0,0,0.6))",
      },
      ".gradient2": {
        display: "inline-block",
        background:
          "linear-gradient(90.24deg, #79F8FB 0.3%, #9032E6 55.76%, #E839B7 106.78%)",
        backgroundPosition: "center",
        backgroundSize: "100%",
        backgroundClip: "text",
        textFillColor: "transparent",
        WebkitTextFillColor: "transparent",
        textShadow: 'unset',
        filter: "drop-shadow(0 0 5px rgba(0,0,0,0.6))",
      },
      ".gradient-cone": {
        display: "inline-block",
        background:
          "conic-gradient(from 92.2deg at 60.45% 74.83%, #8EBBFF 0deg, #DE3FFF 88.12deg, #79F8FB 105deg, #7C56FF 165deg, #FF61E6 251.25deg, #927CFF 286.87deg, #76EBF2 326.25deg, #8EBBFF 360deg)",
        backgroundPosition: "-254%",
        backgroundSize: "100%",
        backgroundClip: "text",
        textFillColor: "transparent",
        WebkitTextFillColor: "transparent",
        transition: "background 0.3s ease",
        textShadow: 'unset',
        filter: "drop-shadow(0 0 5px rgba(0,0,0,0.6))",
      },
      ".highlight": {},
      ".fest-dates": {
        d: "inline-flex",
        width: "100%",
        color: "#FF61E6",
        fontSize: { base: "2.2vmin", md: "0.8vmax", '2xl': "0.7vmax" },
        fontWeight: 500,
        justifyContent: "left",
        opacity: 0.8,
        pr: 0.5,
        transform: {
          base: "translateY(7px)",
          lg: "translateY(9px)",
          "2xl": "translateY(8px)",
        },
        zIndex: 2001,
        '& > span': {
          bg: 'rgba(25,0,50,1)',
          backdropFilter: 'blur(7px)',
          borderRadius: 'md',
          display: 'block',
          mb: 1,
          py: 0.5,
          px: 1,
          width: 'auto',
        }
      },

    },
  },
});

const LCanvas = dynamic(() => import('../components/layout/canvas'), {
  ssr: false,
})

function Balance({ child }) {
  const [r3f, dom] = partition(child, (c) => c.props.r3f === true);
  const mobile = useBreakpointValue({ base: true, lg: false });
  const macOS = useIsMac();

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas isMobile={mobile} >{r3f}</LCanvas>
    </>
  )
}

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()
  const { os } = useStore();
  const curURL = useRef(null);
  const host = curURL ?? curURL.current;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getHostname = () => {
        if (typeof window !== "undefined") {
          curURL.current = window.location.origin;
          console.log('HOST: ', host.current);
          return host;
        }
      };

      getHostname();
    }
  }, [curURL, host]);


  useEffect(() => {
    useStore.setState({ router })
    if (typeof window !== "undefined") {
      useStore.setState({
        os: navigator.userAgent.toUpperCase() ?? null
      })

    }
  }, [os, router])

  const child = Component(pageProps).props.children

  return (
    <>
      <CSSReset />
      <ChakraProvider theme={theme}>
        <HeadComponent />
        <Balance child={child} />
      </ChakraProvider>
    </>
  )
}

export default App

