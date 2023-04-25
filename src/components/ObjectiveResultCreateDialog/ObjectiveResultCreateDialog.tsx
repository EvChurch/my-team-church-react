import { useMutation, useQuery } from '@apollo/client'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded'
import PercentRoundedIcon from '@mui/icons-material/PercentRounded'
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { Form, Formik } from 'formik'
import { compact } from 'lodash'
import { type ReactElement } from 'react'

import { graphql } from '../../gql'
import {
  Measurement,
  type ObjectiveResultCreateMutation,
  type ObjectiveResultInput,
  ObjectiveResultInputSchema,
  ObjectiveResultKind,
  type ObjectiveTeamContactNamesAndObjectivesQuery,
  Status,
} from '../../gql/graphql'
import Avatar from '../Avatar'
import SlideUp from '../SlideUp'

const ObjectiveTeamContactNamesAndObjectivesQueryDocument = graphql(`
  query ObjectiveTeamContactNamesAndObjectives($objectiveId: ID!) {
    objective(id: $objectiveId) {
      id
      team {
        id
        contacts {
          id
          title
          avatar
          slug
        }
        objectives {
          id
          title
        }
      }
    }
  }
`)

const ObjectiveResultCreateMutationDocument = graphql(`
  mutation ObjectiveResultCreate($input: ObjectiveResultInput!) {
    objectiveResultCreate(input: { result: $input }) {
      result {
        id
      }
    }
  }
`)

interface Props {
  open?: boolean
  onClose?: (id?: string) => void
  objectiveId: string
  contactId?: string
}

