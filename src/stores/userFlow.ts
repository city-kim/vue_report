import { ref, reactive, computed, toRaw, watch } from 'vue'
import { defineStore } from 'pinia'
import { DateTime, Interval } from 'luxon'

import { USER_FLOW } from '@/constants/STORES'
import { dateStore } from '@/stores/date'
import { userFlowByDate } from '@/service/data_generator'
import { sumArrayByObject } from '@/util/data_converter'
import { getRate } from '@/util/number_converter'

import type { JoinType, UserFlow, InflowCalculator } from '@/types/store'

export const userFlowStore = defineStore('userFlow', () => {
  const date = dateStore()
  const { beforeDate, afterDate } = date

  const data = reactive<{ value: Array<UserFlow> }>({ value: [] })

  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)
  function fetechUserFlowData () {
    // 서버 데이터를 가져온다
    data.value = []
    isLoading.value = true
    isError.value = false
    setTimeout(() => {
      updateUserFlowData(userFlowByDate({beforeDate, afterDate}))
    }, Math.random() * 1000)
  }

  function updateUserFlowData (payload: Array<UserFlow>) {
    // 데이터 업데이트 unit 테스트에도 사용됨
    isLoading.value = false
    data.value = structuredClone(payload)
  }

  watch([beforeDate, afterDate], () => {
    // 날짜가 변경된다면 데이터를 다시요청한다
    fetechUserFlowData()
  })

  function getDateData (from: DateTime, to: DateTime) {
    // 시작점과 종료점을 받아서 그 사이의 데이터를 반환
    const interval = Interval.fromDateTimes(from.startOf('day'), to.endOf('day'))
    const result = data.value.filter((x) => interval.contains(DateTime.fromISO(x.date))).map(x => toRaw(x))
    const sum = result.length > 0 ? sumArrayByObject(structuredClone(result)) : USER_FLOW

    // 총 방문자를 더해준다
    sum.total_visit = sum.new_visit + sum.return_visit
    return {
      array: result,
      sum: {
        user: result.length * 1000, // 사용자랜덤
        ...sum
      }
    }
  }
  
  // 카운터가 있는 데이터
  const baseCount = computed(() => (getDateData(afterDate.from, afterDate.to)))
  const compareCount = computed(() => (getDateData(beforeDate.from, beforeDate.to)))

  // 비율구하기
  const calculator = computed<InflowCalculator>(() => {
    const total = baseCount.value.sum.join
    const email = total - Object.values(baseCount.value.sum.join_sns).reduce((acc, cur) => acc + cur, 0)
    return {
      // 방문자 통계
      inflowRate: {
        newVisit: getRate(baseCount.value.sum.new_visit, baseCount.value.sum.total_visit),
        returnVisit: getRate(baseCount.value.sum.return_visit, baseCount.value.sum.total_visit),
      },
      // 방문자 가입률(기준, 비교)
      joinRate: {
        base: getRate(baseCount.value.sum.join, baseCount.value.sum.new_visit),
        compare: getRate(compareCount.value.sum.join, compareCount.value.sum.return_visit),
      },
      // 이메일의 경우는 join값에서 sns의 모든값을 뺀다
      snsEmailSum: baseCount.value.sum.join - Object.values(baseCount.value.sum.join_sns).reduce((acc, cur) => acc + cur, 0),
      // sns가입자 통계
      snsRate: {
        email: getRate(email, total),
        naver: getRate(baseCount.value.sum.join_sns.naver, total),
        kakao: getRate(baseCount.value.sum.join_sns.kakao, total),
        google: getRate(baseCount.value.sum.join_sns.google, total),
        facebook: getRate(baseCount.value.sum.join_sns.facebook, total),
        apple: getRate(baseCount.value.sum.join_sns.apple, total),
      }
    }
  })

  // 일자별만 있는 차트데이터
  const baseChart = computed(() => ({labels: baseCount.value.array.map((x) => x.date), data: baseCount.value.array}))
  const compareChart = computed(() => ({labels: compareCount.value.array.map((x) => x.date), data: compareCount.value.array}))

  // 방문자 가입률 하단 가입자 차트데이터
  const joinRateBarChart = computed(() => ({
    labels: baseCount.value.array.map(x => x.date),
    data: baseCount.value.array.map(x => x.join)
  }))
  
  // 가입자추이 차트데이터
  const joinTrendTarget = ref<string|null>(null)

  function updateJoinTrendTarget (jointype: string) {
    // 가입자추이 차트 대상변경하기
    joinTrendTarget.value = jointype
  }

  function getJoinTrendData (data: Array<UserFlow>) {
    // 가입자 추이 차트데이터 반환
    if (joinTrendTarget.value) {
      // JoinType이 존재하는 경우
      const target = joinTrendTarget.value as JoinType
      if (target == 'email') {
        // 이메일은 join값에서 sns의 모든값을 뺀다.
        return data.map(x => {
          const result = x.join - Object.values(x.join_sns).reduce((acc, cur) => acc + cur, 0)
          return result > 0 ? result : 0
        })
      } else {
        // 나머지는 join_sns에서 해당값을 가져온다
        return data.map(x => x.join_sns[target])
      }
    }
    // 그외는 가입자 전체를 보여줌
    return data.map(x => x.join)
  }

  const joinVisitCountChartData = computed(() => ({
    // 가입자추이 차트데이터만 반환한다
    baseChartData: getJoinTrendData(baseChart.value.data),
    compareChartData: getJoinTrendData(compareChart.value.data),
  }))
  
  return {
    isLoading,
    isError,
    fetechUserFlowData,
    updateUserFlowData,
    baseCount,
    compareCount,
    baseChart,
    compareChart,
    calculator,
    updateJoinTrendTarget,
    joinRateBarChart,
    joinVisitCountChartData
  }
})
