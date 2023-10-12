<script lang="ts" setup>
import ProgressCircle from '@/components/Common/ProgressCircle.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  percent: {
    type: Number,
    required: true
  },
  toFixed: Number,
  color: String
})
</script>

<template>
  <article class="dashboard-circle-counter">
    <h3>{{ title }}</h3>
    <ProgressCircle
      :percent="percent"
      :size="'6rem'"
      :color="color"
      :toFixed="toFixed"
      :strokeWidth="7"
    />
  </article>
</template>
<style lang="scss">
  .dashboard-circle-counter {
    text-align: center;
    h3 {
      padding-bottom: 0.5rem;
      font-weight: 600;
      text-align: left;
    }
  }
</style>