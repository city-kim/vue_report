<script lang="ts" setup>
import { computed } from 'vue'
import { numberExpression } from '@/util/number_converter'
import { getPercent } from '@/util/number_converter'
import PercentWithIcon from '@/components/Common/PercentWithIcon.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  base: {
    type: Number,
    required: true
  },
  compare: {
    type: Number,
    required: true
  },
  toFixed: Number,
  unit: String
})

const percent = computed(() => getPercent(props.base, props.compare))
</script>

<template>
  <div class="mixed-title-percent">
    <section>
      <h3>{{ numberExpression(base, toFixed) }}{{ unit }}</h3>
      <PercentWithIcon
        :percent="percent"
        :toFixed="toFixed"
        :title="numberExpression(compare)"
      />
    </section>
    <p>{{ title }}</p>
  </div>
</template>
<style lang="scss">
  .mixed-title-percent {
    display: grid;
    gap: 0.5rem;
    section {
      display:flex;
      gap: 0.5rem;
      align-items: baseline;
      h3 {
        font-size: 2rem;
        font-weight: 600;
        text-align: center;
      }
    }
    & > p {
      font-weight: 600;
      color: var(--c-text-light);
    }
  }
</style>