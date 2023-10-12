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

export const OnlyText: Story = {
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
        { key: 'columns1', title: '텍스트 하나' },
        { key: 'columns2', title: '텍스트 둘'},
        { key: 'columns3', title: '텍스트 셋'},
      ],
      rows: Array.from(Array(20), () => {
        return {
          columns1: { text: ['text1'] },
          columns2: { text: ['text1', 'text2'] },
          columns3: { text: ['text1', 'text2', 'text3'] },
        }
      }),
    },
    height: '300px',
    sortBy: 'columns1',
  },
}

export const MixRows: Story = {
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
        { key: 'columns1', title: '텍스트 하나' },
        { key: 'columns2', title: '텍스트 둘'},
        { key: 'columns3', title: '컴포넌트', component: 'PercentWithIcon'},
        { key: 'columns4', title: '텍스트 셋'},
        { key: 'columns5', title: '컴포넌트 둘', component: 'PercentWithIcon'}
      ],
      rows: [
        {
          columns1: { text: ['row array의 object key 순서가 달라도'] },
          columns4: { text: ['text1', 'text2', 'text3'] },
          columns2: { text: ['columns에 따라 정렬된다'] },
          columns3: { text: [ 10 ] },
          columns5: { text: [ -20 ] },
        },
        {
          columns4: { text: ['text1', 'text2', 'text3'] },
          columns5: { text: [ -20 ] },
          columns1: { text: ['row array의 object key 순서가 달라도'] },
          columns2: { text: ['columns에 따라 정렬된다'] },
          columns3: { text: [ 10 ] },
        },
        {
          columns1: { text: ['row array의 object key 순서가 달라도'] },
          columns5: { text: [ -20 ] },
          columns2: { text: ['columns에 따라 정렬된다'] },
          columns3: { text: [ 10 ] },
          columns4: { text: ['text1', 'text2', 'text3'] },
        },
        {
          columns5: { text: [ -20 ] },
          columns3: { text: [ 10 ] },
          columns1: { text: ['row array의 object key 순서가 달라도'] },
          columns2: { text: ['columns에 따라 정렬된다'] },
          columns4: { text: ['text1', 'text2', 'text3'] },
        },
        {
          columns3: { text: [ 10 ] },
          columns1: { text: ['row array의 object key 순서가 달라도'] },
          columns2: { text: ['columns에 따라 정렬된다'] },
          columns4: { text: ['text1', 'text2', 'text3'] },
          columns5: { text: [ -20 ] },
        },
        {
          columns1: { text: ['row array의 object key 순서가 달라도'] },
          columns2: { text: ['columns에 따라 정렬된다'] },
          columns4: { text: ['text1', 'text2', 'text3'] },
          columns5: { text: [ -20 ] },
          columns3: { text: [ 10 ] },
        }
      ],
    },
    height: '300px',
    sortBy: 'columns1',
  },
}

export const ManyColumns: Story = {
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
      columns: Array.from(Array(20), (_, i) => {
        return { key: 'columns' + (i + 1), title: 'columns' + (i + 1) }
      }),
      rows: Array.from(Array(20), () => {
        return {
          columns1: { text: ['text1', 'text2'] },
          columns2: { text: ['text1'] },
          columns3: { text: ['text1', 'text2'] },
          columns4: { text: ['text1'] },
          columns5: { text: ['text1', 'text2'] },
          columns6: { text: ['text1'] },
          columns7: { text: ['text1', 'text2'] },
          columns8: { text: ['text1'] },
          columns9: { text: ['text1', 'text2'] },
          columns10: { text: ['text1'] },
          columns11: { text: ['text1', 'text2'] },
          columns12: { text: ['text1'] },
          columns13: { text: ['text1', 'text2'] },
          columns14: { text: ['text1'] },
          columns15: { text: ['text1', 'text2'] },
          columns16: { text: ['text1'] },
          columns17: { text: ['text1', 'text2'] },
          columns18: { text: ['text1'] },
          columns19: { text: ['text1', 'text2'] },
          columns20: { text: ['text1'] },
        }
      }),
    },
    height: '300px',
    sortBy: 'columns1',
  },
}