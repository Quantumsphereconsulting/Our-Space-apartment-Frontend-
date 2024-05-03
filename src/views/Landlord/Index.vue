<template>
  <div>
    <b-container
      fluid
      class="d-lg-block d-none"
      style="padding-left: 23em; padding-right: 3em"
    >
      <scale-loader
        v-if="apiBusy"
        class="loader mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <div v-else>
        <Statistics :num-apartments="numApartments" :num-rentals="numRentals" />
        <UpcomingRents :rentals="rentals" />
        <ListedApartments :apartments="apartments" />
      </div>
    </b-container>
    <!--    mobile view-->
    <b-container fluid class="d-lg-none">
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <div v-else>
        <MobileStatistics
          :num-apartments="numApartments"
          :num-tenants="numRentals"
        />
        <MobileUpcomingRents :rentals="rentals" />
        <MobileListedApartments :apartments="apartments" />
      </div>
    </b-container>
  </div>
</template>

<script>
import Statistics from "./Statistics";
import UpcomingRents from "./UpcomingRents";
import ListedApartments from "./ListedApartments";

import MobileStatistics from "./MobileStatistics";
import MobileUpcomingRents from "./MobileUpcomingRents";
import MobileListedApartments from "./MobileListedApartments";

export default {
  components: {
    Statistics,
    UpcomingRents,
    ListedApartments,
    MobileStatistics,
    MobileUpcomingRents,
    MobileListedApartments,
  },
  async mounted() {
    await this.fetchApartments();
  },
  data() {
    return {
      apartments: {},
      rentals: {},
      numApartments: 0,
      numRentals: 0,
    };
  },
  methods: {
    async fetchApartments() {
      const url = `${this.ROUTES.apartment}?per_page=4&page=1`;
      await this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments;
        this.numApartments = apartments.total;
      });
      await this.fetchRentals();
    },
    fetchRentals() {
      let url = `${this.ROUTES.rentals}/landlord?per_page=3`;
      this.apiGet(url).then((res) => {
        const { apartment_rentals } = res.data.data;
        this.rentals = apartment_rentals.data;
        this.numRentals = apartment_rentals.total;
      });
    },
  },
};
</script>

<style>
.loader {
  //position: fixed;
  //top: 50%;
  //left: 50%;
  //transform: translate(-50%, -50%);
}
</style>
