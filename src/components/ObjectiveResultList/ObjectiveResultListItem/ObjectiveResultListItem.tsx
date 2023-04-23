import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import { Card, CardContent, Link, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { type ReactElement } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../gql'
import Avatar from '../../Avatar'
import CircularProgressWithLabel from '../../CircularProgressWithLabel/CircularProgressWithLabel'
import ProgressLabel from '../../ProgressLabel/ProgressLabel'

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
    percentage
    progress
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
                  <Typography variant="body2">
                    {result.contact.title}
                  </Typography>
                </Stack>
                {result.dueAt != null && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayRoundedIcon sx={{ width: 20, height: 20 }} />
                    <Typography variant="body2">
                      {dayjs(result.dueAt).format('MMM D')}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignSelf="center"
              alignItems="center"
              spacing={2}
            >
              <CircularProgressWithLabel value={result.percentage} />
              <ProgressLabel value={result.progress} />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
