<script lang="ts" setup>
  import { iconList } from '@/constants/iconList'

  interface IconProps {
    name: keyof typeof iconList
    width: string
    height: string
  }

  defineProps<IconProps>()
</script>

<template>
  <svg
    :width="$props.width"
    :height="$props.height"
    viewBox="0 0 16 16"
  >
    <path
      v-for="(icon, index) in iconList[$props.name]"
      :d="icon"
      :key="index"
    />
  </svg>
</template>