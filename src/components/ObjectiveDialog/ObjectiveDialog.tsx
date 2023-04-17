import { useMutation, useQuery } from '@apollo/client'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { Form, Formik } from 'formik'
import { compact, startCase } from 'lodash'
import { type ReactElement } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { graphql } from '../../gql'
import {
  type ObjectiveCreateMutation,
  Status,
  type TeamContactNamesQuery,
} from '../../gql/graphql'
import Avatar from '../Avatar'

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

const Schema = z.object({
  title: z.string(),
  teamId: z.string(),
  contactId: z.string(),
  dueAt: z.string(),
  status: z.nativeEnum(Status),
  description: z.string().optional(),
})

export default function ObjectiveDialog({
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

  return (
    <Dialog
      open={open ?? false}
      onClose={() => onClose?.()}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <Formik
        validationSchema={toFormikValidationSchema(Schema)}
        initialValues={{
          title: '',
          teamId: teamId ?? '',
          contactId: contactId ?? '',
          dueAt: dayjs(new Date())
            .add(1, 'month')
            .endOf('month')
            .format('YYYY-MM-DD'),
          description:
            'Why is it important?\n\n\n\n\nWhy is it urgent?\n\n\n\n',
          status: Status.Active,
        }}
        onSubmit={async (values) => {
          const { data } = await objectiveCreate({
            variables: { input: values },
          })
          data?.objectiveCreate?.objective?.id != null && onClose?.()
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
            <DialogTitle>Add Objective</DialogTitle>
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
