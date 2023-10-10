import PercentWithIcon from '@/components/Common/PercentWithIcon.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof PercentWithIcon> = {
  component: PercentWithIcon,
  parameters: {
    docs: {
      description: {
        component: '전달된 퍼센트값을 출력한다\n\n음수와 양수 각각 아이콘과 색상이 변경된다'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    percent: {
      control: { type: 'range', min:-100, max:100, step: 0.001 },
      description: '표시될 퍼센트값',
    },
    toFixed: {
      control: 'number',
      description: '소수점 자릿수 표시할 toFixed 값',
    },
  }
}
export default meta

type Story = StoryObj<typeof PercentWithIcon>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { PercentWithIcon },
      setup() {
        return { args }
      },
      template: '<PercentWithIcon v-bind="args" />',
    }
  },
  args: {
    percent: 50,
    toFixed: 1,
  },
}

export const Low: Story = {
  render: (args) => {
    return {
      components: { PercentWithIcon },
      setup() {
        return { args }
      },
      template: '<PercentWithIcon v-bind="args" />',
    }
  },
  args: {
    percent: -50,
    toFixed: 1,
  },
}