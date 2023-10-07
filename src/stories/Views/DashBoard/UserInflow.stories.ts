import UserInflowScreen from '@/views/DashBoard/UserInflowScreen.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof UserInflowScreen> = {
  component: UserInflowScreen,
  parameters: {
    docs: {
      description: {
        component: 'DashBoard의 유입을 표시하는 UserInflowScreen 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    inflowSum: {
      control: 'object',
      description: 'userFlow에서 사용되는 합산된 데이터 constants/STORES.ts의 형식으로 출력된다',
    },
    inflowCalculator: {
      control: 'object',
      description: 'userFlow에서 사용되는 계산된 데이터 주로 비율에 대한 값이 존재한다',
    },
    joinVisitCountChart: {
      control: 'object',
      description: '가입자 추이에 사용되는 lineChart 데이터',
    },
    joinRateBarChart: {
      control: 'object',
      description: '방문자 가입률에 사용되는 barChart 데이터',
    }
  }
}
export default meta

type Story = StoryObj<typeof UserInflowScreen>
export const Default: Story = {
  render: (args) => {
    return {
      components: { UserInflowScreen },
      setup() {
        return { args }
      },
      template: '<UserInflowScreen v-bind="args" />',
    }
  },
  args: {
    inflowSum: {
      base: {
        date: '2023-01-01',
        new_visit: 100,
        return_visit: 100,
        total_visit: 200,
        login: 100,
        join: 100,
        join_sns: {
          naver: 10,
          kakao: 10,
          google: 15,
          facebook: 15,
          apple: 20,
        },
        withdraw: 100,
        dormant: 100,
        return: 100,
      },
      compare: {
        date: '2023-12-31',
        new_visit: 50,
        return_visit: 50,
        total_visit: 50,
        login: 50,
        join: 50,
        join_sns: {
          naver: 50,
          kakao: 50,
          google: 50,
          facebook: 50,
          apple: 50,
        },
        withdraw: 50,
        dormant: 50,
        return: 50,
      }
    },
    inflowCalculator: {
      inflowRate: {
        newVisit: 50,
        returnVisit: 50,
      },
      joinRate: {
        base: 50,
        compare: 50,
      },
      snsEmailSum: 30,
      snsRate: {
        email: 30,
        naver: 10,
        kakao: 10,
        google: 15,
        facebook: 15,
        apple: 20,
      }
    },
    joinVisitCountChart: {
      labels: [ '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06' ],
      datasets: [
        {
          label: '기준',
          borderColor: '#2c3e50',
          borderDash: [ 3, 3 ],
          data: [ 30, 10, 10, 15, 15, 20 ]
        },
        {
          label: '비교',
          borderColor: '#009ef6',
          fill: true,
          data: [ 20, 15, 15, 10, 10, 30 ]
        }
      ]
    },
    joinRateBarChart: {
      labels: [ '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06' ],
      datasets: [
        {
          label: '가입',
          backgroundColor: 'rgba(60, 60, 60, 0.66)',
          data: [ 30, 10, 10, 15, 15, 20 ]
        }
      ]
    },
  },
}

export const LargeValue: Story = {
  render: (args) => {
    return {
      components: { UserInflowScreen },
      setup() {
        return { args }
      },
      template: '<UserInflowScreen v-bind="args" />',
    }
  },
  args: {
    inflowSum: {
      base: {
        date: '2023-01-01',
        new_visit: 1000000,
        return_visit: 1000000,
        total_visit: 2000000,
        login: 1000000,
        join: 1000000,
        join_sns: {
          naver: 100000,
          kakao: 100000,
          google: 150000,
          facebook: 150000,
          apple: 200000,
        },
        withdraw: 1000000,
        dormant: 1000000,
        return: 1000000,
      },
      compare: {
        date: '2023-12-31',
        new_visit: 50,
        return_visit: 50,
        total_visit: 50,
        login: 50,
        join: 50,
        join_sns: {
          naver: 50,
          kakao: 50,
          google: 50,
          facebook: 50,
          apple: 50,
        },
        withdraw: 50,
        dormant: 50,
        return: 50,
      }
    },
    inflowCalculator: {
      inflowRate: {
        newVisit: 50000,
        returnVisit: 50000,
      },
      joinRate: {
        base: 50000,
        compare: 50000,
      },
      snsEmailSum: 30000,
      snsRate: {
        email: 30000,
        naver: 10000,
        kakao: 10000,
        google: 15000,
        facebook: 15000,
        apple: 20000,
      }
    },
    joinVisitCountChart: {
      labels: [ '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06' ],
      datasets: [
        {
          label: '기준',
          borderColor: '#2c3e50',
          borderDash: [ 3, 3 ],
          data: [ 30000, 10000, 10000, 15000, 15000, 20000 ]
        },
        {
          label: '비교',
          borderColor: '#009ef6',
          fill: true,
          data: [ 20000, 15000, 15000, 10000, 10000, 30000 ]
        }
      ]
    },
    joinRateBarChart: {
      labels: [ '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06' ],
      datasets: [
        {
          label: '가입',
          backgroundColor: 'rgba(60, 60, 60, 0.66)',
          data: [ 30000, 10000, 10000, 15000, 15000, 20000 ]
        }
      ]
    },
  },
}

export const EmptyValue: Story = {
  render: (args) => {
    return {
      components: { UserInflowScreen },
      setup() {
        return { args }
      },
      template: '<UserInflowScreen v-bind="args" />',
    }
  },
  args: {
    inflowSum: {
      base: {
        date: '',
        new_visit: 0,
        return_visit: 0,
        total_visit: 0,
        login: 0,
        join: 0,
        join_sns: {
          naver: 0,
          kakao: 0,
          google: 0,
          facebook: 0,
          apple: 0,
        },
        withdraw: 0,
        dormant: 0,
        return: 0,
      },
      compare: {
        date: '',
        new_visit: 0,
        return_visit: 0,
        total_visit: 0,
        login: 0,
        join: 0,
        join_sns: {
          naver: 0,
          kakao: 0,
          google: 0,
          facebook: 0,
          apple: 0,
        },
        withdraw: 0,
        dormant: 0,
        return: 0,
      }
    },
    inflowCalculator: {
      inflowRate: {
        newVisit: 0,
        returnVisit: 0,
      },
      joinRate: {
        base: 0,
        compare: 0,
      },
      snsEmailSum: 0,
      snsRate: {
        email: 0,
        naver: 0,
        kakao: 0,
        google: 0,
        facebook: 0,
        apple: 0,
      }
    },
    joinVisitCountChart: {
      labels: [],
      datasets: [
        {
          label: '기준',
          borderColor: '#2c3e50',
          borderDash: [ 3, 3 ],
          data: [],
        },
        {
          label: '비교',
          borderColor: '#009ef6',
          fill: true,
          data: [],
        }
      ]
    },
    joinRateBarChart: {
      labels: [],
      datasets: [
        {
          label: '가입',
          backgroundColor: 'rgba(60, 60, 60, 0.66)',
          data: [],
        }
      ]
    },
  },
}