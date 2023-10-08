<script lang="ts" setup>
import { computed } from 'vue'
import { getCssVar } from '@/util/color'

import type { PropType } from 'vue'

const props = defineProps({
  title: String,
  color: {
    type: String as PropType<'gray'|'blue'|'red'|'yellow'|'orange'|'green'|'purple'|'emerald'>,
    default: 'blue'
  },
  fontSize: {
    type: String,
    default: '1rem'
  }
})

defineEmits<{
  (e: 'onClick'): void
}>()

const color = computed(() => props.color ? props.color : getCssVar('--c-gray'))
</script>
<template>
  <button
    type="button"
    :class="color"
    :style="{
      fontSize: fontSize
    }"
    @mouseover=""
    @click="$emit('onClick')"
  >
  {{ title }}
  </button>
</template>
<style lang="scss" scoped>
  button {
    padding: 0.125em 0.5em;
    border-radius: 0.125em;
    cursor: pointer;
    @include button-color('gray');
    @include button-color('blue');
    @include button-color('red');
    @include button-color('yellow');
    @include button-color('orange');
    @include button-color('green');
    @include button-color('purple');
    @include button-color('emerald');
  }
</style>