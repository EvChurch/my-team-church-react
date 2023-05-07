import { useQuery } from '@apollo/client'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { compact } from 'lodash'
import { type ReactElement, useState } from 'react'

import { type FragmentType, graphql, useFragment } from '../../gql'
import { type ObjectiveResultsQuery } from '../../gql/graphql'
import ObjectiveResultCreateDialog from '../ObjectiveResultCreateDialog'

import ObjectiveResultListItem from './ObjectiveResultListItem'

const ObjectiveResultListObjectiveFragment = graphql(`
  fragment ObjectiveResultListObjectiveFragment on Objective {
    id
    contact {
      id
    }
  }
`)

const ObjectiveResultsQueryDocument = graphql(`
  query ObjectiveResults($objectiveId: [ID!]) {
    objectiveResults(objectiveId: $objectiveId) {
      nodes {
        id
        ...ObjectiveResultListItemObjectiveResultFragment
      }
    }
  }
`)

interface Props {
  objective: FragmentType<typeof ObjectiveResultListObjectiveFragment>
}

export default function ObjectiveResultList({
  objective: refObjective,
}: Props): ReactElement {
  const objective = useFragment(
    ObjectiveResultListObjectiveFragment,
    refObjective
  )
  const { data, loading, refetch } = useQuery<ObjectiveResultsQuery>(
    ObjectiveResultsQueryDocument,
    {
      variables: { objectiveId: objective.id },
      notifyOnNetworkStatusChange: true,
    }
  )

  const [open, setOpen] = useState(false)

  return (
    <>
      <ObjectiveResultCreateDialog
        objectiveId={objective.id}
        contactId={objective.contact.id}
        open={open}
        onClose={(id) => {
          if (id != null) {
            void refetch()
          }
          setOpen(false)
        }}
      />
      <Card>
        <Stack direction="row" alignItems="center" px={2} spacing={2}>
          <ShowChartRoundedIcon />
          <Typography flexGrow={1} fontWeight="bold">
            Results
          </Typography>
          <Box m="4px">
            <IconButton
              onClick={() => {
                setOpen(true)
              }}
            >
              <AddOutlinedIcon />
            </IconButton>
          </Box>
        </Stack>
        <Divider />
        {loading && (
          <CardContent sx={{ textAlign: 'center' }}>Loading...</CardContent>
        )}
        {!loading &&
          data?.objectiveResults.nodes != null &&
          data?.objectiveResults.nodes?.length === 0 && (
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography gutterBottom>
                Add Key Results to track progress, and Initiatives to support
                your Objective.
              </Typography>
              <Button
                onClick={() => {
                  setOpen(true)
                }}
                variant="contained"
              >
                Add Result
              </Button>
            </CardContent>
          )}
        {!loading &&
          data?.objectiveResults.nodes != null &&
          data?.objectiveResults.nodes?.length > 0 && (
            <Stack>
              {compact(data?.objectiveResults.nodes).map((result, index) => (
                <ObjectiveResultListItem
                  key={result.id}
                  result={result}
                  refetch={() => {
                    void refetch()
                  }}
                  divider={
                    (data?.objectiveResults.nodes?.length ?? 0) - 1 !== index
                  }
                />
              ))}
            </Stack>
          )}
      </Card>
    </>
  )
}
