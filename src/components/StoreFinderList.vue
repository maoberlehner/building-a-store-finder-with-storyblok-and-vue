<template>
  <TransitionGroup
    name="StoreFinderList__item-"
    tag="ul"
    class="StoreFinderList"
  >
    <StoreFinderItem
      v-for="store in stores"
      :key="store.id"
      :address="store.content.address"
      :distance="store.distance"
      :name="store.name"
      :opening-hours="store.content.opening_hours"
      class="StoreFinderList__item"
    />
  </TransitionGroup>
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
  transition-duration: 0.3s;
  transition-property: opacity, transform;

  &:not(:first-child) {
    margin-top: setting-spacing(m);
    padding-top: setting-spacing(m);
    border-top: 1px solid #e0e0e0;
  }
}

.StoreFinderList__item--enter,
.StoreFinderList__item--leave-to {
  opacity: 0;
}

.StoreFinderList__item--leave-active {
  position: absolute;
}
</style>
