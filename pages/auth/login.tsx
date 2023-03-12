import { NextSeo } from 'next-seo'
import { type ReactElement, type ReactNode } from 'react'

import Login from '../../src/components/Login'

export default function LoginPage(): ReactElement {
  return (
    <>
      <NextSeo title="Login" />
      <Login />
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => page
