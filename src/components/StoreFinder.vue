<template>
  <div class="StoreFinder">
    <div class="StoreFinder__search">
      <!-- StoreFinderSearch -->
    </div>
    <div class="StoreFinder__grid">
      <div class="StoreFinder__list-wrap">
        <StoreFinderList :stores="stores"/>
      </div>
      <div class="StoreFinder__map-wrap">
        <StoreFinderMap :stores="stores"/>
      </div>
    </div>
  </div>
</template>

<script>
import StoreFinderList from './StoreFinderList.vue';
import StoreFinderMap from './StoreFinderMap.vue';

export default {
  name: `StoreFinder`,
  components: {
    StoreFinderList,
    StoreFinderMap,
  },
  props: {
    stores: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/settings/**/*';

.StoreFinder__grid {
  $breakpoint: 42em;

  display: flex;
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
