<template>
  <div>
    <label class="block text-lg font-bold text-center">
      <slot/>
    </label>

    <div
        class="ui-input-file mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        :class="{'ui-input-file--hover': state.isHoverActive}"
         @dragenter.prevent="changeHover(true)"
         @dragover.prevent="changeHover(true)"
         @dragleave.prevent="changeHover(false)"
         @drop.prevent="handleDrop"
    >
      <div class="space-y-1 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <div class="flex text-sm text-gray-60 flex-col">
          <label for="file-upload" class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Загрузите файл или перетащите его в область</span>
            <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".xls,.xlsx"
                class="sr-only"
                @input="download"
            >
          </label>
        </div>
        <p class="text-xs text-black-500">XLS or XLSX!</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'UiInputFile'
}
</script>

<script setup>
import { defineEmits, reactive } from 'vue';

const emits = defineEmits(['downloadFile'])
const state = reactive(
    {
      selectedFile: null,
      isHoverActive: false
    }
)
// @ts-ignore
const download = function (e) {
  //@ts-ignore
  emits('startDownloadFile')
// @ts-ignore
  state.selectedFile = e.target.files[0];
  emits('downloadFile', state.selectedFile)
}
const downloadDrop = function (file) {
  //@ts-ignore
  emits('startDownloadFile')

  state.selectedFile = file;
  emits('downloadFile', state.selectedFile)
}
const changeHover = function (val) {
  state.isHoverActive = val
}
// @ts-ignore
function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files[0]
  state.isHoverActive = false
  downloadDrop(files)
  // handleFiles(files)
}
</script>

<style>
.ui-input-file--hover {
  /*transition-duration: 0.3s;*/
  border-color: green !important;
  background-color: rgba(0, 128, 0, 0.05) !important;
}
</style>
