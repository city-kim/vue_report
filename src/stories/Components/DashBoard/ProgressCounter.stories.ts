import ProgressCounter from '@/components/DashBoard/ProgressCounter.vue'
import { getCssVar } from '@/util/color'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ProgressCounter> = {
  component: ProgressCounter,
  parameters: {
    docs: {
      description: {
        component: 'dashboard에서 사용되는 TitlePercent와 n개의 TitleLineProgress를 표시하는 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '제목영역',
    },
    base: {
      control: 'number',
      description: '기준이 되는 값'
    },
    compare: {
      control: 'number',
      description: '비교 될 값'
    },
    progressData: {
      control: 'object',
      description: '제목영역',
    },
  }
}
export default meta

type Story = StoryObj<typeof ProgressCounter>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { ProgressCounter },
      setup() {
        return { args }
      },
      template: `<ProgressCounter v-bind="args">{{ args.default }}</ProgressCounter>`,
    }
  },
  args: {
    title: '제목영역',
    base: 100,
    compare: 50,
    progressData: [
      { title: 'progress1', count: 10, percent: 10, color: getCssVar('--c-blue') },
      { title: 'progress2', count: 20, percent: 50, color: getCssVar('--c-yellow') },
      { title: 'progress3', count: 30, percent: 90, color: getCssVar('--c-red') },
    ],
  },
}
