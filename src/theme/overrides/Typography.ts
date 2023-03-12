import { type Components, type Theme } from '@mui/material/styles'

export default function Typography(
  theme: Theme
): Pick<Components, 'MuiTypography'> {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  }
}
