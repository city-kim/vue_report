import SvgIcon from '@/components/Common/SvgIcon.vue'
import { ICON_LIST } from '@/constants/components/ICON_LIST'

import type { Meta, StoryObj } from '@storybook/vue3'

const iconList = Object.keys(ICON_LIST)

const meta: Meta<typeof SvgIcon> = {
  component: SvgIcon,
  parameters: {
    docs: {
      description: {
        component: 'constants에 선언된 icon의 key값을 기준으로 svg를 표시한다'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconList,
      description: '표시될 아이콘의 key값',
      table: {
        type: {
          summary: 'iconList key',
          detail: iconList.join('\n')
        }
      }
    },
    width: {
      control: 'text',
      description: '가로사이즈 css string',
      table: {
        type: {
          summary: 'css width',
        }
      }
    },
    height: {
      control: 'text',
      description: '세로사이즈 css string',
      table: {
        type: {
          summary: 'css height',
        }
      }
    },
  }
}
export default meta

type Story = StoryObj<typeof SvgIcon>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { SvgIcon },
      setup() {
        return { args }
      },
      template: `<SvgIcon v-bind="args" />`,
    }
  },
  args: {
    name: 'caret_up_fill',
    width: '20px',
    height: '20px',
  },
}

export const Small: Story = {
  render: (args) => {
    return {
      components: { SvgIcon },
      setup() {
        return { args }
      },
      template: `<SvgIcon v-bind="args" />`,
    }
  },
  args: {
    name: 'caret_up_fill',
    width: '1rem',
    height: '1rem',
  },
}

export const Large: Story = {
  render: (args) => {
    return {
      components: { SvgIcon },
      setup() {
        return { args }
      },
      template: `<SvgIcon v-bind="args" />`,
    }
  },
  args: {
    name: 'caret_up_fill',
    width: '3rem',
    height: '3rem',
  },
}

export const List: Story = {
  render: (args) => {
    return {
      components: { SvgIcon },
      setup() {
        const icons = iconList
        return { args, icons }
      },
      template: `
      <SvgIcon
        v-for="icon in icons"
        :name="icon"
        width="1rem"
        height="1rem"
      />`,
    }
  },
  args: {
    name: 'caret_up_fill',
    width: '1rem',
    height: '1rem',
  },
}