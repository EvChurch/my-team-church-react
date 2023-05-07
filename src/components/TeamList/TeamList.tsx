import { useQuery } from '@apollo/client'
import { TabContext, TabList } from '@mui/lab'
import { Box, Card, CardContent, Divider, Stack, Tab } from '@mui/material'
import { compact, startCase, uniq } from 'lodash'
import { type ReactElement, type SyntheticEvent, useState } from 'react'

import { graphql } from '../../gql'
import { Status, type TeamsQuery } from '../../gql/graphql'

import TeamListItem from './TeamListItem'

const TeamsQueryDocument = graphql(`
  query Teams($status: Status) {
    teams(status: $status) {
      nodes {
        id
        title
        status
        definition
        ...TeamListItemTeamFragment
      }
    }
  }
`)

interface Props {
  status?: Status
}

export default function TeamList({
  status = Status.Active,
}: Props): ReactElement {
  const { data, loading } = useQuery<TeamsQuery>(TeamsQueryDocument, {
    variables: { status },
    notifyOnNetworkStatusChange: true,
  })

  const definitions = uniq(
    compact(data?.teams.nodes).map(({ definition }) => definition)
  ).sort((a, b) => a.localeCompare(b))

  const [definition, setDefinition] = useState<string>('')

  const handleChange = (_event: SyntheticEvent, newValue: string): void => {
    setDefinition(newValue)
  }
  return (
    <Card>
      <Stack direction="row">
        <Box flexGrow={1}>
          <TabContext value={definition}>
            <TabList onChange={handleChange} aria-label="team tabs">
              <Tab label="All" value="" />
              {definitions.map((definition) => (
                <Tab
                  label={startCase(definition)}
                  value={definition}
                  key={definition}
                />
              ))}
            </TabList>
          </TabContext>
        </Box>
      </Stack>
      <Divider />
      {loading && (
        <CardContent sx={{ textAlign: 'center' }}>Loading...</CardContent>
      )}
      {!loading &&
        data?.teams.nodes != null &&
        data?.teams.nodes?.length === 0 && (
          <CardContent sx={{ textAlign: 'center' }}>
            There are no teams in the current view.
          </CardContent>
        )}
      {!loading &&
        data?.teams.nodes != null &&
        data?.teams.nodes?.length > 0 && (
          <Stack spacing={{ xs: 0, sm: 2 }} p={{ xs: 0, sm: 2 }}>
            {compact(data?.teams.nodes)
              .filter(
                ({ definition: teamDefinition }) =>
                  definition === '' || definition === teamDefinition
              )
              .map((team, index) => (
                <TeamListItem
                  key={team.id}
                  team={team}
                  divider={(data?.teams.nodes?.length ?? 0) - 1 !== index}
                />
              ))}
          </Stack>
        )}
    </Card>
  )
}
