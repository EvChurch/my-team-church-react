import { type ReactElement, type ReactNode } from 'react'

import AppProvider from '../src/components/AppProvider'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): ReactElement {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
