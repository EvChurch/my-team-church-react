import { Box, Card, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { type ReactElement } from 'react'

import plan from '../../../public/images/illustrations/illustration_6.svg'
import ObjectiveList from '../ObjectiveList'
import TeamList from '../TeamList'

export default function Dashboard(): ReactElement {
  const { data: session } = useSession()
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
      <Card sx={{ backgroundColor: 'primary.main' }}>
        <Stack direction={{ sx: 'column', sm: 'row' }}>
          <Box flex={1} p={2} pl={3}>
            <Typography variant="h2" color="white">
              {greeting}, {session?.user.firstName}.
            </Typography>
            <Typography variant="h3" color="white">
              Welcome back to My Team.
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'relative',
              width: { xs: 'auto', sm: 400 },
              height: { xs: 200, sm: 300 },
            }}
          >
            <Image alt="Plan" src={plan} fill />
          </Box>
        </Stack>
      </Card>
      <Typography variant="h4" sx={{ pt: 5, pb: 2 }}>
        My Goals
      </Typography>
      <ObjectiveList />
      <Typography variant="h4" sx={{ pt: 5, pb: 2 }}>
        My Teams
      </Typography>
      <TeamList />
    </Container>
  )
}
