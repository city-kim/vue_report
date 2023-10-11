import { getCssVar } from '@/util/color'

import ProgressCircle from '@/components/Common/ProgressCircle.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ProgressCircle> = {
  component: ProgressCircle,
  parameters: {
    docs: {
      description: {
        component: 'progress를 circle로 표현한다\n\n화면 가운데는 toFixed된 퍼센트값이 표시된다'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'text',
      description: '최대 높이값 css string',
      table: {
        type: {
          summary: 'css height',
        }
      }
    },
    percent: {
      control: { type: 'range', min:0, max:100, step: 0.001 },
      description: '표시될 퍼센트값',
    },
    toFixed: {
      control: 'number',
      description: '소수점 자릿수 표시할 toFixed 값',
    },
    strokeWidth: {
      control: { type: 'range', min:12, max:30, step: 1 },
      description: 'progress bar의 두께 size값과 맞춰서 사용해야함',
    }
  }
}
export default meta

type Story = StoryObj<typeof ProgressCircle>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { ProgressCircle },
      setup() {
        return { args }
      },
      template: '<ProgressCircle v-bind="args" />',
    }
  },
  args: {
    size: '10rem',
    percent: 50,
    toFixed: 1,
    color: getCssVar('--c-blue'),
    strokeWidth: 12,
  },
}

export const Red: Story = {
  render: (args) => {
    return {
      components: { ProgressCircle },
      setup() {
        return { args }
      },
      template: '<ProgressCircle v-bind="args" />',
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
      components: { ProgressCircle },
      setup() {
        return { args }
      },
      template: '<ProgressCircle v-bind="args" />',
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
      components: { ProgressCircle },
      setup() {
        return { args }
      },
      template: '<ProgressCircle v-bind="args" />',
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
      components: { ProgressCircle },
      setup() {
        return { args }
      },
      template: '<ProgressCircle v-bind="args" />',
    }
  },
  args: {
    ...Primary.args,
    color: getCssVar('--c-purple'),
  },
}

export const Large: Story = {
  render: (args) => {
    return {
      components: { ProgressCircle },
      setup() {
        return { args }
      },
      template: '<ProgressCircle v-bind="args" />',
    }
  },
  args: {
    ...Primary.args,
    size: '20rem',
    strokeWidth: 20,
  },
}
