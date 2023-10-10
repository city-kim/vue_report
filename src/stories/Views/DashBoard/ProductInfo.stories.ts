import ProductInfoScreen from '@/views/DashBoard/ProductInfoScreen.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ProductInfoScreen> = {
  component: ProductInfoScreen,
  parameters: {
    docs: {
      description: {
        component: 'DashBoard의 제품을 표시하는 ProductInfoScreen 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    colors: {
      description: 'chart에서 순서대로 출력될 색상배열',
    },
    salesChartData: {
      control: 'object',
      description: '판매량에 사용되는 가로차트 데이터',
    },
    categoryChart: {
      control: 'object',
      description: '종류별 비율 파이차트에 사용되는 데이터',
    },
    tableSortTarget: {
      control: 'object',
      description: '테이블에 사용되는 columns의 sortable값이 존재하는 데이터',
    },
    tableData: {
      control: 'object',
      description: '테이블을 출력할 columns와 rows를 가진 데이터',
    },
    isProductLoading: {
      control: 'boolean',
      description: '제품 데이터가 로딩중인지',
    },
    isPurchaseLoading: {
      control: 'boolean',
      description: '구매자 데이터가 로딩중인지',
    },
  }
}
export default meta

type Story = StoryObj<typeof ProductInfoScreen>
export const Default: Story = {
  render: (args) => {
    return {
      components: { ProductInfoScreen },
      setup() {
        return { args }
      },
      template: '<ProductInfoScreen v-bind="args" />',
    }
  },
  args: {
    colors: ['#009ef6', '#f1416c', '#7239ea', '#ffc700'],
    salesChartData: {
      labels: ['2023-01-01', '2023-01-02' , '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07' ],
      data: [
        { label: 'product1', data: [ 10, 20, 30, 40, 50, 60, 70] },
        { label: 'product2', data: [ 20, 30, 40, 50, 60, 70, 80] },
        { label: 'product3', data: [ 30, 40, 50, 60, 70, 80, 90] },
        { label: 'product4', data: [ 40, 50, 60, 70, 80, 90, 100 ] },
      ]
    },
    categoryChart: {
      labels: [ 'product1', 'product2', 'product3', 'product4' ],
      dataset: [{ data: [ 500, 1000, 1500, 2000 ] }]
    },
    tableSortTarget: [
      { key: 'value1', title: '값1', sortable: true },
      { key: 'value2', title: '값2', sortable: true },
      { key: 'value3', title: '컴포넌트', sortable: true, component: 'PercentWithIcon' }
    ],
    tableData: {
      columns: [
        { key: 'name', title: '이름'},
        { key: 'value1', title: '값1', sortable: true },
        { key: 'value2', title: '값2', sortable: true },
        { key: 'value3', title: '컴포넌트', sortable: true, component: 'PercentWithIcon'}
      ],
      rows: [
        {
          name: { text: [ '귀여운', '고양이' ], image: '/image/character/astronaut_cat.jpeg' },
          value1: { text: [ 1000 ] },
          value2: { text: [ 99000 ] },
          value3: { text: [ 5000 ] }
        },
        {
          name: { text: [ '귀여운', '여우' ], image: '/image/character/astronaut_fox.jpeg' },
          value1: { text: [ 2000 ] },
          value2: { text: [ 92100 ] },
          value3: { text: [ 4000 ] }
        },
        {
          name: { text: [ '쉐프', '고양이' ], image: '/image/character/chef_cat.jpeg' },
          value1: { text: [ 3000 ] },
          value2: { text: [ 108100 ] },
          value3: { text: [ 3000 ] }
        },
        {
          name: { text: [ '양', '늑대' ], image: '/image/character/cosplay_wolf.jpeg' },
          value1: { text: [ 4000 ] },
          value2: { text: [ 105900 ] },
          value3: { text: [ 2000 ] }
        },
        {
          name: { text: [ '힙합', '고양이' ], image: '/image/character/hip_hop_cat.jpeg' },
          value1: { text: [ 5000 ] },
          value2: { text: [ 103000 ] },
          value3: { text: [ 1000 ] }
        },
      ]
    }
  },
}

