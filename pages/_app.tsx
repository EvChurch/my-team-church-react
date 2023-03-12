import { CacheProvider, type EmotionCache } from '@emotion/react'
import type { AppProps } from 'next/app'
import { IBM_Plex_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import { type ReactElement, type ReactNode } from 'react'

import Layout from '../src/components/Layout'
import ThemeProvider from '../src/theme'
import createEmotionCache from '../src/utils/createEmotionCache'

import 'simplebar-react/dist/simplebar.min.css'

const clientSideEmotionCache = createEmotionCache()
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export interface MyAppProps extends AppProps {
  Component: AppProps['Component'] & {
    getLayout?: (page: ReactNode) => ReactElement
  }
  emotionCache?: EmotionCache
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps): ReactElement {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => <Layout>{page}</Layout>)

  return (
    <>
      <DefaultSeo defaultTitle="My Team" titleTemplate="%s | My Team" />
      <main className={ibmPlexSans.className}>
        <SessionProvider session={session}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider>
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </CacheProvider>
        </SessionProvider>
      </main>
    </>
  )
}
