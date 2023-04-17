import { useQuery } from '@apollo/client'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import { TabContext, TabList } from '@mui/lab'
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Link,
  Stack,
  Tab,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { compact } from 'lodash'
import { type ReactElement, type SyntheticEvent, useState } from 'react'

import { graphql } from '../../gql'
import { type ObjectivesQuery, Status } from '../../gql/graphql'
import Avatar from '../Avatar/Avatar'
import ObjectiveDialog from '../ObjectiveDialog'

const ObjectivesQueryDocument = graphql(`
  query Objectives($teamId: ID, $status: Status) {
    objectives(teamId: $teamId, status: $status) {
      nodes {
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
    }
    me {
      id
      contacts {
        id
      }
    }
  }
`)

interface Props {
  teamId?: string
  status?: Status
}

export default function ObjectiveList({
  teamId,
  status: initialStatus,
}: Props): ReactElement {
  const [status, setStatus] = useState(initialStatus ?? Status.Active)
  const { data, loading } = useQuery<ObjectivesQuery>(ObjectivesQueryDocument, {
    variables: { teamId, status },
  })

  const handleChange = (_event: SyntheticEvent, newValue: Status): void => {
    setStatus(newValue)
  }
  const [open, setOpen] = useState(false)

  return (
    <>
      <ObjectiveDialog
        teamId={teamId}
        contactId={data?.me?.contacts?.[0]?.id}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      />
      <Card>
        <Stack direction="row">
          <Box flexGrow={1}>
            <TabContext value={status}>
              <TabList onChange={handleChange} aria-label="team tabs">
                <Tab label="Active" value={Status.Active} />
                <Tab label="Draft" value={Status.Draft} />
                <Tab label="Closed" value={Status.Archived} />
              </TabList>
            </TabContext>
          </Box>
          <Box m="4px">
            <IconButton
              onClick={() => {
                setOpen(true)
              }}
            >
              <AddOutlinedIcon />
            </IconButton>
          </Box>
        </Stack>
        <Divider />
        {loading && (
          <CardContent sx={{ textAlign: 'center' }}>Loading...</CardContent>
        )}
        {!loading &&
          data?.objectives.nodes != null &&
          data?.objectives.nodes?.length === 0 && (
            <CardContent sx={{ textAlign: 'center' }}>
              There are no goals in the current view. <br />
              Start contributing by adding an <Link>Objective</Link>.
            </CardContent>
          )}
        {!loading &&
          data?.objectives.nodes != null &&
          data?.objectives.nodes?.length > 0 && (
            <Stack spacing={2} p={2}>
              {compact(data?.objectives.nodes).map((objective) => (
                <Card key={objective.id}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {objective.title}
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
                          <CalendarTodayRoundedIcon
                            sx={{ width: 20, height: 20 }}
                          />
                          <Typography variant="body2">
                            {dayjs(objective.dueAt).format('MMM D')}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
      </Card>
    </>
  )
}
