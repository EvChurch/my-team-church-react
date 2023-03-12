import { type ReactNode, useMemo, type ReactElement } from 'react'
import { CssBaseline } from '@mui/material'
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
  type ThemeOptions,
} from '@mui/material/styles'
import palette from './palette'
import shadows from './shadows'
import typography from './typography'
import GlobalStyles from './globalStyles'
import customShadows, { type CustomShadows } from './customShadows'
import componentsOverride from './overrides'

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
