import { Alert, Box, Container, Typography } from '@mui/material'
import { Logo } from '../Logo'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Formik } from 'formik'
import { TextField, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import login from './login.png'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Schema = z.object({
  username: z.string(),
  password: z.string(),
  accountSlug: z.string(),
})

export function Login() {
  const [showError, setShowError] = useState(false)
  const { query } = useRouter()

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
            Hi, Welcome Back
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
          <Typography variant="h4" gutterBottom>
            Login to My Team
          </Typography>
          {showError && (
            <Alert severity="error">
              Email Address or Password is incorrect
            </Alert>
          )}
          <Formik
            validationSchema={toFormikValidationSchema(Schema)}
            initialValues={{ username: '', password: '', accountSlug: '' }}
            onSubmit={async (values) => {
              const response = await signIn('credentials', {
                redirect: false,
                ...values,
              })
              if (response?.ok) {
                window.location.href =
                  (query['callback'] as string | undefined) ?? '/'
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
                    error={touched.username && Boolean(errors.username)}
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                  />
                  <TextField
                    fullWidth
                    id="accountSlug"
                    name="accountSlug"
                    label="Account ID"
                    value={values.accountSlug}
                    onChange={handleChange}
                    error={touched.accountSlug && Boolean(errors.accountSlug)}
                  />
                </Stack>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  Login
                </LoadingButton>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Box>
  )
}
