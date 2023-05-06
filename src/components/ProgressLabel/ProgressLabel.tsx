import { Stack, Typography, type TypographyProps } from '@mui/material'
import { type ReactElement } from 'react'

import { Progress } from '../../gql/graphql'
import getProgressInfo from '../../utils/getProgressInfo'

interface Props {
  value?: Progress
  labelProps?: TypographyProps
  noText?: boolean
}

export default function ProgressLabel({
  value = Progress.NoStatus,
  labelProps,
  noText = false,
}: Props): ReactElement {
  const { label, color, Icon } = getProgressInfo(value)

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Icon sx={{ color, height: 20, width: 20 }} />
      {!noText && (
        <Typography variant="body2" noWrap {...labelProps}>
          {label}
        </Typography>
      )}
    </Stack>
  )
}
