import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import {
  Box,
  CircularProgress,
  type CircularProgressProps,
  Stack,
  Typography,
} from '@mui/material'
import { type ReactElement } from 'react'

interface Props extends CircularProgressProps {
  value?: number
}

export default function CircularProgressWithLabel({
  value,
  ...props
}: Props): ReactElement {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: 40,
          height: 40,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            color: 'rgb(221 229 234)',
          }}
          {...props}
        />
        <CircularProgress variant="determinate" value={value} {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(value ?? 0)}%`}</Typography>
        </Box>
      </Box>
      <Stack
        sx={{
          display: { xs: 'flex', sm: 'none' },
        }}
        direction="row"
        spacing={1}
      >
        <ShowChartRoundedIcon
          htmlColor="rgb(5 169 244)"
          sx={{ width: 20, height: 20 }}
        />
        <Typography variant="body2">{`${Math.round(value ?? 0)}%`}</Typography>
      </Stack>
    </>
  )
}
