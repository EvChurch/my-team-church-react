import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { type MouseEvent, type ReactElement, useState } from 'react'

import Avatar from '../../Avatar'

export default function AccountPopover(): ReactElement {
  const { data } = useSession()
  const [open, setOpen] = useState<Element | null>(null)

  const handleOpen = (event: MouseEvent): void => {
    setOpen(event.currentTarget)
  }

  const handleClose = (): void => {
    setOpen(null)
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open != null
            ? {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.5),
                },
              }
            : {}),
        }}
      >
        <Avatar
          src={data?.user.avatar ?? undefined}
          title={data?.user.title}
          type="user"
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {data?.user.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {data?.user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem LinkComponent={Link} href="/" onClick={handleClose}>
            Home
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            void signOut()
          }}
          sx={{ m: 1 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  )
}
