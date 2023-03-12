import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import createEmotionCache from '../src/utils/createEmotionCache'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import ThemeProvider from '../src/theme'
import { IBM_Plex_Sans } from 'next/font/google'
import { DefaultSeo } from 'next-seo'
import { type ReactElement } from 'react'

const clientSideEmotionCache = createEmotionCache()
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export type MyAppProps = {
  emotionCache?: EmotionCache
} & AppProps

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps): ReactElement {
  return (
    <>
      <DefaultSeo defaultTitle="My Team" titleTemplate="%s | My Team" />
      <main className={ibmPlexSans.className}>
        <SessionProvider session={session}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </SessionProvider>
      </main>
    </>
  )
}
