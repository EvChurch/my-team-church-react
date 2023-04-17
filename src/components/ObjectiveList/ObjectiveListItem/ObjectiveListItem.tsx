import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import { Card, CardContent, Link, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { type ReactElement, useState } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../gql'
import Avatar from '../../Avatar'
import ObjectiveDialog from '../../ObjectiveDialog'

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
          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 'bold' }}>
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
                  type="contact"
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
        </CardContent>
      </Card>
    </>
  )
}
