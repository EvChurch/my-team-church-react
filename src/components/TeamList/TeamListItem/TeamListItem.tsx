import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import NextLink from 'next/link'
import { type MouseEvent, type ReactElement, useState } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../gql'

const TeamListItemTeamFragment = graphql(`
  fragment TeamListItemTeamFragment on Team {
    id
    title
    slug
    contacts(first: 4) {
      totalCount
    }
  }
`)

interface Props {
  team: FragmentType<typeof TeamListItemTeamFragment>
  divider?: boolean
}

export default function TeamListItem({
  team: refTeam,
  divider,
}: Props): ReactElement {
  const team = useFragment(TeamListItemTeamFragment, refTeam)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchorEl)
  function handleMenuClick(event: MouseEvent<HTMLElement>): void {
    setMenuAnchorEl(event.currentTarget)
  }
  function handleMenuClose(): void {
    setMenuAnchorEl(null)
  }

  return (
    <>
      <Card sx={{ display: { xs: 'none', sm: 'block' } }}>
        <CardContent>
          <Stack direction="row">
            <Stack flexGrow={1}>
              <Typography sx={{ fontWeight: 'bold' }}>
                <NextLink href={`/teams/${team.slug}`} passHref legacyBehavior>
                  <Link
                    color="textPrimary"
                    underline="none"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {team.title}
                  </Link>
                </NextLink>
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <GroupsRoundedIcon sx={{ width: 20, height: 20 }} />
                <Typography variant="body2">
                  {team.contacts.totalCount} members
                </Typography>
              </Stack>
            </Stack>
            <Box display="flex" alignItems="center">
              <IconButton
                aria-label="more"
                id={`${team.id}-menu-button`}
                aria-controls={menuOpen ? `${team.id}-menu` : undefined}
                aria-expanded={menuOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <MoreVertRoundedIcon />
              </IconButton>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <Box sx={{ display: { xs: 'block', sm: 'none' }, p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ minWidth: 0 }}
          spacing={1}
        >
          <Typography sx={{ fontWeight: 'bold', flex: 1 }} noWrap>
            <NextLink href={`/teams/${team.slug}`} passHref legacyBehavior>
              <Link
                color="textPrimary"
                underline="none"
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {team.title}
              </Link>
            </NextLink>
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton
              aria-label="more"
              id={`${team.id}-menu-button`}
              aria-controls={menuOpen ? `${team.id}-menu` : undefined}
              aria-expanded={menuOpen ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertRoundedIcon />
            </IconButton>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <GroupsRoundedIcon sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">
            {team.contacts.totalCount} members
          </Typography>
        </Stack>
      </Box>
      {divider === true && (
        <Divider sx={{ display: { xs: 'block', sm: 'none' } }} />
      )}
      <Menu
        id={`${team.id}-menu`}
        MenuListProps={{
          'aria-labelledby': `${team.id}-menu-button`,
          dense: true,
        }}
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NextLink href={`/teams/${team.slug}`} passHref legacyBehavior>
          <MenuItem
            onClick={() => {
              handleMenuClose()
            }}
          >
            <ListItemIcon>
              <VisibilityRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
        </NextLink>
      </Menu>
    </>
  )
}
