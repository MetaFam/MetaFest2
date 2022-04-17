import Instructions from '@/components/dom/Instructions'
import {
  ApplySection,
} from "@/components/dom/page-sections";
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})
const NomadVox = dynamic(() => import('@/components/canvas/Nomad'), {
  ssr: false,
})
const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    <ApplySection />
  )
}

const R3F = () => {
  return (
    <>
      <NomadVox route='/' />
      {/* <Box route='/' /> */}
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Box',
    },
  }
}
