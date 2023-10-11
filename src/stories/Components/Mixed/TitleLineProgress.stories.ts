import TitleLineProgress from '@/components/Mixed/TitleLineProgress.vue'
import { getCssVar } from '@/util/color'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof TitleLineProgress> = {
  component: TitleLineProgress,
  parameters: {
    docs: {
      description: {
        component: '제목과 progressLine이 복합된 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '출력될 제목',
    },
    count: {
      control: { type: 'number' },
      description: 'progress에 표시될 카운트',
    },
    percent: {
      control: { type: 'range', min:0, max:100, step: 0.001 },
      description: 'progress에 표시될 퍼센트',
    },
    color: {
      control: 'select',
      options: [
        getCssVar('--c-indigo'),
        getCssVar('--c-blue'),
        getCssVar('--c-red'),
        getCssVar('--c-yellow'),
        getCssVar('--c-green'),
        getCssVar('--c-purple'),
        getCssVar('--c-emerald')
      ],
      description: 'css variables에 선언된 color값',
    },
  }
}
export default meta

type Story = StoryObj<typeof TitleLineProgress>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { TitleLineProgress },
      setup() {
        return { args }
      },
      template: '<TitleLineProgress v-bind="args" />',
    }
  },
  args: {
    title: '제목영역',
    count: 1,
    percent: 50,
    color: getCssVar('--c-blue'),
  },
}

export const Red: Story = {
  render: (args) => {
    return {
      components: { TitleLineProgress },
      setup() {
        return { args }
      },
      template: '<TitleLineProgress v-bind="args" />',
    }
  },
  args: {
    ...Primary.args,
    color: getCssVar('--c-red'),
  },
}

export const Yellow: Story = {
  render: (args) => {
    return {
      components: { TitleLineProgress },
      setup() {
        return { args }
      },
      template: '<TitleLineProgress v-bind="args" />',
    }
  },
  args: {
    ...Primary.args,
    color: getCssVar('--c-yellow'),
  },
}

export const Green: Story = {
  render: (args) => {
    return {
      components: { TitleLineProgress },
      setup() {
        return { args }
      },
      template: '<TitleLineProgress v-bind="args" />',
    }
  },
  args: {
    ...Primary.args,
    color: getCssVar('--c-green'),
  },
}

export const Purple: Story = {
  render: (args) => {
    return {
      components: { TitleLineProgress },
      setup() {
        return { args }
      },
      template: '<TitleLineProgress v-bind="args" />',
    }
  },
  args: {
    ...Primary.args,
    color: getCssVar('--c-purple'),
  },
}
