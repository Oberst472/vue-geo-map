<template>
  <div>
    <div class="flex gap-2">
      <UiBtn
          class="w-full mt-8 disabled py-2 px-2 "
          :class="{'btn-disabled': count === 0}"
          @click="emits('showOnTheMap', ['-', 200])"
      >
        {{ '<-200' }}
      </UiBtn>
      <UiBtn
          class="w-full mt-8 disabled py-2 px-2"
          :class="{'btn-disabled': props.count === props.items}"
          @click="emits('showOnTheMap', ['+', 200])"
      >
        200+>
      </UiBtn>
    </div>

    <div class="flex gap-2">
      <UiBtn
          class="w-full mt-8 disabled py-2 px-2"
          :class="{'btn-disabled': count === 0}"
          @click="emits('showOnTheMap', ['-', 500])"
      >
        {{ '<-500' }}
      </UiBtn>
      <UiBtn
          class="w-full mt-8 disabled py-2 px-2"
          :class="{'btn-disabled': props.count === props.items}"
          @click="emits('showOnTheMap', ['+', 500])"
      >
        {{ '500+>' }}
      </UiBtn>
    </div>

    <div class="flex gap-2">
      <UiBtn
          class="w-full mt-8 disabled py-2 px-2"
          :class="{'btn-disabled': count === 0}"
          @click="emits('showOnTheMap', ['-', 1000])"
      >
        {{ '<-1000' }}
      </UiBtn>
      <UiBtn
          class="w-full mt-8 disabled py-2 px-2"
          :class="{'btn-disabled': props.count === props.items}"
          @click="emits('showOnTheMap', ['+', 1000])"
      >
        {{ '1000+>' }}
      </UiBtn>
    </div>
  </div>
</template>


<script lang="ts">
export default {
  name: 'BlockBtns'
}
</script>

<script setup lang="ts">
import UiBtn from '../../ui/btn/index.vue'
import { defineEmits, defineProps } from 'vue';
const emits = defineEmits(['showOnTheMap'])
const props = defineProps({
  count: {
    type: Number,
    default: 0
  },
  items: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.btn-disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
