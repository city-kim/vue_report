<script lang="ts" setup>
import { onMounted } from 'vue'
import { userFlowStore } from '@/stores/userFlow'
import { paymentStore } from '@/stores/payment'

import PaymentInfoScreen from '@/views/DashBoard/PaymentInfoScreen.vue'

const userFlow = userFlowStore()
const payment = paymentStore()

onMounted(() => {
  payment.fetechPaymentData()
})

</script>

<template>
  <PaymentInfoScreen
    :paymentSum="{
      base: payment.baseCount.sum,
      compare: payment.compareCount.sum
    }"
    :paymentCalculator="payment.calculator"
    :amountChart="payment.amountChart"
    :userFlowLoading="userFlow.isLoading"
    :userFlowError="userFlow.isError"
    :paymentLoading="payment.isLoading"
    :paymentError="payment.isError"
  ></PaymentInfoScreen>
</template>