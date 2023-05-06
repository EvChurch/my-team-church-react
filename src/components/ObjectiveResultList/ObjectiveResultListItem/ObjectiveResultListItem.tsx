import { useMutation } from '@apollo/client'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded'
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import {
  Box,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { type MouseEvent, type ReactElement, useState } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../gql'
import {
  type ObjectiveResultDeleteMutation,
  ObjectiveResultKind,
} from '../../../gql/graphql'
import Avatar from '../../Avatar'
import CircularProgressWithLabel from '../../CircularProgressWithLabel/CircularProgressWithLabel'
import ObjectiveActivityCreateDialog from '../../ObjectiveActivityCreateDialog/ObjectiveActivityCreateDialog'
import ProgressLabel from '../../ProgressLabel/ProgressLabel'

const ObjectiveResultListItemObjectiveResultFragment = graphql(`
  fragment ObjectiveResultListItemObjectiveResultFragment on ObjectiveResult {
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
    kind
    objective {
      id
    }
    ...ObjectiveActivityCreateDialogResultFragment
  }
`)

const ObjectiveResultDeleteMutationDocument = graphql(`
  mutation ObjectiveResultDelete($id: ID!) {
    objectiveResultDelete(input: { id: $id }) {
      id
    }
  }
`)

interface Props {
  result: FragmentType<typeof ObjectiveResultListItemObjectiveResultFragment>
  refetch?: () => void
}

export default function ObjectiveResultListItem({
  result: refResult,
  refetch,
}: Props): ReactElement {
  const [open, setOpen] = useState(false)
  const result = useFragment(
    ObjectiveResultListItemObjectiveResultFragment,
    refResult
  )
  const { data } = useSession()
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchorEl)
  function handleMenuClick(event: MouseEvent<HTMLElement>): void {
    setMenuAnchorEl(event.currentTarget)
  }
  function handleMenuClose(): void {
    setMenuAnchorEl(null)
  }
  const [objectiveResultDelete] = useMutation<ObjectiveResultDeleteMutation>(
    ObjectiveResultDeleteMutationDocument,
    { variables: { id: result.id } }
  )

  return (
    <>
      <ObjectiveActivityCreateDialog
        open={open}
        objectiveId={result.objective.id}
        contactId={data?.user.contacts[0].id ?? ''}
        onClose={() => {
          setOpen(false)
        }}
        result={result}
      />
      <Stack direction="row" alignItems="center" spacing={2}>
        {result.kind === ObjectiveResultKind.KeyResult && (
          <Tooltip title="Key Result">
            <ShowChartRoundedIcon htmlColor="rgb(5 169 244)" />
          </Tooltip>
        )}
        {result.kind === ObjectiveResultKind.Initiative && (
          <Tooltip title="Initiative">
            <PlaylistAddCheckRoundedIcon htmlColor="rgb(55 213 146)" />
          </Tooltip>
        )}
        <Avatar
          src={result.contact.avatar ?? undefined}
          title={result.contact.title}
          sx={{ width: 30, height: 30, fontSize: '1rem' }}
        />
        <Typography sx={{ fontWeight: 'bold', flexGrow: 1 }} noWrap>
          <Link
            color="textPrimary"
            underline="none"
            sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
          >
            {result.title}
          </Link>
        </Typography>
        <CircularProgressWithLabel value={result.percentage} />
        <ProgressLabel
          value={result.progress}
          labelProps={{ display: { xs: 'none', sm: 'block' } }}
        />
        <IconButton
          onClick={() => {
            setOpen(true)
          }}
        >
          <PostAddRoundedIcon />
        </IconButton>
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="more"
            id={`${result.id}-menu-button`}
            aria-controls={menuOpen ? `${result.id}-menu` : undefined}
            aria-expanded={menuOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreVertRoundedIcon />
          </IconButton>
        </Box>
        <Menu
          id={`${result.id}-menu`}
          MenuListProps={{
            'aria-labelledby': `${result.id}-menu-button`,
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
              <PostAddRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Update Progress</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleMenuClose()
              void objectiveResultDelete({
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
      </Stack>
    </>
  )
}
