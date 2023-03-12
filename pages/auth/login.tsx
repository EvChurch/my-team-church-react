import { NextSeo } from 'next-seo'
import { type ReactElement } from 'react'

import Login from '../../src/components/Login'

export default function LoginPage(): ReactElement {
  return (
    <>
      <NextSeo title="Login" />
      <Login />
    </>
  )
}
