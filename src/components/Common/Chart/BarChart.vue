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
import { withGuide, withoutGuide } from '@/constants/chartOptions'

import type { PropType } from 'vue'
import type { BarChartData } from '@/types/chart'

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
  }
}

const withGuideOption = Object.assign(structuredClone(barchartOption), structuredClone(withGuide))
const withoutGuideOption = Object.assign(structuredClone(barchartOption), structuredClone(withoutGuide))

const data = computed(() => props.data)
const chartOptions = computed(() => {
  const result = props.guide ? withGuideOption : withoutGuideOption
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
  
  result.plugins.tooltip.callbacks.label = (model) => {
    return `${model.formattedValue}${props.unit ?? ''}`
  }
  return result
})

</script>
<template>
  <div>
    <Bar
      :style="`max-width: 100%; height: ${props.height}px;`"
      :options="chartOptions"
      :data="data"
    />
  </div>
</template>