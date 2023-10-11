import ContainerHeading from '@/components/DashBoard/ContainerHeading.vue'
import CardCounter from '@/components/DashBoard/CardCounter.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ContainerHeading> = {
  component: ContainerHeading,
  parameters: {
    docs: {
      description: {
        component: 'dashboard에서 사용되는 각 컨테이너의 제목을 표시하는 컴포넌트'
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
    h2: {
      control: 'text',
      description: '제목영역',
    },
    isLoading: {
      control: 'boolean',
      description: '로딩중일때는 header를 숨긴다',
    },
  }
}
export default meta

type Story = StoryObj<typeof ContainerHeading>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { ContainerHeading },
      setup() {
        return { args }
      },
      template: `<ContainerHeading v-bind="args">{{ args.default }}</ContainerHeading>`,
    }
  },
  args: {
    h2: '제목영역',
  },
}

export const Slot: Story = {
  render: (args) => {
    return {
      components: { ContainerHeading, CardCounter },
      setup() {
        return { args }
      },
      template: `
      <ContainerHeading v-bind="args">
        <CardCounter
          title="CardCounter component"
          :base="456"
          :compare="123"
          unit="원"
        >example</CardCounter>
      </ContainerHeading>
      `,
    }
  },
  args: {
    h2: 'container 제목'
  },
}
