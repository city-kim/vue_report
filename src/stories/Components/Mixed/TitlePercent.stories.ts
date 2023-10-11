import TitlePercent from '@/components/Mixed/TitlePercent.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof TitlePercent> = {
  component: TitlePercent,
  parameters: {
    docs: {
      description: {
        component: `제목을 출력함과 동시에 base기준으로 compare값을 비교하여 퍼센트를 표시하는 컴포넌트

숫자가 세자리를 넘기면 콤마를 추가하고 세자리 이하일 경우 fixed가 전달되면 소수점 자리수를 반환, 그 외는 버림된 숫자를 반환한다`
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '출력될 제목',
    },
    base: {
      control: { type: 'number' },
      description: '기준이 되는 값',
    },
    compare: {
      control: { type: 'number' },
      description: '비교가 될 이전값',
    },
    toFixed: {
      control: 'number',
      description: '소수점 자릿수 표시할 toFixed 값',
    },
    unit: {
      conrtol: 'text'
    },
  }
}
export default meta

type Story = StoryObj<typeof TitlePercent>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { TitlePercent },
      setup() {
        return { args }
      },
      template: '<TitlePercent v-bind="args" />',
    }
  },
  args: {
    title: '제목영역',
    base: 2800,
    compare: 2500,
    toFixed: 1,
    unit: '건',
  },
}

export const Low: Story = {
  render: (args) => {
    return {
      components: { TitlePercent },
      setup() {
        return { args }
      },
      template: '<TitlePercent v-bind="args" />',
    }
  },
  args: {
    ...Primary.args,
    base: 2500,
    compare: 2800,
  },
}