import { Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { type ReactElement, useState } from 'react'

import Header from '../src/components/Header'
import Navigation from '../src/components/Navigation'

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
})

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

export default function Home(): ReactElement {
  const [open, setOpen] = useState(false)
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
    <>
      <NextSeo title="Dashboard" />
      <StyledRoot>
        <Header
          onOpenNav={() => {
            setOpen(true)
          }}
        />

        <Navigation
          openNav={open}
          onCloseNav={() => {
            setOpen(false)
          }}
        />

        <Main>
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
              {greeting}, {data?.user.firstName}
            </Typography>
          </Container>
        </Main>
      </StyledRoot>
    </>
  )
}
