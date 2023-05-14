import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import {
  Chip,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
} from '@mui/material'
import { compact } from 'lodash'
import { type ReactElement, useState } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../../gql'
import ProgressLabel from '../../../ProgressLabel'

import AssignmentListItem from './AssignmentListItem'

const TeamPositionListItemTeamPositionFragment = graphql(`
  fragment TeamPositionListItemPositionFragment on Position {
    assignmentsCount
    assignments {
      nodes {
        id
        ...TeamPositionListItemAssignmentListItemAssignmentFragment
      }
    }
    createdAt
    exclude
    id
    progress
    remoteId
    requiredAssignmentsCount
    reporter
    slug
    title
    updatedAt
  }
`)

interface Props {
  position: FragmentType<typeof TeamPositionListItemTeamPositionFragment>
  divider?: boolean
}

export default function PositionListItem({
  position: refPosition,
  divider,
}: Props): ReactElement {
  const position = useFragment(
    TeamPositionListItemTeamPositionFragment,
    refPosition
  )
  const [open, setOpen] = useState(position.assignmentsCount <= 2)

  function handleClick(): void {
    setOpen(!open)
  }

  return (
    <>
      <ListItem
        secondaryAction={
          position.assignmentsCount > 0 && (
            <IconButton edge="end" aria-label="expand" onClick={handleClick}>
              {open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            </IconButton>
          )
        }
      >
        <ListItemText
          primary={position.title}
          secondary={`${position.assignmentsCount} assigned`}
        />
        <Stack direction="row" spacing={1}>
          {position.requiredAssignmentsCount - position.assignmentsCount >
            0 && (
            <Tooltip title="current / required">
              <Chip
                label={`${position.assignmentsCount} / ${position.requiredAssignmentsCount}`}
                icon={<ErrorOutlineRoundedIcon />}
                color="warning"
              />
            </Tooltip>
          )}
          <ProgressLabel value={position.progress} />
        </Stack>
      </ListItem>
      {position.assignmentsCount > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense>
            {compact(position.assignments.nodes).map((assignment) => (
              <AssignmentListItem key={assignment.id} assignment={assignment} />
            ))}
          </List>
        </Collapse>
      )}
      {divider === true && <Divider />}
    </>
  )
}
