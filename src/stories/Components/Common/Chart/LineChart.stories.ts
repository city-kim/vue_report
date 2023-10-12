import LineChart from '@/components/Common/Chart/LineChart.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof LineChart> = {
  component: LineChart,
  parameters: {
    docs: {
      description: {
        component: '전달된 데이터에 맞게 lineChart를 표현한다'
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
      description: '범례 표시 여부',
    },
    gradient: {
      control: 'boolean',
      description: 'gradient 활성화 여부',
    },
    height: {
      control: { type: 'number' },
      description: '차트 높이 픽셀로 변환된다',
    },
    unit: {
      control: 'text',
      description: 'hover시 표시되는 단위',
    }
  }
}
export default meta

type Story = StoryObj<typeof LineChart>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { LineChart },
      setup() {
        return { args }
      },
      template: `<LineChart v-bind="args" />`,
    }
  },
  args: {
    data: {
      labels: [ '2023-08-01', '2023-08-02', '2023-08-03', '2023-08-04', '2023-08-05', '2023-08-06', '2023-08-07' ],
      datasets: [
        { label: 'product1', data: [ 612, 545, 430, 727, 185, 575, 287 ], backgroundColor: '#009ef6', borderColor: '#009ef6' },
        { label: 'product2', data: [ 912, 105, 369, 153, 926, 310, 95 ], backgroundColor: '#f1416c', borderColor: '#f1416c' },
        { label: 'product3', data: [ 333, 417, 145, 118, 269, 974, 229 ], backgroundColor: '#7239ea', borderColor: '#7239ea', fill: true },
        { label: 'product4', data: [ 915, 344, 273, 949, 627, 511, 233 ], backgroundColor: '#ffc700', borderColor: '#ffc700', borderDash: [5, 5] },
      ]
    },
    guide: true,
    legend: false,
    gradient: true,
    height: 300,
  },
}
