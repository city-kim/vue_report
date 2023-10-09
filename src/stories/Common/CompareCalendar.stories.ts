import { DateTime } from 'luxon'
import { useArgs } from '@storybook/preview-api'
import { dateSort } from '@/util/data_converter'

import CompareCalendar from '@/components/Common/CompareCalendar.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof CompareCalendar> = {
  component: CompareCalendar,
  parameters: {
    docs: {
      description: {
        component: '버튼을 표시하고 onClcik 이벤트를 전달하는 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    beforeDate: {
      control: 'object',
      description: '기준이 되는 날짜',
    },
    afterDate: {
      control: 'object',
      description: '비교대상이 될 날짜',
    },
    changeDate: {
      action: 'changeDate',
      description: '달력의 날짜가 두번 클릭되서 from과 to가 변경되었을 때 DateTime을 부모에 전달한다',
      control: 'function',
      table: {
        type: {
          summary: 'defineEmits',
        }
      }
    },
  },
}
export default meta

type Story = StoryObj<typeof CompareCalendar>
export const Primary: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs<typeof args>()
    return {
      components: { CompareCalendar },
      setup() {
        function changeDate ({ from, to }: {from: DateTime, to: DateTime}) {
          const { from: fromSort, to: toSort } = dateSort(from, to)
          updateArgs({ afterDate: {
            from: fromSort,
            to: toSort,
          }})
          const diff = toSort.diff(fromSort, 'days').days
          updateArgs({ beforeDate: {
            from: fromSort.minus({day: diff + 1}),
            to: fromSort.minus({day: 1}),
          }})
        }
        return { args, changeDate }
      },
      template: '<CompareCalendar v-bind="args" @changeDate="changeDate" />',
    }
  },
  args: {
    beforeDate: {
      from: DateTime.now().minus({day: 13}),
      to: DateTime.now().minus({day: 7}),
    },
    afterDate: {
      from: DateTime.now().minus({day: 6}),
      to: DateTime.now(),
    },
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => {
    const [, updateArgs] = useArgs<typeof args>()
    return {
      components: { CompareCalendar },
      setup() {
        function changeDate ({ from, to }: {from: DateTime, to: DateTime}) {
          const { from: fromSort, to: toSort } = dateSort(from, to)
          updateArgs({ afterDate: {
            from: fromSort,
            to: toSort,
          }})
          const diff = toSort.diff(fromSort, 'days').days
          updateArgs({ beforeDate: {
            from: fromSort.minus({day: diff + 1}),
            to: fromSort.minus({day: 1}),
          }})
        }
        return { args, changeDate }
      },
      template: '<CompareCalendar v-bind="args" @changeDate="changeDate" />',
    }
  },
  args: {
    beforeDate: {
      from: DateTime.now().minus({day: 13}),
      to: DateTime.now().minus({day: 7}),
    },
    afterDate: {
      from: DateTime.now().minus({day: 6}),
      to: DateTime.now(),
    },
  },
}
