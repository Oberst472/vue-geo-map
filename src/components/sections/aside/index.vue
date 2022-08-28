<template>
  <aside class="section-aside bg-white">
    <BlockUpload @downloadFile="saveFile"/>
    <div v-if="mainStore.fileInfo" class="text-center text-xs mt-1 text-gray-400">Файл с именем {{ mainStore.fileInfo }}
                                                                                  успешно загружен
    </div>

    <UiBtn
        class="w-full mt-8 disabled py-2 px-2"
        @click="showOnTheMap"
        v-if="state.items.length"
    >
      Вывести данные на карту
    </UiBtn>
    <div class="mt-4" v-if="mainStore.getItems.length">Показано: {{ mainStore.getItems.length }} {{ text }} из
                                                       {{ mainStore.items.length }}
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
import UiBtn from '../../ui/btn/index.vue'
import { useMainStore } from '../../../stores/main'
import { computed, reactive, watch } from 'vue';

const mainStore = useMainStore()

const state = reactive({
  items: [],
  data: [{
    'name': 'jayanth',
    'data': 'scd',
    'abc': 'sdef'
  }]
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

const showOnTheMap = function () {
  setTimeout(() => {
    mainStore.changeLoading(false)
  }, 1000);
  mainStore.setCount(100)
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
  console.log(66);
  mainStore.setItems(state.items)
  mainStore.changeLoading(false)
})

watch(() => mainStore.count, (newVal, oldVal) => {
  mainStore.modifiedItems = [...mainStore.modifiedItems, ...state.items.slice(oldVal, newVal)]
})

</script>
