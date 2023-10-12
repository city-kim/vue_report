import { ref } from 'vue'
import { defineStore } from 'pinia'
import { DateTime } from 'luxon'

import { dateSort } from '@/util/data_converter'

export const dateStore = defineStore('date', () => {
  const beforeDate = ref({ // before는 비교하려는 날짜
    from: DateTime.now().minus({day: 13}), // 시작점
    to: DateTime.now().minus({day: 7}), // 종료점
  })
  const afterDate = ref({ // after는 측정하려는 날짜
    from: DateTime.now().minus({day: 6}), // 시작점
    to: DateTime.now(), // 종료점
  })

  function dateCustomUpdate ({type, from, to}: {type: 'before'|'after', from: DateTime, to: DateTime}) {
    // 전달된 날짜로 변경한다
    const { from: fromSort, to: toSort } = dateSort(from, to)
    if (type === 'before') {
      beforeDate.value.from = fromSort
      beforeDate.value.to = toSort
    } else if (type === 'after') {
      afterDate.value.from = fromSort
      afterDate.value.to = toSort
    }
  }

  function dateDiffUpdate ({from, to}: {from: DateTime, to: DateTime}) {
    // 전달된 날짜를 기반으로 계산하여 같은 일자만큼 beforeDate를 변경한다
    const { from: fromSort, to: toSort } = dateSort(from, to)
    afterDate.value.from = fromSort
    afterDate.value.to = toSort

    const diff = toSort.diff(fromSort, 'days').days
    beforeDate.value.to = fromSort.minus({day: 1})
    beforeDate.value.from = beforeDate.value.to.minus({day: diff})
  }

  function dateBeforeYear ({from, to}: {from: DateTime, to: DateTime}) {
    // beforeDate의 시작점이 1년전으로 변경된다
    const { from: fromSort, to: toSort } = dateSort(from, to)
    afterDate.value.from = fromSort
    afterDate.value.to = toSort

    beforeDate.value.from = afterDate.value.from.minus({year: 1})
    beforeDate.value.to = afterDate.value.to.minus({year: 1})
  }
  
  return {
    beforeDate,
    afterDate,
    dateCustomUpdate,
    dateDiffUpdate,
    dateBeforeYear
  }
})
