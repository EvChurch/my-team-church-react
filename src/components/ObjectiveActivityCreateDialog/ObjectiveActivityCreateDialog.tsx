import { useMutation } from '@apollo/client'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded'
import PercentRoundedIcon from '@mui/icons-material/PercentRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Form, Formik } from 'formik'
import { type ReactElement } from 'react'

import { type FragmentType, graphql, useFragment } from '../../gql'
import {
  Measurement,
  type ObjectiveActivityCreateMutation,
  type ObjectiveActivityInput,
  ObjectiveActivityInputSchema,
} from '../../gql/graphql'
import { ObjectiveActivityKind, Progress } from '../../gql/graphql'
import getProgressInfo from '../../utils/getProgressInfo'
import SlideUp from '../SlideUp'

const ObjectiveActivityCreateDialogResultFragment = graphql(`
  fragment ObjectiveActivityCreateDialogResultFragment on ObjectiveResult {
    id
    progress
    measurement
    targetValue
    currentValue
    startValue
  }
`)

const ObjectiveActivityCreateMutationDocument = graphql(`
  mutation ObjectiveActivityCreate($input: ObjectiveActivityInput!) {
    objectiveActivityCreate(input: { activity: $input }) {
      activity {
        id
        result {
          id
          progress
          percentage
          currentValue
          objective {
            id
            progress
            percentage
            team {
              id
              progress
              percentage
            }
          }
        }
      }
    }
  }
`)

interface Props {
  open?: boolean
  onClose?: (id?: string) => void
  objectiveId: string
  contactId: string
  result: FragmentType<typeof ObjectiveActivityCreateDialogResultFragment>
}

export default function ObjectiveActivityCreateDialog({
  open,
  onClose,
  objectiveId,
  contactId,
  result: refResult,
}: Props): ReactElement {
  const [objectiveResultCreate] = useMutation<ObjectiveActivityCreateMutation>(
    ObjectiveActivityCreateMutationDocument
  )
  const result = useFragment(
    ObjectiveActivityCreateDialogResultFragment,
    refResult
  )
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const initialValues: ObjectiveActivityInput = {
    comment: '',
    contactId,
    currentValue: result.currentValue ?? result.startValue,
    kind: ObjectiveActivityKind.ProgressUpdate,
    objectiveId,
    progress: result.progress,
    resultId: result.id,
  }

  return (
    <Dialog
      open={open ?? false}
      onClose={() => onClose?.()}
      scroll="paper"
      fullWidth
      fullScreen={smDown}
      maxWidth="xs"
      TransitionComponent={smDown ? SlideUp : undefined}
    >
      <Formik
        validationSchema={ObjectiveActivityInputSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { data } = await objectiveResultCreate({
            variables: { input: values },
          })
          const id = data?.objectiveActivityCreate?.activity?.id
          id != null && onClose?.(id)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Stack
              sx={{ py: 2, px: 3 }}
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <ShowChartRoundedIcon />
              <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
                Update Progress
              </Typography>
              <IconButton aria-label="close" onClick={() => onClose?.()}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <DialogContent dividers>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    id="currentValue"
                    name="currentValue"
                    label="New value"
                    value={values.currentValue}
                    onChange={handleChange}
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {result.measurement === Measurement.Numerical && (
                            <NumbersRoundedIcon />
                          )}
                          {result.measurement === Measurement.Percentage && (
                            <PercentRoundedIcon />
                          )}
                          {result.measurement === Measurement.Currency && (
                            <AttachMoneyRoundedIcon />
                          )}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          /{result.targetValue}
                        </InputAdornment>
                      ),
                    }}
                    error={
                      Boolean(touched.currentValue) &&
                      Boolean(errors.currentValue)
                    }
                    helperText={
                      Boolean(touched.currentValue) && errors.currentValue
                    }
                    fullWidth
                  />
                  <FormControl fullWidth>
                    <InputLabel id="progress-label">New status</InputLabel>
                    <Select
                      labelId="progress-label"
                      id="progress"
                      name="progress"
                      value={values.progress}
                      label="New status"
                      onChange={handleChange}
                    >
                      {[
                        Progress.Accomplished,
                        Progress.OnTrack,
                        Progress.NeedsAttention,
                        Progress.OffTrack,
                        Progress.NoStatus,
                      ].map((progress) => {
                        const { label, color, Icon } = getProgressInfo(progress)

                        return (
                          <MenuItem value={progress} key={progress}>
                            <Stack spacing={2} direction="row">
                              <Icon
                                sx={{
                                  color,
                                  height: 20,
                                  width: 20,
                                }}
                              />
                              <Typography>{label}</Typography>
                            </Stack>
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Stack>
                <TextField
                  id="comment"
                  name="comment"
                  label="Comment (optional)"
                  value={values.comment}
                  onChange={handleChange}
                  error={Boolean(touched.comment) && Boolean(errors.comment)}
                  helperText={Boolean(touched.comment) && errors.comment}
                  fullWidth
                  minRows={3}
                  multiline
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Stack direction="row" flexGrow={1}>
                <Box flexGrow={1}></Box>
                <Button onClick={() => onClose?.()} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || !isValid}
                >
                  Save
                </Button>
              </Stack>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}
