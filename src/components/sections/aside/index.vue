<template>
  <aside class="section-aside bg-white">
    <BlockUpload @downloadFile="saveFile"/>
    <div v-if="mainStore.fileInfo" class="text-center text-xs mt-1 text-gray-400">
      Файл с именем {{ mainStore.fileInfo }} успешно загружен
    </div>

    <div v-if="state.isRowNamesModifyActive" class="mt-5">
      <div class="text-center">Редактировать название колонок (Необязательно)</div>
            <UiInput placeholder="Время" v-model:name="state.rowNames.time" class="mb-2"/>
            <UiInput placeholder="Долгота" v-model:name="state.rowNames.longitude" class="mb-2"/>
            <UiInput placeholder="Широта" v-model:name="state.rowNames.latitude"/>
      <UiBtn class="w-full mt-2 disabled py-2 px-2" @click="state.isRowNamesModifyActive = false">Изменить</UiBtn>
    </div>


    <template v-else>
      <div v-if="state.items.length && mainStore.count < state.items.length">
        <UiBtn
            class="w-full mt-8 disabled py-2 px-2"
            @click="showOnTheMap(100)"
        >
          Добавить 100 маркеров
        </UiBtn>
        <UiBtn
            class="w-full mt-8 disabled py-2 px-2"
            @click="showOnTheMap(500)"
        >
          Добавить 500 маркеров
        </UiBtn>
        <UiBtn
            class="w-full mt-8 disabled py-2 px-2"
            @click="showOnTheMap(1000)"
        >
          Добавить 1000 маркеров
        </UiBtn>
        <UiBtn
            class="w-full mt-8 disabled py-2 px-2"
            @click="showOnTheMap(5000)"
        >
          Добавить 5000 маркеров
        </UiBtn>
      </div>

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
    </template>
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

const showOnTheMap = function (count: number) {
  mainStore.changeLoading(true)

  const tm = count > 1000 ? 4000 : 1000
  mainStore.setCount(count)
  setTimeout(() => {
    mainStore.changeLoading(false)
  }, tm);
  mainStore.setCount(count)
}

// @ts-ignore
function getText(fileToRead) {
  var reader = new FileReader();
  reader.readAsText(fileToRead);
  reader.onload = loadHandler;
  // reader.onerror = errorHandler;
}

// @ts-ignore
function loadHandler(event) {
  var csv = event.target.result;
  process(csv);
}

// @ts-ignore
function process(csv) {

  // Newline split
  var lines = csv.split('\n');

  let result = [];

  var headers = lines[0].split(',');

  for (var i = 1; i < lines.length - 1; i++) {

    var obj = {};

    //Comma split
    var currentline = lines[i].split(',');

    for (var j = 0; j < headers.length; j++) {
      // @ts-ignore
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }

  // OUTPUT
  console.log(result);

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
      console.log(data);
      console.log(2);
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
  state.rowNames.time = 'Время подключения'
  state.rowNames.longitude = 'Долгота БС (начало, А)'
  state.rowNames.latitude = 'Широта БС (начало, А)'

  mainStore.rowNames.time = 'Время подключения'
  mainStore.rowNames.longitude = 'Долгота БС (начало, А)'
  mainStore.rowNames.latitude = 'Широта БС (начало, А)'

})

watch(() => mainStore.count, (newVal, oldVal) => {
  mainStore.modifiedItems = [...mainStore.modifiedItems, ...state.items.slice(oldVal, newVal)]
})

</script>
