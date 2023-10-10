import SkeletonContainer from '@/components/Common/Skeleton/SkeletonContainer.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof SkeletonContainer> = {
  component: SkeletonContainer,
  parameters: {
    docs: {
      description: {
        component: 'loading중일때 사용하는 skeleton 컴포넌트'
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
    target: {
      control: 'select',
      options: ['chart', 'contents'],
      description: 'skeleton대상'
    },
    isLoading: {
      control: 'boolean',
      description: '로딩중인지 여부'
    }
  }
}
export default meta

type Story = StoryObj<typeof SkeletonContainer>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { SkeletonContainer },
      setup() {
        return { args }
      },
      template: `<SkeletonContainer v-bind="args">{{ args.default }}</SkeletonContainer>`,
    }
  },
  args: {
    target: 'contents',
    isLoading: true,
    default: '로딩이 false가 되면 slot이 출력된다'
  },
}
