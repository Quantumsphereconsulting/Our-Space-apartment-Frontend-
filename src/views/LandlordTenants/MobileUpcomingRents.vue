<template>
  <div id="mobile-upcoming-rents">
    <p style="font-size: 1.25em; color: #3c4043; text-align: center">
      Upcoming Rent Renewal
    </p>
    <div class="search-date-mobile">
      <date-picker
        valueType="MM/YYYY"
        placeholder="Search by Date"
        type="month"
        v-model="dateRented"
        @input="filter"
      />
    </div>
    <div v-if="items.length > 0" class="d-flex flex-column mt-3">
      <UpcomingRent
        v-for="(item, index) in items"
        :key="index"
        :rental="item"
      />
    </div>
    <div v-else class="mt-3">
      <p class="text-center">There are no upcoming rents</p>
    </div>
    <Paginator
      v-if="rentals"
      :current-page="rentals.current_page"
      :last-page="rentals.last_page"
      :go-to-next="rentals.next_page_url"
      :go-to-prev="rentals.prev_page_url"
      @click="paginate"
    />
  </div>
</template>

<script>
import UpcomingRent from "./components/UpcomingRent";
import Paginator from "./components/Paginator";
export default {
  components: {
    UpcomingRent,
    Paginator,
  },
  data() {
    return {
      items: [],
      rentals: null,
      currentRental: null,
      reminding: false,
      dateRented: null,
    };
  },
  props: ["apartmentRentals"],
  mounted() {
    this.rentals = this.apartmentRentals;
    this.items = this.apartmentRentals.data;
  },
  methods: {
    paginate(apartmentRentals) {
      if (apartmentRentals) {
        this.items = apartmentRentals.data;
        this.rentals = apartmentRentals;
      }
    },
    async sendReminder(rental) {
      this.currentRental = rental;
      const url = `${this.ROUTES.rentals}/${rental.id}/reminder`;
      await this.apiPost(url, {}).then((res) => {
        const { success, message } = res.data;
        if (success) {
          this.apiSuccess("Action Successful", message);
        }
      });
    },
    filter() {
      this.$emit("filter", this.dateRented);
    },
  },
};
</script>

<style>
#mobile-upcoming-rents {
  margin-top: 3em;
  margin-bottom: 3em;
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
