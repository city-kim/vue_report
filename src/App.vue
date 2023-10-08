<script setup lang="ts">
import HeaderGnb from '@/layouts/HeaderGnb.vue'
</script>

<template>
  <HeaderGnb/>
  <div class="appcontainer">
    <RouterView />
  </div>
</template>
<style lang="scss">

.appcontainer {
  max-width: 1500px;
  margin: 0 auto;
}
</style>