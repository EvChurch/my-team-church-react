import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded'
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import { IconButton, Link, Stack, Tooltip, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { type ReactElement, useState } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../gql'
import { ObjectiveResultKind } from '../../../gql/graphql'
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

interface Props {
  result: FragmentType<typeof ObjectiveResultListItemObjectiveResultFragment>
}

export default function ObjectiveResultListItem({
  result: refResult,
}: Props): ReactElement {
  const [open, setOpen] = useState(false)
  const result = useFragment(
    ObjectiveResultListItemObjectiveResultFragment,
    refResult
  )
  const { data } = useSession()

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
          type="contact"
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
      </Stack>
    </>
  )
}
