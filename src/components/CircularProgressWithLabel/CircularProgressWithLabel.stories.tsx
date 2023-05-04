import type { Meta, StoryObj } from '@storybook/react'

import CircularProgressWithLabel from '.'

const meta: Meta<typeof CircularProgressWithLabel> = {
  title: 'CircularProgressWithLabel',
  component: CircularProgressWithLabel,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CircularProgressWithLabel>

export const Primary: Story = {
  args: {
    value: 50,
  },
}

export const WhenEmpty: Story = {}
