<script setup lang="ts">
// simple-component 브랜치에 추가될 내용들을 단순 출력하는 용도
import { ref } from 'vue'

import TitlesVue from '@/components/titles.vue'
import ProgressVue from '@/components/progress.vue'
import Percentage from '@/components/percentage.vue'

const count = ref(0)
</script>

<template>
  <div>
    <TitlesVue
      title="title"
      subtitle="subtitle"
    />
    <ProgressVue
      :base="100"
      :compare="Math.floor(Math.random() * 100)"
    />
    <Percentage
      :base="Math.floor(Math.random() * 100)"
      :compare="Math.floor(Math.random() * 100)"
    />
  </div>
</template>
