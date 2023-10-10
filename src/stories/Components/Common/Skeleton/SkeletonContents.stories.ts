import SkeletonContents from '@/components/Common/Skeleton/SkeletonContents.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof SkeletonContents> = {
  component: SkeletonContents,
  parameters: {
    docs: {
      description: {
        component: '제목과 컨텐츠로 구분되는 skeleton 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof SkeletonContents>
export const Primary: Story = {
  render: () => {
    return {
      components: { SkeletonContents },
      template: `<SkeletonContents v-bind="args" />`,
    }
  },
  args: {
  },
}
