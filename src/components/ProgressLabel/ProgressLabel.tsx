import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded'
import { Stack, Typography, type TypographyProps } from '@mui/material'
import { type ReactElement } from 'react'

import { Progress } from '../../gql/graphql'

interface Props {
  value?: Progress
  labelProps?: TypographyProps
}

export default function ProgressLabel({
  value = Progress.NoStatus,
  labelProps,
}: Props): ReactElement {
  let label: string, color: string
  let Icon = CircleRoundedIcon
  switch (value) {
    case Progress.Accomplished:
      label = 'accomplished'
      Icon = EmojiEventsRoundedIcon
      color = 'rgb(22 85 58)'
      break
    case Progress.NeedsAttention:
      label = 'needs attention'
      color = 'rgb(255 182 0)'
      break
    case Progress.OffTrack:
      label = 'off track'
      color = 'rgb(255 90 92)'
      break
    case Progress.OnTrack:
      label = 'on track'
      color = 'rgb(55 213 146)'
      break
    case Progress.NoStatus:
      label = 'no status'
      color = 'rgb(221 229 234)'
      break
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Icon sx={{ color, height: 20, width: 20 }} />
      <Typography variant="body2" noWrap {...labelProps}>
        {label}
      </Typography>
    </Stack>
  )
}
