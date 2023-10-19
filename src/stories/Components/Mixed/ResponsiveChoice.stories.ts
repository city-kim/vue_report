import ResponsiveChoice from '@/components/Mixed/ResponsiveChoice.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ResponsiveChoice> = {
  component: ResponsiveChoice,
  parameters: {
    docs: {
      description: {
        component: '그룹화된 버튼을 표시하고 active로 활성화된 버튼을 표현하는 컴포넌트\n\nMobile은 selectbox로 출력한다'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'select',
      options: ['day', 'week', 'month'],
      description: 'buttons의 key와 일치하는 값',
    },
    items: {
      control: 'object',
      description: '출력에 사용되는 정보를 담은 배열\n\n고유한 key값, 표시할 텍스트를 포함',
    },
    selectDefault: {
      control: 'text',
      description: 'selectbox의 기본 표시 텍스트\n\n해당 값은 다시 선택할 수 없게 숨겨진다',
    },
    // @ts-ignore
    updateActive: {
      action: 'updateActive',
      description: '변경된 active값을 부모 컴포넌트에 전달하는 이벤트',
      control: 'function',
      table: {
        type: {
          summary: 'defineEmits',
        }
      }
    },
  },
}
export default meta

type Story = StoryObj<typeof ResponsiveChoice>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { ResponsiveChoice },
      setup() {
        return { args }
      },
      template: '<ResponsiveChoice v-bind="args" />',
    }
  },
  args: {
    selectDefault: '전체',
    items: [
      { key: 'option1', text: '옵션1' },
      { key: 'option2', text: '옵션2' },
      { key: 'option3', text: '옵션3' },
    ],
  },
}

export const Active: Story = {
  render: (args) => {
    return {
      components: { ResponsiveChoice },
      setup() {
        return { args }
      },
      template: '<ResponsiveChoice v-bind="args" />',
    }
  },
  args: {
    active: 'option2',
    items: [
      { key: 'option1', text: '옵션1' },
      { key: 'option2', text: '옵션2' },
      { key: 'option3', text: '옵션3' },
    ],
  },
}