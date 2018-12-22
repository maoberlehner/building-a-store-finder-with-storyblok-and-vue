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
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: `Austria` }, (results, status) => {
        if (status !== `OK` || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
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
