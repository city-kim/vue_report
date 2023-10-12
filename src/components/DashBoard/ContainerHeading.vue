<script lang="ts" setup>
defineProps({
  h2: {
    type: String,
    required: true
  },
  isLoading: Boolean
})
</script>
<template>
  <section>
    <h2 v-show="!isLoading">{{ h2 }}</h2>
    <slot></slot>
  </section>
</template>
<style lang="scss" scoped>
  section {
    & > h2 {
      padding-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
</style>