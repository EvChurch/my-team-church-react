import { useQuery } from '@apollo/client'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
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
} from '@mui/material'
import { compact } from 'lodash'
import { type ReactElement, type SyntheticEvent, useState } from 'react'

import { graphql } from '../../gql'
import { type ObjectivesQuery, Status } from '../../gql/graphql'
import ObjectiveCreateDialog from '../ObjectiveCreateDialog'

import ObjectiveListItem from './ObjectiveListItem'

const ObjectivesQueryDocument = graphql(`
  query Objectives($teamId: ID, $status: Status) {
    objectives(teamId: $teamId, status: $status) {
      nodes {
        id
        ...ObjectiveListItemObjectiveFragment
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
  const { data, loading, refetch } = useQuery<ObjectivesQuery>(
    ObjectivesQueryDocument,
    {
      variables: { teamId, status },
      notifyOnNetworkStatusChange: true,
    }
  )

  const handleChange = (_event: SyntheticEvent, newValue: Status): void => {
    setStatus(newValue)
  }
  const [open, setOpen] = useState(false)

  return (
    <>
      <ObjectiveCreateDialog
        teamId={teamId}
        contactId={data?.me?.contacts?.[0]?.id}
        open={open}
        onClose={(id) => {
          if (id != null) {
            void refetch()
          }
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
              Start contributing by adding an{' '}
              <Link
                onClick={() => {
                  setOpen(true)
                }}
                sx={{ cursor: 'pointer' }}
              >
                Objective
              </Link>
              .
            </CardContent>
          )}
        {!loading &&
          data?.objectives.nodes != null &&
          data?.objectives.nodes?.length > 0 && (
            <Stack spacing={2} p={2}>
              {compact(data?.objectives.nodes).map((objective) => (
                <ObjectiveListItem key={objective.id} objective={objective} />
              ))}
            </Stack>
          )}
      </Card>
    </>
  )
}
