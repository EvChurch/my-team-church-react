import { useLazyQuery } from '@apollo/client'
import CloseIcon from '@mui/icons-material/CloseRounded'
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { type ReactElement, useEffect } from 'react'

import { graphql } from '../../gql'
import { type ObjectiveQuery } from '../../gql/graphql'

const ObjectiveQueryDocument = graphql(`
  query Objective($id: ID!) {
    objective(id: $id) {
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
    }
  }
`)

interface Props {
  open?: boolean
  onClose?: () => void
  id: string
}

export default function ObjectiveDialog({
  open,
  onClose,
  id,
}: Props): ReactElement {
  const [loadObjective, { data }] = useLazyQuery<ObjectiveQuery>(
    ObjectiveQueryDocument
  )

  useEffect(() => {
    if (open === true) {
      void loadObjective({ variables: { id } })
    }
  }, [id, open, loadObjective])

  return (
    <Dialog
      open={open ?? false}
      onClose={() => onClose?.()}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <Stack
        sx={{ py: 2, px: 3 }}
        direction="row"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
          {data?.objective.title}
        </Typography>
        <IconButton aria-label="close" onClick={() => onClose?.()}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent dividers></DialogContent>
    </Dialog>
  )
}
