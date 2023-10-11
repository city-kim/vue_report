<script setup lang="ts">
  import SkeletonUi from '@/components/Common/Skeleton/SkeletonUi.vue'
</script>

<template>
  <div class="skeleton skeleton-chart">
    <SkeletonUi
      width="10rem"
      height="1.5rem"
    />
    <SkeletonUi
      width="100%"
      minHiehgt="3rem"
      height="100%"
    />
  </div>
</template>
<style lang="scss">
  .skeleton-chart {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
  }
</style>