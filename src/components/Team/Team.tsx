import { useQuery } from '@apollo/client'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Skeleton, Tab, Typography } from '@mui/material'
import { type ReactElement, type SyntheticEvent, useState } from 'react'

import { graphql } from '../../gql'
import { type TeamQuery } from '../../gql/graphql'
import ObjectiveList from '../ObjectiveList'

import MemberList from './MemberList'
import PositionList from './PositionList'

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
  const { data, loading } = useQuery<TeamQuery>(TeamQueryDocument, {
    variables: { id },
  })
  const [value, setValue] = useState('1')

  const handleChange = (_event: SyntheticEvent, newValue: string): void => {
    setValue(newValue)
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        {loading ? <Skeleton width="40%" /> : data?.team.title}
      </Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="team tabs">
              <Tab label="Goals" value="1" />
              <Tab label="Members" value="2" />
              <Tab label="Positions" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ObjectiveList teamId={id} />
          </TabPanel>
          <TabPanel value="2">
            <MemberList teamId={id} />
          </TabPanel>
          <TabPanel value="3">
            <PositionList teamId={id} />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}
