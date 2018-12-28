<template>
  <div class="StoreFinder">
    <div class="StoreFinder__search">
      <StoreFinderSearch @search="currentCoordinates = $event"/>
    </div>
    <div class="StoreFinder__grid">
      <div class="StoreFinder__list-wrap">
        <StoreFinderList :stores="storesOrderedByDistance"/>
      </div>
      <div class="StoreFinder__map-wrap">
        <StoreFinderMap
          :stores="storesOrderedByDistance"
          :current-location="currentCoordinates"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  convertUnit,
  orderByDistance,
} from 'geolib';

import StoreFinderList from './StoreFinderList.vue';
import StoreFinderMap from './StoreFinderMap.vue';
import StoreFinderSearch from './StoreFinderSearch.vue';

export default {
  name: `StoreFinder`,
  components: {
    StoreFinderList,
    StoreFinderMap,
    StoreFinderSearch,
  },
  props: {
    stores: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      currentCoordinates: null,
    };
  },
  computed: {
    storeCoordinates() {
      return this.stores.map(store => ({
        latitude: store.content.address.latitude,
        longitude: store.content.address.longitude,
      }));
    },
    storesOrderedByDistance() {
      if (!this.currentCoordinates) return this.stores;

      const orderAndDistance = orderByDistance(
        this.currentCoordinates,
        this.storeCoordinates,
      );

      return orderAndDistance.map(({ distance, key }) => ({
        ...this.stores[key],
        distance: convertUnit(`km`, distance, 1),
      }));
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/settings/**/*';

.StoreFinder__grid {
  $breakpoint: 42em;

  display: flex;
  margin-top: setting-spacing(s);
  border: 1px solid #e0e0e0;
  border-radius: 0.25em;

  @media (max-width: $breakpoint - 0.0625em) {
    flex-direction: column-reverse;
  }

  @media (min-width: $breakpoint) {
    height: 32em;
  }
}

.StoreFinder__list-wrap {
  padding: setting-spacing(m);
  overflow: auto;
}

.StoreFinder__map-wrap {
  flex-grow: 1;
}
</style>
