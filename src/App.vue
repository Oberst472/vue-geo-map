<template>
  <PageMain/>
</template>

<script lang="ts" setup>
import PageMain from './components/pages/main/index.vue'
import { onMounted } from 'vue';
// onMounted(() => {
//   const getSeconds = function (val: string) {
//     if (val.includes('24:00')) return 0
//
//     const [h, m, s] = val.split(':')
//     const hs = (Number(h) || 0) * 60
//     return (hs + Number(m || 0)) * 60 + Number(s || 0)
//   }
//   getSeconds('24:00:00')
// })
</script>

<style scoped>
</style>
