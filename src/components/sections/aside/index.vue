<template>
    <aside class="section-aside">
      <BlockUpload @changeObj="emits('changeObj', $event)"/>
    </aside>
</template>


<script lang="ts">
export default {
  name: 'SectionAside'
}
</script>

<script setup lang="ts">
import BlockUpload from '../../blocks/upload/index.vue'
const emits = defineEmits(['changeObj'])

</script>
