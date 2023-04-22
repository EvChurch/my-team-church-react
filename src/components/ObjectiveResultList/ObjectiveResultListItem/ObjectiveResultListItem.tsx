import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import { Card, CardContent, Link, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { type ReactElement } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../gql'
import Avatar from '../../Avatar'

const ObjectiveResultListItemObjectiveResultFragment = graphql(`
  fragment ObjectiveResultListItemObjectiveResultFragment on ObjectiveResult {
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
  result: FragmentType<typeof ObjectiveResultListItemObjectiveResultFragment>
}

export default function ObjectiveResultListItem({
  result: refResult,
}: Props): ReactElement {
  const result = useFragment(
    ObjectiveResultListItemObjectiveResultFragment,
    refResult
  )

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 'bold' }}>
              <Link
                color="textPrimary"
                underline="none"
                sx={{ cursor: 'pointer' }}
              >
                {result.title}
              </Link>
            </Typography>
            <Stack spacing={2} direction="row">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  src={result.contact.avatar ?? undefined}
                  title={result.contact.title}
                  type="contact"
                  sx={{ width: 20, height: 20, fontSize: '1rem' }}
                />
                <Typography variant="body2">{result.contact.title}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarTodayRoundedIcon sx={{ width: 20, height: 20 }} />
                <Typography variant="body2">
                  {dayjs(result.dueAt).format('MMM D')}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
