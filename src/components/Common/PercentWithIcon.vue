<script lang="ts" setup>
// 양수, 음수에따라 caret 아이콘 및 색상이 변경되는 퍼센트값을 출력한다
import { computed } from 'vue'
import { numberExpression } from '@/util/number_converter'

import SvgIcon from '@/components/Common/SvgIcon.vue'
const props = defineProps({
  percent: {
    type: Number,
    required: true,
  },
  toFixed: Number
})

const percent = computed(() => Math.abs(props.percent)) // 비율계산하기

</script>
<template>
  <div
    class="component-percentage"
    :class="[props.percent > 0 ? 'up' : 'down']"
  >
    <SvgIcon
      :name="props.percent > 0 ? 'caret_up_fill' : 'caret_down_fill'"
      width="1rem"
      height="1rem"
    ></SvgIcon>
    <p>{{ numberExpression(percent, toFixed) }}%</p>
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