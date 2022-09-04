<template>
  <div>
    <div class="mt-1 relative rounded-md shadow-sm border">
      <input
          type="text"
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
          :placeholder="props.placeholder"
      />
      <input type="text" class="text-color-black">
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UiInput'
}
</script>

<script lang="ts" setup>
import { defineProps, onMounted } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  name: {
    type: String
  }
})
const emits = defineEmits(['update:name'])
onMounted(() => {
  console.log(99);
})
</script>

<style scoped lang="">

</style>
