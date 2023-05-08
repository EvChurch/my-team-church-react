import { useMutation } from '@apollo/client'
import { LoadingButton } from '@mui/lab'
import { Alert, Stack, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import Image from 'next/image'
import { type ReactElement, useState } from 'react'

import waiting from '../../../public/images/illustrations/illustration_15.svg'
import { graphql } from '../../gql'
import {
  type EarlyAccessCreateMutation,
  type EarlyAccessInput,
  EarlyAccessInputSchema,
} from '../../gql/graphql'

const EarlyAccessCreateMutationDocument = graphql(`
  mutation EarlyAccessCreate($input: EarlyAccessInput!) {
    earlyAccessCreate(input: { earlyAccess: $input }) {
      earlyAccess {
        id
      }
    }
  }
`)

export default function EarlyAccess(): ReactElement {
  const [joined, setJoined] = useState(false)
  const [earlyAccessCreate] = useMutation<EarlyAccessCreateMutation>(
    EarlyAccessCreateMutationDocument
  )
  const initialValues: EarlyAccessInput = {
    emailAddress: '',
    firstName: '',
  }

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Join the Waitlist for Early Access
      </Typography>
      <Typography textAlign="center">
        Get notified when we launch in your community.
      </Typography>
      <Stack alignItems="center">
        <Image src={waiting} alt="Waiting" />
      </Stack>
      {joined ? (
        <>
          <Alert>
            You are officially on the waitlist. We&apos;ll be in touch soon!
          </Alert>
        </>
      ) : (
        <Formik
          validationSchema={EarlyAccessInputSchema}
          initialValues={initialValues}
          onSubmit={async (values, formikHelpers) => {
            try {
              await earlyAccessCreate({
                variables: { input: values },
              })
              setJoined(true)
            } catch (error) {
              if (
                error instanceof Error &&
                error.message ===
                  'Validation failed: Email address has already been taken.'
              ) {
                formikHelpers.setFieldError(
                  'emailAddress',
                  'You are already on the waitlist. We will be in touch soon!'
                )
              }
            }
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
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3} my={2}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  error={
                    touched.firstName === true && Boolean(errors.firstName)
                  }
                  helperText={Boolean(touched.firstName) && errors.firstName}
                />
                <TextField
                  fullWidth
                  id="emailAddress"
                  name="emailAddress"
                  label="Email Address"
                  value={values.emailAddress}
                  onChange={handleChange}
                  error={
                    touched.emailAddress === true &&
                    Boolean(errors.emailAddress)
                  }
                  helperText={
                    Boolean(touched.emailAddress) && errors.emailAddress
                  }
                />
              </Stack>
              <LoadingButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={isSubmitting}
                size="large"
              >
                Join Now
              </LoadingButton>
            </form>
          )}
        </Formik>
      )}
    </>
  )
}
