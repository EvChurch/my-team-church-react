import { type Components, type Theme } from '@mui/material/styles'

export default function Autocomplete(
  theme: Theme
): Pick<Components, 'MuiAutocomplete'> {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  }
}
