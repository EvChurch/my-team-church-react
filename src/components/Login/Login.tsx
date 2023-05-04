import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { type ReactElement, useState } from 'react'
import { object, string } from 'yup'

import Logo from '../Logo'

import login from './login.png'

export default function Login(): ReactElement {
  const [showError, setShowError] = useState(false)
  const searchParams = useSearchParams()

  return (
    <Box sx={{ display: { md: 'flex' } }}>
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 24, md: 40 },
          left: { xs: 16, sm: 24, md: 40 },
        }}
      />
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Box sx={{ width: 720, py: 12 }}>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hello Again! 👋
          </Typography>
          <Image src={login} alt="login" priority />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: { md: 480 },
          py: 12,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: (theme) => ({ md: theme.customShadows.card }),
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Container>
          <Logo sx={{ display: { xs: 'none', md: 'block' } }} />
          <Typography variant="h4" gutterBottom>
            Log in to your Account
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Welcome back! Use your Fluro.io account to log in:
          </Typography>
          {showError && (
            <Alert severity="error">
              Email Address or Password is incorrect
            </Alert>
          )}
          <Formik
            validationSchema={object({
              username: string().email().required().label('email address'),
              password: string().required(),
              accountSlug: string().required(),
            })}
            initialValues={{
              username: '',
              password: '',
              accountSlug: 'auckland-ev',
            }}
            onSubmit={async (values) => {
              const response = await signIn('credentials', {
                redirect: false,
                ...values,
              })
              if (response?.ok === true) {
                window.location.href = searchParams.get('callback') ?? '/'
              } else {
                setShowError(true)
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
                    id="username"
                    name="username"
                    label="Email Address"
                    value={values.username}
                    onChange={handleChange}
                    error={
                      touched.username === true && Boolean(errors.username)
                    }
                    helperText={Boolean(touched.username) && errors.username}
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={
                      touched.password === true && Boolean(errors.password)
                    }
                    helperText={Boolean(touched.password) && errors.password}
                  />
                  <TextField
                    fullWidth
                    id="accountSlug"
                    name="accountSlug"
                    label="Account ID"
                    value={values.accountSlug}
                    onChange={handleChange}
                    error={
                      touched.accountSlug === true &&
                      Boolean(errors.accountSlug)
                    }
                    helperText={
                      Boolean(touched.accountSlug) && errors.accountSlug
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
                  Log in
                </LoadingButton>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Box>
  )
}
