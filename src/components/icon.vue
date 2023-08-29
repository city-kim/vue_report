<script lang="ts" setup>
  const iconList = {
    left_double_arrow: ['M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z', 'M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'],
    right_double_arrow: ['M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z', 'M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z']
  } as const

  interface IconProps {
    name: keyof typeof iconList
    width: number
    height: number
  }

  defineProps<IconProps>()
</script>

<template>
    <svg
      :width="$props.width"
      :height="$props.height"
      viewBox="0 0 16 16"
    >
      <path
        v-for="icon in iconList[$props.name]"
        :d="icon"
      />
    </svg>
</template>