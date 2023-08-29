<script lang="ts" setup>
// 양수, 음수에따라 caret 아이콘 및 색상이 변경되는 퍼센트값을 출력한다
import { computed } from 'vue'
import { getPercent } from '@/util/number_converter'

import iconVue from '@/components/icon.vue'
const props = defineProps({
  base: Number,
  compare: Number,
  percent: Number,
})

const percent = computed(() => getPercent(props.compare, props.base)) // 비율계산하기
</script>
<template>
  <div
    class="component-percentage"
    :class="[percent > 0 ? 'up' : 'down']"
  >
    <iconVue
      :name="percent > 0 ? 'caret_up_fill' : 'caret_down_fill'"
      width="1rem"
      height="1rem"
    ></iconVue>
    <p>{{ Math.abs(percent) }}</p>
  </div>
</template>
<style lang="scss">
.component-percentage {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  &.up {
    color: var(--c-blue);
    svg {
      fill: var(--c-blue);
    }
  }
  &.down {
    color: var(--c-red);
    svg {
      fill: var(--c-red);
    }
  }
}
</style>