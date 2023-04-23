import { useMutation, useQuery } from '@apollo/client'
import CloseIcon from '@mui/icons-material/CloseRounded'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
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
                <DatePicker
                  label="Due Date"
                  value={values.dueAt != null ? dayjs(values.dueAt) : null}
                  onChange={(value) => {
                    setFieldValue('dueAt', value?.format('YYYY-MM-DD'))
                  }}
                  slotProps={{
                    textField: {
                      error: Boolean(touched.dueAt) && Boolean(errors.dueAt),
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
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={
                    Boolean(touched.description) && errors.description
                  }
                  fullWidth
                  multiline
                  minRows={5}
                />
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
