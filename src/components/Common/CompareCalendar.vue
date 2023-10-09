<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { DateTime, Info, Interval } from 'luxon'

import type { PropType } from 'vue'
import type { DayObject } from '@/types/components/compare_calendar'

import SvgIcon from '@/components/Common/SvgIcon.vue'

const props = defineProps({
  beforeDate: {
    type: Object as PropType<{
      from: DateTime,
      to: DateTime
    }>,
    required: true
  },
  afterDate: {
    type: Object as PropType<{
      from: DateTime,
      to: DateTime
    }>,
    required: true
  }
})

const emit = defineEmits<{
  // changeDate 이벤트를 부모 컴포넌트에 전달시 from과 to를 같이 전달한다
  (e: 'changeDate', { from, to }: {from: DateTime, to: DateTime}): void
}>()

// luxon에서 요일의 text를 가져온다
const DayOfWeek = Array.from(Array(7).keys()).map(x => Info.weekdays('short', {locale: 'ko'})[(x + 6) % 7])

// 달력 생성시 기준이 되는 월은 현재월로 한다
const baseMonth = ref(DateTime.now().toFormat('yyyy-MM-dd'))

onMounted(() => {
  // 마운트시 달력을 생성한다
  setCalendar(baseMonth.value)
})

function changeMonth (move: number) {
  // 전달된 move값을 기준으로 달력을 재 생성한다
  baseMonth.value = DateTime.fromISO(baseMonth.value).plus({ months: move }).toFormat('yyyy-MM-dd')
  setCalendar(baseMonth.value)
}

// 날짜를 담아줄 객체
const dayObject = ref<DayObject>({})

function setCalendar (base: string) {
  dayObject.value = {}
  for (let m=-1; m<2; m++) {
    // 이전달(-1) 이번달(0) 다음달(+1) 총 세번을 진행한다
    const baseDate = DateTime.fromISO(base).plus({ months: m }) // 기준일자로 loop에서 전달받은 month를 더한다
    const thisMonth = baseDate.toFormat('yyyy-MM') // 해당 월의 key값으로 사용한다
    if (!dayObject.value[thisMonth]) {
      // 기존에 달력이 생성되지 않은경우만 생성하도록 한다
      const firstDay = baseDate.startOf('month') // 해당 월의 firstday
      const lastDay = baseDate.endOf('month') // 해당 월의 lastDay

      const dayArray:Array<Array<DateTime>> = Array.from(Array(6), () => new Array(7).fill(undefined)) // 달력은 총 6주 7일로 구성된다
        
      const start = Number(firstDay.toFormat('c')) // 시작일의 요일번호 1 ~ 7이므로 -1해준다
      for (let i=0; i<Number(lastDay.toFormat('d')); i++) {
        // 시작일부터 마지막일까지 loop를 돌면서 해당 날짜를 dayArray에 넣어준다
        const s = start + i // 시작일 이전의 요일은 undefined로 유지하기 위해 start와 index를 더해준다
        const w = Math.floor(s/7) // 일자 / 7로 주차를 구한다
        const d = s%7 // 7로 나눈 나머지 값이 해당 주차의 요일이다
        dayArray[w][d] = firstDay.plus({ days: i }) // undefined이 아닌곳에 날자를 채워준다
      }
      dayObject.value[thisMonth] = dayArray
    }
  }
}

// 검사할 날짜 범위
const beforeInterval = computed(() =>
Interval.fromDateTimes(
  props.beforeDate.from.startOf('day'),
  props.beforeDate.to.endOf('day')
))
const afterInterval = computed(() =>
Interval.fromDateTimes(
  props.afterDate.from.startOf('day'),
  props.afterDate.to.endOf('day')
))

