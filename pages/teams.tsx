import { Container, Typography } from '@mui/material'
import { NextSeo } from 'next-seo'
import { type ReactElement } from 'react'

import TeamList from '../src/components/TeamList'

export default function TeamsPage(): ReactElement {
  return (
    <>
      <NextSeo title="Teams" />
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ pb: 2 }}>
          My Teams
        </Typography>
        <TeamList />
      </Container>
    </>
  )
}