export default function ObjectiveResultCreateDialog({
  open,
  onClose,
  objectiveId,
  contactId,
}: Props): ReactElement {
  const { data, loading } =
    useQuery<ObjectiveTeamContactNamesAndObjectivesQuery>(
      ObjectiveTeamContactNamesAndObjectivesQueryDocument,
      { variables: { objectiveId } }
    )
  const [objectiveResultCreate] = useMutation<ObjectiveResultCreateMutation>(
    ObjectiveResultCreateMutationDocument
  )
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const initialValues: ObjectiveResultInput = {
    contactId: contactId ?? '',
    description: '',
    title: '',
    objectiveId,
    status: Status.Active,
    kind: ObjectiveResultKind.KeyResult,
    measurement: Measurement.Numerical,
    startValue: 0,
    targetValue: 100,
  }

  return (
    <Dialog
      open={open ?? false}
      onClose={() => onClose?.()}
      scroll="paper"
      fullWidth
      fullScreen={smDown}
      maxWidth="md"
      TransitionComponent={smDown ? SlideUp : undefined}
    >
      <Formik
        validationSchema={ObjectiveResultInputSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { data } = await objectiveResultCreate({
            variables: { input: values },
          })
          data?.objectiveResultCreate?.result?.id != null && onClose?.()
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
                Add Result
              </Typography>
              <IconButton aria-label="close" onClick={() => onClose?.()}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <DialogContent dividers>
              <Stack spacing={2}>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  error={Boolean(touched.title) && Boolean(errors.title)}
                  helperText={Boolean(touched.title) && errors.title}
                  fullWidth
                />
                <Autocomplete
                  onChange={(_event, newValue) => {
                    setFieldValue('contactId', newValue?.id)
                  }}
                  value={data?.objective.team.contacts.find(
                    (contact) => contact.id === values.contactId
                  )}
                  id="contactId"
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  options={compact(data?.objective.team.contacts)}
                  getOptionLabel={({ title }) => title}
                  loading={loading}
                  fullWidth
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Avatar
                        src={option.avatar ?? undefined}
                        title={option.title}
                        type="user"
                        sx={{ mr: 2, flexShrink: 0 }}
                      />
                      {option.title}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Lead"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                      error={
                        Boolean(touched.contactId) && Boolean(errors.contactId)
                      }
                      helperText={
                        Boolean(touched.contactId) && errors.contactId
                      }
                    />
                  )}
                />
                <FormControl fullWidth>
                  <InputLabel id="measurement-select-label">
                    Measure as a:
                  </InputLabel>
                  <Select
                    labelId="measurement-select-label"
                    id="measurement"
                    name="measurement"
                    value={values.measurement}
                    label="Measure as a:"
                    onChange={handleChange}
                  >
                    <MenuItem value={Measurement.Numerical}>Numerical</MenuItem>
                    <MenuItem value={Measurement.Percentage}>
                      Percentage
                    </MenuItem>
                    <MenuItem value={Measurement.Currency}>Currency</MenuItem>
                  </Select>
                </FormControl>
                <Stack direction="row" spacing={2}>
                  <TextField
                    id="startValue"
                    name="startValue"
                    label="Start value"
                    value={values.startValue}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {values.measurement === Measurement.Numerical && (
                            <NumbersRoundedIcon />
                          )}
                          {values.measurement === Measurement.Percentage && (
                            <PercentRoundedIcon />
                          )}
                          {values.measurement === Measurement.Currency && (
                            <AttachMoneyRoundedIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    error={
                      Boolean(touched.startValue) && Boolean(errors.startValue)
                    }
                    helperText={
                      Boolean(touched.startValue) && errors.startValue
                    }
                    fullWidth
                  />
                  <TextField
                    id="targetValue"
                    name="targetValue"
                    label="Target value"
                    value={values.targetValue}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {values.measurement === Measurement.Numerical && (
                            <NumbersRoundedIcon />
                          )}
                          {values.measurement === Measurement.Percentage && (
                            <PercentRoundedIcon />
                          )}
                          {values.measurement === Measurement.Currency && (
                            <AttachMoneyRoundedIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    error={
                      Boolean(touched.targetValue) &&
                      Boolean(errors.targetValue)
                    }
                    helperText={
                      Boolean(touched.targetValue) && errors.targetValue
                    }
                    fullWidth
                  />
                </Stack>
                <FormControl>
                  <FormLabel id="kind-label">Result Type</FormLabel>
                  <RadioGroup
                    aria-labelledby="kind-label"
                    name="kind"
                    value={values.kind}
                    onChange={handleChange}
                  >
                    <Stack spacing={2}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          '&:hover': {
                            borderColor: 'text.primary',
                          },
                        }}
                      >
                        <FormControlLabel
                          sx={{ display: 'flex' }}
                          value={ObjectiveResultKind.KeyResult}
                          control={<Radio />}
                          disableTypography
                          label={
                            <Stack
                              spacing={2}
                              direction="row"
                              flexGrow={1}
                              alignItems="center"
                            >
                              <Box flexGrow={1}>
                                <Typography>Key Result</Typography>
                                <Typography
                                  variant="body2"
                                  color="text.disabled"
                                >
                                  Measures success for the Objective and
                                  directly impacts its progress.
                                </Typography>
                              </Box>
                              <ShowChartRoundedIcon htmlColor="rgb(5 169 244)" />
                            </Stack>
                          }
                        />
                      </Paper>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          '&:hover': {
                            borderColor: 'text.primary',
                          },
                        }}
                      >
                        <FormControlLabel
                          sx={{ display: 'flex' }}
                          value={ObjectiveResultKind.Initiative}
                          control={<Radio />}
                          disableTypography
                          label={
                            <Stack
                              spacing={2}
                              direction="row"
                              flexGrow={1}
                              alignItems="center"
                            >
                              <Box flexGrow={1}>
                                <Typography>Initiative</Typography>
                                <Typography
                                  variant="body2"
                                  color="text.disabled"
                                >
                                  Supporting work that doesn&apos;t directly
                                  affect the Objective&apos;s progress.
                                </Typography>
                              </Box>
                              <PlaylistAddCheckRoundedIcon htmlColor="rgb(55 213 146)" />
                            </Stack>
                          }
                        />
                      </Paper>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <Accordion
                  sx={{
                    '::before': {
                      height: 0,
                    },
                  }}
                  disableGutters
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                    sx={{ px: 0 }}
                  >
                    <Typography>Advanced Options</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0 }}>
                    <Stack spacing={2}>
                      <DatePicker
                        label="Start Date"
                        value={
                          values.startAt != null ? dayjs(values.startAt) : null
                        }
                        onChange={(value) => {
                          setFieldValue('startAt', value?.format('YYYY-MM-DD'))
                        }}
                        slotProps={{
                          textField: {
                            error:
                              Boolean(touched.startAt) &&
                              Boolean(errors.startAt),
                            helperText:
                              Boolean(touched.startAt) && errors.startAt,
                          },
                        }}
                      />
                      <DatePicker
                        label="Due Date"
                        value={
                          values.dueAt != null ? dayjs(values.dueAt) : null
                        }
                        onChange={(value) => {
                          setFieldValue('dueAt', value?.format('YYYY-MM-DD'))
                        }}
                        slotProps={{
                          textField: {
                            error:
                              Boolean(touched.dueAt) && Boolean(errors.dueAt),
                            helperText: Boolean(touched.dueAt) && errors.dueAt,
                          },
                        }}
                      />
                      <TextField
                        id="description"
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleChange}
                        error={
                          Boolean(touched.description) &&
                          Boolean(errors.description)
                        }
                        helperText={
                          Boolean(touched.description) && errors.description
                        }
                        fullWidth
                        multiline
                        minRows={5}
                      />
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Stack direction="row" flexGrow={1}>
                <Box flexGrow={1}>
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    aria-label="Status"
                    value={values.status}
                    onChange={(_event, value) => {
                      setFieldValue('status', value)
                    }}
                  >
                    <ToggleButton value={Status.Active}>Active</ToggleButton>
                    <ToggleButton value={Status.Draft}>Draft</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
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
