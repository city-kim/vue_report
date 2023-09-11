<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getRate } from '@/util/number_converter'
import { getCssVar } from '@/util/color'
const props = defineProps({
  width: {
    type: String,
    required: false,
    default: '10rem'
  },
  height: {
    type: String,
    required: false,
    default: '10rem'
  },
  base: Number,
  compare: Number,
  percent: Number,
  color: {
    type: String,
    required: false,
    default: getCssVar('--c-blue')
  },
  strokeWidth: {
    type: Number,
    required: false,
    default: 12
  }
})

const svg = ref<SVGElement|null>(null) // svg element

// props.percent가 있다면 그대로 없다면 비율계산
const percent = computed(() => props.percent ? props.percent : getRate(props.compare, props.base))
//  svg의 strokeDasharray 계산 svg의 크기 * 2 * Math.PI * 0.45(circle의 r값이 45%이기 때문에 0.45를 곱해준다)
const strokeDasharray = computed(() => svg.value?.clientWidth ? Number((svg.value?.clientWidth * 2 * Math.PI * 0.45).toFixed(2)) : 0)
const strokeDashoffset = computed(() => {
  // strokeDashoffset 계산 최대 100이 되도록 한다
  const per = percent.value / 100
  return strokeDasharray.value ? strokeDasharray.value * (1 - per) : 0
})

</script>
<template>
  <div class="progress-circle">
    <svg
      ref="svg"
      :width="props.width"
      :height="props.height"
    >
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        :stroke-width="strokeWidth"
      />
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        :stroke-width="strokeWidth"
        :style="{ strokeDasharray: `${strokeDasharray}px`, strokeDashoffset: `${strokeDashoffset}px` }"
      />
    </svg>
    <p>{{ percent }}%</p>
  </div>
</template>
<style lang="scss">
.progress-circle {
  display: inline-block;
  position: relative;
  svg {
    transform: rotate(-90deg);
    fill: none;
    circle:first-child {
      stroke: var(--color-bg-mute);
    }
    circle:last-child {
      stroke: var(--c-blue);
      stroke-linecap: square;
      transition: stroke-dashoffset 1s ease-in-out;
    }
  }
  p {
    font-size: 1.5em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>