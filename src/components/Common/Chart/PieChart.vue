<script lang="ts" setup>
import { computed } from 'vue'
import { Chart as ChartJS, registerables} from 'chart.js'
import { Chart } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { WITH_GUIDE, WITHOUT_GUIDE } from '@/constants/components/CHART_OPTIONS'

import type { PropType } from 'vue'
import type { PieChartData } from '@/types/components/chart'

ChartJS.register(...registerables, ChartDataLabels)

const props = defineProps({
  data: {
    type: Object as PropType<PieChartData>,
    required: true
  },
  guide: { // 활성화 여부
    type: Boolean,
    required: false,
    default: true
  },
  legend: { // 범례 표시 여부
    type: Boolean,
    required: false,
    default: false
  },
  legendPosition: { // 범례위치
    type: String as PropType<'bottom'|'right'>,
    required: false,
    default: 'bottom'
  },
  label: {
    type: Boolean,
    required: false,
    default: false
  },
  height: { // 차트 높이
    type: Number,
    required: false,
    default: 300
  },
  unit: String, // 단위
})

// pie chart는 ticks, grid, border를 삭제
const WITH_GUIDEOption = Object.assign(structuredClone(WITH_GUIDE),
{
  scales: {
    x: {
      ticks: { display: false }, // 라벨 삭제
      grid: { display: false }, // 그리드 삭제
      border: { display: false }, // border 삭제
    },
    y: {
      ticks: { display: false }, // 라벨 삭제
      grid: { display: false }, // 그리드 삭제
      border: { display: false }, // border 삭제
    }
  },
  elements: {
    arc: {
      borderWidth: 0.5
    }
  }
})

const WITHOUT_GUIDEOption = Object.assign({}, structuredClone(WITHOUT_GUIDE))

const data = computed(() => props.data)
const chartOptions = computed(() => {
  const result = props.guide ? WITH_GUIDEOption : WITHOUT_GUIDEOption
  if (props.guide) {
    // 활성화가 가능할때만 다른 나머지 속성이 적용된다
    if (props.legend) { // 범례 표시여부
      result.plugins.legend.position = props.legendPosition
      result.plugins.legend.align = 'center'
      result.plugins.legend.display = true
    } else {
      result.plugins.legend.display = false
    }
  }
  if (props.label) {
    // label 표시는 active와 상관없이 체크
    result.plugins.datalabels.display = true
    // label 표시중에 소수점이 나오는것을 방지
    result.plugins.datalabels.formatter = (value) => {
      return `${Math.floor(value)}${props.unit ?? ''}`
    }
  } else {
    result.plugins.datalabels.display = false
  }

  result.plugins.tooltip.callbacks.label = (model) => {
    let label = model.dataset.label || ''
    if (label) label += ': '
    return `${label}${model.formattedValue}${props.unit ?? ''}`
  }
  return result
})

</script>
<template>
  <div class="chart-container">
    <Chart
      type="pie"
      :style="`max-width: 100%; height: ${props.height}px;`"
      :options="chartOptions"
      :data="data"
    />
  </div>
</template>