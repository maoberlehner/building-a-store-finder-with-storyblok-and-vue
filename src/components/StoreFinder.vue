<template>
  <div class="StoreFinder">
    <div class="StoreFinder__search">
      <!-- StoreFinderSearch -->
    </div>
    <div class="StoreFinder__grid">
      <div class="StoreFinder__list">
        <!-- StoreFinderList -->
      </div>
      <div class="StoreFinder__map">
        <!-- StoreFinderMap -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `StoreFinder`,
  props: {
    stores: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
};
</script>
