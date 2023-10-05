import DataTable from '@/components/Common/DataTable.vue'
import { PURCHASERS } from '@/constants/STORES'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: 'columns와 rows로 구성된 테이블 데이터를 표시한다'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'columns와 rows로 구성된 테이블 데이터\n\nrow는 image와 component가 포함될 수 있으며 text는 string과 number의 배열로 구성된다\n\ntext배열의 경우 처음 나오는 number 기준으로 정렬된다',
      table: {
        type: {
          summary: 'DataTable',
          detail: `
columns: Array<{
  key: string
  title?: string
  component?: string
  sortable?: boolean
}>

rows: {
  [key: string]: {
    image?: string
    component?: string
    text: Array<string|number>
  }
}
          `
        }
      }
    },
    height: {
      control: 'text',
      description: '최대 높이값 css string',
      table: {
        type: {
          summary: 'css height',
        }
      }
    },
    sortBy: {
      control: 'select',
      options: ['columns2', 'columns3'],
      description: 'sortable이 true인 컬럼의 값으로 정렬한다',
      table: {
        type: {
          summary: 'columns의 key값',
        }
      }
    },
  }
}
export default meta

type Story = StoryObj<typeof DataTable>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { DataTable },
      setup() {
        return { args }
      },
      template: '<DataTable v-bind="args" />',
    }
  },
  args: {
    data: {
      columns: [
        { key: 'columns1', title: '기본컬럼' },
        { key: 'columns2', title: '정렬가능 컬럼', sortable: true },
        { key: 'columns3', title: '컴포넌트 컬럼', component: 'PercentWithIcon', sortable: true }
      ],
      rows: Array.from(Array(20), (_, i) => {
        return {
          columns1: {
            image: PURCHASERS[i].image,
            text: [PURCHASERS[i].first_name, PURCHASERS[i].last_name]
          },
          columns2: { text: [i * 1000] },
          columns3: { text: [10000 - i * 1000] },
        }
      }),
    },
    height: '300px',
    sortBy: 'columns1',
    
  },
}