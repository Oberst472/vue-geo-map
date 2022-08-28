<template>
    <button
        class="
          bg-indigo-500
          text-white
          border-3
          rounded-md
          duration-300
          active:bg-indigo-400
          hover:bg-indigo-800"
    >
      <slot/>
    </button>
</template>


<script lang="ts">
export default {
  name: 'UiBtn'
}
</script>

<script setup lang="ts">

</script>

<style lang="scss">

</style>
