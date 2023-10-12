import CardCounter from '@/Components/DashBoards/CardCounter.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof CardCounter> = {
  component: CardCounter,
  parameters: {
    docs: {
      description: {
        component: 'dashboard에서 사용되는 card counter 컴포넌트'
      },
    },
    slots: {
      default: {
        description: 'slot이 출력되는 영역',
      },
    }
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
    toFixed: {
      control: 'number',
      description: '소수점 자릿수 표시할 toFixed 값',
    },
    unit: {
      control: 'text',
      description: '단위 표시할 문자열',
    }
  }
}
export default meta

type Story = StoryObj<typeof CardCounter>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { CardCounter },
      setup() {
        return { args }
      },
      template: `<CardCounter v-bind="args">{{ args.default }}</CardCounter>`,
    }
  },
  args: {
    title: '제목영역',
    base: 100,
    compare: 50,
    unit: '원',
  },
}

export const Slot: Story = {
  render: (args) => {
    return {
      components: { CardCounter },
      setup() {
        return { args }
      },
      template: `<CardCounter v-bind="args">{{ args.default }}</CardCounter>`,
    }
  },
  args: {
    title: '제목영역',
    base: 100,
    compare: 50,
    unit: '원',
    default: 'slot이 출력되는 예시'
  },
}