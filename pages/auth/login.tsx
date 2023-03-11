import { Login } from '../../src/components/Login'
import { NextSeo } from 'next-seo'

export default function LoginPage() {
  return (
    <>
      <NextSeo title="Login" />
      <Login />
    </>
  )
}
