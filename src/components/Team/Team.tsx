import { useQuery } from '@apollo/client'
import { Container, Typography } from '@mui/material'
import { type ReactElement } from 'react'

import { graphql } from '../../gql'
import { type TeamQuery } from '../../gql/graphql'

const TeamQueryDocument = graphql(`
  query Team($id: ID!) {
    team(id: $id) {
      id
      title
    }
  }
`)

interface Props {
  id: string
}

export default function Team({ id }: Props): ReactElement {
  const { data } = useQuery<TeamQuery>(TeamQueryDocument, { variables: { id } })

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" sx={{ mb: 5 }}>
        {data?.team.title}
      </Typography>
    </Container>
  )
}
