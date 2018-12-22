<template>
  <div class="App">
    <h1 class="App__headline">
      Store Finder
    </h1>
  </div>
</template>

<script>
import gmapsInit from './utils/gmaps';

export default {
  name: `App`,
  async mounted() {
    try {
      const google = await gmapsInit();
      console.log(google);
    } catch (error) {
      console.error(error);
    }
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
