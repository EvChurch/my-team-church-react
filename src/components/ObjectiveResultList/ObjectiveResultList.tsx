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

import { graphql } from '../../gql'
import { type ObjectiveResultsQuery } from '../../gql/graphql'
import ObjectiveResultCreateDialog from '../ObjectiveResultCreateDialog'

import ObjectiveResultListItem from './ObjectiveResultListItem'

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
  objectiveId: string
}

export default function ObjectiveResultList({
  objectiveId,
}: Props): ReactElement {
  const { data, loading } = useQuery<ObjectiveResultsQuery>(
    ObjectiveResultsQueryDocument,
    {
      variables: { objectiveId },
    }
  )

  const [open, setOpen] = useState(false)

  return (
    <>
      <ObjectiveResultCreateDialog
        objectiveId={objectiveId}
        open={open}
        onClose={() => {
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
            <Stack spacing={2} p={2}>
              {compact(data?.objectiveResults.nodes).map((result) => (
                <ObjectiveResultListItem key={result.id} result={result} />
              ))}
            </Stack>
          )}
      </Card>
    </>
  )
}
