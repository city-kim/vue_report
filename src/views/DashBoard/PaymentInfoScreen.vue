<script lang="ts" setup>
import { computed, ref } from 'vue'

import { getCssVar } from '@/util/color'
import { DATE_TYPE } from '@/constants/FILTER'

import ButtonGroup from '@/components/Common/ButtonGroup.vue'
import BarChart from '@/components/Common/Chart/BarChart.vue'
import ContainerHeading from '@/components/DashBoard/ContainerHeading.vue'
import CardCounter from '@/components/DashBoard/CardCounter.vue'
import CircleCounter from '@/components/DashBoard/CircleCounter.vue'

import type { PropType } from 'vue'
import type { Payment, PaymentCalculator } from '@/types/store'

const props = defineProps({
  paymentSum: {
    type: Object as PropType<{
      base: Payment,
      compare: Payment
    }>,
    required: true
  },
  paymentCalculator: {
    type: Object as PropType<PaymentCalculator>,
    required: true
  },
  amountChart: {
    type: Object as PropType<{
      [key: string]: {
        labels: Array<string>
        payment: Array<number>
        refund: Array<number>
      }
    }>,
    required: true
  }
})

const inflow = computed(() => ([
  { title: '결제자수', base: props.paymentSum.base.payer, compare: props.paymentSum.compare.payer},
  { title: '결제액', base: props.paymentSum.base.payment_amount, compare: props.paymentSum.compare.payment_amount},
  { title: '결제율', base: props.paymentCalculator.inflow.paymentRates.base, compare: props.paymentCalculator.inflow.paymentRates.compare, unit: '%'},
  { title: '평균결제액', base: props.paymentCalculator.inflow.averagePayment.base, compare: props.paymentCalculator.inflow.averagePayment.compare},
]))

const refund = computed(() => ([
  { title: '환불자', percent: props.paymentCalculator.refund.refunds, color: '--c-green' },
  { title: '탈퇴자', percent: props.paymentCalculator.refund.leavers, color: '--c-yellow' },
  { title: '환불율', percent: props.paymentCalculator.refund.refundRate, color: '--c-red' },
  { title: '탈퇴율', percent: props.paymentCalculator.refund.churnRate, color: '--c-blue' },
]))

const barChartDateType = ref<string>('day')

function updateActive (dayType: string) {
  barChartDateType.value = dayType
}

</script>

<template>
  <div class="dashboard-paymentinfo">
    <ContainerHeading
      class="dashboard-paymentinfo-pay"
      h2="결제"
    >
      <div class="dashboard-paymentinfo-pay-body">
        <div>
          <CardCounter
            v-for="(item, index) in inflow"
            :key="index"
            :title="item.title"
            :base="item.base"
            :compare="item.compare"
            :unit="item.unit"
          />
        </div>
        <div class="dashboard-paymentinfo-pay-chart">
          <article>
            <h2>결제 및 환불</h2>
            <ButtonGroup
              :active="barChartDateType"
              :buttons="DATE_TYPE"
              @updateActive="updateActive"
            />
          </article>
          <BarChart
            :data="{
              labels: props.amountChart[barChartDateType].labels,
              datasets: [
                { label: '결제', backgroundColor: getCssVar('--c-green'), data: props.amountChart[barChartDateType].payment },
                { label: '환불', backgroundColor: getCssVar('--c-divider-dark-2'), data: props.amountChart[barChartDateType].refund }
              ]
            }"
            :gradient="true"
            :height="220"
            unit="원"
          />
        </div>
      </div>
    </ContainerHeading>
    
    <ContainerHeading
      class="dashboard-userinfo-refund"
      h2="환불 | 탈퇴"
    >
    <div>
      <CircleCounter
        v-for="(item, index) in refund"
        :key="index"
        :title="item.title"
        :percent="item.percent"
        :color="getCssVar(item.color)"
      />
    </div>
  </ContainerHeading>
  </div>
</template>
<style lang="scss">
.dashboard-paymentinfo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  & > section {
    & > div { 
      @include card-container;
    }
  }

  .dashboard-paymentinfo-pay {
    grid-column: span 3;
    .dashboard-paymentinfo-pay-body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      & > div:first-child {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      .dashboard-paymentinfo-pay-chart {
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
  }

  .dashboard-userinfo-refund {
    & > div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
}
</style>