export const LargeValue: Story = {
  render: (args) => {
    return {
      components: { ProductInfoScreen },
      setup() {
        return { args }
      },
      template: '<ProductInfoScreen v-bind="args" />',
    }
  },
  args: {
    colors: ['#009ef6', '#f1416c', '#7239ea', '#ffc700'],
    salesChartData: {
      labels: Array.from({length: 31}, (_, i) => i + 1).map(x => `2023-01-${x.toString().padStart(2, '0')}`),
      data: [
        { label: 'product1', data: [ 66000, 23000, 57000, 52000, 63000, 68000, 63000, 27000, 10000, 21000, 55000, 86000, 82000, 44000, 53000, 38000, 97000, 18000, 23000, 87000, 24000, 49000, 71000, 22000, 45000, 1000, 37000, 6000, 57000, 21000, 46000 ] },
        { label: 'product2', data: [ 55000, 75000, 11000, 31000, 81000, 55000, 30000, 32000, 22000, 60000, 10000, 26000, 65000, 48000, 96000, 24000, 84000, 60000, 59000, 7000, 81000, 47000, 11000, 50000, 97000, 62000, 28000, 26000, 77000, 40000, 57000 ] },
        { label: 'product3', data: [ 44000, 20000, 47000, 58000, 83000, 75000, 65000, 60000, 26000, 9000, 87000, 99000, 30000, 59000, 60000, 75000, 65000, 95000, 36000, 51000, 39000, 2000, 32000, 20000, 1000, 3000, 98000, 9000, 10000, 52000, 13000 ] },
        { label: 'product4', data: [ 91000, 49000, 98000, 33000, 89000, 26000, 2000, 56000, 40000, 20000, 58000, 23000, 57000, 28000, 83000, 69000, 70000, 71000, 10000, 7000, 34000, 72000, 65000, 8000, 55000, 46000, 53000, 45000, 48000, 1000, 39000 ] },
      ]
    },
    categoryChart: {
      labels: [ 'product1', 'product2', 'product3', 'product4' ],
      dataset: [{ data: [ 5400000000, 5700000000, 3000000000, 1000000000 ] }]
    },
    tableSortTarget: [
      { key: 'payments', title: 'value1', sortable: true },
      { key: 'revenue', title: 'value2', sortable: true },
      { key: 'sales', title: 'value3', sortable: true, component: 'PercentWithIcon' }
    ],
    tableData: {
      columns: [
        { key: 'category', title: '이름'},
        { key: 'payments', title: 'value1', sortable: true },
        { key: 'revenue', title: 'value2', sortable: true },
        { key: 'sales', title: 'value3', sortable: true, component: 'PercentWithIcon'}
      ],
      rows: [
        {
          category: { text: [ 'ipsum', 'nec' ], image: '/image/character/astronaut_fox.jpeg' },
          payments: { text: [ 1000000 ] },
          revenue: { text: [ 31000000 ] },
          sales: { text: [ 5900000 ] }
        },
        {
          category: { text: [ 'dolor', 'libero' ], image: '/image/character/chef_cat.jpeg' },
          payments: { text: [ 2000000 ] },
          revenue: { text: [ 8000000 ] },
          sales: { text: [ 5800000 ] }
        },
        {
          category: { text: [ 'sit', 'eget' ], image: '/image/character/cosplay_wolf.jpeg' },
          payments: { text: [ 3000000 ] },
          revenue: { text: [ 7000000 ] },
          sales: { text: [ 5700000 ] }
        },
        {
          category: { text: [ 'amet', 'tincidunt' ], image: '/image/character/hip_hop_cat.jpeg' },
          payments: { text: [ 4000000 ] },
          revenue: { text: [ 20000000 ] },
          sales: { text: [ 5600000 ] }
        },
        {
          category: { text: [ 'consectetur', 'aliquet' ], image: '/image/character/hip_hop_dog.jpeg' },
          payments: { text: [ 5000000 ] },
          revenue: { text: [ 40000000 ] },
          sales: { text: [ 5500000 ] }
        },
        {
          category: { text: [ 'adipiscing', 'odio' ], image: '/image/character/hip_hop_panda.jpeg' },
          payments: { text: [ 6000000 ] },
          revenue: { text: [ 54000000 ] },
          sales: { text: [ 5400000 ] }
        },
        {
          category: { text: [ 'elit', 'Nam' ], image: '/image/character/hip_hop_pig.jpeg' },
          payments: { text: [ 7000000 ] },
          revenue: { text: [ 14000000 ] },
          sales: { text: [ 5300000 ] }
        },
        {
          category: { text: [ 'Nulla', 'hendrerit' ], image: '/image/character/pirate_cat.jpeg' },
          payments: { text: [ 8000000 ] },
          revenue: { text: [ 27000000 ] },
          sales: { text: [ 5200000 ] }
        },
        {
          category: { text: [ 'consequat', 'tortor' ], image: '/image/character/suit_dog.jpeg' },
          payments: { text: [ 9000000 ] },
          revenue: { text: [ 24000000 ] },
          sales: { text: [ 5100000 ] }
        },
        {
          category: { text: [ 'elit', 'accumsan' ], image: '/image/character/astronaut_cat.jpeg' },
          payments: { text: [ 10000000 ] },
          revenue: { text: [ 37000000 ] },
          sales: { text: [ 5000000 ] }
        },
        {
          category: { text: [ 'sit', 'rutrum' ], image: '/image/character/astronaut_fox.jpeg' },
          payments: { text: [ 11000000 ] },
          revenue: { text: [ 27000000 ] },
          sales: { text: [ 4900000 ] }
        },
        {
          category: { text: [ 'amet', 'ornare' ], image: '/image/character/chef_cat.jpeg' },
          payments: { text: [ 12000000 ] },
          revenue: { text: [ 71000000 ] },
          sales: { text: [ 4800000 ] }
        },
        {
          category: { text: [ 'dignissim', 'ipsum' ], image: '/image/character/cosplay_wolf.jpeg' },
          payments: { text: [ 13000000 ] },
          revenue: { text: [ 20000000 ] },
          sales: { text: [ 4700000 ] }
        },
        {
          category: { text: [ 'consequat', 'dignissim' ], image: '/image/character/hip_hop_cat.jpeg' },
          payments: { text: [ 14000000 ] },
          revenue: { text: [ 84000000 ] },
          sales: { text: [ 4600000 ] }
        },
        {
          category: { text: [ 'lorem', 'sapien' ], image: '/image/character/hip_hop_dog.jpeg' },
          payments: { text: [ 15000000 ] },
          revenue: { text: [ 81000000 ] },
          sales: { text: [ 4500000 ] }
        },
        {
          category: { text: [ 'accumsan', 'Praesent' ], image: '/image/character/hip_hop_panda.jpeg' },
          payments: { text: [ 16000000 ] },
          revenue: { text: [ 80000000 ] },
          sales: { text: [ 4400000 ] }
        },
        {
          category: { text: [ 'Nunc', 'sollicitudin' ], image: '/image/character/hip_hop_pig.jpeg' },
          payments: { text: [ 17000000 ] },
          revenue: { text: [ 34000000 ] },
          sales: { text: [ 4300000 ] }
        },
        {
          category: { text: [ 'dui', 'tempor' ], image: '/image/character/pirate_cat.jpeg' },
          payments: { text: [ 18000000 ] },
          revenue: { text: [ 65000000 ] },
          sales: { text: [ 4200000 ] }
        },
        {
          category: { text: [ 'mauris', 'neque' ], image: '/image/character/suit_dog.jpeg' },
          payments: { text: [ 19000000 ] },
          revenue: { text: [ 18000000 ] },
          sales: { text: [ 4100000 ] }
        },
      ]
    }
  },
}

export const EmptyValue: Story = {
  render: (args) => {
    return {
      components: { ProductInfoScreen },
      setup() {
        return { args }
      },
      template: '<ProductInfoScreen v-bind="args" />',
    }
  },
  args: {
    colors: [],
    salesChartData: {
      labels: [],
      data: []
    },
    categoryChart: {
      labels: [],
      dataset: []
    },
    tableSortTarget: [],
    tableData: {
      columns: [],
      rows: []
    }
  },
}
