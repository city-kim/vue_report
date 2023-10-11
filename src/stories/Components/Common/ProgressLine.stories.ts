import ProgressLine from '@/components/Common/ProgressLine.vue'
import { getCssVar } from '@/util/color'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ProgressLine> = {
  component: ProgressLine,
  parameters: {
    docs: {
      description: {
        component: 'progress를 line으로 표현한다'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'text',
      description: '최소 높이값 css string',
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
  }
}
export default meta

type Story = StoryObj<typeof ProgressLine>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { ProgressLine },
      setup() {
        return { args }
      },
      template: '<ProgressLine v-bind="args" />',
    }
  },
  args: {
    height: '1rem',
    percent: 50,
    color: getCssVar('--c-blue'),
  },
}


export const Red: Story = {
  render: (args) => {
    return {
      components: { ProgressLine },
      setup() {
        return { args }
      },
      template: '<ProgressLine v-bind="args" />',
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
      components: { ProgressLine },
      setup() {
        return { args }
      },
      template: '<ProgressLine v-bind="args" />',
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
      components: { ProgressLine },
      setup() {
        return { args }
      },
      template: '<ProgressLine v-bind="args" />',
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
      components: { ProgressLine },
      setup() {
        return { args }
      },
      template: '<ProgressLine v-bind="args" />',
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
      components: { ProgressLine },
      setup() {
        return { args }
      },
      template: '<ProgressLine v-bind="args" />',
    }
  },
  args: {
    ...Primary.args,
    height: '2rem',
  },
}