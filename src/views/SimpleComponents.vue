<script setup lang="ts">
// simple-component 브랜치에 추가될 내용들을 단순 출력하는 용도
import compareCalendar from '@/components/compareCalendar.vue'
import titleWithSubtitle from '@/components/titleWithSubtitle.vue'
import ProgressFill from '@/components/progressFill.vue'
import PercentWithIcon from '@/components/percentWithIcon.vue'
</script>

<template>
  <div>
    <compareCalendar></compareCalendar>
    <titleWithSubtitle
      title="title"
      subtitle="subtitle"
    />
    <ProgressFill
      :base="100"
      :compare="Math.floor(Math.random() * 100)"
    />
    <ProgressFill
      :percent="50"
    />
    <PercentWithIcon
      :base="Math.floor(Math.random() * 100)"
      :compare="Math.floor(Math.random() * 100)"
    />
  </div>
</template>
