import CircleCounter from '@/components/DashBoard/CircleCounter.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof CircleCounter> = {
  component: CircleCounter,
  parameters: {
    docs: {
      description: {
        component: 'dashboard에서 사용되는 title과 circleCounter를 표시하는 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '제목영역',
    },
    percent: {
      control: 'number',
      description: '기준이 되는 값'
    },
    toFixed: {
      control: 'number',
      description: '소수점 자릿수 표시할 toFixed 값',
    },
  }
}
export default meta

type Story = StoryObj<typeof CircleCounter>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { CircleCounter },
      setup() {
        return { args }
      },
      template: `<CircleCounter v-bind="args" />`,
    }
  },
  args: {
    title: '제목영역',
    percent: 100,
  },
}
