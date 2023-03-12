import { type Components, type Theme, alpha } from '@mui/material/styles'

export default function Backdrop(
  theme: Theme
): Pick<Components, 'MuiBackdrop'> {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[800], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  }
}
