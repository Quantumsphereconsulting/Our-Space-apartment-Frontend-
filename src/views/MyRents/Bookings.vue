<template>
  <b-container id="tenancy">
    <p class="tenancy-title">My Rents</p>
    <Controls />
    <div class="pb-5">
      <p
        v-show="getBookings.length > 0"
        style="font-size: 1.125em; color: #3c4043"
      >
        Bookings
      </p>
      <div v-if="getBookings.length > 0">
        <b-card
          v-for="(rent, index) in getBookings"
          :key="index"
          no-body
          class="border-0 custom-shadow border-primary mb-3"
          style="border-radius: 10px"
        >
          <b-card-header
            header-tag="header"
            class="p-1 bg-white border-0"
            role="tab"
          >
            <b-button block v-b-toggle="`accordion-${index}`" variant="white">
              <div class="d-md-flex d-block flex-md-row align-items-center">
                <div
                  style="width: 50px; height: 50px"
                  class="bg-primary-color mr-3 rounded-circle d-none d-md-flex justify-content-center align-items-center"
                >
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2.69L15 7.19V15H13V9H7V15H5V7.19L10 2.69ZM10 0L0 9H3V17H9V11H11V17H17V9H20L10 0Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div class="flex-grow-1 text-left">
                  <p
                    style="font-size: 1.1em; color: #3c4043"
                    class="p-0 m-0 text-left"
                  >
                    {{ rent.apartment.name }}
                  </p>
                  <b-badge v-if="rent.is_active" pill variant="success"
                    >In Progress</b-badge
                  >
                  <b-badge v-else pill variant="danger">Expired </b-badge>
                </div>
                <div class="d-flex align-items-center">
                  <p
                    class="m-0 text-primary-color font-weight-bold text-left"
                    style="font-size: 1rem"
                  >
                    {{ formatCurrency(rent.apartment.price) }}
                  </p>
                  <span style="font-size: 0.8em">/month</span>
                </div>
              </div>
            </b-button>
          </b-card-header>
          <b-collapse
            :id="`accordion-${index}`"
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body class="pt-0">
              <div
                class="d-flex flex-column flex-md-row align-items-start border-top border-primary-color pt-3"
              >
                <div class="flex-grow-1 pr-5">
                  <b-card-text>{{
                    truncate(rent.apartment.description, 500)
                  }}</b-card-text>
                  <div class="d-flex" style="font-size: 1em; color: #3c4043">
                    <span style="color: #ffcc4d">
                      <fa-icon :icon="['fas', 'star']" class="mr-2" />
                    </span>
                    <span class="mr-2">{{ rent.apartment.rating }}</span>
                    <span class="reviews mr-5"
                      >({{ rent.apartment.reviews_count }} reviews)</span
                    >
                    <!-- <fa-icon :icon="['fas', 'share-alt']" class="mr-2" />
                    <span>Share</span> -->
                  </div>
                </div>
                <div class="rent-duration-wrapper">
                  <RentDuration
                    :expiredAt="rent.expired_at"
                    type="Stay Expiration"
                    action="Renew Rent"
                  />
                  <b-button
                    class="rent-toggle-btn d-block d-md-none"
                    style="
                      background: #c221cf;
                      border-radius: 5px;
                      height: 50px;
                    "
                    >Cancel Booking</b-button
                  >
                </div>
              </div>
            </b-card-body>
            <b-card-footer
              style="border-color: #c221cf"
              class="border-top bg-white border-bottom-0 border-left-0 border-right-0 p-0 border-primary-color"
            >
              <div class="d-flex">
                <b-dropdown
                  class="home-dropdown"
                  style="margin-bottom: 1em; margin-top: -0.29em"
                >
                  <template #button-content>
                    <div
                      class="d-flex align-items-center px-4 py-3 border-right border-primary-color"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                          fill="#3C4043"
                        />
                      </svg>
                      more
                    </div>
                  </template>
                  <b-dropdown-item @click="previewReceipt(rent)" id="first-item"
                    >Preview Receipt</b-dropdown-item
                  >
                  <b-dropdown-item @click="$refs['apartment-agreement'].show()">
                    Preview Agreement
                  </b-dropdown-item>
                  <b-dropdown-item @click="viewCheckInCheckOut(rent)">
                    Check In/Out | Date & Time
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click="viewLandLordInfo(rent)"
                    id="last-item"
                    >Landlord Profile</b-dropdown-item
                  >
                </b-dropdown>
                <div
                  class="flex-grow-1 d-flex align-items-center justify-content-end pr-4"
                >
                  <div class="d-flex align-items-center">
                    <span>Check Out</span>
                    <b-form-checkbox
                      class="mx-2 py-0"
                      v-model="checked"
                      name="check-button"
                      :disabled="!rent.is_active"
                      :value="
                        checkOutCheckInState(
                          rent.check_in_date,
                          rent.check_out_date,
                          rent
                        )
                      "
                      @change="checkOutOrIn(rent)"
                      switch
                    >
                    </b-form-checkbox>
                    <span>Check In</span>
                  </div>
                </div>
                <div
                  class="px-4 py-3 border-left border-primary-color d-none d-md-block"
                >
                  <b-button
                    style="
                      background: #c221cf;
                      border-radius: 5px;
                      height: 50px;
                    "
                    class="primary-btn px-5"
                    @click="rentDurationAction"
                  >
                    {{ "Cancel Booking" }}
                  </b-button>
                </div>
              </div>
            </b-card-footer>
          </b-collapse>
        </b-card>
      </div>
      <div class="d-flex justify-content-center" v-else>
        <div>
          <p style="font-size: 1.5rem; padding-top: 0.6rem" class="text-center">
            No bookings
          </p>
          <div class="d-flex justify-content-center">
            <b-button
              class="primary-btn cio-btn"
              @click="$router.push('/apartments')"
            >
              Visit apartments
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <b-pagination
      v-show="getBookings.length > 0"
      align="center"
      v-model="apartments.current_page"
      :total-rows="apartments.total"
      :per-page="apartments.per_page"
      aria-controls="my-table"
      @change="changepage"
      pills
      first-number
      last-number
      limit="8"
    />

    <b-modal
      ref="receipt"
      hide-footer
      hide-header
      centered
      size="lg"
      class="p-0"
    >
      <div
        id="receipt"
        class="pt-lg-5 px-lg-5 pb-lg-2 p-3"
        style="
          font-family: 'Circular Std Book', sans-serif;
          background-color: #3c4043;
          border-radius: 10px 10px 0 0;
          color: #ffffff;
        "
      >
        <p class="mb-0" style="font-size: 2em">Payment Receipt</p>
        <!-- <p style="font-size: 1.1em; opacity: 0.8">#00001</p> -->
        <div class="d-flex justify-content-between">
          <p v-if="receipt" style="font-size: 1.1em">
            {{ receipt.created_at | moment("dddd, MMMM Do YYYY") }}
          </p>
          <div class="d-lg-flex d-none">
            <p class="mr-5 pr-action">
              <b-img
                class="mr-1"
                fluid
                :src="require('../../assets/icons/receipt-pdf-white.svg')"
              />
              Download PDF
            </p>
            <p class="pr-action">
              <b-img
                class="mr-1"
                fluid
                :src="require('../../assets/icons/print-receipt-white.svg')"
              />
              Print
            </p>
          </div>
        </div>
      </div>
      <div
        class="py-lg-3 px-lg-5 px-3"
        style="font-family: 'Circular Std Book', sans-serif"
      >
        <div
          style="background: rgba(60, 64, 67, 0.02); border-radius: 10px"
          class="d-flex justify-content-between mt-3 px-lg-4 px-2 pt-3"
        >
          <p style="color: #3c4043; font-size: 1.125em">Details</p>
          <p style="color: #3c4043; font-size: 1.125em">Price</p>
        </div>
        <div
          class="d-flex justify-content-between align-items-center px-lg-4 px-2 pt-3"
          style="border-bottom: 0.01em solid #c4c4c4"
          v-if="receipt"
        >
          <p style="color: #3c4043; opacity: 0.8">
            {{ rental.apartment.name }}
          </p>
          <p style="color: #3c4043; opacity: 0.8">
            <span style="font-size: 1.5em">
              {{ formatCurrency(receipt.truthy_amount) }}
            </span>
          </p>
        </div>
        <p class="d-flex justify-content-end mt-3">
          Inclusive of VAT at <strong class="ml-2">25%</strong>
        </p>
        <div
          style="background: rgba(60, 64, 67, 0.02); border-radius: 10px"
          class="d-flex justify-content-between mt-3 px-lg-4 px-2 pt-3"
          v-if="receipt"
        >
          <p style="color: #3c4043; font-size: 1.125em">Total:</p>
          <p style="color: #3c4043; font-size: 1.125em">
            <span style="font-size: 1.5em">
              {{ formatCurrency(receipt.amount) }}
            </span>
          </p>
        </div>
        <p class="close-receipt mt-lg-5 mt-3" @click="closeReceipt">Close</p>
      </div>
    </b-modal>

    <b-modal hide-footer centered size="lg" v-model="modalShowLandlord">
      <div
        v-if="landLoard"
        class="d-flex justify-content-center align-items-center"
      >
        <div class="bg-dark rounded-circle" style="width: 130px; height: 130px">
          <b-img
            :src="landLoard.avatar"
            fluid
            class="rounded-circle"
            style="width: 100%; height: 100%; object-fit: cover"
            alt="Responsive image"
          ></b-img>
        </div>
      </div>
      <div v-if="landLoard" class="py-2">
        <h4 class="text-center">
          {{ landLoard.full_name }}
        </h4>
        <div class="d-flex pb-2 justify-content-center align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <p class="m-0 pl-1">
            <a :href="landLoard.email">{{ landLoard.email }}</a>
          </p>
        </div>
        <div class="d-flex pb-3 justify-content-center align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <p class="m-0 pl-1">
            <a :href="`tel:${landLoard.phone_number}`">{{
              landLoard.phone_number
            }}</a>
          </p>
        </div>
        <p></p>
      </div>
    </b-modal>

    <b-modal ref="apartment-agreement" hide-footer centered size="lg">
      <div id="apartment-agreement" class="px-lg-4 py-lg-2 px-2 py-1">
        <p class="apartment-agreement-title">
          {{ agreementNote.title }}
        </p>
        <p class="apartment-agreement-date">
          {{ agreementNote.updated_at }}
        </p>
        <p class="apartment-agreement-text">
          {{ agreementNote.content }}
        </p>
        <p class="apartment-agreement-action d-lg-flex d-none">
          <b-button
            class="primary-outline-btn apartment-agreement-btn mr-4"
            disabled
          >
            Disagree
          </b-button>
          <b-button class="primary-btn apartment-agreement-btn" disabled>
            Agree
          </b-button>
        </p>
      </div>
    </b-modal>

    <b-modal ref="check-in-out" hide-footer hide-header centered size="sm">
      <div class="check-in-out text-center">
        <p class="cio-title mb-0">Check In</p>
        <p class="cio-subtitle mb-4">
          {{
            checkOutCheckInDetails.check_in_date | moment("dddd, MMMM Do YYYY")
          }}
        </p>
        <p class="cio-title mb-0">Check Out</p>
        <p class="cio-subtitle">
          {{
            checkOutCheckInDetails.check_out_date | moment("dddd, MMMM Do YYYY")
          }}
        </p>
        <b-button
          class="primary-btn cio-btn"
          @click="$refs['check-in-out'].hide()"
        >
          Close
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="cancelled-booking" hide-footer centered size="lg">
      <div id="cancelled-booking" class="p-4">
        <b-img
          fluid
          :src="require('../../assets/icons/modal-success.svg')"
          class="mb-5"
        />
        <div class="cancelled-booking-text">
          You have successfully canceled this booking, the sum of
          <strong>N300,000</strong> will be sent back to your wallet.
        </div>
        <b-button
          class="primary-btn btn-lg successfully-paid-btn mt-5"
          @click="$router.push('/')"
        >
          Go to Home Page
        </b-button>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import Controls from "./components/Controls";
