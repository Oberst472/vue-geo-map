<template>
    <div class="page-main flex font-mono h-screen">
      <SectionAside class="w-1/4 bg-teal-50 p-4" @changeObj="changeObj" @lol="lol"/>
      <SectionMap class="bg-teal-100 w-full" :items="state.info"/>
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
import { reactive } from 'vue';
const state = reactive({
  info: []
})
const changeObj = function (info) {
  console.log(88);
  console.log(info);
  state.info = info
}
function lol() {
  console.log(9);
}
</script>

<style lang="scss">
</style>
