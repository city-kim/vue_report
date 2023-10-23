<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DateTime } from 'luxon'
import { dateStore } from '@/stores/date'

import HeaderGnbScreen from '@/layouts/HeaderGnbScreen.vue'

const date = dateStore()

const dateArray = [
  { key: 'free', text: '자유선택' },
  { key: 'calendar', text: '달력선택' },
  { key: 7, text: '지난 7일' },
  { key: 14, text: '지난 14일' },
  { key: 21, text: '지난 21일' },
  { key: 28, text: '지난 28일' },
  { key: 91, text: '지난 91일' },
]
// 이전기간 선택시 사용할 배열

const comparePeriods = ref<number|string>(7) // 기간범위 자동 또는 dateAttay의 숫자
function calendarUpdateToSelect (target: string|number) {
  // 선택된 기간에 따른 캘린더 업데이트
  comparePeriods.value = target
  if (typeof comparePeriods.value == 'number') {
    // 맞춤이 아닌경우만 동작하도록 한다
    afterDate.value.to = DateTime.now().toFormat('yyyy-LL-dd') // 시작점
    afterDate.value.from = DateTime.now().minus({day: comparePeriods.value - 1}).toFormat('yyyy-LL-dd') // 오늘부터 세기때문에 -1해줌
    compareTargetSelect(undefined) // 기간이 변경되면 비교기간도 변경하기위해 compareTargetSelect를 사용한다
  }
}

const compareTarget = ref<string|number>('periods') // 비교기간 period 또는 year
function compareTargetSelect (target: string|number|undefined) {
  // compareTarget이 업데이트 된 경우
  if (target) compareTarget.value = target
  if (compareTarget.value == 'periods') {
    // 이전기간인 경우 
    date.dateDiffUpdate({from: DateTime.fromISO(afterDate.value.from), to: DateTime.fromISO(afterDate.value.to)})
  } else {
    // 아니라면 이전연도
    date.dateBeforeYear({from: DateTime.fromISO(afterDate.value.from), to: DateTime.fromISO(afterDate.value.to)})
  }
}

function callUpdateDate (type: 'after'|'before') {
  // after혹은 before에 맞춰 날짜 업데이트를 호출한다
  if (type == 'after') {
    date.dateCustomUpdate({type: 'after', from: DateTime.fromISO(afterDate.value.from), to: DateTime.fromISO(afterDate.value.to)})
  } else {
    date.dateCustomUpdate({type: 'before', from: DateTime.fromISO(beforeDate.value.from), to: DateTime.fromISO(beforeDate.value.to)})
  }
}

function inputDateUpdate ({type, target, date}: {type: 'after'|'before', target: 'from'|'to', date: string}) {
  // input Date를 직접 업데이트한경우
  comparePeriods.value = 'free'
  if (type == 'after') {
    afterDate.value[target] = date
  } else {
    beforeDate.value[target] = date
  }
  callUpdateDate(type)
}

const afterDate = ref({ from: '', to: '' }) // 기준일자
const beforeDate = ref({ from: '', to: '' }) // 비교기간

function changeDate({ from, to }: { from: DateTime, to: DateTime }) {
  // 달력에서 전달된 날짜로 변경시 comparePeriods값을 auto로 변경하고 날짜를 반영해준다
  comparePeriods.value = 'calendar'
  if (compareTarget.value == 'periods') {
    // 이전기간인 경우 
    date.dateDiffUpdate({from, to})
  } else {
    // 아니라면 이전연도
    date.dateBeforeYear({from, to})
  }
  initDate ()
}

function initDate () {
  // store에서 날짜를 가져와 표현해준다
  afterDate.value.from = date.afterDate.from.toFormat('yyyy-MM-dd')
  afterDate.value.to = date.afterDate.to.toFormat('yyyy-MM-dd')
  beforeDate.value.from = date.beforeDate.from.toFormat('yyyy-MM-dd')
  beforeDate.value.to = date.beforeDate.to.toFormat('yyyy-MM-dd')
}

onMounted(() => {
  // 마운트시 날짜를 반영해준다
  initDate()
})

</script>
<template>
  <HeaderGnbScreen
    :date="date"
    :setDate="{
      afterDate: afterDate,
      beforeDate: beforeDate
    }"
    :dateArray="dateArray"
    :compareArray="[
      {key: 'periods', text: '이전 기간'},
      {key: 'year', text: '이전 연도'},
    ]"
    :comparePeriods="comparePeriods"
    :compareTarget="compareTarget"
    @changeDate="changeDate"
    @inputDateUpdate="inputDateUpdate"
    @calendarUpdateToSelect="calendarUpdateToSelect"
    @compareTargetSelect="compareTargetSelect"
  />
</template>