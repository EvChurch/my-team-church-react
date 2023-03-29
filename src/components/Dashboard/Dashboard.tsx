import { useQuery } from '@apollo/client'
import { Container, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { type ReactElement } from 'react'

import { graphql } from '../../gql'
import { type MeQuery } from '../../gql/graphql'
import TeamList from '../TeamList'

const MeQueryDocument = graphql(`
  query Me {
    me {
      id
      teams {
        ...TeamListTeamFragment
      }
    }
  }
`)

export default function Dashboard(): ReactElement {
  const { data: session } = useSession()
  const { data } = useQuery<MeQuery>(MeQueryDocument)
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
      {data?.me.teams != null && <TeamList teams={data.me.teams} />}
    </Container>
  )
}