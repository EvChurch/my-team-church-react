import { Login } from '../../src/components/Login'
import { NextSeo } from 'next-seo'
import { type ReactElement } from 'react'

export default function LoginPage(): ReactElement {
  return (
    <>
      <NextSeo title="Login" />
      <Login />
    </>
  )
}
