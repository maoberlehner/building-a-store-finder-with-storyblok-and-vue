<template>
  <div class="App">
    <h1 class="App__headline">
      Store Finder
    </h1>
    <StoreFinder :stores="stores"/>
  </div>
</template>

<script>
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
