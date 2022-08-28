<template>
  <div>
    <div class="mt-1 relative rounded-md shadow-sm border">
      <input
          type="text"
          name="price"
          id="price"
          class="
            focus:ring-indigo-500
            focus:border-indigo-500
            block
            w-full
            px-3
            py-2
            sm:text-sm
            border-gray-400
            rounded-md"
          placeholder="Введите время"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UiInput'
}
</script>

<style scoped lang="">

</style>
