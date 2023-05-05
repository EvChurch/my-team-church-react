import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import { Card, CardContent, Link, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { type ReactElement, useState } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../gql'
import Avatar from '../../Avatar'
import CircularProgressWithLabel from '../../CircularProgressWithLabel'
import ObjectiveDialog from '../../ObjectiveDialog'
import ProgressLabel from '../../ProgressLabel'

const ObjectiveListItemObjectiveFragment = graphql(`
  fragment ObjectiveListItemObjectiveFragment on Objective {
    contact {
      id
      avatar
      title
    }
    createdAt
    dueAt
    id
    status
    title
    updatedAt
    percentage
    progress
  }
`)

interface Props {
  objective: FragmentType<typeof ObjectiveListItemObjectiveFragment>
}

export default function ObjectiveListItem({
  objective: refObjective,
}: Props): ReactElement {
  const [open, setOpen] = useState(false)
  const objective = useFragment(
    ObjectiveListItemObjectiveFragment,
    refObjective
  )

  return (
    <>
      <ObjectiveDialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        id={objective.id}
      />
      <Card>
        <CardContent>
          <Stack direction="row">
            <Stack flexGrow={1}>
              <Typography sx={{ fontWeight: 'bold' }} gutterBottom>
                <Link
                  onClick={() => {
                    setOpen(true)
                  }}
                  color="textPrimary"
                  underline="none"
                  sx={{ cursor: 'pointer' }}
                >
                  {objective.title}
                </Link>
              </Typography>
              <Stack spacing={2} direction="row">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    src={objective.contact.avatar ?? undefined}
                    title={objective.contact.title}
                    sx={{ width: 20, height: 20, fontSize: '1rem' }}
                  />
                  <Typography variant="body2">
                    {objective.contact.title}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarTodayRoundedIcon sx={{ width: 20, height: 20 }} />
                  <Typography variant="body2">
                    {dayjs(objective.dueAt).format('MMM D')}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignSelf="center"
              alignItems="center"
              spacing={2}
            >
              <CircularProgressWithLabel value={objective.percentage} />
              <ProgressLabel value={objective.progress} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
