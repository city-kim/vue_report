<script setup lang="ts">
  defineProps({
    width: {
      type: String,
      default: '100%'
    },
    minHiehgt: String,
    height: {
      type: String,
      default: '1rem'
    },
    radius: String
  })
</script>

<template>
  <span
    :style="{
      width: width,
      minHeight: minHiehgt,
      height: height,
      borderRadius: radius
    }"></span>
</template>
<style lang="scss" scoped>
span {
  @include skeleton;
}
</style>