import { Button } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { createElement, useState } from 'react'

import Navigation from '.'

const meta: Meta<typeof Navigation> = {
  title: 'Navigation',
  component: Navigation,
}

export default meta
type Story = StoryObj<typeof Navigation>

export const Primary: Story = {
  render: () =>
    createElement(() => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <Button
            onClick={() => {
              setOpen(true)
            }}
          >
            Open on Mobile
          </Button>
          <Navigation
            openNav={open}
            onCloseNav={() => {
              setOpen(false)
            }}
          />
        </>
      )
    }),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement)

    userEvent.click(canvas.getByText('Open on Mobile'))
  },
}
