import HeaderGnb from '@/layouts/HeaderGnb.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof HeaderGnb> = {
  component: HeaderGnb,
  parameters: {
    docs: {
      description: {
        component: '그룹화된 버튼을 표시하고 active로 활성화된 버튼을 표현하는 컴포넌트\n\nTablet과 Mobile은 항목 내에서 확인가능'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
  },
}
export default meta

type Story = StoryObj<typeof HeaderGnb>
export const Primary: Story = {
  render: () => {
    return {
      components: { HeaderGnb },
      template: '<HeaderGnb/>',
    }
  },
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => {
    return {
      components: { HeaderGnb },
      template: '<HeaderGnb/>',
    }
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  render: () => {
    return {
      components: { HeaderGnb },
      template: '<HeaderGnb/>',
    }
  },
}
