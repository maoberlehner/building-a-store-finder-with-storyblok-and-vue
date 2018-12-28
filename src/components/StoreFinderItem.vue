<template>
  <li class="StoreFinderItem">
    <address class="StoreFinderItem__section">
      <div class="StoreFinderItem__section">
        <div class="StoreFinderItem__headline">
          {{ name }}
        </div>
        {{ address.postal_code }}
        {{ address.town }}<br>
        {{ address.street }}
      </div>
      <div
        v-if="address.phone || address.fax"
        class="StoreFinderItem__section"
      >
        <template v-if="address.phone">
          Tel.:
          <a
            :href="`tel:${address.phone}`"
            v-text="address.phone"
          />
          <br>
        </template>
        <template v-if="address.fax">
          Fax: {{ address.fax }}
        </template>
      </div>
    </address>
    <div class="StoreFinderItem__section">
      <OpeningHours :days="openingHours.days"/>
    </div>
    <div class="StoreFinderItem__section">
      <a :href="directionsUrl">
        Directions
      </a>
    </div>
  </li>
</template>

<script>
import OpeningHours from './OpeningHours.vue';

export default {
  name: `StoreFinderItem`,
  components: {
    OpeningHours,
  },
  props: {
    address: {
      default: () => {},
      required: true,
      type: Object,
    },
    name: {
      default: ``,
      required: true,
      type: String,
    },
    openingHours: {
      default: () => {},
      required: true,
      type: Object,
    },
  },
  created() {
    // Create a Google Maps URL,
    // for directions to the shop.
    const url = `https://www.google.com/maps/dir/?api=1`;
    const destination = [
      this.address.street,
      `${this.address.postal_code} ${this.address.town}`,
    ].join(`, `);
    this.directionsUrl = `${url}&destination=${encodeURI(destination)}`;
  },
};
</script>

<style lang="scss">
@import '../assets/scss/settings/**/*';

.StoreFinderItem__headline {
  font-weight: bold;
}

.StoreFinderItem__section {
  &:not(:first-child) {
    margin-top: setting-spacing(s);
  }
}
</style>
