<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { userFlowStore } from '@/stores/userFlow'
import { getCssVar } from '@/util/color'
import { JOIN_SNS } from '@/constants/STORES'

import ContainerHeading from '@/components/DashBoard/ContainerHeading.vue'
import ProgressCounter from '@/components/DashBoard/ProgressCounter.vue'

import TitlePercent from '@/components/Mixed/TitlePercent.vue'
import TitleLineProgress from '@/components/Mixed/TitleLineProgress.vue'

import ButtonGroup from '@/components/Common/ButtonGroup.vue'
import BarChart from '@/components/Common/Chart/BarChart.vue'
import LineChart from '@/components/Common/Chart/LineChart.vue'

const userFlow = userFlowStore()

const inflow = computed(() => ([
  {
    title: '신규',
    count: userFlow.baseCount.sum.new_visit,
    percent: userFlow.calculator.inflowRate.newVisit,
    color: getCssVar('--c-blue')},
  {
    title: '재방문',
    count: userFlow.baseCount.sum.return_visit,
    percent: userFlow.calculator.inflowRate.returnVisit,
    color: getCssVar('--c-green')
  }
]))

const sns = computed(() => {
  return [
    {
      title: '이메일',
      count: userFlow.calculator.snsEmailSum,
      percent: userFlow.calculator.snsRate.email,
      color: '--c-purple'
    },
    {
      title: '네이버',
      count: userFlow.baseCount.sum.join_sns.naver,
      percent: userFlow.calculator.snsRate.naver,
      color: '--c-green'
    },
    {
      title: 'KAKAO',
      count: userFlow.baseCount.sum.join_sns.kakao,
      percent: userFlow.calculator.snsRate.kakao,
      color: '--c-yellow'
    },
    {
      title: 'google',
      count: userFlow.baseCount.sum.join_sns.google,
      percent: userFlow.calculator.snsRate.google,
      color: '--c-red'
    },
    {
      title: 'facebook',
      count: userFlow.baseCount.sum.join_sns.facebook,
      percent: userFlow.calculator.snsRate.facebook,
      color: '--c-blue'
    },
    {
      title: 'apple',
      count: userFlow.baseCount.sum.join_sns.apple,
      percent: userFlow.calculator.snsRate.apple,
      color: '--c-indigo'
    },
  ]
})

function updateActive (jointype: string) {
  userFlow.updateJoinTrendTarget(jointype)
}

const joinVisitCountChart = computed(() => {
  return {
    labels: userFlow.baseChart.labels,
    datasets: [
      { label: '기준', borderColor: getCssVar('--c-indigo'), borderDash: [3, 3] , data: userFlow.joinVisitCountChartData.baseChartData },
      { label: '비교', borderColor: getCssVar('--c-blue'), fill: true, data: userFlow.joinVisitCountChartData.compareChartData }
    ]
  }
})

onMounted(() => {
  // 마운트시 데이터를 호출하는 용도
  userFlow.fetechUserFlowData()
})
</script>

<template>
  <ContainerHeading
    h2="유입"
  >
    <div class="dashboard-userinflow-body">
      <div class="dashboard-userinflow-body-left">
        <ProgressCounter
          title="전체방문자"
          :base="userFlow.baseCount.sum.new_visit + userFlow.baseCount.sum.return_visit"
          :compare="userFlow.compareCount.sum.new_visit + userFlow.compareCount.sum.return_visit"
          :progressData="inflow"
        />
        <div>
          <TitlePercent
            title="방문자 가입률"
            :base="userFlow.calculator.joinRate.base"
            :compare="userFlow.calculator.joinRate.compare"
            :percent="50"
            :toFixed="1"
            unit="%"
          />
          <BarChart :data="{
            labels: userFlow.joinRateBarChart.labels,
            datasets: [
              { label:'가입', backgroundColor: getCssVar('--c-text-light-2'), data: userFlow.joinRateBarChart.data },
            ]}"
            :height="80"
            :guide="false"
            :barPercent="0.2"
            unit="명"
          />
        </div>
      </div>
      <div class="dashboard-userinflow-body-center">
        <TitlePercent
          title="신규가입자"
          :base="userFlow.baseCount.sum.join"
          :compare="userFlow.compareCount.sum.join"
          :percent="50"
        />
        <div>
          <TitleLineProgress
            v-for="(item, index) in sns"
            :key="index"
            :title="item.title"
            :count="item.count"
            :percent="item.percent"
            :color="getCssVar(item.color)"
          />
        </div>
      </div>
      <div class="dashboard-userinflow-body-right">
        <article>
          <h2>가입자 추이</h2>
          <ButtonGroup
            :buttons="JOIN_SNS"
            @updateActive="updateActive"
          />
        </article>
        <LineChart
          :data="{
            labels: joinVisitCountChart.labels,
            datasets: joinVisitCountChart.datasets
          }"
          :gradient="true"
          :height="300"
          unit="명"
        />
      </div>
    </div>
  </ContainerHeading>
</template>
<style lang="scss">
  .dashboard-userinflow-body {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
  }

  .dashboard-userinflow-body-left {
    display: grid;
    gap: 1rem;
    & > div:last-child {
      @include card-container(0.5rem);
    }
  }

  .dashboard-userinflow-body-center {
    padding: 1rem;
    background: var(--c-white);
    & > div:last-child {
      display: grid;
      gap: 1rem;
      margin-top: 2rem;
    }
  }
  
  .dashboard-userinflow-body-right {
    grid-column: span 2;
    padding: 1rem;
    background: var(--c-white);
    article {
      display: flex;
      padding-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-size: 1.125rem;
      }
    }
  }
</style>