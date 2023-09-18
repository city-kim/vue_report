<script lang="ts" setup>
import { ref } from 'vue'
import { DateTime } from 'luxon'

import SvgIcon from '@/components/Common/SvgIcon.vue'
// 1. luxon을 활용하여 달력을 생성한다
// 2. 달력은 지난달 현재 다음달 총 3개가 출력된다
// 3. 달력은 지난7일, 14일, 21일, 28일, 91일을 선택할 수 있고 자유선택도 가능하다
// 4. 달력의 기준일(시작 ~ 종료)을 선택할 수 있고 비교기간을 선택할 수 있다
// 5. 비교기간이라는 체크박스가를 체크하면 자동으로 비교일(시작 ~ 종료)이 선택된다 이전기간만큼 또는 이전년도로 한다
// 6. 비교기간 체크박스를 선택하지 않을경우 비교일을 자유로 선택할 수도 있다
// 7. 달력의 날자별로 배경색을 이전기간을 #ff6600 비교일을 #0033CC 겹치는 날은 #804c66으로 한다
// 8. 달력은 하나의 row에 7개의 일자가 표시되며 시작은 일요일로 한다
// 9. 달력은 총 6개의 row를 가지는데 선택할 수 없는 row는 회색으로 칠해진다

interface DayObject {
  // key는 yyyy-mm 형태의 week Date는 이중배열로 첫 배열은 주차, 두번째 배열은 일자
  [key: string]: Array<Array<DateTime|undefined>>
}

const dayObject = ref<DayObject>({})

function setCalendar (base: string) {
  dayObject.value = Object.assign({}, {})
  for (let m=-1; m<2; m++) {
    // 이전달(-1) 이번달(0) 다음달(+1) 총 세번을 진행한다
    const baseDate = DateTime.fromISO(base).plus({ months: m }) // 기준일자로 loop에서 전달받은 month를 더한다
    const thisMonth = baseDate.toFormat('yyyy-MM') // 해당 월의 key값으로 사용한다
    if (!dayObject.value[thisMonth]) {
      // 기존에 달력이 생성되지 않은경우만 생성하도록 한다
      const firstDay = baseDate.startOf('month') // 해당 월의 firstday
      const lastDay = baseDate.endOf('month') // 해당 월의 lastDay

      const dayArray:Array<Array<DateTime>> = Array.from(Array(6), () => new Array(7).fill(undefined)) // 달력은 총 6주 7일로 구성된다
        
      const start = Number(firstDay.toFormat('c')) - 1 // 시작일의 요일번호 1 ~ 7이므로 -1해준다
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

setCalendar(DateTime.now().toFormat('yyyy-MM-dd'))
</script>

<template>
  <div class="calendar-container">
    <div
      class="calendar-month"
      v-for="(month, key) in dayObject"
      :key="key"
    >
      <section class="calendar-title">
        <SvgIcon
          name="left_double_arrow"
          width="1rem"
          height="1rem"
        ></SvgIcon>
        <h2>{{key}}</h2>
        <SvgIcon
          name="right_double_arrow"
          width="1rem"
          height="1rem"
        ></SvgIcon>
      </section>
      <div class="calendar-body">
        <article
          class="calendar-week"
          v-for="(week, i) in month"
          :key="i"
        >
          <p
            class="calendar-day"
            :class="{disabled: !days}"
            v-for="(days, index) in week"
            :key="index"
          >{{ days && days.toFormat('d') }}
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<style>
.calendar-container{display: flex; gap:5rem; justify-content: baseline; }
.calendar-title{ display: flex; align-items: center; justify-content: space-between; }
.calendar-title svg{ cursor: pointer; }
.calendar-title h2{ cursor: pointer; }
.calendar-body{ border:1px solid #ccc; }
.calendar-week{ display: grid; grid-template-columns: repeat(7, 1fr); text-align: right; }
.calendar-week ~ .calendar-week{ border-top:1px solid #ccc; }
.calendar-day{ min-height:1.75rem; padding:0.25rem; }
.calendar-day:not(.disabled){ cursor: pointer; }
.calendar-day ~ .calendar-day{ border-left:1px solid #ccc; }
.calendar-day.disabled{ background: #ddd; }
</style>