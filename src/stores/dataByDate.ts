import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { byDate } from '@/service/data_generator'
import { DateTime } from 'luxon'

export const useDataByDateStore = defineStore('dataByDate', () => {
  const beforeDate = ref({
    from: DateTime.fromISO('2023-09-06'), // 시작점
    to: DateTime.fromISO('2023-09-12'), // 종료점
  })
  const afterDate = ref({
    from: DateTime.fromISO('2021-12-29'), // 시작점
    to: DateTime.fromISO('2022-01-03'), // 종료점
  })

  const data = ref(byDate())

  function getDateData (from: DateTime, to: DateTime) {
    const diff = to.diff(from, 'days').days
    const index = data.value.findIndex((x) => x.date === from.toFormat('yyyy-LL-dd'))
    const result = data.value.slice(index - diff, index + 1)
    return {
      array: result,
      sum: {
        user: Math.floor(Math.random() * 100000), // 사용자
        new_visit: result.reduce((acc, cur) => acc + cur.new_visit, 0),
        return_visit: result.reduce((acc, cur) => acc + cur.return_visit, 0),
        login: result.reduce((acc, cur) => acc + cur.login, 0),
        join: result.reduce((acc, cur) => acc + cur.join, 0),
        withdraw: result.reduce((acc, cur) => acc + cur.withdraw, 0),
        payer: result.reduce((acc, cur) => acc + cur.payer, 0),
        payment_amount: result.reduce((acc, cur) => acc + cur.payment_amount, 0),
        refunder: result.reduce((acc, cur) => acc + cur.refunder, 0),
        refund_amount: result.reduce((acc, cur) => acc + cur.refund_amount, 0),
        dormant: result.reduce((acc, cur) => acc + cur.dormant, 0),
        return: result.reduce((acc, cur) => acc + cur.return, 0),
        join_sns: {
          naver: result.reduce((acc, cur) => acc + cur.join_sns.naver, 0),
          kakao: result.reduce((acc, cur) => acc + cur.join_sns.kakao, 0),
          google: result.reduce((acc, cur) => acc + cur.join_sns.google, 0),
          facebook: result.reduce((acc, cur) => acc + cur.join_sns.facebook, 0),
          apple: result.reduce((acc, cur) => acc + cur.join_sns.apple, 0),
        },
      }
    }
  }

  const baseCount = computed(() => (getDateData(afterDate.value.from, afterDate.value.to)))
  const compareCount = computed(() => (getDateData(beforeDate.value.from, beforeDate.value.to)))
  
  return {
    beforeDate,
    afterDate,
    baseCount,
    compareCount
  }
})
