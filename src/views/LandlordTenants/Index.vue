<template>
  <div>
    <b-container
      class="d-lg-block d-none"
      fluid
      style="padding-left: 23em; padding-right: 3em"
    >
      <Controls />
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <UpcomingRents
        v-else
        :apartment-rentals="apartmentRentals"
        @filter="filterRentals"
      />
    </b-container>
    <b-container class="d-lg-none" fluid>
      <Controls />
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <MobileUpcomingRents
        v-else
        :apartment-rentals="apartmentRentals"
        @filter="filterRentals"
      />
    </b-container>
  </div>
</template>

<script>
import Controls from "./components/Controls";
import UpcomingRents from "./UpcomingRents";
import MobileUpcomingRents from "./MobileUpcomingRents";
export default {
  components: {
    Controls,
    UpcomingRents,
    MobileUpcomingRents,
  },
  mounted() {
    this.fetchRentals();
  },
  methods: {
    fetchRentals() {
      let url = `${this.ROUTES.rentals}/landlord?per_page=5`;
      this.apiGet(url).then((res) => {
        const { apartment_rentals } = res.data.data;
        this.apartmentRentals = apartment_rentals;
      });
    },
    filterRentals(dateRented) {
      if (dateRented) {
        let url = `${this.ROUTES.rentals}/landlord?per_page=5&date_added=${dateRented}`;
        this.apiGet(url).then((res) => {
          const { apartment_rentals } = res.data.data;
          this.apartmentRentals = apartment_rentals;
        });
      } else {
        this.fetchRentals();
      }
    },
  },
  data() {
    return {
      apartmentRentals: null,
    };
  },
};
</script>

<style></style>
