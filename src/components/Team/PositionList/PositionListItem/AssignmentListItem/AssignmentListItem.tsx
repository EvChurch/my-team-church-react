import { Badge, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { type ReactElement } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../../../gql'
import getProgressInfo from '../../../../../utils/getProgressInfo'
import Avatar from '../../../../Avatar'

const TeamPositionListItemAssignmentListItemAssignmentFragment = graphql(`
  fragment TeamPositionListItemAssignmentListItemAssignmentFragment on Assignment {
    id
    progress
    contact {
      id
      avatar
      title
    }
    createdAt
    updatedAt
  }
`)

interface Props {
  assignment: FragmentType<
    typeof TeamPositionListItemAssignmentListItemAssignmentFragment
  >
}

export default function AssignmentListItem({
  assignment: refAssignment,
}: Props): ReactElement {
  const assignment = useFragment(
    TeamPositionListItemAssignmentListItemAssignmentFragment,
    refAssignment
  )
  const { label, color } = getProgressInfo(assignment.progress)

  return (
    <ListItem>
      <ListItemAvatar>
        <Badge
          variant="dot"
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: color,
            },
          }}
        >
          <Avatar
            src={assignment.contact.avatar ?? undefined}
            title={assignment.contact.title}
          />
        </Badge>
      </ListItemAvatar>
      <ListItemText primary={assignment.contact.title} secondary={label} />
    </ListItem>
  )
}
