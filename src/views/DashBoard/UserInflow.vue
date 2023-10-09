<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { userFlowStore } from '@/stores/userFlow'
import { getCssVar } from '@/util/color'

import UserInflowScreen from '@/views/DashBoard/UserInflowScreen.vue'

const userFlow = userFlowStore()

function changeTrendTarget (jointype: string) { // 가입자 추이 lineChart 버튼 클릭시 sns filter
  userFlow.updateJoinTrendTarget(jointype)
}

const joinVisitCountChart = computed(() => ({ // 가입자 추이 lineChart 데이터
  labels: userFlow.baseChart.labels,
  datasets: [
    { label: '기준', borderColor: getCssVar('--c-indigo'), borderDash: [3, 3] , data: userFlow.joinVisitCountChartData.baseChartData },
    { label: '비교', borderColor: getCssVar('--c-blue'), fill: true, data: userFlow.joinVisitCountChartData.compareChartData }
  ]
}))

const joinRateBarChart = computed(() => ({ // 방문자 가입률 barChart 데이터
  labels: userFlow.joinRateBarChart.labels,
  datasets: [
    { label:'가입', backgroundColor: getCssVar('--c-text-light'), data: userFlow.joinRateBarChart.data },
  ]
}))

onMounted(() => {
  // 마운트시 데이터를 호출하는 용도
  userFlow.fetechUserFlowData()
})
</script>

<template>
  <UserInflowScreen
    :inflowSum="{
      base: userFlow.baseCount.sum,
      compare: userFlow.compareCount.sum
    }"
    :inflowCalculator="userFlow.calculator"
    :joinVisitCountChart="joinVisitCountChart"
    :joinRateBarChart="joinRateBarChart"
    @joinTrendTargetChange="changeTrendTarget"
  />
</template>