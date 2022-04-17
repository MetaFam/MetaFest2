import React, { Suspense } from 'react'
import { Box } from '@chakra-ui/react'
import Script from 'next/script'
export function AirtableSpeakerInstance () {
  return (
    <Suspense fallback={<Loader />}>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
      <iframe title="Apply to MetaFest2 as a speaker" className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrisi7iurIB56wNu?backgroundColor=blue" frameBorder="0" onmousewheel="" width="100%" height="3185" style={{background: 'transparent', border: '0'}}></iframe>
    </Suspense>
  )
}

export function AirtableContributorInstance () {
  return (
    <Suspense fallback={<Loader />}>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
      <iframe title="Apply to MetaFest2 as a contributor" className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrIOyCiJ7QfGMt7Z?backgroundColor=blue" frameBorder="0" onmousewheel="" width="100%" height="3185" style={{background: 'transparent', border: '0'}}></iframe>
      </Suspense>
  )
}

export function AirtablePerformerInstance () {
  return (
    <Suspense fallback={<Loader />}>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
      <iframe title="Apply to MetaFest2 as a performer" className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrfobHN1ngXRZ3EQ?backgroundColor=blue" frameBorder="0" onmousewheel="" width="100%" height="3185" style={{background: 'transparent', border: '0'}}></iframe>
      </Suspense>
  )
}

export function AirtableSponsorInstance () {
  return (
    <Suspense fallback={<Loader />}>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
      <iframe title="Sponsor MetaFest2" className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shr2kuLumbj9Wnka8?backgroundColor=blue" frameBorder="0" onmousewheel="" width="100%" height="3185" style={{background: 'transparent', border: '0'}}></iframe>
      </Suspense>
  )
}

export const Loader = () => {
  return <Box position="absolute" top={0} left={0} width="100vw" height="100vh" d="flex" alignContent="center" textAlign="center">Loading...</Box>;
};