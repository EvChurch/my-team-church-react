import { NextSeo } from 'next-seo'
import { type ReactElement, type ReactNode } from 'react'

import Home from '../src/components/Home'

export default function HomePage(): ReactElement {
  return (
    <>
      <NextSeo title="Home" />
      <Home />
    </>
  )
}

HomePage.getLayout = (page: ReactNode) => page
