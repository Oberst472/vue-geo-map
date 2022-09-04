<template>
  <section class="section-map relative">
    <l-map
        ref="map"
        :zoom="state.zoom"
        max-zoom="18"
        min-zoom="5"
        animate
        zoom-animation
        duration="0.3"
        :options="{zoomControl: false}"
        :center="state.center"
    >
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <l-marker
          class="map-item"
          :lat-lng="[item['Широта БС (начало, А)'], item['Долгота БС (начало, А)']]"
          v-for="(item, index) in mainStore.filteredItems"
      >
        <l-tooltip>
          <div>
            <div><span class="text-black-500">Время</span>: {{ item['Время подключения'] }}</div>
            <div><span class="text-black-500">Широта</span>: {{ item['Широта БС (начало, А)'] }}</div>
            <div><span class="text-black-500">Долгота</span>: {{ item['Долгота БС (начало, А)'] }}</div>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>


    <div v-if="mainStore.modifiedItems.length" class="section-map__controls absolute top-0 left-0 flex items-center py-2">
      <UiBtn
          class="section-map__btn w-6 flex rounded-full justify-center items-center h-full w-9 h-9"
          @click="changeIndex('first')"
          :disabled="mainStore.index === 0 || mainStore.index === -1"
      >
        {{ '<<' }}
      </UiBtn>

      <UiBtn
          class="section-map__btn w-6 flex rounded-full justify-center items-center ml-4 mr-6 h-full w-9 h-9"
          @click="changeIndex('prev')"
          :disabled="mainStore.index === 0 || mainStore.index === -1"

      >
        {{ '<' }}
      </UiBtn>

      <div class="section-map__select">
        <input
            class="section-map__select-inp text-center appearance-none border border-primary rounded h-full w-full py-2 px-3 focus:outline-none focus:shadow-outline"
            id="text"
            type="text"
            placeholder="Введите время"
            @input="onInput"
            v-model="inpVal"
        >
        <div class="section-map__select-items mt-1" v-if="mainStore.modifiedItems?.length" tabindex="1">
          <ul class="w-full rounded">
            <li
                class="py-2 px-4 text-center w-full border-b hover:bg-gray-100 border-gray-200 dark:border-gray-200"
                @click="changeTime({time: '', ind: 0, isAll: true})"
            >
              Показать все
            </li>
            <li
                class="py-2 px-4 text-center w-full hover:bg-gray-100 border-b border-gray-200 dark:border-gray-200"
                v-for="(item, index) in mainStore.getItems"
                :key="item['Время подключения']"
                @click="changeTime({time: item['Время подключения'], ind: index, isAll: false})"
            >
              {{ item['Время подключения'].split('+')[0] }}
            </li>
          </ul>
        </div>
      </div>

      <UiBtn
          class="section-map__btn w-6 flex rounded-full justify-center items-center h-full ml-6 w-9 h-9"
          @click="changeIndex('next')"
          :disabled="mainStore.index === mainStore.getItems.length - 1 || mainStore.index === mainStore.getItems.length - 1"

      >
        {{ '>' }}
      </UiBtn>
      <UiBtn
          class="section-map__btn w-6 flex rounded-full justify-center items-center ml-4 mr-6 self-center w-9 h-9"
          @click="changeIndex('last')"
          :disabled="mainStore.index === mainStore.getItems.length - 1 || mainStore.index === mainStore.getItems.length - 1"

      >
        {{ '>>' }}
      </UiBtn>

      <UiBtn class="section-map__center-btn rounded-full justify-center items-center ml-4 self-center px-2 h-9" @click="center">
        Показать в центре
      </UiBtn>

    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionMap'
}
</script>


<script setup>
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  // @ts-ignore
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import UiBtn from '../../ui/btn/index.vue'
import {onMounted, reactive, ref, watch} from 'vue'
import {useMainStore} from '../../../stores/main'

const mainStore = useMainStore()

const state = reactive({
  center: [47.41322, -1.219482],
  zoom: 5,
  inputVal: '',
})
const inpVal = ref('')
const changeIndex = function (val) {
  mainStore.isAll = false
  const max = mainStore.getItems.length - 1
  if (val === 'first') return mainStore.index = 0
  if (val === 'last') return mainStore.index = max

  if (val === 'prev') {
    if (mainStore.index === 0) return mainStore.index = 0
    return mainStore.index = mainStore.index - 1
  }

  if (val === 'next') {
    if (mainStore.index === max) return mainStore.index = max
    return mainStore.index = mainStore.index + 1
  }
}
const map = ref(null)

const changeTime = function ({time, date, ind, isAll}) {
  mainStore.isAll = isAll
  mainStore.inpValue = ''
  mainStore.index = ind
  inpVal.value = time.split('+')[0] || time
  if (state.zoom !== 15) state.zoom = 15
}
const onInput = function (e) {
  if (e.target.value === '') {
    mainStore.isAll = true
    mainStore.inpValue = ''
    mainStore.index = 0
  }
  mainStore.inpValue = e.target.value
  if (state.zoom !== 15) state.zoom = 15
  // center()
}
const center = function () {
  const coords = mainStore.getItems.map(item => [item['Широта БС (начало, А)'], item['Долгота БС (начало, А)']])
  map.value.leafletObject.fitBounds(coords)
}


watch(() => mainStore.filteredItems, () => {
  if (!mainStore.filteredItems?.length) return
  // if (String(state.center[0]) === '47.41322' && String(state.center[1]) === '-1.219482') {
  //   state.center = [Number(mainStore.getItems[0]['Широта БС (начало, А)']), Number(mainStore.getItems[0]['Долгота БС (начало, А)'])]
  // }

  if (mainStore.filteredItems.length === 1) {
    const item = mainStore.filteredItems[0]
    inpVal.value = item['Время подключения'].split('+')[0] || item['Время подключения']
    const s = Number(item['Широта БС (начало, А)'])
    const d = Number(item['Долгота БС (начало, А)'])
    if (s && d) {
      if (state.zoom !== 15) state.zoom = 15
      center()
    }
  }

})

watch(() => mainStore.getItems, (val) => {
  if (!val.length) return
  center()
})

onMounted(() => {
  const el = document.querySelector('.section-map')
  el.addEventListener('keydown', (e) => {
    if (!e.target.classList.contains('section-map__select-inp')) {
      e.preventDefault()
    }
    if (!mainStore.modifiedItems.length) return
    if (['ArrowUp', 'ArrowRight'].includes(e.key)) {
      changeIndex('next')
    }
    if (['ArrowDown', 'ArrowLeft'].includes(e.key)) {
      changeIndex('prev')
    }
  })
})
</script>

<style>
.section-map__controls {
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 2000;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-map__select {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.section-map__select-inp:focus::placeholder {
  opacity: 0;
}

.section-map__select-inp:focus + .section-map__select-items {
  opacity: 1;
  pointer-events: initial;
}

.section-map__select-items {
  border-radius: 5px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  max-height: 200px;
  background-color: #fff;
  overflow-y: auto;
  width: 100%;
}

.section-map__select-items > * {
  cursor: pointer;
}

.section-map__select-items:focus {
  opacity: 1;
  pointer-events: initial;
}

.section-map__btn:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.section-map__center-btn {
  position: absolute;
  right: 15px;
}
</style>
