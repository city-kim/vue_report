<script lang="ts" setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { WITH_GUIDE, WITHOUT_GUIDE } from '@/constants/components/CHART_OPTIONS'

import type { PropType } from 'vue'
import type { BarChartData } from '@/types/components/chart'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  data: {
    type: Object as PropType<BarChartData>,
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
  stacked: { // 차트가 스택되는 형태인지
    type: Boolean,
    required: false,
    default: false
  },
  horizontal: { // 축정렬
    type: Boolean,
    required: false,
    default: false
  },
  height: { // 차트 높이
    type: Number,
    required: false,
    default: 300
  },
  barPercent: {
    type: Number,
    required: false,
  },
  unit: String, // 단위
})

const barchartOption = { // barchart 공통 옵션
  indexAxis: 'x' as 'x' | 'y', // 축정렬
  scales: {
    x: {
      stacked: false, // 스택여부
    },
    y: {
      stacked: false,
    }
  },
  categoryPercentage: 0.8
}

const WITH_GUIDEOption = Object.assign(structuredClone(barchartOption), structuredClone(WITH_GUIDE))
const WITHOUT_GUIDEOption = Object.assign(structuredClone(barchartOption), structuredClone(WITHOUT_GUIDE))

const data = computed(() => props.data)
const chartOptions = computed(() => {
  const result = props.guide ? WITH_GUIDEOption : WITHOUT_GUIDEOption
  if (props.guide) {
    // 활성화가 가능할때만 다른 나머지 속성이 적용된다
    if (props.legend) { // 범례 표시여부
      result.plugins.legend.display = true
    }
    if (props.stacked) { // 스택형태 여부
      result.scales.x.stacked = true
      result.scales.y.stacked = true
    }
    if (props.horizontal) result.indexAxis = props.horizontal ? 'y' : 'x' // 축정렬
  }

  if (props.barPercent) result.categoryPercentage = props.barPercent // 바 너비
  
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
    <Bar
      :style="`max-width: 100%; height: ${props.height}px;`"
      :options="chartOptions"
      :data="data"
    />
  </div>
</template>