<template>
    <div class="page-main flex font-mono h-screen">
      <SectionAside class="w-96 bg-white p-4" @changeObj="changeObj"/>
      <SectionMap class="bg-teal-100 w-full" :items="state.info"/>
      <SectionLoading
          class="section-loading"
          style="z-index: 1000"
          :isActive="mainStore.isLoading"
      />
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
import SectionLoading from '../../sections/loading/index.vue'
import { reactive } from 'vue';
import { useMainStore } from '../../../stores/main'
const mainStore = useMainStore()
const state = reactive({
  info: [],
})
// @ts-ignore
const changeObj = function (info) {
  console.log(88);
  console.log(info);
  state.info = info
}
</script>

<style lang="scss">
</style>
