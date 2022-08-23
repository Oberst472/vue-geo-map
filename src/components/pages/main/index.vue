<template>
    <div class="page-main flex font-mono h-screen">
      <SectionMap class="w-1/4 bg-teal-50 p-4"/>
      <SectionAside class="bg-teal-100 w-full p-4"/>
    </div>
</template>


<script lang="ts">
export default {
  name: 'PageMain'
}
</script>

<script setup lang="ts">
import SectionMap from '../../sections/map/index.vue'
import SectionAside from '../../sections/aside/index.vue'
</script>

<style lang="scss">
</style>
