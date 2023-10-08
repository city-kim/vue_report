<script lang="ts" setup>
import { onMounted } from 'vue'
import { paymentStore } from '@/stores/payment'

import PaymentInfoScreen from '@/views/DashBoard/PaymentInfoScreen.vue'

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
  ></PaymentInfoScreen>
</template>