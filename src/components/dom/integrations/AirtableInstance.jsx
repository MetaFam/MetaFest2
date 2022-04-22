import React, { Suspense } from 'react'
import { Box } from '@chakra-ui/react'
import Script from 'next/script'

import { DOMLoader } from '@/components/dom/Loader'

export function AirtableSpeakerInstance () {
  return (
    <Suspense fallback={<DOMLoader />}>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
      <iframe title="Apply to MetaFest2 as a speaker" className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrisi7iurIB56wNu?backgroundColor=blue" frameBorder="0" onmousewheel="" width="100%" height="3185" style={{background: 'transparent', border: '0'}}></iframe>
    </Suspense>
  )
}

export function AirtableContributorInstance () {
  return (
    <Suspense fallback={<DOMLoader />}>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
      <iframe title="Apply to MetaFest2 as a contributor" className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrIOyCiJ7QfGMt7Z?backgroundColor=blue" frameBorder="0" onmousewheel="" width="100%" height="3185" style={{background: 'transparent', border: '0'}}></iframe>
      </Suspense>
  )
}

export function AirtablePerformerInstance () {
  return (
    <Suspense fallback={<DOMLoader />}>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
      <iframe title="Apply to MetaFest2 as a performer" className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrfobHN1ngXRZ3EQ?backgroundColor=blue" frameBorder="0" onmousewheel="" width="100%" height="3185" style={{background: 'transparent', border: '0'}}></iframe>
      </Suspense>
  )
}
export function AirtableSponsorInstance () {
  return (
    <Suspense fallback={<DOMLoader />}>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></Script>
      <iframe title="Sponsor MetaFest2" className="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shr2kuLumbj9Wnka8?backgroundColor=blue" frameBorder="0" onmousewheel="" width="100%" height="3185" style={{background: 'transparent', border: '0'}}></iframe>
      </Suspense>
  )
}

export function AirtableFairInstance () {
  return (
    <Suspense fallback={<DOMLoader />}>
      <iframe title="MetaFest2 JobFair info" src="https://docs.google.com/document/d/e/2PACX-1vQav5MOP2EOE9NrnpP2AepGfsBl6VsDalt30JyDGaNGAEEaQgwzx7mgjF4nB_h18dKa-5frZDcYOkL7/pub?embedded=true" frameBorder="0" onmousewheel="" width="100%" height="100%" style={{background: 'transparent', border: '0', marginLeft: 'auto', marginRight: 'auto'}}></iframe>
      </Suspense>
  )
}

