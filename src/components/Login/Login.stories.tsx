import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import Login from '.'

const meta: Meta<typeof Login> = {
  title: 'Login',
  component: Login,
}

export default meta
type Story = StoryObj<typeof Login>

export const Primary: Story = {}
export const WhenValidationError: Story = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement)
    userEvent.click(canvas.getByText('Log in'))
  },
}
