<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

import SelectBox from '@/components/Common/SelectBox.vue'
import ButtonGroup from '@/components/Common/ButtonGroup.vue'

import type { PropType } from 'vue'
import type { SelectItem } from '@/types/components/mixed'

const props = defineProps({
  active: [String, Number],
  selectDefault: String,
  items: {
    type: Array as PropType<Array<SelectItem>>,
    required: true
  },
})

const emit = defineEmits<{
  (e: 'updateActive', key: string|number): void
}>()

const selected = ref<string|number>('')

function handleChange (key: string|number) {
  // button 클릭시 active 업데이트
  if (key) selected.value = key
  emit('updateActive', selected.value)
}

const selectItem = computed(() => {
  if (props.selectDefault) {
    const array:Array<SelectItem> = [{key: '', text: props.selectDefault, isHidden: true}]
    return array.concat(props.items)
  } else {
    return props.items
  }
})

onMounted(() => {
  if (props.active) selected.value = props.active
})
</script>

<template>
  <div class="responsive-choice-container">
    <div class="responsive-choice-select">
      <SelectBox
        :active="selected"
        :options="selectItem"
        @updateSelected="handleChange"
      ></SelectBox>
    </div>
    <div class="responsive-choice-buttons">
      <ButtonGroup
        :active="selected"
        :buttons="items"
        @updateActive="handleChange"
      ></ButtonGroup>
    </div>
  </div>
</template>
<style lang="scss">
.responsive-choice-container {
  .responsive-choice-select {
    @include mobile {
      display: block;
    }
    display: none;
  }
  .responsive-choice-buttons {
    @include mobile {
      display: none;
    }
    display: flex;
  }
}
</style>