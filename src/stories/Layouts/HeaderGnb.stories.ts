import { DateTime } from 'luxon'
import HeaderGnbScreen from '@/layouts/HeaderGnbScreen.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const now = DateTime.fromISO('2023-09-01').startOf('day')

const meta: Meta<typeof HeaderGnbScreen> = {
  component: HeaderGnbScreen,
  parameters: {
    docs: {
      description: {
        component: '그룹화된 버튼을 표시하고 active로 활성화된 버튼을 표현하는 컴포넌트\n\nTablet과 Mobile은 항목 내에서 확인가능'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    date: {
      date: {
        control: 'object',
        description: 'todo',
      },
      setDate: {
        control: 'object',
        description: 'todo',
      },
      dateArray: {
        control: 'object',
        description: 'todo',
      },
      compareArray: {
        control: 'object',
        description: 'todo',
      },
      comparePeriods: {
        control: 'object',
        description: 'todo',
      },
      compareTarget: {
        control: 'object',
        description: 'todo',
      },
    }
  },
}
export default meta

type Story = StoryObj<typeof HeaderGnbScreen>
export const Primary: Story = {
  render: (args) => {
    return {
      components: { HeaderGnbScreen },
      setup() {
        return { args }
      },
      template: '<HeaderGnbScreen v-bind="args"/>',
    }
  },
  args: {
    date: {
      beforeDate: {
        from: now.minus({day: 13}),
        to: now.minus({day: 7}),
      },
      afterDate: {
        from: now.minus({day: 6}),
        to: now,
      },
    },
    setDate: {
      beforeDate: {
        from: now.minus({day: 13}).toFormat('yyyy-LL-dd'),
        to: now.minus({day: 7}).toFormat('yyyy-LL-dd'),
      },
      afterDate: {
        from: now.minus({day: 6}).toFormat('yyyy-LL-dd'),
        to: now.toFormat('yyyy-LL-dd'),
      },
    },
    dateArray: [
      { key: 'free', text: '자유선택' },
      { key: 'calendar', text: '달력선택' },
      { key: 7, text: '지난 7일' },
      { key: 14, text: '지난 14일' },
      { key: 21, text: '지난 21일' },
      { key: 28, text: '지난 28일' },
      { key: 91, text: '지난 91일' },
    ],
    compareArray: [
      {key: 'periods', text: '이전 기간'},
      {key: 'year', text: '이전 연도'},
    ],
    comparePeriods: 7,
    compareTarget: 'periods'
  },
}