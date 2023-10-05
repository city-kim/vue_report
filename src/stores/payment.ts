import { reactive, computed, toRaw } from 'vue'
import { storeToRefs, defineStore } from 'pinia'
import { DateTime } from 'luxon'

import { PAYMENT } from '@/constants/STORES'
import { dateStore } from '@/stores/date'
import { userFlowStore } from '@/stores/userFlow'
import { paymentByDate } from '@/service/data_generator'
import { dataToDateGroup, sumArrayByObject } from '@/util/data_converter'
import { getRate } from '@/util/number_converter'

import type { Payment } from '@/types/store'

export const paymentStore = defineStore('payment', () => {
  const date = dateStore()
  const userFlow = userFlowStore()

  const { beforeDate, afterDate } = storeToRefs(date)

  const data = reactive<{ value: Array<Payment> }>({ value: [] })

  function fetechPaymentData () {
    // 서버 데이터를 가져온다
    // setTimeout(() => {
      updatePaymentData(paymentByDate())
    // }, 1000)
  }

  function updatePaymentData (payload: Array<Payment>) {
    // 데이터 업데이트 unit 테스트에도 사용됨
    data.value = payload
  }

  function getDateData (from: DateTime, to: DateTime) {
    // 시작점과 종료점을 받아서 그 사이의 데이터를 반환
    const diff = to.diff(from, 'days').days
    const index = data.value.findIndex((x) => x.date === from.toFormat('yyyy-LL-dd'))
    const result = data.value.slice(index - diff, index + 1).map(x => toRaw(x))
    const sum = result.length > 0 ? sumArrayByObject(structuredClone(result)) : PAYMENT
    return {
      array: result,
      sum: {
        ...sum
      }
    }
  }

  // 카운터가 있는 데이터
  const baseCount = computed(() => (getDateData(afterDate.value.from, afterDate.value.to)))
  const compareCount = computed(() => (getDateData(beforeDate.value.from, beforeDate.value.to)))

  // 비율을 반환
  const calculator = computed(() => ({
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
  const baseChart = computed(() => {
    const chartData = dataToDateGroup(baseCount.value.array, PAYMENT)
    return {
      day: { labels: chartData.day.map((x) => x.date), data: chartData.day},
      week: { labels: chartData.week.map((x) => x.date), data: chartData.week},
      month: { labels: chartData.month.map((x) => x.date), data: chartData.month},
    } as {
      [key: string]: {
        labels: Array<string>,
        data: Array<Payment>
      }
    }
  })
  const compareChart = computed(() => {
    const chartData = dataToDateGroup(compareCount.value.array, PAYMENT)
    return {
      day: { labels: chartData.day.map((x) => x.date), data: chartData.day},
      week: { labels: chartData.week.map((x) => x.date), data: chartData.week},
      month: { labels: chartData.month.map((x) => x.date), data: chartData.month},
    } as {
      [key: string]: {
        labels: Array<string>,
        data: Array<Payment>
      }
    }
  })
  
  return {
    fetechPaymentData,
    updatePaymentData,
    baseCount,
    compareCount,
    calculator,
    baseChart,
    compareChart
  }
})
