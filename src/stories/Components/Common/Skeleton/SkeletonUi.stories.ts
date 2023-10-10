import SkeletonUi from '@/components/Common/Skeleton/SkeletonUi.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof SkeletonUi> = {
  component: SkeletonUi,
  parameters: {
    docs: {
      description: {
        component: 'loading 중일때 특정요소를 skeleton으로 보이게하는 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: '가로사이즈 css string',
      table: {
        type: {
          summary: 'css height',
        }
      }
    },
    minHiehgt : {
      control: 'text',
      description: '세로 최소높이가 필요하다면 설정 css string',
      table: {
        type: {
          summary: 'css height',
        }
      }
    },
    height: {
      control: 'text',
      description: '세로사이즈 css string',
      table: {
        type: {
          summary: 'css height',
        }
      }
    },
    radius: {
      control: 'text',
      description: '테두리 굴곡 css radius string',
      table: {
        type: {
          summary: 'css border radius',
        }
      }
    },
  }
}
export default meta

type Story = StoryObj<typeof SkeletonUi>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { SkeletonUi },
      setup() {
        return { args }
      },
      template: `<SkeletonUi v-bind="args" />`,
    }
  },
  args: {
  },
}

export const FixedSize: Story = {
  render: (args) => {
    return {
      components: { SkeletonUi },
      setup() {
        return { args }
      },
      template: `<SkeletonUi v-bind="args" />`,
    }
  },
  args: {
    width: '5rem',
    height: '10rem',
  },
}

export const Circle: Story = {
  render: (args) => {
    return {
      components: { SkeletonUi },
      setup() {
        return { args }
      },
      template: `<SkeletonUi v-bind="args" />`,
    }
  },
  args: {
    width: '5rem',
    height: '5rem',
    radius: '50%',
  },
}

export const Card: Story = {
  render: (args) => {
    return {
      components: { SkeletonUi },
      setup() {
        return { args }
      },
      template: `<SkeletonUi v-bind="args" />`,
    }
  },
  args: {
    width: '20rem',
    height: '10rem',
    radius: '1rem',
  },
}