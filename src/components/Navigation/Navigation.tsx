import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import {
  Box,
  Divider,
  Drawer,
  List,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { type Theme, styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { type ReactElement, useEffect } from 'react'

import Avatar from '../Avatar'
import Logo from '../Logo'
import Scrollbar from '../Scrollbar'

import NavigationItem from './NavigationItem'

const NAV_WIDTH = 280

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3.5),
}))

interface Props {
  openNav?: boolean
  onCloseNav?: () => void
}

export default function Navigation({
  openNav,
  onCloseNav,
}: Props): ReactElement {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const { pathname } = useRouter()
  const { data } = useSession()

  useEffect(() => {
    if (openNav === true) {
      onCloseNav?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>
      <Box>
        <List disablePadding sx={{ p: 1 }} component="nav">
          <NavigationItem
            title="Dashboard"
            href="/"
            icon={<InsightsRoundedIcon />}
          />
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <StyledAccount>
        <Avatar src={data?.user.avatar ?? undefined} title={data?.user.title} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {data?.user.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {data?.user.email}
          </Typography>
        </Box>
      </StyledAccount>
    </Scrollbar>
  )

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  )
}
