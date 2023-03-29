import { useQuery } from '@apollo/client'
import { Card, CardContent, Container, Typography, alpha } from '@mui/material'
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid'
import { type ReactElement } from 'react'

import { graphql } from '../../gql'
import { type TeamQuery } from '../../gql/graphql'
import Avatar from '../Avatar'

const TeamQueryDocument = graphql(`
  query Team($id: ID!) {
    team(id: $id) {
      id
      title
      contacts {
        id
        avatar
        firstName
        lastName
        title
      }
    }
  }
`)

interface Props {
  id: string
}

export default function Team({ id }: Props): ReactElement {
  const { data } = useQuery<TeamQuery>(TeamQueryDocument, { variables: { id } })

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: '',
      width: 34,
      renderCell: (
        params: GridRenderCellParams<
          TeamQuery['team']['contacts'][number],
          TeamQuery['team']['contacts'][number]['avatar']
        >
      ) => {
        return (
          <Avatar
            src={params.value ?? undefined}
            title={params.row.title}
            type="contact"
            sx={{ width: 34, height: 34, fontSize: '1rem' }}
          />
        )
      },
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
    },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
  ]

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        {data?.team.title}
      </Typography>
      <Card>
        <DataGrid
          autoHeight
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              sx: {
                height: 96,
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                flexDirection: 'row-reverse',
              },
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
                variant: 'outlined',
                sx: {
                  '> .MuiInputBase-root': {
                    width: 240,
                    transition: (theme) =>
                      theme.transitions.create(['box-shadow', 'width'], {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    '&.Mui-focused': {
                      width: 320,
                      boxShadow: (theme) => theme.customShadows.z8,
                    },
                    '& fieldset': {
                      borderWidth: `1px !important`,
                      borderColor: (theme) =>
                        `${alpha(theme.palette.grey[500], 0.32)} !important`,
                    },
                  },
                },
              },
            },
          }}
          disableRowSelectionOnClick
          rows={data?.team.contacts ?? []}
          columns={columns}
          sx={{
            '.MuiDataGrid-columnHeaders': {
              borderRadius: 0,
              color: (theme) => theme.palette.text.secondary,
              backgroundColor: (theme) => theme.palette.background.neutral,
            },
          }}
        />
      </Card>
    </Container>
  )
}
