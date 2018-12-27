<template>
  <div class="App">
    <h1 class="App__headline">
      Store Finder
    </h1>
    <StoreFinder :stores="stores"/>
  </div>
</template>

<script>
import * as storeService from './services/store';

import StoreFinder from './components/StoreFinder.vue';

export default {
  name: `App`,
  components: {
    StoreFinder,
  },
  data() {
    return {
      stores: [],
    };
  },
  created() {
    // Initially fetch all stores.
    this.fetchStores();
  },
  methods: {
    async fetchStores() {
      this.stores = await storeService.list();
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/settings/**/*';
@import './assets/scss/generic/**/*';

.App {
  padding-top: setting-spacing(xl);
  padding-bottom: setting-spacing(xl);
}

.App__headline {
  text-align: center;
}
</style>
