<script setup lang="ts">
  import SkeletonChart from '@/components/Common/Skeleton/SkeletonChart.vue'
  import SkeletonContents from '@/components/Common/Skeleton/SkeletonContents.vue'

  import type { PropType } from 'vue'

  defineProps({
    target: {
      type: String as PropType<'chart'|'contents'>,
      required: true
    },
    isLoading: Boolean
  })
</script>

<template>
  <template v-if="!isLoading">
    <slot></slot>
  </template>
  <template v-else>
    <template v-if="target == 'chart'">
      <SkeletonChart/>
    </template>
    <template v-if="target == 'contents'">
      <SkeletonContents/>
    </template>
  </template>
</template>