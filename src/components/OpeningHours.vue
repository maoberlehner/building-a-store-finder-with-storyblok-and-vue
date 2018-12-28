<template>
  <div class="OpeningHours">
    <table>
      <tbody>
        <tr
          v-for="(row, index) in compactOpeningHours"
          :key="index"
        >
          <td class="OpeningHours__days">
            {{ row.days.join('-') }}
          </td>
          <td>
            {{ row.times.join(', ') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: `OpeningHours`,
  props: {
    days: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
  computed: {
    compactOpeningHours() {
      return this.days.reduce((prev, current, index) => {
        // If no times are given, skip this day.
        if (!current.times.length) return prev;

        // If at least one day was already added ...
        if (prev.length) {
          const previousTimes = this.days[index - 1].times;

          // ... check if the times of the current day match
          // those of the times of the previously added day.
          if (JSON.stringify(previousTimes) === JSON.stringify(current.times)) {
            // Add the name of the current day as the
            // second day in the array of day names.
            //
            // Example:
            // 1. We start with `['Monday']`.
            // 2. The opening hours of Tuesday do match those
            //    of Monday and we get `['Monday', 'Tuesday']`.
            // 3. If the Wednesday opening hours also match
            //    those of Tuesday we end up with
            //    `['Monday', 'Wednesday']` and so on.
            // eslint-disable-next-line no-param-reassign
            prev[prev.length - 1].days = [
              prev[prev.length - 1].days[0],
              current.name.substring(0, 2),
            ];

            return prev;
          }
        }

        // Add a new row.
        prev.push({
          days: [current.name.substring(0, 2)],
          times: current.times.map(x => `${x.start}-${x.end}`),
        });

        return prev;
      }, []);
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/settings/**/*';

.OpeningHours__days {
  padding-right: setting-spacing(xs);
}
</style>
