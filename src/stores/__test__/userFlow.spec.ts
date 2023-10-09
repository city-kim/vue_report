import { describe, it, test, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { DateTime } from 'luxon'

import { dateStore } from '@/stores/date'
import { userFlowStore } from '@/stores/userFlow'
import { USER_FLOW } from '@/constants/STORES'

const data = [
  { date: '2023-08-04', new_visit: 40, return_visit: 40, total_visit: 0, login: 40, join: 40, join_sns: { naver: 3, kakao: 4, google: 5, facebook: 6, apple: 7, }, withdraw: 40, dormant: 40, return: 40 },
  { date: '2023-08-03', new_visit: 30, return_visit: 30, total_visit: 0, login: 30, join: 30, join_sns: { naver: 2, kakao: 3, google: 4, facebook: 5, apple: 6, }, withdraw: 30, dormant: 30, return: 30 },
  { date: '2023-08-02', new_visit: 20, return_visit: 20, total_visit: 0, login: 20, join: 20, join_sns: { naver: 1, kakao: 2, google: 3, facebook: 4, apple: 5, }, withdraw: 20, dormant: 20, return: 20 },
  { date: '2023-08-01', new_visit: 10, return_visit: 10, total_visit: 0, login: 10, join: 10, join_sns: { naver: 0, kakao: 1, google: 2, facebook: 3, apple: 4, }, withdraw: 10, dormant: 10, return: 10 },
]

function setData () {
  // store의 기본 데이터 세팅용
  setActivePinia(createPinia())
  const date = dateStore()
  date.dateCustomUpdate({type: 'before' as 'before'|'after', from: DateTime.fromISO('2023-08-01'), to: DateTime.fromISO('2023-08-02')})
  date.dateCustomUpdate({type: 'after' as 'before'|'after', from: DateTime.fromISO('2023-08-03'), to: DateTime.fromISO('2023-08-04')})
  const userFlow = userFlowStore()
  return {
    userFlow
  }
}

describe('userFlow.baseCount, userFlow.compareCount는 선택된 날짜에 맞춰서 생성된다', () => {
  describe('값이 있는경우', () => {
    const store = setData()
    store.userFlow.updateUserFlowData(data)
    it('userFlow.compareCount는 각각 array와 sum을 반환한다', () => {
      expect(store.userFlow.compareCount.array).toEqual(data.slice(2))
      // date는 첫번째 index의 값, user는 result.length * 1000
      expect(store.userFlow.compareCount.sum).toEqual({ user: 2000, date: '2023-08-02', new_visit: 30, return_visit: 30, total_visit: 60, login: 30, join: 30, join_sns: { naver: 1, kakao: 3, google: 5, facebook: 7, apple: 9, }, withdraw: 30, dormant: 30, return: 30 })
    })
    
    it('userFlow.baseCount는 각각 array와 sum을 반환한다', () => {
      expect(store.userFlow.baseCount.array).toEqual(data.slice(0, 2))
      // date는 첫번째 index의 값, user는 result.length * 1000
      expect(store.userFlow.baseCount.sum).toEqual({ user: 2000, date: '2023-08-04', new_visit: 70, return_visit: 70, total_visit: 140, login: 70, join: 70, join_sns: { naver: 5, kakao: 7, google: 9, facebook: 11, apple: 13, }, withdraw: 70, dormant: 70, return: 70 })
    })
  })

  describe('날짜 범위를 벗어난경우', async () => {
    const store = setData()
    store.userFlow.updateUserFlowData(data.slice(1, 3))
    test('userFlow.compareCount, 범위에 포함된 값만 반환한다', () => {
      expect(store.userFlow.compareCount.array).toEqual([
        { date: '2023-08-02', new_visit: 20, return_visit: 20, total_visit: 0, login: 20, join: 20, join_sns: { naver: 1, kakao: 2, google: 3, facebook: 4, apple: 5, }, withdraw: 20, dormant: 20, return: 20 }
      ])
      expect(store.userFlow.compareCount.sum).toEqual({ user: 1000, date: '2023-08-02', new_visit: 20, return_visit: 20, total_visit: 40, login: 20, join: 20, join_sns: { naver: 1, kakao: 2, google: 3, facebook: 4, apple: 5, }, withdraw: 20, dormant: 20, return: 20 })
    })
    
    test('userFlow.baseCount, 범위에 포함된 값만 반환한다', () => {
      expect(store.userFlow.baseCount.array).toEqual([
        { date: '2023-08-03', new_visit: 30, return_visit: 30, total_visit: 0, login: 30, join: 30, join_sns: { naver: 2, kakao: 3, google: 4, facebook: 5, apple: 6, }, withdraw: 30, dormant: 30, return: 30 }
      ])
      expect(store.userFlow.baseCount.sum).toEqual({ user: 1000, date: '2023-08-03', new_visit: 30, return_visit: 30, total_visit: 60, login: 30, join: 30, join_sns: { naver: 2, kakao: 3, google: 4, facebook: 5, apple: 6, }, withdraw: 30, dormant: 30, return: 30 })
    })
  })

  describe('값이 없는경우', () => {
    const store = setData()
    store.userFlow.updateUserFlowData([])
    test('userFlow.compareCount, 빈 배열과 기본값을 반환한다', () => {
      expect(store.userFlow.compareCount.array).toEqual([])
      // date는 첫번째 index의 값, user는 result.length * 1000
      expect(store.userFlow.compareCount.sum).toEqual({ user: 0, ...USER_FLOW })
    })
    
    test('userFlow.baseCount, 빈 배열과 기본값을 반환한다', () => {
      expect(store.userFlow.baseCount.array).toEqual([])
      // date는 첫번째 index의 값, user는 result.length * 1000
      expect(store.userFlow.baseCount.sum).toEqual({ user: 0, ...USER_FLOW })
    })
  })
})

describe('userFlow.calculator는 userFlow.baseCount와 userFlow.compareCount에 맞춰 비율을 반환한다', () => {
  const store = setData()
  it('값이 있는경우 비율반환', () => {
    store.userFlow.updateUserFlowData(data)
    expect(store.userFlow.calculator).toEqual({
      inflowRate: { newVisit: 50, returnVisit: 50 },
      joinRate: { base: 100, compare: 100 },
      snsEmailSum: 25,
      snsRate: {
        email: 35,
        naver: 7,
        kakao: 10,
        google: 12,
        facebook: 15,
        apple: 18
      }
    })
  })

  test('값이 없는경우 snsEmailSum을 제외한 모든 값은 NaN을 반환', () => {
    store.userFlow.updateUserFlowData([])
    expect(store.userFlow.calculator).toEqual({
      inflowRate: { newVisit: NaN, returnVisit: NaN },
      joinRate: { base: NaN, compare: NaN },
      snsEmailSum: 0,
      snsRate: {
        email: NaN,
        naver: NaN,
        kakao: NaN,
        google: NaN,
        facebook: NaN,
        apple: NaN
      }
    })
  })
})

describe('userFlow.baseChart, userFlow.compareChart는 labels와 data를 반환한다', () => {
  const store = setData()
  store.userFlow.updateUserFlowData(data)
  it('userFlow.compareChart', () => {
    expect(store.userFlow.compareChart).toEqual({
      labels: ['2023-08-02', '2023-08-01'],
      data: data.slice(2)
    })
  })
  
  it('userFlow.baseChart', () => {
    expect(store.userFlow.baseChart).toEqual({
      labels: ['2023-08-04', '2023-08-03'],
      data: data.slice(0, 2)
    })
  })
})

describe('joinRateBarChart는 날짜와 가입자 값만 반환한다', () => {
  const store = setData()
  it('값이 있는경우 base 값만 추출', () => {
    store.userFlow.updateUserFlowData(data)
    expect(store.userFlow.joinRateBarChart).toEqual({ labels: [ '2023-08-04', '2023-08-03' ], data: [ 40, 30 ] })
  })

  test('값이 없는경우 빈 배열 반환', () => {
    store.userFlow.updateUserFlowData([])
    expect(store.userFlow.joinRateBarChart).toEqual({ labels: [], data: [] })
  })
})

describe('joinVisitCountChartData는 email과 join_sns에 맞는 값을 배열로 반환한다', () => {
  const store = setData()
  store.userFlow.updateUserFlowData(data)
  it('joinTrendTarget가 null일 때 전체 값을 출력', () => {
    expect(store.userFlow.joinVisitCountChartData).toEqual({ baseChartData: [ 40, 30 ], compareChartData: [ 20, 10 ] })
  })
  it('email 출력 확인', () => {
    store.userFlow.updateJoinTrendTarget('email')
    expect(store.userFlow.joinVisitCountChartData).toEqual({ baseChartData: [ 15, 10 ], compareChartData: [ 5, 0 ] })
  })
  it('naver 출력 확인', () => {
    store.userFlow.updateJoinTrendTarget('naver')
    expect(store.userFlow.joinVisitCountChartData).toEqual({ baseChartData: [ 3, 2 ], compareChartData: [ 1, 0 ] })
  })
  it('kakao 출력 확인', () => {
    store.userFlow.updateJoinTrendTarget('kakao')
    expect(store.userFlow.joinVisitCountChartData).toEqual({ baseChartData: [ 4, 3 ], compareChartData: [ 2, 1 ] })
  })
  it('google 출력 확인', () => {
    store.userFlow.updateJoinTrendTarget('google')
    expect(store.userFlow.joinVisitCountChartData).toEqual({ baseChartData: [ 5, 4 ], compareChartData: [ 3, 2 ] })
  })
  it('facebook 출력 확인', () => {
    store.userFlow.updateJoinTrendTarget('facebook')
    expect(store.userFlow.joinVisitCountChartData).toEqual({ baseChartData: [ 6, 5 ], compareChartData: [ 4, 3 ] })
  })
  it('apple 출력 확인', () => {
    store.userFlow.updateJoinTrendTarget('apple')
    expect(store.userFlow.joinVisitCountChartData).toEqual({ baseChartData: [ 7, 6 ], compareChartData: [ 5, 4 ] })
  })
})