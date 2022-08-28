<template>
  <section>
    <UiInputFile @downloadFile="downloadFile">
      Загрузка файла
    </UiInputFile>
  </section>
</template>

<script lang="ts">

export default {
  name: 'BlockUpload'
}
</script>

<script setup lang="ts">
import {reactive} from 'vue'
import UiInputFile from '../../ui/input-file/index.vue'

const state = reactive(
    {
      infoJson: null,
      selectedFile: null,
    }
)
const emits = defineEmits(['changeItems', 'startDownloadFile', 'downloadFile'])

const downloadFile = function (file: any) {
  emits('downloadFile', file)
}
</script>
