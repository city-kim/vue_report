import { useArgs } from '@storybook/preview-api'
import ContentsPagination from '@/components/Common/ContentsPagination.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ContentsPagination> = {
  component: ContentsPagination,
  parameters: {
    docs: {
      description: {
        component: '페이지가 존재하는 컨텐츠의 페이지네이션을 표시하는 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    totalItems: {
      control: { type: 'number', min:50, max:500, step: 10 },
      description: '전체 아이템 갯수',
    },
    currentPage: {
      control: { type: 'number', min:1, max:5, step: 1 },
      description: '현재 페이지',
    },
    pageSize: {
      control: { type: 'number', min:5, max:50, step: 5 },
      description: '한 페이지에 표시할 아이템 갯수',
    },
    maxPages: {
      control: { type: 'number', min:5, max:10, step: 1 },
      description: '페이지네이션에 표시할 최대 페이지 갯수',
    },
    paging: {
      action: 'paging',
      description: '변경된 페이지값을 부모 컴포넌트에 전달하는 이벤트',
      control: 'function',
      table: {
        type: {
          summary: 'defineEmits',
        }
      }
    }
  }
}
export default meta

type Story = StoryObj<typeof ContentsPagination>
export const Primary: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<typeof args>()
    return {
      components: { ContentsPagination },
      setup() {
        function changePage (page: number) {
          updateArgs({ currentPage: page })
        }
        return { args, changePage }
      },
      template: '<ContentsPagination v-bind="args" @paging="changePage" />',
    }
  },
  args: {
    totalItems: 50,
    currentPage: 1,
    pageSize: 5,
    maxPages: 5,
  },
}