<script setup lang="ts">
  import SkeletonUi from '@/components/Common/Skeleton/SkeletonUi.vue'
</script>

<template>
  <div class="skeleton skeleton-contents">
    <div class="skeleton-contents-title">
      <SkeletonUi
        width="10rem"
        height="2rem"
      />
      <SkeletonUi
        width="2rem"
        height="2rem"
      />
    </div>
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
  .skeleton-contents {
    display: flex;
    flex-direction: column;
    height:100%;
    gap: 1rem;
    .skeleton-contents-title {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  }
</style>