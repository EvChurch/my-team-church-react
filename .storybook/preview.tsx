import { MockedProvider } from '@apollo/client/testing'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Preview } from '@storybook/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import AppProvider from '../src/components/AppProvider'
import createEmotionCache from '../src/utils/createEmotionCache'
import 'dayjs/locale/en-nz'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    apolloClient: {
      MockedProvider,
    },
  },
  decorators: [
    (Story) => {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-nz">
          <SessionProvider>
            <AppProvider emotionCache={createEmotionCache()}>
              <Story />
            </AppProvider>
          </SessionProvider>
        </LocalizationProvider>
      )
    },
  ],
}

export default preview
