<template>
  <div class="StoreFinderMap"/>
</template>

<script>
import MarkerClusterer from '@google/markerclusterer';

import gmapsInit from '../utils/gmaps';

export default {
  name: `StoreFinderMap`,
  props: {
    currentLocation: {
      default: () => ({}),
      type: Object,
    },
    stores: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
  watch: {
    currentLocation() {
      // Zoom to the nearest store relative
      // to the current location.
      const nearestStore = this.stores[0];
      const { latitude, longitude } = nearestStore.content.address;
      const latLng = new this.google.maps.LatLng(latitude, longitude);
      this.geocoder.geocode({ latLng }, (results, status) => {
        if (status !== `OK` || !results[0]) return;

        this.map.setCenter(results[0].geometry.location);
        this.map.fitBounds(results[0].geometry.viewport);
      });
    },
  },
  async mounted() {
    try {
      this.google = await gmapsInit();
      this.geocoder = new this.google.maps.Geocoder();
      this.map = new this.google.maps.Map(this.$el);

      // Zoom to Europe.
      this.geocoder.geocode({ address: `Europe` }, (results, status) => {
        if (status !== `OK` || !results[0]) {
          throw new Error(status);
        }
        this.map.setCenter(results[0].geometry.location);
        this.map.fitBounds(results[0].geometry.viewport);
      });

      // Initialize and cluster markers.
      const markerClickHandler = (marker) => {
        this.map.setZoom(16);
        this.map.setCenter(marker.getPosition());
      };
      const markers = this.stores
        .map((store) => {
          const marker = new this.google.maps.Marker({
            position: {
              lat: store.content.address.latitude,
              lng: store.content.address.longitude,
            },
            map: this.map,
          });
          marker.addListener(`click`, () => markerClickHandler(marker));
          return marker;
        });
      // eslint-disable-next-line no-new
      new MarkerClusterer(this.map, markers, {
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
