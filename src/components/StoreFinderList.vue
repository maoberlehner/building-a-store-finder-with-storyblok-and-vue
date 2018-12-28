<template>
  <ul class="StoreFinderList">
    <StoreFinderItem
      v-for="store in stores"
      :key="store.id"
      :address="store.content.address"
      :name="store.name"
      :opening-hours="store.content.opening_hours"
      class="StoreFinderList__item"
    />
  </ul>
</template>

<script>
import StoreFinderItem from './StoreFinderItem.vue';

export default {
  name: `StoreFinderList`,
  components: {
    StoreFinderItem,
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

.StoreFinderList__item {
  &:not(:first-child) {
    margin-top: setting-spacing(m);
    padding-top: setting-spacing(m);
    border-top: 1px solid #e0e0e0;
  }
}
</style>
