import { ApolloProvider } from '@apollo/client'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import { useSession } from 'next-auth/react'
import { type ReactElement, type ReactNode } from 'react'

import ThemeProvider from '../../theme'
import useApolloClient from '../../utils/useApolloClient'

interface Props {
  children: ReactNode
  emotionCache: EmotionCache
}

export default function AppProvider({
  children,
  emotionCache,
}: Props): ReactElement {
  const { data } = useSession()
  const apolloClient = useApolloClient(data?.user.apiToken)

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider>{children}</ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}
