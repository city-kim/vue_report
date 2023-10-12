import BarChart from '@/components/Common/Chart/BarChart.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof BarChart> = {
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component: '전달된 데이터에 맞게 barChart를 표현한다'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: '차트 데이터',
    },
    guide: {
      control: 'boolean',
      description: '가이드 라인 표시 여부',
    },
    legend: {
      control: 'boolean',
      description: '범례 표시 여부(guide가 true일 때만 표시)',
    },
    stacked: {
      control: 'boolean',
      description: '스택 차트 여부(guide가 true일 때만 표시)',
    },
    horizontal: {
      control: 'boolean',
      description: '가로 차트 여부(guide가 true일 때만 표시)',
    },
    height: {
      control: { type: 'number' },
      description: '차트 높이 픽셀로 변환된다',
    },
    barPercent: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'bar의 두께 비율',
    },
    unit: {
      control: 'text',
      description: 'hover시 표시되는 단위',
    }
  }
}
export default meta

const data = {
  labels: [ '2023-08-01', '2023-08-02', '2023-08-03', '2023-08-04', '2023-08-05', '2023-08-06', '2023-08-07' ],
  datasets: [
    { label: 'product1', data: [ 612, 545, 430, 727, 185, 575, 287 ], backgroundColor: '#009ef6' },
    { label: 'product2', data: [ 912, 105, 369, 153, 926, 310, 95 ], backgroundColor: '#f1416c' },
    { label: 'product3', data: [ 333, 417, 145, 118, 269, 974, 229 ], backgroundColor: '#7239ea' },
    { label: 'product4', data: [ 915, 344, 273, 949, 627, 511, 233 ], backgroundColor: '#ffc700' },
  ]
}

type Story = StoryObj<typeof BarChart>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { BarChart },
      setup() {
        return { args }
      },
      template: `<BarChart v-bind="args" />`,
    }
  },
  args: {
    data: data,
    guide: true,
    legend: false,
    stacked: false,
    horizontal: false,
    height: 300,
  },
}

export const Legend: Story = {
  render: (args) => {
    return {
      components: { BarChart },
      setup() {
        return { args }
      },
      template: `<BarChart v-bind="args" />`,
    }
  },
  args: {
    data: data,
    guide: true,
    legend: true,
    stacked: false,
    horizontal: false,
    height: 300,
  },
}

export const Stacked: Story = {
  render: (args) => {
    return {
      components: { BarChart },
      setup() {
        return { args }
      },
      template: `<BarChart v-bind="args" />`,
    }
  },
  args: {
    data: data,
    guide: true,
    legend: false,
    stacked: true,
    horizontal: false,
    height: 300,
  },
}

export const Horizontal: Story = {
  render: (args) => {
    return {
      components: { BarChart },
      setup() {
        return { args }
      },
      template: `<BarChart v-bind="args" />`,
    }
  },
  args: {
    data: data,
    guide: true,
    legend: false,
    stacked: false,
    horizontal: true,
    height: 300,
  },
}