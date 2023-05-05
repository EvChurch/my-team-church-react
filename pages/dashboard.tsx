import { NextSeo } from 'next-seo'
import { type ReactElement } from 'react'

import Dashboard from '../src/components/Dashboard'

export default function DashboardPage(): ReactElement {
  return (
    <>
      <NextSeo title="Dashboard" />
      <Dashboard />
    </>
  )
}
