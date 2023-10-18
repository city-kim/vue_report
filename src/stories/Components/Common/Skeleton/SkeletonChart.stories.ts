import SkeletonChart from '@/components/Common/Skeleton/SkeletonChart.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof SkeletonChart> = {
  component: SkeletonChart,
  parameters: {
    docs: {
      description: {
        component: 'loading중일때 사용하는 skeleton 컴포넌트\n\ntitle과 chart를 가지고 있는 형태에 매칭된가'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {}
}
export default meta

type Story = StoryObj<typeof SkeletonChart>
export const Primary: Story = {
  render: () => {
    return {
      components: { SkeletonChart },
      template: `<SkeletonChart v-bind="args" />`,
    }
  },
  args: {
  },
}
