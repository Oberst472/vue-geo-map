<template>
  <div class="block-filter">
    <div class="block text-lg font-bold">
      <slot/>
    </div>
    <UiInput></UiInput>
  </div>
</template>


<script lang="ts">
export default {
  name: 'BlockFilter'
}
</script>

<script setup lang="ts">
import UiInput from '../../ui/input/index.vue'

</script>

<style lang="scss">

</style>
