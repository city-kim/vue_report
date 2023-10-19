import SelectBox from '@/components/Common/SelectBox.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof SelectBox> = {
  component: SelectBox,
  parameters: {
    docs: {
      description: {
        component: 'select와 options를 표현하고 선택된 값을 emit하는 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'select',
      options: ['option1', 'option2', 'option3'],
      description: 'options의 key와 일치하는 값',
    },
    options: {
      control: 'object',
      description: 'select의 option 정보를 담은 배열\n\nkey는 옵션을 구분할 수 있는 고유한 key값, text는 표시할 텍스트\n\nisHidden: true라면 다시 선택불가능하게 숨김',
    },
    // @ts-ignore
    updateSelected: {
      action: 'updateSelected',
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

type Story = StoryObj<typeof SelectBox>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { SelectBox },
      setup() {
        return { args }
      },
      template: '<SelectBox v-bind="args" />',
    }
  },
  args: {
    active: 'option2',
    options: [
      { key: '', text: '전체', isHidden: true },
      { key: 'option1', text: '옵션1' },
      { key: 'option2', text: '옵션2' },
      { key: 'option3', text: '옵션3' },
    ],
  },
}
