<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  active: String,
  buttons: {
    type: Array as PropType<Array<{key: string, text: string}>>,
    required: true
  },
})

const emit = defineEmits<{
  (e: 'updateActive', key: string): void
}>()

const selected = ref('')

function updateActive (key: string|undefined) {
  // button 클릭시 active 업데이트
  if (key) selected.value = key
  emit('updateActive', selected.value)
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
  <div class="button-group">
    <button
      v-for="(item, index) in buttons"
      :key="index"
      :class="{active: item.key === selected}"
      @click="updateActive(item.key)"
    >
      {{ item.text }}
    </button>
  </div>
</template>
<style lang="scss">
  .button-group {
    display: flex;
    button {
      padding: 0.25rem 0.5rem;
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      transition: background-color 0.1s;
      cursor: pointer;
      &.active {
        color: var(--c-blue);
      }
      &:hover {
        background-color: var(--color-border);
      }
      & + button {
        border-left: 1px solid var(--color-border);
      }
      &:first-child {
        border-left: 1px solid var(--color-border);
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }
      &:last-child {
        border-right: 1px solid var(--color-border);
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }
    }
  }
</style>