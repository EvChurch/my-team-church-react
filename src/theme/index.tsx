import { CssBaseline } from '@mui/material'
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
  type ThemeOptions,
  createTheme,
} from '@mui/material/styles'
import { type ReactElement, type ReactNode, useMemo } from 'react'

import customShadows, { type CustomShadows } from './customShadows'
import GlobalStyles from './globalStyles'
import componentsOverride from './overrides'
import palette from './palette'
import shadows from './shadows'
import typography from './typography'

interface Props {
  children: ReactNode
}

declare module '@mui/material/styles' {
  interface ThemeOptions {
    customShadows?: CustomShadows
  }
  interface Theme {
    customShadows: CustomShadows
  }
}

export default function ThemeProvider({ children }: Props): ReactElement {
  const themeOptions = useMemo(
    (): ThemeOptions => ({
      palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}
