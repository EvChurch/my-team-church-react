import { useQuery } from '@apollo/client'
import { Card, alpha } from '@mui/material'
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid'
import { type ReactElement } from 'react'

import { graphql } from '../../../gql'
import { type MembersQuery } from '../../../gql/graphql'
import Avatar from '../../Avatar'

const MembersQueryDocument = graphql(`
  query Members($teamId: ID!) {
    contacts(teamId: $teamId) {
      nodes {
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
  teamId: string
}

export default function MemberList({ teamId }: Props): ReactElement {
  const { data } = useQuery<MembersQuery>(MembersQueryDocument, {
    variables: { teamId },
  })

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: '',
      width: 34,
      renderCell: (
        params: GridRenderCellParams<
          NonNullable<NonNullable<MembersQuery['contacts']['nodes']>[number]>,
          NonNullable<
            NonNullable<MembersQuery['contacts']['nodes']>[number]
          >['avatar']
        >
      ) => {
        return (
          <Avatar
            src={params.value ?? undefined}
            title={params.row.title}
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
        rows={data?.contacts.nodes ?? []}
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
  )
}
