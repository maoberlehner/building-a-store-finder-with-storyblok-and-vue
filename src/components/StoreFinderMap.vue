<template>
  <div class="StoreFinderMap"/>
</template>

<script>
import MarkerClusterer from '@google/markerclusterer';

import gmapsInit from '../utils/gmaps';

export default {
  name: `StoreFinderMap`,
  props: {
    stores: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      // Zoom to Europe.
      geocoder.geocode({ address: `Europe` }, (results, status) => {
        if (status !== `OK` || !results[0]) {
          throw new Error(status);
        }
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });

      // Initialize and cluster markers.
      const markerClickHandler = (marker) => {
        map.setZoom(16);
        map.setCenter(marker.getPosition());
      };
      const markers = this.stores
        .map((store) => {
          const marker = new google.maps.Marker({
            position: {
              lat: store.content.address.latitude,
              lng: store.content.address.longitude,
            },
            map: map,
          });
          marker.addListener(`click`, () => markerClickHandler(marker));
          return marker;
        });
      // eslint-disable-next-line no-new
      new MarkerClusterer(map, markers, {
        imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`,
      });
    } catch (error) {
      // Implement your own error handling here.
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },
};
</script>

<style lang="scss">
.StoreFinderMap {
  width: 100%;
  height: 100%;
  min-height: 15em;
}
</style>
