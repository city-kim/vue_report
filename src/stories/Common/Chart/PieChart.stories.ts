import PieChart from '@/components/Common/Chart/PieChart.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof PieChart> = {
  component: PieChart,
  parameters: {
    docs: {
      description: {
        component: '전달된 데이터에 맞게 PieChart를 표현한다'
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
    legendPosition: {
      control: 'select',
      options: ['bottom', 'right'],
      description: 'gradient 활성화 여부',
    },
    label: {
      control: 'boolean',
      description: 'label 표시 여부',
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

type Story = StoryObj<typeof PieChart>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { PieChart },
      setup() {
        return { args }
      },
      template: `<PieChart v-bind="args" />`,
    }
  },
  args: {
    data: {
      labels: ['product1', 'product2', 'product3', 'product4'],
      datasets: [
        { data: [ 612, 545, 430, 727 ], backgroundColor: ['#009ef6', '#f1416c', '#7239ea', '#ffc700'] },
      ]
    },
    guide: true,
    legend: false,
    legendPosition: 'bottom',
    label: false,
    height: 300,
  },
}
