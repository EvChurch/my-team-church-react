'use client'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { type ReactElement, type ReactNode } from 'react'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'
import 'dayjs/locale/en-nz'

import ThemeProvider from '../../theme'

interface Props {
  children: ReactNode
}

export default function AppProvider({ children }: Props): ReactElement {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-nz">
      <NextAppDirEmotionCacheProvider options={{ key: 'css', prepend: true }}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </LocalizationProvider>
  )
}
