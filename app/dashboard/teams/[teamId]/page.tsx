import { type Metadata } from 'next'
import { useParams } from 'next/navigation'
import { type ReactElement } from 'react'

import Team from '../../../../src/components/Team'

export const metadata: Metadata = {
  title: 'Team | My Team',
}

export default function TeamPage(): ReactElement {
  const params = useParams()

  return <Team id={params.teamId} />
}
