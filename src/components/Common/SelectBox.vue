<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'

import type { PropType } from 'vue'
import type { SelectItem } from '@/types/components/mixed'

const props = defineProps({
  active: [String, Number],
  options: {
    type: Array as PropType<Array<SelectItem>>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'updateSelected', key: string|number): void
}>()

const selected = ref<string|number>('')

function updateSelected() {
  emit('updateSelected', selected.value)
}

onMounted(async () => {
  await nextTick()
  if (props.active) selected.value = props.active
})

// props.active 값이 변경되면 selected 값도 변경
watch(() => props.active, (val) => {
  if (val) selected.value = val
})
</script>

<template>
  <select
    v-model="selected"
    @change="updateSelected"
  >
    <option
      v-show="item.isHidden ? false : true"
      v-for="(item, index) in options"
      :key="index"
      :value="item.key"
    >{{ item.text }}</option>
  </select>
</template>
<style lang="scss" scoped>
select {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
}
</style>
