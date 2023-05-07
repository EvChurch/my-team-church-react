import { useMutation } from '@apollo/client'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import {
  Box,
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
import dayjs from 'dayjs'
import { type MouseEvent, type ReactElement, useState } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../gql'
import { type ObjectiveDeleteMutation } from '../../../gql/graphql'
import Avatar from '../../Avatar'
import CircularProgressWithLabel from '../../CircularProgressWithLabel'
import ObjectiveDialog from '../../ObjectiveDialog'
import ProgressLabel from '../../ProgressLabel'

const ObjectiveListItemObjectiveFragment = graphql(`
  fragment ObjectiveListItemObjectiveFragment on Objective {
    contact {
      id
      avatar
      title
    }
    createdAt
    dueAt
    id
    status
    title
    updatedAt
    percentage
    progress
  }
`)

const ObjectiveDeleteMutationDocument = graphql(`
  mutation ObjectiveDelete($id: ID!) {
    objectiveDelete(input: { id: $id }) {
      id
    }
  }
`)

interface Props {
  objective: FragmentType<typeof ObjectiveListItemObjectiveFragment>
  refetch?: () => void
  divider?: boolean
}

export default function ObjectiveListItem({
  objective: refObjective,
  refetch,
  divider,
}: Props): ReactElement {
  const [open, setOpen] = useState(false)
  const objective = useFragment(
    ObjectiveListItemObjectiveFragment,
    refObjective
  )
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchorEl)
  function handleMenuClick(event: MouseEvent<HTMLElement>): void {
    setMenuAnchorEl(event.currentTarget)
  }
  function handleMenuClose(): void {
    setMenuAnchorEl(null)
  }
  const [objectiveDelete] = useMutation<ObjectiveDeleteMutation>(
    ObjectiveDeleteMutationDocument,
    {
      variables: { id: objective.id },
    }
  )

  return (
    <>
      <ObjectiveDialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        id={objective.id}
      />
      <Card sx={{ display: { xs: 'none', sm: 'block' } }}>
        <CardContent>
          <Stack direction="row">
            <Stack flexGrow={1}>
              <Typography sx={{ fontWeight: 'bold' }} gutterBottom>
                <Link
                  onClick={() => {
                    setOpen(true)
                  }}
                  color="textPrimary"
                  underline="none"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {objective.title}
                </Link>
              </Typography>
              <Stack spacing={2} direction="row">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    src={objective.contact.avatar ?? undefined}
                    title={objective.contact.title}
                    sx={{ width: 20, height: 20, fontSize: '1rem' }}
                  />
                  <Typography variant="body2">
                    {objective.contact.title}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarTodayRoundedIcon sx={{ width: 20, height: 20 }} />
                  <Typography variant="body2">
                    {dayjs(objective.dueAt).format('MMM D')}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignSelf="center"
              alignItems="center"
              spacing={2}
            >
              <CircularProgressWithLabel value={objective.percentage} />
              <ProgressLabel value={objective.progress} />
              <Box display="flex" alignItems="center">
                <IconButton
                  aria-label="more"
                  id={`${objective.id}-menu-button`}
                  aria-controls={menuOpen ? `${objective.id}-menu` : undefined}
                  aria-expanded={menuOpen ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                >
                  <MoreVertRoundedIcon />
                </IconButton>
              </Box>
            </Stack>
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
          <ProgressLabel value={objective.progress} noText />
          <Typography sx={{ fontWeight: 'bold', flex: 1 }} noWrap>
            <Link
              onClick={() => {
                setOpen(true)
              }}
              color="textPrimary"
              underline="none"
              sx={{
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {objective.title}
            </Link>
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton
              aria-label="more"
              id={`${objective.id}-menu-button`}
              aria-controls={menuOpen ? `${objective.id}-menu` : undefined}
              aria-expanded={menuOpen ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVertRoundedIcon />
            </IconButton>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            src={objective.contact.avatar ?? undefined}
            title={objective.contact.title}
            sx={{ width: 20, height: 20, fontSize: '1rem' }}
          />
          <Typography variant="body2">{objective.contact.title}</Typography>
          <CalendarTodayRoundedIcon sx={{ width: 20, height: 20 }} />
          <Typography variant="body2">
            {dayjs(objective.dueAt).format('MMM D')}
          </Typography>
          <ShowChartRoundedIcon
            htmlColor="rgb(5 169 244)"
            sx={{ width: 20, height: 20 }}
          />
          <Typography variant="body2">
            {`${Math.round(objective.percentage ?? 0)}%`}
          </Typography>
        </Stack>
      </Box>
      {divider === true && (
        <Divider sx={{ display: { xs: 'block', sm: 'none' } }} />
      )}
      <Menu
        id={`${objective.id}-menu`}
        MenuListProps={{
          'aria-labelledby': `${objective.id}-menu-button`,
          dense: true,
        }}
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            setOpen(true)
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <VisibilityRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleMenuClose()
            void objectiveDelete({
              onCompleted() {
                refetch?.()
              },
            })
          }}
        >
          <ListItemIcon>
            <DeleteRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
