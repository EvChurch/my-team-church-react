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
        id
        status
        title
        updatedAt
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

  return (
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
          <IconButton>
            <AddOutlinedIcon />
          </IconButton>
        </Box>
      </Stack>
      <Divider />
      {loading && (
        <CardContent sx={{ textAlign: 'center' }}>Loading...</CardContent>
      )}
      {!loading && data?.objectives.nodes?.length === 0 && (
        <CardContent sx={{ textAlign: 'center' }}>
          There are no goals in the current view. <br />
          Start contributing by adding an <Link>Objective</Link>.
        </CardContent>
      )}
      {compact(data?.objectives.nodes).map((objective) => (
        <Card key={objective.id}>{objective.title}</Card>
      ))}
    </Card>
  )
}
