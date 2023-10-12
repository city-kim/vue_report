<script lang="ts" setup>
import { computed } from 'vue'
import { Chart as ChartJS, registerables} from 'chart.js'
import { Bar } from 'vue-chartjs'

import type { PropType } from 'vue'
import type { BarChartData, ChartPlugins } from '@/types/components/chart'

ChartJS.register(...registerables)

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

const data = computed(() => props.data)
const chartOptions = computed(() => {
  const result = {
    indexAxis: 'x' as 'x' | 'y', // 축정렬
    categoryPercentage: 0.8,
    responsive: true, // 반응형
    maintainAspectRatio: false, // 종횡비 유지여부
    plugins: {
      legend: {
        display: false, // 기본값은 false
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 15,
        }
      },
      datalabels: {
        display: false,
        color: '#ffffff',
      },
      tooltip: {
        callbacks: {}
      }
    } as ChartPlugins,
    scales: { //  축 삭제
      x: {
        stacked: false, // 스택여부
        ticks: { display: false }, // 라벨 삭제
        grid: { display: false }, // 그리드 삭제
        border: { display: false, dash: [5, 5] }, // border 삭제
      },
      y: {
        stacked: false,
        ticks: { display: false },
        grid: { display: false, drawTicks: false },
        border: { display: false, dash: [5, 5] }
      },
    }
  }
  if (props.guide) {
    // 활성화가 가능할때만 다른 나머지 속성이 적용된다
    props.legend ? result.plugins.legend.display = true : result.plugins.legend.display = false // 범례 표시여부
    if (props.stacked) { // 스택형태 여부
      result.scales.x.stacked = true
      result.scales.y.stacked = true
    } else {
      result.scales.x.stacked = false
      result.scales.y.stacked = false
    }

    if (props.horizontal) {
      // horizontal일 경우 축정렬을 바꾸고 grid도 x축으로 바꿔줌
      result.indexAxis = 'y'
      result.scales.x.grid.display = true
    } else {
      result.indexAxis = 'x'
      result.scales.y.grid.display = true
    }
    result.scales.x.ticks.display = true
    result.scales.y.ticks.display = true
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