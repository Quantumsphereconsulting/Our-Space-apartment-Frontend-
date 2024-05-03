<template>
  <div>
    <div id="p-controls" class="d-lg-block d-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.5em; color: #c221cf">
          <span
            @click="$router.push({ name: 'LandlordApartments' })"
            class="back mr-2"
          >
            Apartments
          </span>
          <span class="mr-2"> >> </span>
          <span>Preview Apartment</span>
        </p>
        <div>
          <b-button
            class="primary-outline-btn btn-lg mr-4"
            @click="$refs['apartment-bookings'].show()"
          >
            <fa-icon :icon="['far', 'calendar']" class="mr-2" />
            Apartment Bookings
          </b-button>
          <b-button
            class="primary-btn btn-lg"
            @click="$router.push({ name: 'EditLandlordApartments' })"
          >
            <fa-icon :icon="['fas', 'pen']" class="mr-2" />
            Edit Apartment
          </b-button>
        </div>
      </div>
    </div>
    <div id="p-controls-mobile" class="d-lg-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.2em; color: #c221cf">
          <span
            @click="$router.push({ name: 'LandlordApartments' })"
            class="back mr-2"
          >
            Apartments
          </span>
          <span class="mr-2"> >> </span>
          <span>Preview Apartment</span>
        </p>
        <div class="d-flex justify-content-between">
          <b-button
            class="primary-outline-btn mr-4"
            @click="$refs['apartment-bookings'].show()"
          >
            <fa-icon :icon="['far', 'calendar']" class="mr-1" />
            Apartment Bookings
          </b-button>
          <b-button
            class="primary-btn"
            @click="$router.push({ name: 'EditLandlordApartments' })"
          >
            <fa-icon :icon="['fas', 'pen']" class="mr-1" />
            Edit Apartment
          </b-button>
        </div>
      </div>
    </div>
    <b-modal
      ref="apartment-bookings"
      size="xl"
      centered
      hide-header
      hide-footer
    >
      <div
        style="font-family: 'Circular Std Book', sans-serif"
        class="p-lg-4 p-3"
      >
        <p style="font-size: 2em; opacity: 0.8">
          Ventosa Apartment in Lekki Phase 1
        </p>
        <div class="accordion mt-5">
          <div>
            <div
              style="border-bottom: 1px solid #cecece"
              v-b-toggle.accordion-1
            >
              <p style="font-size: 1.3em">Previous Bookings</p>
            </div>
            <b-collapse
              id="accordion-1"
              accordion="my-accordion"
              role="tabpanel"
            >
            </b-collapse>
          </div>
          <div class="mt-5">
            <div
              style="border-bottom: 1px solid #cecece"
              v-b-toggle.accordion-2
            >
              <p style="font-size: 1.3em">Current Booking</p>
            </div>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
            </b-collapse>
          </div>
          <div class="mt-5">
            <div
              style="border-bottom: 1px solid #cecece"
              v-b-toggle.accordion-3
              v-if="bookings"
            >
              <p style="font-size: 1.3em">
                Upcoming Bookings ({{ bookings.length }})
              </p>
            </div>
            <b-collapse
              id="accordion-3"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <ApartmentBooking
                v-for="(booking, index) in bookings"
                :key="index"
                :booking="booking"
              />
            </b-collapse>
          </div>
        </div>
        <div class="text-center">
          <b-button
            class="primary-outline-btn btn-lg mt-5 px-5"
            @click="$refs['apartment-bookings'].hide()"
          >
            Close
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ApartmentBooking from "./ApartmentBooking";
export default {
  components: {
    ApartmentBooking,
  },
  props: {
    apartment: null,
  },
  mounted() {
    this.fetchBookings();
  },
  methods: {
    fetchBookings() {
      let url = `${this.ROUTES.rentals}?as_landlord=1&bookings=1`;
      this.apiGet(url).then((res) => {
        const { apartment_rentals } = res.data.data;
        const { data } = apartment_rentals;
        this.bookings = data;
      });
    },
  },
  data() {
    return {
      bookings: [],
    };
  },
};
</script>

<style>
#p-controls {
  padding-top: 4.6em;
}
#p-controls-mobile {
  padding-top: 2.3em;
  text-align: center;
}
.back {
  transition: 0.5s ease;
}
.back:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