import RentDuration from "./components/RentDuration";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    Controls,
    RentDuration,
  },
  computed: {
    ...mapGetters({
      getBookings: "myRent/getBookings",
    }),
  },
  data() {
    return {
      apartments: [],
      checkOutCheckInDetails: [],
      receipt: null,
      rental: null,
      landLoard: null,
      checked: [],
      modalShowLandlord: false,
      agreementNote: {},
    };
  },
  methods: {
    formatCurrency(number) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(number);
    },
    async viewLandLordInfo(rent) {
      const url = `user/apartment-rentals/${rent.id}`;
      const { data } = await this.apiGet(url);

      this.rental = data.data.apartment_rental;

      this.landLoard = data.data.apartment_rental.apartment.user;

      this.modalShowLandlord = true;
    },

    closeReceipt() {
      this.$refs["receipt"].hide();
    },
    checkOutCheckInState(checkIn, checkOut, rent) {
      if (checkIn && !checkOut) {
        this.checked.push(rent.id);
        return rent.id;
      } else if (checkIn && checkOut) {
        return "";
      } else {
        return "";
      }
    },
    async previewReceipt(rent) {
      const url = `user/apartment-rentals/${rent.id}`;
      const { data } = await this.apiGet(url);

      this.rental = data.data.apartment_rental;

      this.receipt = data.data.apartment_rental.payment_transaction;
      // console.log(data)
      this.$refs["receipt"].show();
    },
    ...mapMutations({
      SET_BOOKINGS: "myRent/SET_BOOKINGS",
      UPDATE_BOOKINGS: "myRent/UPDATE_BOOKINGS",
    }),
    viewCheckInCheckOut(rent) {
      this.checkOutCheckInDetails = rent;
      this.$refs["check-in-out"].show();
    },
    async checkOutOrIn(rent) {
      let res = {};

      if (!rent.check_in_date) {
        const formData = new FormData();
        const url = `user/apartment-rentals/${rent.id}/check-in`;
        const { data } = await this.apiPatch(url, formData);

        res = data;
      } else {
        const formData = new FormData();
        const url = `user/apartment-rentals/${rent.id}/check-out`;
        const { data } = await this.apiPatch(url, formData);

        res = data;
      }

      this.UPDATE_BOOKINGS(res.data.apartment_rental);
    },
    changepage(page) {
      this.fetchRents(page);
    },
    async fetchRents(page) {
      try {
        const url = `user/apartment-rentals?per_page=${5}&page=${page}&bookings=1`;
        const { data } = await this.apiGet(url);
        this.SET_BOOKINGS(data.data.apartment_rentals.data);
        this.apartments = data.data.apartment_rentals;
      } catch (err) {
        // console.log(err);
      }
    },
    truncate(text, limit) {
      return text.substring(0, limit);
    },
  },
  mounted() {
    this.fetchRents(1);
    this.apiGet(`/system-data/agreement note`).then((res) => {
      this.agreementNote = res.data.data.system_data;
      // console.log(res);
    });
  },
};
</script>

