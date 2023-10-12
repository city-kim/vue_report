<script lang="ts" setup>
import { computed } from 'vue'
import ProgressLine from '@/components/Common/ProgressLine.vue'
import { numberExpression } from '@/util/number_converter'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  percent: {
    type: Number,
    required: true
  },
  color: String
})

const percent = computed(() => props.percent == Infinity ? 100 : props.percent || 0)
</script>

<template>
  <article class="mixed-title-line-progress">
    <h3>{{ title }}</h3>
    <div>
      <p>
        <span>{{ numberExpression(count) }}</span>
        <strong>{{ numberExpression(percent) }}%</strong>
      </p>
      <ProgressLine
        :percent="percent"
        :height="'0.4rem'"
        :color="color"
      />
    </div>
  </article>
</template>
<style lang="scss">
  .mixed-title-line-progress {
    display: flex;
    align-items: end;
    gap: 1rem;
    h3 {
      width: 4rem;
      font-size: 0.9rem;
      color: var(--color-text);
      & + div {
        flex: 1;
        p {
          display: flex;
          padding-bottom: 0.25rem;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--color-text);
          span {
            font-weight: bold;
          }
          strong {
            font-weight: bold;
          }
        }
      }
    }
  }
</style>