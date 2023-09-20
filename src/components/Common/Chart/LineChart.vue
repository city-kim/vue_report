<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Chart } from 'vue-chartjs'
import { hexToRGBA } from '@/util/text_converter'
import { WITH_GUIDE, WITHOUT_GUIDE } from '@/constants/CHART_OPTIONS'

import type { PropType } from 'vue'
import type { InteractionMode } from 'chart.js'
import type { ChartComponentRef } from 'vue-chartjs'
import type { LineChartData } from '@/types/chart'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

ChartJS.defaults.elements.point.radius = 0 // default 반지름
ChartJS.defaults.elements.point.hoverBorderWidth = 3 // hover시 border width

ChartJS.defaults.elements.line.borderWidth = 2 // default border width
ChartJS.defaults.elements.line.tension = 0.3 // 차트의 곡선 부드러움 정도

const props = defineProps({
  data: {
    type: Object as PropType<LineChartData>,
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
  gradient: { // gradient 활성화 여부
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

const WITH_GUIDEOption = Object.assign(
{
  interaction: {
    mode: 'index' as InteractionMode,
    intersect: false,
  },
}, structuredClone(WITH_GUIDE))

const WITHOUT_GUIDEOption = Object.assign(
{
  interaction: {
    mode: 'index' as InteractionMode,
    intersect: false,
  },
}, structuredClone(WITHOUT_GUIDE))

const chartRef = ref<ChartComponentRef|null>(null) // chart component의 ref
const canvas = ref<HTMLCanvasElement|undefined>(undefined) // canvas element
const gradientArray = ref<Array<CanvasGradient>>([]) // gradient를 담아줄 배열

onMounted(() => {
  if (props.gradient) {
    // gradient가 활성화일때만 실행
    if (chartRef.value) {
      canvas.value = chartRef.value.chart?.canvas
      const ctx = canvas.value?.getContext('2d')
      if (ctx) {
        gradientArray.value = Array(props.data.datasets.length) // gradientArray 초기화
        for (let i=0; i<props.data.datasets.length; i++) {
          if (props.data.datasets[i].fill) {
            // fill: true일 경우 border가 있다면 border기준 없다면 background 기준으로 gradient를 생성하여 line chart의 fill을 채워준다
            const color = props.data.datasets[i].borderColor || props.data.datasets[i].backgroundColor
            if (color) {
              // gridient 생성
              const gradientStroke = ctx.createLinearGradient(0, props.height, 0, 0) // 투명도는 linegradient로 높이는 canvas의 높이로 설정
              gradientStroke.addColorStop(0, hexToRGBA(color, 0)) // 하단의 투명도는 0
              gradientStroke.addColorStop(1, hexToRGBA(color)) // line으로 올라갈수록 투명도는 1
              gradientArray.value[i] = gradientStroke
            }
          }
        }
      }
    }
  }
})

const data = computed(() => {
  if (props.gradient) {
    // gradient가 활성화일때만 실행
    const dataset = props.data.datasets.map((x, i) => ({
      ...x,
      borderColor: gradientArray.value[i] || x.borderColor,
      backgroundColor: gradientArray.value[i] || x.backgroundColor
    }))
    return {
      ...props.data,
      datasets: dataset
    }
  }
  return props.data
})

const chartOptions = computed(() => {
  const result = props.guide ? WITH_GUIDEOption : WITHOUT_GUIDEOption
  if (props.guide) {
    // 활성화가 가능할때만 다른 나머지 속성이 적용된다
    if (props.legend) { // 범례 표시여부
      result.plugins.legend.display = true
    }
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
      ref="chartRef"
      type="line"
      :style="`max-width: 100%; height: ${props.height}px;`"
      :data="data"
      :options="chartOptions"
    />
  </div>
</template>@/constants/CHART_OPTIONS