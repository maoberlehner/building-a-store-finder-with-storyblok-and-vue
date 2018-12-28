<template>
  <form
    class="StoreFinderSearch"
    @submit.prevent="searchAddress"
  >
    <input
      v-model="address"
      placeholder="Enter your address"
      aria-label="Your address"
      class="StoreFinderSearch__input StoreFinderSearch__form-element"
    >
    <button class="StoreFinderSearch__form-element">
      Search store
    </button>
    <button
      type="button"
      class="StoreFinderSearch__form-element"
      @click="searchNearBy"
    >
      Stores near me
    </button>
  </form>
</template>

<script>
import gmapsInit from '../utils/gmaps';

export default {
  name: `StoreFinderSearch`,
  data() {
    return {
      address: null,
    };
  },
  async created() {
    this.google = await gmapsInit();
    this.geocoder = new this.google.maps.Geocoder();
  },
  methods: {
    searchAddress() {
      this.geocoder.geocode({ address: this.address }, (results, status) => {
        if (status !== `OK` || !results[0]) return;

        // Set address field to the address
        // found by the Google Maps API and
        // emit a search event with the found
        // coordinates.
        this.address = results[0].formatted_address;
        this.$emit(`search`, {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        });
      });
    },
    async searchNearBy() {
      const {
        latitude,
        longitude,
      } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => resolve(coords),
          // Reject if the user doesn't
          // allow accessing their location.
          error => reject(error),
        );
      });

      const latLng = new this.google.maps.LatLng(latitude, longitude);
      this.geocoder.geocode({ latLng }, (results, status) => {
        if (status !== `OK` || !results[0]) return;

        // Set address field to the address
        // found by the Google Maps API and
        // emit a search event with the users
        // coordinates.
        this.address = results[0].formatted_address;
        this.$emit(`search`, {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/settings/**/*';

$breakpoint: 42em;

.StoreFinderSearch {
  display: flex;

  @media (max-width: $breakpoint - 0.0625em) {
    flex-direction: column;
  }
}

.StoreFinderSearch__form-element {
  padding: setting-spacing(s);
  border: 1px solid #e0e0e0;
  border-radius: 0.25em;

  @media (max-width: $breakpoint - 0.0625em) {
    &:not(:first-child) {
      margin-top: setting-spacing(xs);
    }
  }

  @media (min-width: $breakpoint) {
    &:not(:first-child) {
      margin-left: setting-spacing(xs);
    }
  }
}

.StoreFinderSearch__input {
  flex-grow: 1;
}
</style>
