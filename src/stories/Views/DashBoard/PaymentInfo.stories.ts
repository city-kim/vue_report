import PaymentInfoScreen from '@/views/DashBoard/PaymentInfoScreen.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof PaymentInfoScreen> = {
  component: PaymentInfoScreen,
  parameters: {
    docs: {
      description: {
        component: 'DashBoard의 유입을 표시하는 PaymentInfoScreen 컴포넌트'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    paymentSum: {
      control: 'object',
      description: '결제자수 결제액을 출력하는데 사용하는 데이터',
    },
    paymentCalculator: {
      control: 'object',
      description: '결제율, 평균결제액, 환불자, 탈퇴자, 환불율, 탈퇴율을 출력하는데 사용하는 데이터',
    },
    amountChart: {
      control: 'object',
      description: '결제 및 환불 BarChart에 사용되는 데이터',
    },
  }
}
export default meta

type Story = StoryObj<typeof PaymentInfoScreen>
export const Default: Story = {
  render: (args) => {
    return {
      components: { PaymentInfoScreen },
      setup() {
        return { args }
      },
      template: '<PaymentInfoScreen v-bind="args" />',
    }
  },
  args: {
    paymentSum: {
      base: {
        date: '2023-01-01',
        payer: 100,
        refunder: 100,
        payment_amount: 10000,
        refund_amount: 10000
      },
      compare: {
        date: '2023-01-02',
        payer: 50,
        refunder: 50,
        payment_amount: 5000,
        refund_amount: 5000
      }
    },
    paymentCalculator: {
      inflow: {
        paymentRates: {
          base: 10,
          compare: 10
        },
        averagePayment: {
          base: 10000,
          compare: 5000
        }
      },
      refund: {
        refunds: 10,
        leavers: 20,
        refundRate: 30,
        churnRate: 40
      }
    },
    amountChart: {
      day: {
        labels: Array.from({length: 7}, (_, i) => i + 1).map(x => `2023-01-${x.toString().padStart(2, '0')}`),
        payment: [100, 200, 300, 400, 500, 600, 700],
        refund: [700, 600, 500, 400, 300, 200, 100]
      },
      week: {
        labels: [ '2023-W1' ],
        payment: [2000],
        refund: [3000]
      },
      month: {
        labels: [ '2023-01' ],
        payment: [2000],
        refund: [3000]
      }
    }
  },
}

export const LargeValue: Story = {
  render: (args) => {
    return {
      components: { PaymentInfoScreen },
      setup() {
        return { args }
      },
      template: '<PaymentInfoScreen v-bind="args" />',
    }
  },
  args: {
    paymentSum: {
      base: {
        date: '2023-01-01',
        payer: 10000000,
        refunder: 10000000,
        payment_amount: 1000000000,
        refund_amount: 1000000000
      },
      compare: {
        date: '2023-01-02',
        payer: 5000000,
        refunder: 5000000,
        payment_amount: 500000000,
        refund_amount: 500000000
      }
    },
    paymentCalculator: {
      inflow: {
        paymentRates: {
          base: 1000000,
          compare: 1000000
        },
        averagePayment: {
          base: 1000000000,
          compare: 500000000
        }
      },
      refund: {
        refunds: 100,
        leavers: 90,
        refundRate: 80,
        churnRate: 70
      }
    },
    amountChart: {
      day: {
        labels: Array.from({length: 31}, (_, i) => i + 1).map(x => `2023-01-${x.toString().padStart(2, '0')}`),
        payment: [240000000, 764000000, 118000000, 928000000, 865000000, 114000000, 125000000, 414000000, 456000000, 634000000, 198000000, 619000000, 534000000, 226000000, 422000000, 476000000, 697000000, 889000000, 966000000, 951000000, 571000000, 969000000, 148000000, 963000000, 977000000, 558000000, 353000000, 460000000, 892000000, 471000000, 271000000],
        refund: [265000000, 349000000, 41000000, 905000000, 912000000, 766000000, 172000000, 199000000, 258000000, 927000000, 113000000, 927000000, 480000000, 240000000, 711000000, 362000000, 22000000, 526000000, 468000000, 595000000, 85000000, 480000000, 123000000, 602000000, 525000000, 362000000, 64000000, 616000000, 989000000, 881000000, 808000000]
      },
      week: {
        labels: [ '2023-W1', '2023-W2', '2023-W3', '2023-W4', '2023-W5', '2023-W6', '2023-W7', '2023-W8', '2023-W9', '2023-W10', '2023-W11', '2023-W12', '2023-W13', '2023-W14', '2023-W15', '2023-W16', '2023-W17', '2023-W18', '2023-W19', '2023-W20', '2023-W21', '2023-W22', '2023-W23', '2023-W24', '2023-W25', '2023-W26', '2023-W27', '2023-W28' ],
        payment: [174000000, 718000000, 114000000, 330000000, 931000000, 953000000, 38000000, 181000000, 332000000, 699000000, 506000000, 411000000, 813000000, 84000000, 645000000, 79000000, 733000000, 22000000, 432000000, 996000000, 887000000, 816000000, 423000000, 441000000, 927000000, 752000000, 650000000, 834000000],
        refund: [532000000, 711000000, 590000000, 509000000, 371000000, 223000000, 235000000, 940000000, 310000000, 491000000, 468000000, 486000000, 780000000, 886000000, 464000000, 680000000, 718000000, 836000000, 23000000, 883000000, 683000000, 113000000, 431000000, 429000000, 818000000, 357000000, 728000000, 986000000]
      },
      month: {
        labels: [ '2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12' ],
        payment: [583000000, 31000000, 281000000, 100000000, 391000000, 956000000, 209000000, 786000000, 71000000, 146000000, 830000000, 924000000],
        refund: [606000000, 479000000, 718000000, 739000000, 134000000, 981000000, 960000000, 988000000, 820000000, 647000000, 776000000, 483000000]
      }
    }
  },
}

export const EmptyValue: Story = {
  render: (args) => {
    return {
      components: { PaymentInfoScreen },
      setup() {
        return { args }
      },
      template: '<PaymentInfoScreen v-bind="args" />',
    }
  },
  args: {
    paymentSum: {
      base: {
        date: '',
        payer: 0,
        refunder: 0,
        payment_amount: 0,
        refund_amount: 0
      },
      compare: {
        date: '',
        payer: 0,
        refunder: 0,
        payment_amount: 0,
        refund_amount: 0
      }
    },
    paymentCalculator: {
      inflow: {
        paymentRates: {
          base: 0,
          compare: 0
        },
        averagePayment: {
          base: 0,
          compare: 0
        }
      },
      refund: {
        refunds: 0,
        leavers: 0,
        refundRate: 0,
        churnRate: 0
      }
    },
    amountChart: {
      day: {
        labels: [],
        payment: [],
        refund: []
      },
      week: {
        labels: [],
        payment: [],
        refund: [],
      },
      month: {
        labels: [],
        payment: [],
        refund: [],
      }
    }
  },
}