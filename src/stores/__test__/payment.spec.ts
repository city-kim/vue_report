import { describe, it, test, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { DateTime } from 'luxon'

import { dateStore } from '@/stores/date'
import { userFlowStore } from '@/stores/userFlow'
import { paymentStore } from '@/stores/payment'
import { PAYMENT } from '@/constants/STORES'

const userFlowData = [
  { date: '2023-08-04', new_visit: 40, return_visit: 40, login: 40, join: 40, join_sns: { naver: 3, kakao: 4, google: 5, facebook: 6, apple: 7, }, withdraw: 40, dormant: 40, return: 40 },
  { date: '2023-08-03', new_visit: 30, return_visit: 30, login: 30, join: 30, join_sns: { naver: 2, kakao: 3, google: 4, facebook: 5, apple: 6, }, withdraw: 30, dormant: 30, return: 30 },
  { date: '2023-08-02', new_visit: 20, return_visit: 20, login: 20, join: 20, join_sns: { naver: 1, kakao: 2, google: 3, facebook: 4, apple: 5, }, withdraw: 20, dormant: 20, return: 20 },
  { date: '2023-08-01', new_visit: 10, return_visit: 10, login: 10, join: 10, join_sns: { naver: 0, kakao: 1, google: 2, facebook: 3, apple: 4, }, withdraw: 10, dormant: 10, return: 10 },
]

const paymentData = [
  { date: '2023-08-04', payer: 10, refunder: 10, payment_amount: 10000, refund_amount: 10000 },
  { date: '2023-08-03', payer: 20, refunder: 20, payment_amount: 20000, refund_amount: 20000 },
  { date: '2023-08-02', payer: 30, refunder: 30, payment_amount: 30000, refund_amount: 30000 },
  { date: '2023-08-01', payer: 40, refunder: 40, payment_amount: 40000, refund_amount: 40000 },
]

function setData () {
  // store의 기본 데이터 세팅용
  setActivePinia(createPinia())
  const date = dateStore()
  date.changeDate({type: 'before' as 'before'|'after', from: DateTime.fromISO('2023-08-01'), to: DateTime.fromISO('2023-08-02')})
  date.changeDate({type: 'after' as 'before'|'after', from: DateTime.fromISO('2023-08-03'), to: DateTime.fromISO('2023-08-04')})
  const payment = paymentStore()
  const userFlow = userFlowStore()
  userFlow.updateUserFlowData(userFlowData)
  return {
    userFlow,
    payment
  }
}

describe('payment.baseCount, payment.compareCount는 선택된 날짜에 맞춰서 생성된다', () => {
  describe('값이 있는경우', () => {
    const store = setData()
    store.payment.updatePaymentData(paymentData)
    it('payment.compareCount는 각각 array와 sum을 반환한다', () => {
      expect(store.payment.compareCount.array).toEqual([
        { date: '2023-08-02', payer: 30, refunder: 30, payment_amount: 30000, refund_amount: 30000 },
        { date: '2023-08-01', payer: 40, refunder: 40, payment_amount: 40000, refund_amount: 40000 },
      ])
      expect(store.payment.compareCount.sum).toEqual({ date: '2023-08-02', payer: 70, refunder: 70, payment_amount: 70000, refund_amount: 70000 })
    })

    it('payment.baseCount는 각각 array와 sum을 반환한다', () => {
      expect(store.payment.baseCount.array).toEqual([
        { date: '2023-08-04', payer: 10, refunder: 10, payment_amount: 10000, refund_amount: 10000 },
        { date: '2023-08-03', payer: 20, refunder: 20, payment_amount: 20000, refund_amount: 20000 },
      ])
      expect(store.payment.baseCount.sum).toEqual({ date: '2023-08-04', payer: 30, refunder: 30, payment_amount: 30000, refund_amount: 30000 })
    })
  })

  describe('값이 없는경우', () => {
    const store = setData()
    store.payment.updatePaymentData([])
    test('payment.compareCount, 빈 배열과 기본값을 반환한다', () => {
      expect(store.payment.baseCount.array).toEqual([])
      expect(store.payment.baseCount.sum).toEqual(PAYMENT)
    })
    test('payment.baseCount, 빈 배열과 기본값을 반환한다', () => {
      expect(store.payment.baseCount.array).toEqual([])
      expect(store.payment.baseCount.sum).toEqual(PAYMENT)
    })
  })
})

describe('userFlowCalculator는 userFlowBaseCount와 userFlowCompareCount에 맞춰 비율을 반환한다', () => {
  const store = setData()
  it('값이 있는경우 비율반환', () => {
    store.payment.updatePaymentData(paymentData)
    expect(store.payment.calculator).toEqual({
      inflow: {
        paymentRates: {
          base: 21,
          compare: 50,
        },
        averagePayment: {
          base: 1000,
          compare: 1000,
        }
      },
      refund: {
        refunds: 1,
        leavers: 3,
        refundRate: 100,
        churnRate: 233,
      }
    })
  })

  test('값이 없는경우 각각 0, NaN, Infinity를 출력', () => {
    store.payment.updatePaymentData([])
    expect(store.payment.calculator).toEqual({
      inflow: {
        paymentRates: {
          base: 0,
          compare: 0,
        },
        averagePayment: {
          base: NaN,
          compare: NaN,
        }
      },
      refund: {
        refunds: 0,
        leavers: 3,
        refundRate: NaN,
        churnRate: Infinity,
      }
    })
  })
})

describe('payment.baseChart, payment.compareChart는 각각 일간, 주간, 월간데이터를 반환한다', () => {
  const store = setData()
  store.payment.updatePaymentData(paymentData)
  it('payment.baseChart', () => {
    expect(store.payment.baseChart).toEqual({
      day: {
        labels: [ '2023-08-04', '2023-08-03' ],
        data: [
          { date: '2023-08-04', payer: 10, refunder: 10, payment_amount: 10000, refund_amount: 10000 },
          { date: '2023-08-03', payer: 20, refunder: 20, payment_amount: 20000, refund_amount: 20000 },
        ]
      },
      week: { labels: [ '2023-W31' ], data: [ { date: '2023-W31', payer: 30, refunder: 30, payment_amount: 30000, refund_amount: 30000 } ] },
      month: { labels: [ '2023-08' ], data: [ { date: '2023-08', payer: 30, refunder: 30, payment_amount: 30000, refund_amount: 30000 } ] },
    })
  })

  it('payment.compareChart', () => {
    expect(store.payment.compareChart).toEqual({
      day: {
        labels: [ '2023-08-02', '2023-08-01' ],
        data: [
          { date: '2023-08-02', payer: 30, refunder: 30, payment_amount: 30000, refund_amount: 30000 },
          { date: '2023-08-01', payer: 40, refunder: 40, payment_amount: 40000, refund_amount: 40000 },
        ]
      },
      week: { labels: [ '2023-W31' ], data: [ { date: '2023-W31', payer: 70, refunder: 70, payment_amount: 70000, refund_amount: 70000 } ] },
      month: { labels: [ '2023-08' ], data: [ { date: '2023-08', payer: 70, refunder: 70, payment_amount: 70000, refund_amount: 70000 } ] },
    })
  })
})