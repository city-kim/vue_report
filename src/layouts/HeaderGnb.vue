<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DateTime } from 'luxon'
import { dateStore } from '@/stores/date'

import CompareCalendar from '@/components/Common/CompareCalendar.vue'
import SvgIcon from '@/components/Common/SvgIcon.vue'

const date = dateStore()

const dateArray = [7, 14, 21, 28, 91] // 이전기간 선택시 사용할 배열

const comparePeriods = ref<number|undefined>(undefined) // 기간범위 자동 또는 dateAttay의 숫자
function calendarUpdateToSelect () {
  // 선택된 기간에 따른 캘린더 업데이트
  if (comparePeriods.value) {
    // 맞춤이 아닌경우만 동작하도록 한다
    afterDate.value.to = DateTime.now().toFormat('yyyy-LL-dd') // 시작점
    afterDate.value.from = DateTime.now().minus({day: comparePeriods.value - 1}).toFormat('yyyy-LL-dd') // 오늘부터 세기때문에 -1해줌
  }
  compareTargetSlect() // 기간이 변경되면 비교기간도 변경하기위해 compareTargetSlect을 사용한다
}

const compareTarget = ref<string>('periods') // 비교기간 period 또는 year
function compareTargetSlect () {
  // compareTarget이 업데이트 된 경우
  if (comparePeriods.value) {
    // 기존에 기간범위가 선택된 경우만 동작하도록 한다
    if (compareTarget.value == 'periods') {
      // 이전기간인 경우 계산해서 반영해준다
      beforeDate.value.to = DateTime.now().minus({day: comparePeriods.value}).toFormat('yyyy-LL-dd')
      beforeDate.value.from = DateTime.now().minus({day: comparePeriods.value * 2 - 1}).toFormat('yyyy-LL-dd') // 첫날부터 세기때문에 하루빼줌
    } else {
      // 아니라면 이전연도
      beforeDate.value.from = DateTime.fromISO(afterDate.value.from).minus({year: 1}).toFormat('yyyy-LL-dd')
      beforeDate.value.to =  DateTime.fromISO(afterDate.value.to).minus({year: 1}).toFormat('yyyy-LL-dd')
    }
    callUpdateDate('after')
    callUpdateDate('before')
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

const calendarOpen = ref<boolean>(false) // 달력 오픈여부

const afterDate = ref({ from: '', to: '' }) // 기준일자
const beforeDate = ref({ from: '', to: '' }) // 비교기간

function changeDate({ from, to }: { from: DateTime, to: DateTime }) {
  // 달력에서 전달된 날짜로 변경시 comparePeriods값을 auto로 변경하고 날짜를 반영해준다
  comparePeriods.value = undefined
  date.dateDiffUpdate({from, to})
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
  <header class="headergnb">
    <div class="headergnb-container">
      <div
        class="headergnb-preview"
        @click.stop="calendarOpen = !calendarOpen"
      >
        <SvgIcon
          name="calendar_check"
          width="24"
          height="24"
        ></SvgIcon>
        <p>기준일자: {{ date.afterDate.from.toFormat('yyyy-MM-dd') }} ~ {{ date.afterDate.to.toFormat('yyyy-MM-dd') }}</p>
        <p>비교기간: {{ date.beforeDate.from.toFormat('yyyy-MM-dd') }} ~ {{ date.beforeDate.to.toFormat('yyyy-MM-dd') }}</p>
        <SvgIcon
          :name="calendarOpen ? 'caret_up' : 'caret_down'"
          width="24"
          height="24"
        ></SvgIcon>
      </div>
      <div
        v-show="calendarOpen"
        class="headergnb-calendar"
      >
        <CompareCalendar
          :beforeDate="date.beforeDate" 
          :afterDate="date.afterDate"
          @changeDate="changeDate"
        />
        <div class="headergnb-calendar-selector">
          <fieldset>
            <label>기간</label>
            <select
              v-model="comparePeriods"
              @change.lazy="calendarUpdateToSelect()"
            >
              <option :value="undefined">맞춤</option>
              <option v-for="n in dateArray"
                :value="n"
                :key="n"
              >지난 {{ n }}일</option>
            </select>
          </fieldset>
          <fieldset>
            <input
              v-model="afterDate.from"
              type="date"
              @change.lazy="callUpdateDate('after')"
            />
            <span>~</span>
            <input
              v-model="afterDate.to"
              type="date"
              @change.lazy="callUpdateDate('after')"
            />
          </fieldset>
          <fieldset>
            <select
              v-model="compareTarget"
              @change.lazy="compareTargetSlect()"
            >
              <option value="periods">이전 기간</option>
              <option value="year">이전 연도</option>
            </select>
          </fieldset>
          <fieldset
            v-show="compareTarget == 'periods'"
          >
            <input
              v-model="beforeDate.from"
              type="date"
              @change.lazy="callUpdateDate('before')"
            />
            <span>~</span>
            <input
              v-model="beforeDate.to"
              type="date"
              @change.lazy="callUpdateDate('before')"
            />
          </fieldset>
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="scss">
  .headergnb {
    padding: 2rem;
    background: var(--c-white);
    position: relative;
    .headergnb-container {
      max-width: 1500px;
      margin: 0 auto;
      .headergnb-preview {
        display: flex;
        gap: 1rem;
        align-items: center;
        cursor: pointer;
        p:nth-child(2) {
          font-size: 1.125rem;
          font-weight: 700;
        }
        p:nth-child(3) {
          color: var(--c-text-light-2);
        }
      }

      .headergnb-calendar {
        display: flex;
        padding: 2rem;
        border-radius: 1rem;
        gap: 1rem;
        background: var(--c-white);
        position: absolute;
        z-index: 10;
        box-shadow: rgba(140, 149, 159, 0.15) 0px 3px 6px;
        .headergnb-calendar-selector {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          fieldset {
            display: flex;
            gap: 0.5rem;
            :where(select, input[type=date]) {
              padding: 0.125rem;
              border: 1px solid var(--c-gray);
            }
          }
        }
      }
    }
  }
</style>