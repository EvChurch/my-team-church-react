import { useMutation, useQuery } from '@apollo/client'
import CloseIcon from '@mui/icons-material/CloseRounded'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
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
import { compact, startCase } from 'lodash'
import { type ReactElement } from 'react'

import { graphql } from '../../gql'
import {
  type ObjectiveCreateMutation,
  type ObjectiveInput,
  ObjectiveInputSchema,
  Status,
  type TeamContactNamesQuery,
} from '../../gql/graphql'
import Avatar from '../Avatar'
import SlideUp from '../SlideUp'

const TeamContactNamesQueryDocument = graphql(`
  query TeamContactNames {
    teams(status: active) {
      nodes {
        id
        title
        definition
        slug
        contacts {
          id
          title
          avatar
          slug
        }
      }
    }
  }
`)

const ObjectiveCreateMutationDocument = graphql(`
  mutation ObjectiveCreate($input: ObjectiveInput!) {
    objectiveCreate(input: { objective: $input }) {
      objective {
        id
      }
    }
  }
`)

interface Props {
  open?: boolean
  onClose?: (id?: string) => void
  teamId?: string
  contactId?: string
}

export default function ObjectiveCreateDialog({
  open,
  onClose,
  teamId,
  contactId,
}: Props): ReactElement {
  const { data, loading } = useQuery<TeamContactNamesQuery>(
    TeamContactNamesQueryDocument
  )
  const [objectiveCreate] = useMutation<ObjectiveCreateMutation>(
    ObjectiveCreateMutationDocument
  )
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const initialValues: ObjectiveInput = {
    title: '',
    teamId: teamId ?? '',
    contactId: contactId ?? '',
    dueAt: dayjs(new Date())
      .add(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD'),
    description: 'Why is it important?\n\n\n\n\nWhy is it urgent?\n\n\n\n',
    status: Status.Active,
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
        validationSchema={ObjectiveInputSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { data } = await objectiveCreate({
            variables: { input: values },
          })
          const id = data?.objectiveCreate?.objective?.id
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
              <FlagRoundedIcon />

              <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
                Add Objective
              </Typography>
              <Divider orientation="vertical" flexItem />
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
                    setFieldValue('teamId', newValue?.id)
                    if (values.contactId !== '') setFieldValue('contactId', '')
                  }}
                  value={
                    data?.teams.nodes?.find(
                      (team) => team?.id === values.teamId
                    ) ?? null
                  }
                  id="teamId"
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  options={compact(data?.teams.nodes).sort(
                    (a, b) => -b.definition.localeCompare(a.definition)
                  )}
                  groupBy={({ definition }) => startCase(definition)}
                  getOptionLabel={({ title }) => title}
                  loading={loading}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Owner"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                      error={Boolean(touched.teamId) && Boolean(errors.teamId)}
                      helperText={Boolean(touched.teamId) && errors.teamId}
                    />
                  )}
                />
                <Autocomplete
                  disabled={values.teamId === ''}
                  onChange={(_event, newValue) => {
                    setFieldValue('contactId', newValue?.id)
                  }}
                  value={
                    data?.teams.nodes
                      ?.find((team) => team?.id === values.teamId)
                      ?.contacts.find(
                        (team) => team?.id === values.contactId
                      ) ?? null
                  }
                  id="contactId"
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  options={compact(
                    data?.teams.nodes?.find(
                      (team) => team?.id === values.teamId
                    )?.contacts
                  )}
                  getOptionLabel={({ title }) => title}
                  loading={loading}
                  fullWidth
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Avatar
                        src={option.avatar ?? undefined}
                        title={option.title}
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
