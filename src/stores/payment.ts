import { reactive, computed, toRaw, watch, ref } from 'vue'
import { defineStore } from 'pinia'
import { DateTime, Interval } from 'luxon'

import { PAYMENT } from '@/constants/STORES'
import { dateStore } from '@/stores/date'
import { userFlowStore } from '@/stores/userFlow'
import { paymentByDate } from '@/service/data_generator'
import { dataToDateGroup, sumArrayByObject } from '@/util/data_converter'
import { getRate } from '@/util/number_converter'

import type { Payment, PaymentCalculator } from '@/types/store'

export const paymentStore = defineStore('payment', () => {
  const date = dateStore()
  const userFlow = userFlowStore()

  const { beforeDate, afterDate } = date

  const data = reactive<{ value: Array<Payment> }>({ value: [] })

  const isLoading = ref<boolean>(false)
  function fetechPaymentData () {
    // 서버 데이터를 가져온다
    data.value = []
    isLoading.value = true
    setTimeout(() => {
      updatePaymentData(paymentByDate({beforeDate, afterDate}))
    }, Math.random() * 2000)
  }

  function updatePaymentData (payload: Array<Payment>) {
    // 데이터 업데이트 unit 테스트에도 사용됨
    isLoading.value = false
    data.value = structuredClone(payload)
  }
  
  watch([beforeDate, afterDate], () => {
    // 날짜가 변경된다면 데이터를 다시요청한다
    fetechPaymentData()
  })

  function getDateData (from: DateTime, to: DateTime) {
    // 시작점과 종료점을 받아서 그 사이의 데이터를 반환
    const interval = Interval.fromDateTimes(from.startOf('day'), to.endOf('day'))
    const result = data.value.filter((x) => interval.contains(DateTime.fromISO(x.date))).map(x => toRaw(x))
    const sum = result.length > 0 ? sumArrayByObject(structuredClone(result)) : PAYMENT
    return {
      array: result,
      sum: {
        ...sum
      }
    }
  }

  // 카운터가 있는 데이터
  const baseCount = computed(() => (getDateData(afterDate.from, afterDate.to)))
  const compareCount = computed(() => (getDateData(beforeDate.from, beforeDate.to)))

  // 비율을 반환
  const calculator = computed<PaymentCalculator>(() => ({
    inflow: {
      paymentRates: {
        base: getRate(baseCount.value.sum.payer, (userFlow.baseCount.sum.new_visit + userFlow.baseCount.sum.return_visit)),
        compare: getRate(compareCount.value.sum.payer, (userFlow.baseCount.sum.new_visit + userFlow.baseCount.sum.return_visit)),
      },
      averagePayment: {
        base: Math.floor(baseCount.value.sum.payment_amount / baseCount.value.sum.payer),
        compare: Math.floor(compareCount.value.sum.payment_amount / compareCount.value.sum.payer),
      }
    },
    refund: {
      refunds: getRate(baseCount.value.sum.refunder, userFlow.baseCount.sum.user),
      leavers: getRate(userFlow.baseCount.sum.withdraw, userFlow.baseCount.sum.user), 
      refundRate: getRate(baseCount.value.sum.refunder, baseCount.value.sum.payer),
      churnRate: getRate(userFlow.baseCount.sum.withdraw, baseCount.value.sum.payer)
    }
  }))

    // 차트는 일간, 주간, 월간으로 데이터를 그룹화하여 반환
  const amountChart = computed(() => {
    const chartData = dataToDateGroup(baseCount.value.array, PAYMENT)
    return {
      day: {
        labels: chartData.day.map((x) => x.date),
        payment: chartData.day.map((x) => x.payment_amount),
        refund: chartData.day.map((x) => x.refund_amount),
      },
      week: {
        labels: chartData.week.map((x) => x.date),
        payment: chartData.week.map((x) => x.payment_amount),
        refund: chartData.week.map((x) => x.refund_amount),
      },
      month: {
        labels: chartData.month.map((x) => x.date),
        payment: chartData.month.map((x) => x.payment_amount),
        refund: chartData.month.map((x) => x.refund_amount),
      },
    } as {
      [key: string]: {
        labels: Array<string>,
        payment: Array<number>
        refund: Array<number>
      }
    }
  })
  
  return {
    isLoading,
    fetechPaymentData,
    updatePaymentData,
    baseCount,
    compareCount,
    calculator,
    amountChart,
  }
})
