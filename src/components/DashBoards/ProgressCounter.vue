<script lang="ts" setup>
import type { PropType } from 'vue'

import TitlePercent from '@/components/Mixed/TitlePercent.vue'
import TitleLineProgress from '@/components/Mixed/TitleLineProgress.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  base: {
    type: Number,
    required: true
  },
  compare: {
    type: Number,
    required: true
  },
  progressData: {
    type: Array as PropType<Array<{ title: string, count: number, percent: number, color: string }>>,
    required: true,
  }
})
</script>

<template>
  <TitlePercent
    :title="title"
    :base="base"
    :compare="compare"
  />
  <TitleLineProgress
    v-for="(list, index) in progressData"
    :key="index"
    :title="list.title"
    :count="list.count"
    :percent="list.percent"
    :color="list.color"
  />
</template>