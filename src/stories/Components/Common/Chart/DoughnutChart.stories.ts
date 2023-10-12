import DoughnutChart from '@/components/Common/Chart/DoughnutChart.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof DoughnutChart> = {
  component: DoughnutChart,
  parameters: {
    docs: {
      description: {
        component: '전달된 데이터에 맞게 DoughnutChart를 표현한다'
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

const data = {
  labels: ['product1', 'product2', 'product3', 'product4'],
  datasets: [
    { data: [ 612, 545, 430, 727 ], backgroundColor: ['#009ef6', '#f1416c', '#7239ea', '#ffc700'] },
  ]
}
type Story = StoryObj<typeof DoughnutChart>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { DoughnutChart },
      setup() {
        return { args }
      },
      template: `<DoughnutChart v-bind="args" />`,
    }
  },
  args: {
    data: data,
    guide: true,
    legend: false,
    legendPosition: 'bottom',
    label: false,
    height: 300,
  },
}

export const Legend: Story = {
  render: (args) => {
    return {
      components: { DoughnutChart },
      setup() {
        return { args }
      },
      template: `<DoughnutChart v-bind="args" />`,
    }
  },
  args: {
    data: data,
    guide: true,
    legend: true,
    legendPosition: 'bottom',
    label: false,
    height: 300,
  },
}

export const Label: Story = {
  render: (args) => {
    return {
      components: { DoughnutChart },
      setup() {
        return { args }
      },
      template: `<DoughnutChart v-bind="args" />`,
    }
  },
  args: {
    data: data,
    guide: true,
    legend: false,
    legendPosition: 'bottom',
    label: true,
    height: 300,
  },
}
