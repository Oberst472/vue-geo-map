<template>
  <aside class="section-aside bg-white">
    <BlockUpload @downloadFile="saveFile"/>
    <div v-if="mainStore.fileInfo" class="text-center text-xs mt-1 text-gray-400">
      Файл с именем {{ mainStore.fileInfo }} успешно загружен
    </div>

    <BlockBtns
        v-if="state.items.length"
        @showOnTheMap="showOnTheMap"
        :count="mainStore.count"
        :items="state.items.length"
    />

    <div
        class="mt-4"
        v-if="(mainStore.getItems.length && mainStore.count < state.items.length)"
    >
      Показано:
      {{ mainStore.getItems.length }} {{ text }} из {{ mainStore.items.length }}
    </div>
    <div v-if="mainStore.count !== 0 && mainStore.count === state.items.length && !mainStore.isLoading" class="mt-5 text-center">
      Все элементы были выведены на карту!
    </div>
  </aside>
</template>


<script lang="ts">
export default {
  name: 'SectionAside'
}
</script>

<script setup lang="ts">
// @ts-nocheck
import BlockUpload from '../../blocks/upload/index.vue'
import BlockBtns from '../../blocks/btns/index.vue'
import UiBtn from '../../ui/btn/index.vue'
import UiInput from '../../ui/input/index.vue'
import { useMainStore } from '../../../stores/main'
import { computed, reactive, watch } from 'vue';

const mainStore = useMainStore()

const state = reactive({
  items: [],
  data: [{
    'name': 'jayanth',
    'data': 'scd',
    'abc': 'sdef'
  }],
  rowNames: {
    time: '',
    longitude: '',
    latitude: ''
  },
  sign: '',
  isRowNamesModifyActive: false

})

const saveFile = function (val: any) {
  mainStore.changeLoading()
  mainStore.resetStore()
  state.items = []
  setTimeout(() => {
    convert(val)
  }, 2000);
}

function sk(number: number, arr: any) {
  const cases = [2, 0, 1, 1, 1, 2];
  return arr[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

const text = computed(() => {
  return sk(mainStore.getItems.length, ['маркер', 'маркера', 'маркеров'])
})

const showOnTheMap = function (payload: [string, number]) {
  const [sign, count] = payload
  state.sign = sign
  mainStore.changeLoading(true)
  const tm = count > 1000 ? 4000 : 1000
  setTimeout(() => {
    mainStore.changeLoading(false)
  }, tm);
  mainStore.setCount(payload)
}

// @ts-ignore
const convert = function (value) {
  // const val = getText(value)
  const val = value
  mainStore.fileInfo = val.name
  // @ts-ignore
  XLSX.utils.json_to_sheet(state.data, 'out.xlsx');
  if (val) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(val);
    fileReader.onload = (e) => {
      // @ts-ignore
      let data = e.target.result;
      // @ts-ignore
      let workbook = XLSX.read(data, {type: 'binary'});
      workbook.SheetNames.forEach((sheet: any) => {
        // @ts-ignore
        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
        state.items = rowObject

      });
    }
  }
}

watch(() => state.items, () => {
  if (!state.items.length) return
  mainStore.setItems(state.items)
  mainStore.changeLoading(false)
  state.isRowNamesModifyActive = true
})

watch(() => mainStore.count, (newVal, oldVal) => {
  state.sign === '+' ?
      mainStore.modifiedItems = [...state.items.slice(oldVal, newVal)].filter(item => item['Широта БС (начало, А)'] && item['Долгота БС (начало, А)']) :
      mainStore.modifiedItems = [...state.items.slice(newVal, oldVal)].filter(item => item['Широта БС (начало, А)'] && item['Долгота БС (начало, А)'])
})

</script>
