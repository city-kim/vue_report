<script lang="ts" setup>
  import { ICON_LIST } from '@/constants/ICON_LIST'

  interface IconProps {
    name: keyof typeof ICON_LIST
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
      v-for="(icon, index) in ICON_LIST[$props.name]"
      :d="icon"
      :key="index"
    />
  </svg>
</template>