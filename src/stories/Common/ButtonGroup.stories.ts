import { useArgs } from '@storybook/preview-api'

import ButtonGroup from '@/components/Common/ButtonGroup.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component: '그룹화된 버튼을 표시하고 active로 활성화된 버튼을 표현하는 컴포넌트'
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
    buttons: {
      control: 'object',
      description: '버튼 그룹에 표시할 버튼들의 정보를 담은 배열\n\nkey는 버튼을 구분할 수 있는 고유한 key값, text는 버튼에 표시할 텍스트',
    },
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

type Story = StoryObj<typeof ButtonGroup>
export const Primary: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<typeof args>()
    return {
      components: { ButtonGroup },
      setup() {
        function updateActive (key: string) {
          updateArgs({ active: key })
        }
        return { args, updateActive }
      },
      template: '<ButtonGroup v-bind="args" @updateActive="updateActive" />',
    }
  },
  args: {
    active: 'day',
    buttons: [
      { key: 'day', text: '일간' },
      { key: 'week', text: '주간' },
      { key: 'month', text: '월간' },
    ],
  },
}