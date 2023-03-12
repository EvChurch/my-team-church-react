import { type Components, type Theme } from '@mui/material/styles'

export default function Table(theme: Theme): Pick<Components, 'MuiTableCell'> {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  }
}
