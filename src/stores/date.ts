import { ref } from 'vue'
import { defineStore } from 'pinia'
import { DateTime } from 'luxon'

export const dateStore = defineStore('date', () => {
  const beforeDate = ref({ // before는 비교하려는 날짜
    from: DateTime.now().minus({day: 13}), // 시작점
    to: DateTime.now().minus({day: 7}), // 종료점
    diff: 7
  })
  const afterDate = ref({ // after는 측정하려는 날짜
    from: DateTime.now().minus({day: 6}), // 시작점
    to: DateTime.now(), // 종료점
    diff: 7
  })

  function changeDate ({type, from, to}: {type: 'before'|'after', from: DateTime, to: DateTime}) {
    if (type === 'before') {
      beforeDate.value.from = from
      beforeDate.value.to = to
      beforeDate.value.diff = to.diff(from, 'days').days + 1
    } else if (type === 'after') {
      afterDate.value.from = from
      afterDate.value.to = to
      afterDate.value.diff = to.diff(from, 'days').days + 1
    }
  }
  
  return {
    beforeDate,
    afterDate,
    changeDate,
  }
})
