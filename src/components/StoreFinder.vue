<template>
  <div class="StoreFinder">
    <div class="StoreFinder__search">
      <!-- StoreFinderSearch -->
    </div>
    <div class="StoreFinder__grid">
      <div class="StoreFinder__list">
        <StoreFinderList :stores="stores"/>
      </div>
      <div class="StoreFinder__map">
        <!-- StoreFinderMap -->
      </div>
    </div>
  </div>
</template>

<script>
import StoreFinderList from './StoreFinderList.vue';

export default {
  name: `StoreFinder`,
  components: {
    StoreFinderList,
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
