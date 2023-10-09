<script lang="ts" setup>
import { onMounted, ref } from 'vue'
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

function selectUpdate () {
  // device가 작으면 select 업데이트
  updateActive(undefined)
}

onMounted(() => {
  if (props.active) selected.value = props.active
})
</script>

<template>
  <div class="button-group-container">
    <div class="button-group-select">
      <select
        v-model="selected"
        @change.lazy="selectUpdate"
      >
        <option v-show="false" value="">전체</option>
        <option
          v-for="(item, index) in buttons"
          :key="index"
          :value="item.key"
        >{{ item.text }}</option>
      </select>
    </div>
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
  </div>
</template>
<style lang="scss">
.button-group-container {
  .button-group-select {
    @include mobile {
      display: block;
    }
    display: none;
    select {
      padding: 0.25rem 0.5rem;
      border: 1px solid var(--color-border);
    }
  }
  .button-group {
    @include mobile {
      display: none;
    }
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
}
</style>