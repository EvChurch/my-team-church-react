import type { Meta, StoryObj } from '@storybook/react'

import { Measurement, Progress } from '../../gql/graphql'

import ObjectiveActivityCreateDialog from '.'

const meta: Meta<typeof ObjectiveActivityCreateDialog> = {
  title: 'ObjectiveActivityCreateDialog',
  component: ObjectiveActivityCreateDialog,
}

export default meta
type Story = StoryObj<typeof ObjectiveActivityCreateDialog>

export const Primary: Story = {
  args: {
    objectiveId: 'objectiveId',
    contactId: 'contactId',
    result: {
      ' $fragmentRefs': {
        ObjectiveActivityCreateDialogResultFragmentFragment: {
          id: 'resultId',
          progress: Progress.OnTrack,
          measurement: Measurement.Numerical,
          targetValue: 100,
          currentValue: 50,
          startValue: 0,
        },
      },
    },
    open: true,
  },
  parameters: {
    apolloClient: {
      mocks: [],
    },
  },
}
