<template>
    <section class="section-map relative">
      <l-map
          v-model="zoom"
          v-model:zoom="zoom"
          :center="[47.41322, -1.219482]"
          @move="log('move')"
      >
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        <l-marker :lat-lng="[item['Широта БС (начало, А)'], item['Долгота БС (начало, А)']]" @moveend="log('moveend')" v-for="item in modifiedItems">
          <l-tooltip>
            lol
          </l-tooltip>
        </l-marker>

<!--        <l-marker :lat-lng="[50, 50]" @moveend="log('moveend')">-->
<!--          <l-popup>-->
<!--            lol-->
<!--          </l-popup>-->
<!--        </l-marker>-->

        <!--        <l-marker :lat-lng="[47.41322, -1.219482]">-->
        <!--          <l-icon :icon-url="iconUrl" :icon-size="iconSize" />-->
        <!--        </l-marker>-->
      </l-map>
      <div class="section-map__controls absolute top-4 left-4 font-">
        <button @click="changeIcon">New kitten icown</button>
      </div>
    </section>
</template>


<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  name: 'SectionMap',
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
  },
  props: {
    items: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      zoom: 2,
      iconWidth: 25,
      iconHeight: 40,
    };
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
    modifiedItems() {
      const b = this.items.slice(0, 500).filter(item => item['Широта БС (начало, А)'] && item['Долгота БС (начало, А)'])
      const lol = b.map(item => item['Широта БС (начало, А)'])
      const b2 = [...new Set(lol)]
      console.log(b2);
      return b
    }
  },
  methods: {
    log(a) {
      console.log(a);
    },
    changeIcon() {
      this.iconWidth += 2;
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2);
      }
    },
  },
}
</script>
