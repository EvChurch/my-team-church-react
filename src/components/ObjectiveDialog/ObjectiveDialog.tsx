import { useLazyQuery } from '@apollo/client'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'
import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import dayjs from 'dayjs'
import { type ReactElement, useEffect } from 'react'

import { graphql } from '../../gql'
import { type ObjectiveQuery } from '../../gql/graphql'
import Avatar from '../Avatar'
import CircularProgressWithLabel from '../CircularProgressWithLabel'
import ObjectiveResultList from '../ObjectiveResultList'
import ProgressLabel from '../ProgressLabel/ProgressLabel'
import SlideUp from '../SlideUp'

const ObjectiveQueryDocument = graphql(`
  query Objective($id: ID!) {
    objective(id: $id) {
      contact {
        id
        avatar
        title
      }
      team {
        id
        title
      }
      createdAt
      dueAt
      id
      status
      title
      updatedAt
      progress
      percentage
      ...ObjectiveResultListObjectiveFragment
    }
  }
`)

interface Props {
  open?: boolean
  onClose?: () => void
  id: string
}

export default function ObjectiveDialog({
  open,
  onClose,
  id,
}: Props): ReactElement {
  const [loadObjective, { data }] = useLazyQuery<ObjectiveQuery>(
    ObjectiveQueryDocument
  )
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    if (open === true) {
      void loadObjective({ variables: { id } })
    }
  }, [id, open, loadObjective])

  return (
    <Dialog
      open={open ?? false}
      onClose={() => onClose?.()}
      scroll="paper"
      fullWidth
      fullScreen={smDown}
      maxWidth="md"
      TransitionComponent={smDown ? SlideUp : undefined}
    >
      <Stack
        sx={{ py: 2, px: 3 }}
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <FlagRoundedIcon />
        <Stack flex={1}>
          <Typography variant="h6" noWrap>
            {data?.objective.title}
          </Typography>
          <Typography variant="body2" noWrap>
            {data?.objective.team.title}
          </Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <IconButton aria-label="close" onClick={() => onClose?.()}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent dividers>
        <Stack
          spacing={{ xs: 1, sm: 3 }}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ pb: 2 }}
          flexGrow={1}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={data?.objective.contact.avatar ?? undefined}
              title={data?.objective.contact.title}
              sx={{ width: 20, height: 20, fontSize: '1rem' }}
            />
            <Typography variant="body2" noWrap>
              {data?.objective.contact.title}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
            <CalendarTodayRoundedIcon sx={{ width: 20, height: 20 }} />
            <Typography variant="body2" noWrap>
              {dayjs(data?.objective.dueAt).format('MMM D')}
            </Typography>
          </Stack>
          <CircularProgressWithLabel value={data?.objective.percentage} />
          <ProgressLabel value={data?.objective.progress} />
        </Stack>
        {data?.objective.id != null && (
          <ObjectiveResultList objective={data.objective} />
        )}
      </DialogContent>
    </Dialog>
  )
}
