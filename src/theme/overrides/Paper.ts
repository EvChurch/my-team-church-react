import { type Components, type Theme } from '@mui/material/styles'

export default function Paper(_theme: Theme): Pick<Components, 'MuiPaper'> {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  }
}
