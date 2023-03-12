import { Container, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { type ReactElement } from 'react'

export default function Dashboard(): ReactElement {
  const { data } = useSession()
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
      <Typography variant="h4" sx={{ mb: 5 }}>
        {greeting}, {data?.user.firstName}
      </Typography>
    </Container>
  )
}
