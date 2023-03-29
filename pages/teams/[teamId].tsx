import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { type ReactElement } from 'react'

import Team from '../../src/components/Team'

export default function TeamPage(): ReactElement {
  const { query } = useRouter()

  return (
    <>
      <NextSeo title="Team" />
      <Team id={query.teamId as string} />
    </>
  )
}
