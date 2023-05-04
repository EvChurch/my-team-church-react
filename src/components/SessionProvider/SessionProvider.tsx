'use client'

import { ApolloProvider } from '@apollo/client'
import { type Session } from 'next-auth'
import {
  SessionProvider as NextAuthSessionProvider,
  useSession,
} from 'next-auth/react'
import { type ReactElement, type ReactNode } from 'react'
import 'dayjs/locale/en-nz'

import useApolloClient from '../../utils/useApolloClient'

interface Props {
  children: ReactNode
  session?: Session
}

export default function SessionProvider({
  children,
  session,
}: Props): ReactElement {
  return (
    <NextAuthSessionProvider session={session}>
      <ApolloClientProvider>{children}</ApolloClientProvider>
    </NextAuthSessionProvider>
  )
}

interface ApolloClientProviderProps {
  children: ReactNode
}

function ApolloClientProvider({
  children,
}: ApolloClientProviderProps): ReactElement {
  const { data } = useSession()
  const apolloClient = useApolloClient(data?.user.apiToken)

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
