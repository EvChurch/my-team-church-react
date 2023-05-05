import {
  AvatarGroup,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { sortBy } from 'lodash'
import Link from 'next/link'
import { type ReactElement } from 'react'

import { type FragmentType, graphql, useFragment } from '../../../gql'
import { Status } from '../../../gql/graphql'
import Avatar from '../../Avatar'

const TeamListItemTeamFragment = graphql(`
  fragment TeamListItemTeamFragment on Team {
    id
    title
    slug
    contacts {
      id
      title
      avatar
      status
    }
  }
`)

interface Props {
  team: FragmentType<typeof TeamListItemTeamFragment>
}

export default function TeamListItem({ team: refTeam }: Props): ReactElement {
  const team = useFragment(TeamListItemTeamFragment, refTeam)

  return (
    <Card key={team.id}>
      <Link href={`/teams/${team.slug}`} passHref legacyBehavior>
        <CardActionArea>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" textAlign="center" noWrap>
                {team.title}
              </Typography>
              <Divider>
                <AvatarGroup
                  sx={{
                    '.MuiAvatar-root': {
                      fontSize: 16,
                      fontWeight: 'bold',
                    },
                  }}
                >
                  {sortBy(
                    team.contacts.filter(
                      ({ status }) => status === Status.Active
                    ),
                    'title'
                  ).map(({ id, avatar, title }) => (
                    <Avatar key={id} title={title} src={avatar ?? undefined} />
                  ))}
                </AvatarGroup>
              </Divider>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}
