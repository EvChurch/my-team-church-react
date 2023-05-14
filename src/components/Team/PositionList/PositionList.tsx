import { useQuery } from '@apollo/client'
import { Card, CardContent, List } from '@mui/material'
import { compact } from 'lodash'
import { type ReactElement } from 'react'

import { graphql } from '../../../gql'
import { type TeamPositionsQuery } from '../../../gql/graphql'

import PositionListItem from './PositionListItem'

const TeamPositionsQueryDocument = graphql(`
  query TeamPositions($teamId: ID!) {
    positions: teamPositions(teamId: $teamId) {
      nodes {
        id
        ...TeamPositionListItemPositionFragment
      }
    }
  }
`)

interface Props {
  teamId: string
}

export default function PositionList({ teamId }: Props): ReactElement {
  const { data, loading } = useQuery<TeamPositionsQuery>(
    TeamPositionsQueryDocument,
    {
      variables: { teamId },
      notifyOnNetworkStatusChange: true,
    }
  )

  return (
    <>
      <Card>
        {loading && (
          <CardContent sx={{ textAlign: 'center' }}>Loading...</CardContent>
        )}
        {!loading &&
          data?.positions.nodes != null &&
          data?.positions.nodes?.length === 0 && (
            <CardContent sx={{ textAlign: 'center' }}>
              There are no positions in the current team.
            </CardContent>
          )}
        {!loading &&
          data?.positions.nodes != null &&
          data?.positions.nodes?.length > 0 && (
            <CardContent>
              <List dense>
                {compact(data?.positions.nodes).map((position, index) => (
                  <PositionListItem
                    key={position.id}
                    position={position}
                    divider={(data?.positions.nodes?.length ?? 0) - 1 !== index}
                  />
                ))}
              </List>
            </CardContent>
          )}
      </Card>
    </>
  )
}
