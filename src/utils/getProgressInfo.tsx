import { type SvgIconComponent } from '@mui/icons-material'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded'

import { Progress } from '../gql/graphql'

export default function getProgressInfo(progress: Progress): {
  label: string
  color: string
  Icon: SvgIconComponent
} {
  let label: string, color: string
  let Icon = CircleRoundedIcon
  switch (progress) {
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
  return { label, color, Icon }
}
