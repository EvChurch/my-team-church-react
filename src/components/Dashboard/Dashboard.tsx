'use client'

import { useQuery } from '@apollo/client'
import { Container, Typography } from '@mui/material'
import { compact } from 'lodash'
import { useSession } from 'next-auth/react'
import { type ReactElement } from 'react'

import { graphql } from '../../gql'
import { Status, type TeamsQuery } from '../../gql/graphql'
import ObjectiveList from '../ObjectiveList'
import TeamList from '../TeamList'

const TeamsQueryDocument = graphql(`
  query Teams {
    teams {
      nodes {
        ...TeamListTeamFragment
      }
    }
  }
`)

export default function Dashboard(): ReactElement {
  const { data: session } = useSession()
  const { data } = useQuery<TeamsQuery>(TeamsQueryDocument)
  const curHr = new Date().getHours()
  let greeting

  if (curHr < 12) {
    greeting = 'Good morning'
  } else if (curHr < 18) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Good evening'
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" sx={{ mb: 5 }}>
        {greeting}, {session?.user.firstName}
      </Typography>

      <Typography variant="h4" sx={{ pt: 5, pb: 2 }}>
        My Goals
      </Typography>
      <ObjectiveList status={Status.Active} />

      {data?.teams.nodes != null && (
        <TeamList teams={compact(data.teams.nodes)} />
      )}
    </Container>
  )
}
