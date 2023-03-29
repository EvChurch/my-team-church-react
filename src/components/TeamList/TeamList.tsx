import { Box, Grid, Typography } from '@mui/material'
import { startCase } from 'lodash'
import { type ReactElement } from 'react'

import { type FragmentType, graphql, useFragment } from '../../gql'
import { Status } from '../../gql/graphql'

import TeamListItem from './TeamListItem'

const TeamListTeamFragment = graphql(`
  fragment TeamListTeamFragment on Team {
    id
    title
    status
    definition
    ...TeamListItemTeamFragment
  }
`)

interface Props {
  teams: Array<FragmentType<typeof TeamListTeamFragment>>
  status?: Status
}

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key]
}

export default function TeamList({
  teams: refTeams,
  status = Status.Active,
}: Props): ReactElement {
  const teams = useFragment(TeamListTeamFragment, refTeams)
  const sortedTeams = teams
    .filter((team) => team.status === status)
    .sort((a, b) => {
      const titleA = `${a.definition.toUpperCase()} ${a.title.toUpperCase()}`
      const titleB = `${b.definition.toUpperCase()} ${b.title.toUpperCase()}`
      if (titleA < titleB) return -1
      if (titleA > titleB) return 1
      return 0
    })
  const teamsByDefinition = sortedTeams.reduce<
    Record<string, Mutable<typeof teams>>
  >((result, team) => {
    if (result[team.definition] == null) result[team.definition] = []
    result[team.definition].push(team)
    return result
  }, {})

  return (
    <>
      {Object.entries(teamsByDefinition).map(([definition, teams]) => (
        <Box key={definition}>
          <Typography variant="h4" sx={{ pt: 5, pb: 2 }}>
            My {startCase(definition)}s
          </Typography>
          <Grid container spacing={2}>
            {teams.map((team) => (
              <Grid item key={team.id} xs={12} sm={6} md={4}>
                <TeamListItem team={team} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  )
}
