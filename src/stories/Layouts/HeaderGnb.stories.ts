import HeaderGnb from '@/layouts/HeaderGnb.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof HeaderGnb> = {
  component: HeaderGnb,
  parameters: {
    docs: {
      description: {
        component: '버튼을 표시하고 onClcik 이벤트를 전달하는 컴포넌트'
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
