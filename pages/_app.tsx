import { type EmotionCache } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import { type ReactElement, type ReactNode } from 'react'
import 'dayjs/locale/en-nz'

import AppProvider from '../src/components/AppProvider'
import Layout from '../src/components/Layout'
import createEmotionCache from '../src/utils/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

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
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-nz">
      <SessionProvider session={session}>
        <AppProvider emotionCache={emotionCache}>
          <DefaultSeo defaultTitle="My Team" titleTemplate="%s | My Team" />
          {getLayout(<Component {...pageProps} />)}
        </AppProvider>
      </SessionProvider>
    </LocalizationProvider>
  )
}
