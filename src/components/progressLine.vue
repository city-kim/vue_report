<script lang="ts" setup>
// div 영역에 색상이 들어있는 div를 출력하여 progress를 표현한다
import { computed, ref, onMounted } from 'vue'
import { getRate } from '@/util/number_converter'
import { getCssVar } from '@/util/color'
const props = defineProps({
  height: String, // 높이 전달받지 못하면 min-height: 1rem
  base: Number, // 비율계산을 위한 기준값
  compare: Number, // 비율계산을 위한 비교값
  percent: Number, // 퍼센트를 전달받으면 해당 퍼센트를 출력한다
  color: { // 색상을 전달받지 못하면 --c-blue를 기본으로 한다
    type: String,
    required: false,
    default: getCssVar('--c-blue')
  },
})

const height = computed(() => { // 높이는 값이 있을경우 해당값을 없다면 1rem을 기본으로 한다
  if (props.height) return props.height
  else return '1rem'
})

const size = computed(() => { // progressbar width size 계산
  if (!block.value) {
    if (props.percent) return props.percent // 퍼센트가 전달된경우 퍼센트에 맞는값을 출력
    return getRate(props.compare, props.base) // 퍼센트가 전달되지 않은경우 비율을 계산하여 출력
  }
  else  {
    return 0
  }
})
const block = ref(true)
onMounted(() => {
  // 마운트시 지연 후 값을 출력하여 애니메이션을 표현할 수 있도록 한다
  setTimeout(() => {
    block.value = false
  }, 200)
})

</script>
<template>
  <div class="progress-line">
    <div
      class="progress-line-size"
      :style="{
        height: height,
        width: size + '%',
        background: color
      }"
    ></div>
  </div>
</template>
<style lang="scss">
.progress-line {
  width: 100%;
  background: var(--color-bg-mute);
  .progress-line-size {
    width: 0%;
    transition: width 0.5s ease-in-out;
    min-height: 1rem;
  }
}
</style>