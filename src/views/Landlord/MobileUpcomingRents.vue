<template>
  <div id="mobile-upcoming-rents">
    <p style="font-size: 1.25em; color: #3c4043">
      Upcoming Tenant Rent Renewal
    </p>
    <div class="d-flex flex-column mt-3" v-if="rentals && rentals.length > 0">
      <UpcomingRent
        v-for="(rental, index) in rentals"
        :key="index"
        :rental="rental"
      />
    </div>
    <div v-else class="mt-3">
      <p class="text-center">There are no upcoming rents</p>
    </div>
    <p
      style="color: #c221cf; margin-top: 1em; float: right"
      @click="$router.push({ name: 'LandlordTenants' })"
    >
      View all >>
    </p>
  </div>
</template>

<script>
import UpcomingRent from "./components/UpcomingRent";
export default {
  components: {
    UpcomingRent,
  },
  props: ["rentals"],
};
</script>

<style>
#mobile-upcoming-rents {
  margin-top: 1em;
  margin-bottom: 2em;
}
.search-date-mobile {
  position: relative;
}
.search-date-icon-mobile {
  position: absolute;
  bottom: 25%;
  left: 90%;
}
</style>
