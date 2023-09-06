<script lang="ts" setup>
defineProps<{
  title: String,
  subtitle: String,
}>()
</script>
<template>
  <section class="component-title">
    <h3>{{ subtitle }}</h3>
    <h2>{{ title }}</h2>
  </section>
</template>
<style lang="scss">
  .component-title {
    h3 {
      font-size: 1.25rem;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
</style>