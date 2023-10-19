<script lang="ts" setup>
import { computed } from 'vue'
import { getCssVar } from '@/util/color'
import { JOIN_SNS } from '@/constants/STORES'

import type { UserFlow, InflowCalculator } from '@/types/store'
import type { PropType } from 'vue'

import ContainerHeading from '@/components/DashBoards/ContainerHeading.vue'
import ProgressCounter from '@/components/DashBoards/ProgressCounter.vue'

import TitlePercent from '@/components/Mixed/TitlePercent.vue'
import TitleLineProgress from '@/components/Mixed/TitleLineProgress.vue'

import ResponsiveChoice from '@/components/Mixed/ResponsiveChoice.vue'
import BarChart from '@/components/Common/Chart/BarChart.vue'
import LineChart from '@/components/Common/Chart/LineChart.vue'

import SkeletonContainer from '@/components/Common/Skeleton/SkeletonContainer.vue'

const props = defineProps({
  inflowSum: {
    type: Object as PropType<{
      base: UserFlow,
      compare: UserFlow
    }>,
    required: true
  },
  inflowCalculator: {
    type: Object as PropType<InflowCalculator>,
    required: true
  },
  joinVisitCountChart: {
    type: Object as PropType<{
      labels: string[]
      datasets: {
        label: string
        borderColor: string
        borderDash?: number[]
        fill?: boolean
        data: number[]
      }[]
    }>,
    required: true
  },
  joinRateBarChart: {
    type: Object as PropType<{
      labels: string[]
      datasets: Array<{
        label?: string
        backgroundColor?: string
        data: Array<number>
      }>
    }>,
    required: true
  },
  isLoading: Boolean,
  isError: Boolean
})

const emit = defineEmits<{
  (e: 'joinTrendTargetChange', key: string): void
}>()

const inflow = computed(() => ([ // 전체방문자 progress 데이터
  {
    title: '신규',
    count: props.inflowSum.base.new_visit,
    percent: props.inflowCalculator.inflowRate.newVisit,
    color: getCssVar('--c-blue')},
  {
    title: '재방문',
    count: props.inflowSum.base.return_visit,
    percent: props.inflowCalculator.inflowRate.returnVisit,
    color: getCssVar('--c-green')
  }
]))

const sns = computed(() => { // 신규가입자 sns progress 데이터
  return [
    {
      title: '이메일',
      count: props.inflowCalculator.snsEmailSum,
      percent: props.inflowCalculator.snsRate.email,
      color: '--c-purple'
    },
    {
      title: '네이버',
      count: props.inflowSum.base.join_sns.naver,
      percent: props.inflowCalculator.snsRate.naver,
      color: '--c-green'
    },
    {
      title: 'KAKAO',
      count: props.inflowSum.base.join_sns.kakao,
      percent: props.inflowCalculator.snsRate.kakao,
      color: '--c-yellow'
    },
    {
      title: 'google',
      count: props.inflowSum.base.join_sns.google,
      percent: props.inflowCalculator.snsRate.google,
      color: '--c-red'
    },
    {
      title: 'facebook',
      count: props.inflowSum.base.join_sns.facebook,
      percent: props.inflowCalculator.snsRate.facebook,
      color: '--c-blue'
    },
    {
      title: 'apple',
      count: props.inflowSum.base.join_sns.apple,
      percent: props.inflowCalculator.snsRate.apple,
      color: '--c-indigo'
    },
  ]
})

function updateActive (jointype: string) { // 가입자 추이 lineChart 버튼 클릭시 sns filter
  emit('joinTrendTargetChange', jointype)
}

const joinVisitCountChart = computed(() => ({ // 가입자 추이 lineChart 데이터
  labels: props.joinVisitCountChart.labels,
  datasets: props.joinVisitCountChart.datasets
}))

const joinRateBarChart = computed(() => ({ // 방문자 가입률 barChart 데이터
  labels: props.joinRateBarChart.labels,
  datasets: props.joinRateBarChart.datasets
}))

</script>

<template>
  <ContainerHeading
    h2="유입"
    :isLoading="isLoading"
  >
    <div class="dashboard-userinflow-body">
      <div class="dashboard-userinflow-body-left">
        <SkeletonContainer
          target="contents"
          :isLoading="isLoading"
          :isError="isError"
        >
          <div>
            <ProgressCounter
              title="전체방문자"
              :base="props.inflowSum.base.total_visit"
              :compare="props.inflowSum.compare.total_visit"
              :progressData="inflow"
            />
          </div>
        </SkeletonContainer>
        <SkeletonContainer
          target="chart"
          :isLoading="isLoading"
          :isError="isError"
        >
          <div>
            <TitlePercent
              title="방문자 가입률"
              :base="props.inflowCalculator.joinRate.base"
              :compare="props.inflowCalculator.joinRate.compare"
              :percent="50"
              :toFixed="1"
              unit="%"
            />
            <BarChart :data="{
                labels: joinRateBarChart.labels,
                datasets: joinRateBarChart.datasets
              }"
              :height="80"
              :guide="false"
              :barPercent="0.2"
              unit="명"
            />
          </div>
        </SkeletonContainer>
      </div>
      <div class="dashboard-userinflow-body-center">
        <SkeletonContainer
          target="contents"
          :isLoading="isLoading"
          :isError="isError"
        >
          <TitlePercent
            title="신규가입자"
            :base="props.inflowSum.base.join"
            :compare="props.inflowSum.compare.join"
            :percent="50"
          />
          <div class="dashboard-userinflow-body-center-lists">
            <TitleLineProgress
              v-for="(item, index) in sns"
              :key="index"
              :title="item.title"
              :count="item.count"
              :percent="item.percent"
              :color="getCssVar(item.color)"
            />
          </div>
        </SkeletonContainer>
      </div>
      <div class="dashboard-userinflow-body-right">
        <SkeletonContainer
          target="chart"
          :isLoading="isLoading"
          :isError="isError"
        >
          <article>
            <h2>가입자 추이</h2>
            <ResponsiveChoice
              selectDefault="전체"
              :items="JOIN_SNS"
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
        </SkeletonContainer>
      </div>
    </div>
  </ContainerHeading>
</template>
<style lang="scss">
  .dashboard-userinflow-body {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);

    .dashboard-userinflow-body-left {
      @include mobile {
        grid-column: span 4;
      }
      @include tablet {
        grid-column: span 2;
      }
      grid-column: span 1;
      display: grid;
      gap: 1rem;
      & > div {
        @include card-container(0.5rem);
      }
    }

    .dashboard-userinflow-body-center {
      @include mobile {
        grid-column: span 4;
      }
      @include tablet {
        grid-column: span 2;
      }
      grid-column: span 1;
      padding: 1rem;
      background: var(--c-white);
      .dashboard-userinflow-body-center-lists {
        display: grid;
        gap: 1rem;
        margin-top: 2rem;
      }
    }
    
    .dashboard-userinflow-body-right {
      @include mobile {
        grid-column: span 4;
      }
      @include tablet {
        grid-column: span 4;
      }
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
  }
</style>