import { type Session } from 'next-auth'
import { type ReactElement, type ReactNode } from 'react'

import Layout from '../../src/components/DashboardLayout'
import SessionProvider from '../../src/components/SessionProvider'

interface Props {
  children: ReactNode
  session?: Session
}

export default function DashboardLayout({
  children,
  session,
}: Props): ReactElement {
  return (
    <SessionProvider session={session}>
      <Layout>{children}</Layout>
    </SessionProvider>
  )
}
