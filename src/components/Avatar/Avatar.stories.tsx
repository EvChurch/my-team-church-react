import type { Meta, StoryObj } from '@storybook/react'

import Avatar from '.'

const meta: Meta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  args: {
    title: 'Sarah Parker',
    src: 'https://avataaars.io/?mouthType=Default',
  },
}

export const WhenTitle: Story = {
  args: {
    title: 'Sarah Parker',
  },
}

export const WhenEmpty: Story = {}
