import ButtonSingle from '@/components/Common/ButtonSingle.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ButtonSingle> = {
  component: ButtonSingle,
  parameters: {
    docs: {
      description: {
        component: '버튼을 표시하고 onClcik 이벤트를 전달하는 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '표시될 버튼의 명칭',
    },
    color: {
      control: 'select',
      options: ['gray', 'blue', 'red', 'yellow', 'orange', 'green', 'purple', 'emerald'],
      description: '버튼의 색상',
    },
    fontSize: {
      control: 'text',
      description: '버튼의 사이즈',
      table: {
        type: {
          summary: 'css height',
        }
      }
    },
    // @ts-ignore
    onClick: {
      action: 'onClick',
      description: '버튼이 클릭되면 부모에 이벤트를 전달한다',
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

type Story = StoryObj<typeof ButtonSingle>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { ButtonSingle },
      setup() {
        return { args }
      },
      template: '<ButtonSingle v-bind="args" @click="onClick" />',
    }
  },
  args: {
    title: '버튼명',
    color: 'blue',
    fontSize: '1rem',
  },
}

export const Large: Story = {
  render: (args) => {
    return {
      components: { ButtonSingle },
      setup() {
        return { args }
      },
      template: '<ButtonSingle v-bind="args" @click="onClick" />',
    }
  },
  args: {
    title: '버튼명',
    color: 'blue',
    fontSize: '5rem',
  },
}

export const Gray: Story = {
  render: (args) => {
    return {
      components: { ButtonSingle },
      setup() {
        return { args }
      },
      template: '<ButtonSingle v-bind="args" @click="onClick" />',
    }
  },
  args: {
    title: '버튼명',
    color: 'gray',
    fontSize: '1rem',
  },
}

export const Red: Story = {
  render: (args) => {
    return {
      components: { ButtonSingle },
      setup() {
        return { args }
      },
      template: '<ButtonSingle v-bind="args" @click="onClick" />',
    }
  },
  args: {
    title: '버튼명',
    color: 'red',
    fontSize: '1rem',
  },
}

export const Yellow: Story = {
  render: (args) => {
    return {
      components: { ButtonSingle },
      setup() {
        return { args }
      },
      template: '<ButtonSingle v-bind="args" @click="onClick" />',
    }
  },
  args: {
    title: '버튼명',
    color: 'yellow',
    fontSize: '1rem',
  },
}

export const Orange: Story = {
  render: (args) => {
    return {
      components: { ButtonSingle },
      setup() {
        return { args }
      },
      template: '<ButtonSingle v-bind="args" @click="onClick" />',
    }
  },
  args: {
    title: '버튼명',
    color: 'orange',
    fontSize: '1rem',
  },
}

export const Green: Story = {
  render: (args) => {
    return {
      components: { ButtonSingle },
      setup() {
        return { args }
      },
      template: '<ButtonSingle v-bind="args" @click="onClick" />',
    }
  },
  args: {
    title: '버튼명',
    color: 'green',
    fontSize: '1rem',
  },
}

export const Purple: Story = {
  render: (args) => {
    return {
      components: { ButtonSingle },
      setup() {
        return { args }
      },
      template: '<ButtonSingle v-bind="args" @click="onClick" />',
    }
  },
  args: {
    title: '버튼명',
    color: 'purple',
    fontSize: '1rem',
  },
}

export const Emerald: Story = {
  render: (args) => {
    return {
      components: { ButtonSingle },
      setup() {
        return { args }
      },
      template: '<ButtonSingle v-bind="args" @click="onClick" />',
    }
  },
  args: {
    title: '버튼명',
    color: 'emerald',
    fontSize: '1rem',
  },
}

