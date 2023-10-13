<script setup lang="ts">
  import SkeletonChart from '@/components/Common/Skeleton/SkeletonChart.vue'
  import SkeletonContents from '@/components/Common/Skeleton/SkeletonContents.vue'
  import SvgIcon from '@/components/Common/SvgIcon.vue'

  import type { PropType } from 'vue'

  defineProps({
    target: {
      type: String as PropType<'chart'|'contents'>,
      required: true
    },
    isLoading: Boolean,
    isError: Boolean
  })
</script>

<template>
  <template v-if="isError">
    <div class="skeleton-container-error">
      <SvgIcon
        name="exclamation_triangle_fill"
        width="24"
        height="24"
      ></SvgIcon>
      데이터를 불러오는데 실패하였습니다
    </div>
  </template>
  <template v-else-if="!isLoading">
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
<style lang="scss" scoped>
.skeleton-container-error {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>