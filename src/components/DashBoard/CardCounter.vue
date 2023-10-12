<script lang="ts" setup>
import { computed } from 'vue'
import { numberExpression } from '@/util/number_converter'
import { getPercent } from '@/util/number_converter'
import PercentWithIcon from '@/components/Common/PercentWithIcon.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
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
  <div class="dashboard-card-counter">
    <section>
      <h3>{{ title }}</h3>
      <PercentWithIcon
        :title="numberExpression(compare)"
        :percent="percent"
        :toFixed="toFixed"
      />
    </section>
    <h4>{{ numberExpression(base, toFixed) }}{{ unit }}</h4>
    <slot></slot>
  </div>
</template>
<style lang="scss">
.dashboard-card-counter {
  border: 1px dashed var(--color-border);
  @include card-container(0rem);
  & > section {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--c-text-light);
    }
  }
  & > h4 {
    padding: 1rem 0;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
}
</style>