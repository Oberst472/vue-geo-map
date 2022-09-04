<!--ts-ignore-->
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
          :value="props.name"
          @input="emits('update:name', $event?.target?.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiInput'
}
</script>

<script setup>
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
</script>

<style scoped lang="">

</style>