<style>
@media screen and (max-width: 1920px) {
  .rent-toggle-btn {
    width: 220px;
  }
  .rent-duration-wrapper {
    width: 220px;
  }
}
@media screen and (max-width: 600px) {
  .rent-toggle-btn {
    width: 100%;
  }
  .rent-duration-wrapper {
    width: 100%;
  }
}

.rent-toggle-btn {
  margin-top: 25px;
}

#tenancy {
  margin-top: 4em;
  flex: 1 0 auto;
}
.tenancy-title {
  font-size: 2.25em;
  color: #3c4043;
}
.custom-shadow {
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.1);
}
.tenancy-body {
  margin-top: 4em;
  padding: 0 3em;
}
.reviews {
  text-decoration: underline;
}
.reviews:hover {
  cursor: pointer;
}
.apartment-agreement-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  color: #3c4043;
}
.apartment-agreement-date {
  font-family: "Circular Std Book", sans-serif;
  color: #3c4043;
  opacity: 0.8;
  margin-top: -1em;
}
.apartment-agreement-text {
  font-family: "Circular Std Book", sans-serif;
  color: #3c4043;
}
.apartment-agreement-action {
  margin-top: 3em;
  font-family: "Circular Std Book", sans-serif;
  text-align: center;
}
.apartment-agreement-btn {
  width: 20em;
}
.check-in-out {
  padding-top: 2em;
  padding-bottom: 2em;
}
.cio-title {
  font-family: "Circular Std", sans-serif;
  color: #3c4043;
  font-size: 1.5em;
}
.cio-subtitle {
  font-family: "Circular Std Book", sans-serif;
  opacity: 0.8;
}
.cio-btn {
  font-family: "Circular Std Book", sans-serif;
  width: 60%;
  margin-top: 1em;
}

.h-6,
.w-6 {
  width: 1.25rem;
}
</style>
