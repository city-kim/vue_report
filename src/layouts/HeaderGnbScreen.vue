<script setup lang="ts">
import { ref } from 'vue'
import { DateTime } from 'luxon'

import SelectBox from '@/components/Common/SelectBox.vue'
import CompareCalendar from '@/components/Common/CompareCalendar.vue'
import SvgIcon from '@/components/Common/SvgIcon.vue'

import type { PropType } from 'vue'
import type { DateParameter } from '@/types/store'
import type { SelectItem } from '@/types/components/mixed'

defineProps({
  date: { // 실제 적용되는 날짜
    type: Object as PropType<DateParameter>,
    required: true
  },
  setDate: { // 변결될 날짜
    type: Object as PropType<{
      afterDate: {from: string, to: string}
      beforeDate: {from: string, to: string}
    }>,
    required: true
  },
  dateArray: { // 범위선택시 사용되는 날짜
    type: Array as PropType<Array<SelectItem>>,
    required: true
  },
  compareArray: { // 비교군으로 세팅될 일자
    type: Array as PropType<Array<SelectItem>>,
    required: true
  },
  comparePeriods: {
    type: [String, Number],
    required: true
  },
  compareTarget: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits<{
  (e: 'changeDate', { from, to }: {from: DateTime, to: DateTime}): void
  (e: 'inputDateUpdate', {type, target, date}: {type: 'after'|'before', target: 'from'|'to', date: string}): void
  (e: 'calendarUpdateToSelect', target: string|number): void
  (e: 'compareTargetSelect', target: string|number): void
}>()

const calendarOpen = ref<boolean>(false) // 달력 오픈여부

function inputDateUpdate ({type, target, event}: {type: 'after'|'before', target: 'from'|'to', event: Event}) {
  // input Date를 직접 업데이트한경우
  const date = (event.target as HTMLInputElement).value
  emit('inputDateUpdate', {type, target, date: date})
}

function calendarUpdateToSelect (target: string|number) {
  // 기간을 선택한경우
  emit('calendarUpdateToSelect', target)
}

function compareTargetSelect (target: string|number) {
  // 비교범위를 선택한경우
  emit('compareTargetSelect', target)
}

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
          @changeDate="emit('changeDate', $event)"
        />
        <div class="headergnb-calendar-selector">
          <fieldset>
            <label>기간</label>
            <SelectBox
              :active="comparePeriods"
              :options="dateArray"
              @updateSelected="calendarUpdateToSelect"
            ></SelectBox>
          </fieldset>
          <fieldset>
            <input
              type="date"
              :value="setDate.afterDate.from"
              @change="inputDateUpdate({type: 'after', target: 'from', event: $event})"
            />
            <span>~</span>
            <input
              type="date"
              :value="setDate.afterDate.to"
              @change="inputDateUpdate({type: 'after', target: 'to', event: $event})"
            />
          </fieldset>
          <fieldset>
            <SelectBox
              :active="compareTarget"
              :options="compareArray"
              @updateSelected="compareTargetSelect"
            ></SelectBox>
          </fieldset>
          <fieldset
            v-show="compareTarget == 'periods'"
          >
            <input
              type="date"
              :value="setDate.beforeDate.from"
              @change="inputDateUpdate({type: 'before', target: 'from', event: $event})"
            />
            <span>~</span>
            <input
              type="date"
              :value="setDate.beforeDate.to"
              @change="inputDateUpdate({type: 'before', target: 'to', event: $event})"
            />
          </fieldset>
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="scss">
  .headergnb {
    @include mobile {
      padding: 1rem;
    }
    padding: 2rem;
    background: var(--c-white);
    position: relative;
    .headergnb-container {
      max-width: $breakpoint-wide;
      margin: 0 auto;
      .headergnb-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        cursor: pointer;
        p:nth-child(2) {
          @include mobile {
            font-size: 1rem;
            flex: 0 0 auto;
          }
          font-size: 1.125rem;
          font-weight: 700;
        }
        p:nth-child(3) {
          color: var(--c-text-light);
        }
      }

      .headergnb-calendar {
        @include mobile {
          display: block;
          padding: 0.5rem;
        }
        @include tablet {
          display: grid;
          padding: 1rem;
        }
        display: flex;
        padding: 2rem;
        border-radius: 1rem;
        gap: 1rem;
        background: var(--c-white);
        position: absolute;
        z-index: 10;
        box-shadow: var(--color-shadow) 0px 6px 6px;
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