function activeTypeCheck (days: DateTime|undefined) {
  // 각각의 일자가 이전날짜에 포함되는지, 이후날짜에 포함되는지, 둘다 포함되는지, 아니면 비활성화인지를 체크하여 클래스를 반환한다
  if (days) {
    if (selectDate.value.from) {
      // 시작일자가 선택된경우
      if (days.diff(selectDate.value.from, 'days').days == 0) {
        // 선택된 날짜와 같은경우만 after로 활성화
        return 'after'
      }
      return ''
    }
    const before = beforeInterval.value.contains(days)
    const after = afterInterval.value.contains(days)
    if (before && after) return 'overlap'
    if (before) return 'before'
    if (after) return 'after'
  } else {
    return 'disabled'
  }
}

// 날짜가 선택되었을때 해당 값을 담아준다
const selectDate = ref<{from: DateTime|null, to: DateTime|null}>({from: null, to: null})
function changeSelectDate (days: DateTime|undefined) {
  // 선택된 날짜로 변경한다
  if (days) {
    // 날짜가 있는경우만 반영
    if (selectDate.value.from) selectDate.value.to = days
    else selectDate.value.from = days
  }
  if (selectDate.value.from && selectDate.value.to) {
    // 최종적으로 날짜가 모두 있다면 emit 해준다
    emit('changeDate', {
      from: selectDate.value.from,
      to: selectDate.value.to
    })
    selectDate.value = { from: null, to: null }
  }
}

</script>

<template>
  <div class="calendar-container">
    <button
      class="calendar-move-button"
      type="button"
      @click="changeMonth(-1)"
    >
      <SvgIcon
        name="left_double_arrow"
        width="1rem"
        height="1rem"
      ></SvgIcon>
    </button>
    <div
      class="calendar-month"
      v-for="(month, key) in dayObject"
      :key="key"
    >
      <section class="calendar-title">
        <h2>{{key}}</h2>
      </section>
      <div class="calendar-body">
        <article class="calendar-week dayofweek">
          <p
            v-for="text in DayOfWeek"
            class="calendar-day disabled"
          >{{ text }}</p>
        </article>
        <article
          class="calendar-week"
          v-for="(week, i) in month"
          :key="i"
        >
          <p
            class="calendar-day"
            :class="[activeTypeCheck(days)]"
            v-for="(days, index) in week"
            :key="index"
            @click="changeSelectDate(days)"
          >{{ days && days.toFormat('d') }}</p>
        </article>
      </div>
    </div>
    <button
      type="button"
      class="calendar-move-button"
      @click="changeMonth(1)"
    >
      <SvgIcon
        name="right_double_arrow"
        width="1rem"
        height="1rem"
      ></SvgIcon>
    </button>
  </div>
</template>

<style lang="scss">
.calendar-container {
  @include mobile {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  display: flex;
  gap:0.5rem;
  align-items: baseline;
  .calendar-move-button {
    @include mobile {
      order: -1;
      grid-column: span 1;
      text-align: center;
    }
    padding:0.25rem;
    background-color: var(--c-gray);
    cursor: pointer;
  }
  .calendar-month {
    @include mobile {
      grid-column: span 2;
    }
    .calendar-title{
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--c-gray);
    }
    .calendar-body{
      border:1px solid var(--c-white-soft);
      background: var(--c-white);
      .calendar-week{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: right;
        & ~ .calendar-week{
          border-top:1px solid var(--c-white-soft);
        }
        .calendar-day{
          min-height:1.5rem;
          padding:0.125rem 0.25rem;
          text-align: center;
          &:not(.disabled){
            cursor: pointer;
          }
          & ~ .calendar-day{
            border-left:1px solid var(--c-white-soft);
          }
          &.before{
            background-color: var(--c-orange);
            color: var(--c-white);
          }
          &.after{
            background-color: var(--c-blue);
            color: var(--c-white);
          }
          &.overlap{
            background-color: color-mix(in srgb, var(--c-orange), var(--c-blue));
            color: var(--c-white);
          }
        }
        &.dayofweek{
          border-bottom: 1px solid var(--c-divider-gray);
        }
      }
    }
  }
}
</style>