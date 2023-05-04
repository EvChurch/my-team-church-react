import type { Metadata } from 'next'
import { type ReactElement } from 'react'

import Login from '../../src/components/Login'

export const metadata: Metadata = {
  title: 'Login | MyTeam',
}

export default function LoginPage(): ReactElement {
  return <Login />
}
