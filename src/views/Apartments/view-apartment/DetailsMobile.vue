/* eslint-disable vue/no-parsing-error */
<template>
  <div id="details-mobile" class="d-lg-none">
    <div class="d-flex justify-content-center justify-content-between mb-4">
      <b-button
        class="primary-btn"
        style="width: 10em; padding: 8px"
        :disabled="!apartment.available_for_rent"
        @click="rentApartment"
      >
        Rent Apartment
      </b-button>
      <b-button
        class="primary-outline-btn"
        style="width: 10em; padding: 8px"
        @click="bookApartment"
      >
        Book Apartment
      </b-button>
    </div>
    <div style="border-bottom: 0.01em solid #cfcfcf">
      <p style="color: #3c4043">
        {{ apartment.name }} in {{ apartment.location.city.name }}
      </p>
      <p
        style="color: #3c4043; opacity: 0.8; font-size: 0.8em; margin-top: -1em"
      >
        This apartment has had {{ apartment.stays }} stays so far
      </p>
      <p style="color: #3c4043" class="d-flex justify-content-between">
        N{{ apartment.price }} / {{ apartment.apartment_duration.period }}
        <span
          :class="[
            getFavoriteById(apartment.id)
              ? 'add-to-fave-active'
              : 'add-to-fave',
          ]"
          @click="addOrRemoveFavorites(apartment.id)"
        >
          <fa-icon
            :icon="['fas', 'heart']"
            style="margin-left: 0.5em; font-size: 1em"
          />
        </span>
      </p>
    </div>
    <p style="color: #3c4043; opacity: 0.8; margin-top: 1.5em">
      {{ apartment.description }}
    </p>
    <b-modal ref="rent-apartment" hide-footer hide-header centered size="lg">
      <div class="rent-apartment-body-mobile">
        <p class="rent-apartment-title-mobile">Rent Apartment Requirements</p>
        <p class="rent-apartment-subtitle">
          You are required to complete your profile before renting an apartment,
          please complete your profile
          <span class="link" @click="$router.push({ name: 'ProfileUpdate' })">
            here.
          </span>
        </p>
        <p class="rent-apartment-subtitle-mobile mb-5">
          <strong>Please note:</strong> we won’t share your details with any
          third party.
        </p>
        <b-button
          class="primary-btn rent-apartment-btn mb-4"
          :disabled="userProfileError"
          style="
            padding-right: 2em;
            padding-left: 2em;
            white-space: nowrap;
            width: 15em;
          "
          @click="acceptAndProceed"
        >
          Accept and Proceed
        </b-button>
        <b-button
          class="primary-outline-btn rent-apartment-btn mr-3"
          style="padding-right: 1em; padding-left: 1em; width: 15em"
          @click="closeRentApartment"
        >
          Close
        </b-button>
      </div>
    </b-modal>
    <b-modal
      ref="kyc-form"
      hide-footer
      scrollable
      centered
      size="xl"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <div class="kyc-form-body-mobile">
        <p class="tenant-info-title mt-4">Landlord KYC</p>
        <p class="tenant-info-subtitle">
          You will be required to fill a basic information form and a kyc form
          as requested by the landlord.
        </p>
        <div class="tenant-info-form-mobile mt-4 mb-5">
          <div id="landlord-kyc-form">
            <b-row>
              <b-col v-for="(kyc, index) in kycs" :key="index" lg="12">
                <b-form-group
                  v-if="kyc.datatype === 'string'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="kyc.hasError"
                >
                  <b-form-input
                    v-model="kyc.name"
                    :state="kyc.hasError"
                    :placeholder="kyc.placeholder"
                    class="landlord-kyc-input mt-1"
                    size="lg"
                  />
                </b-form-group>
                <b-form-group
                  v-if="kyc.datatype === 'text'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="kyc.hasError"
                >
                  <b-form-input
                    v-model="kyc.name"
                    :state="kyc.hasError"
                    :placeholder="kyc.placeholder"
                    class="landlord-kyc-input mt-1"
                    size="lg"
                  />
                </b-form-group>
                <b-form-group
                  v-if="kyc.datatype === 'integer'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="kyc.hasError"
                >
                  <b-form-input
                    v-model="kyc.name"
                    :state="kyc.hasError"
                    :placeholder="kyc.placeholder"
                    class="landlord-kyc-input mt-1"
                    size="lg"
                    type="number"
                  />
                </b-form-group>
                <b-form-group
                  v-else-if="kyc.datatype === 'file'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="!kyc.hasError"
                >
                  <b-form-file
                    v-model="kyc.name"
                    :state="!kyc.hasError"
                    class="landlord-kyc-file mt-1"
                    size="lg"
                    :placeholder="kyc.placeholder"
                  />
                </b-form-group>
                <b-form-group
                  v-else-if="kyc.datatype === 'image'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="!kyc.hasError"
                >
                  <b-form-file
                    v-model="kyc.name"
                    :state="!kyc.hasError"
                    accept="image/jpeg, image/png, image/gif"
                    class="landlord-kyc-file mt-1"
                    size="lg"
                    :placeholder="kyc.placeholder"
                  />
                </b-form-group>
                <b-form-group
                  v-else-if="kyc.datatype === 'date'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="!kyc.hasError"
                >
                  <b-form-datepicker
                    :state="!kyc.hasError"
                    class="landlord-kyc-input"
                    v-model="kyc.name"
                    size="lg"
                  >
                  </b-form-datepicker>
                </b-form-group>
                <b-form-group
                  v-else-if="kyc.datatype === 'time'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="!kyc.hasError"
                >
                  <b-form-timepicker
                    :state="!kyc.hasError"
                    class="landlord-kyc-input"
                    v-model="kyc.name"
                    size="lg"
                  >
                  </b-form-timepicker>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
        </div>
        <b-button
          class="primary-btn mt-1 mb-4 btn-lg btn-block"
          style="font-family: 'Circular Std Book', sans-serif"
          @click="validateAndSubmitKysc"
        >
          Make Payment
        </b-button>
      </div>
    </b-modal>
    <b-modal ref="before-payment" hide-footer hide-header centered size="lg">
      <div id="before-payment-mobile">
        <p class="before-payment-text-mobile">
          Before you make payment, please read the agreement based on what the
          landlord requires.
        </p>
        <div class="before-payment-action-mobile">
          <b-button
            class="primary-btn btn-lg before-payment-btn mb-3"
            @click="apartmentAgreement"
          >
            Proceed
          </b-button>
          <b-button
            class="primary-outline-btn btn-lg before-payment-btn"
            @click="closeBeforePayment"
          >
            Cancel
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      ref="apartment-agreement"
      hide-footer
      hide-header
      centered
      size="lg"
    >
      <div id="apartment-agreement-mobile">
        <p class="apartment-agreement-title">
          {{ agreementNote.title }}
        </p>
        <p class="apartment-agreement-date">
          {{ agreementNote.updated_at }}
        </p>
        <p class="apartment-agreement-text">
          {{ agreementNote.content }}
        </p>
        <p class="apartment-agreement-action-mobile">
          <b-button
            class="primary-btn apartment-agreement-btn-mobile mb-3"
            @click="choosePayment"
          >
            Agree
          </b-button>
          <b-button
            class="primary-outline-btn apartment-agreement-btn-mobile"
            @click="closeApartmentAgreement"
          >
            Disagree
          </b-button>
        </p>
      </div>
    </b-modal>

    <b-modal ref="confirm-payment" hide-footer hide-header centered size="lg">
      <div
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
          text-align: center;
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Are you sure?
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please note that the sum of
          <strong>N {{ formatCurrency(apartment.price) }}</strong> will be
          charged directly from your credit card.
        </p>
        <div class="mt-5 d-flex justify-content-center">
          <b-button
            class="red-outline-btn mr-2"
            style="width: 40%"
            @click="$refs['confirm-payment'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            style="width: 40%"
            @click.prevent="submitCardDeposit"
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- List Cards -->
    <b-modal ref="list-cards" hide-footer hide-header centered size="lg">
      <div
        class=""
        style="text-align: center;font-family: 'Circular Std Book', sans-serif; padding: 20px min-height: 200px; height: 100%;"
      >
        <h1 class=" ">Cards</h1>
        <h5>Choose which card to use</h5>
        <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="2" cols-xl="2">
          <b-col
            class="position-relative text-white"
            v-for="(card, index) in cards"
            :key="index"
          >
            <b-img
              class="mt-1"
              rounded
              fluid
              :src="require('@/assets/images/card_bg.svg')"
            />
            <div
              @click="payWithAnExitingCard(card.id)"
              style="inset: 0px 0px 0px 0px"
              class="position-absolute d-flex flex-column align-items-baseline p-4"
            >
              <h4 class="font-weight-bold">{{ card.bank }}</h4>
              <div class="d-flex align-items-center pt-4">
                <b-img
                  class="pr-3"
                  :src="require('@/assets/images/chip.png')"
                />
                <h3 class="">
                  {{ card.first_6digits }} ******** {{ card.last_4digits }}
                </h3>
              </div>
              <h5 class="pt-3">
                {{ card.expiry_month }} - {{ card.expiry_year }}
              </h5>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <b-modal ref="choose-payment" hide-footer hide-header centered size="lg">
      <div id="choose-payment-mobile">
        <p class="apartment-agreement-title">Choose Payment Method</p>
        <p class="apartment-agreement-text">
          The rent fee payable for one year for ventola appartment is
          <strong>N{{ apartment.price }}</strong> Please choose your payment
          method to proceed.
        </p>
        <div class="choose-payment-list-mobile">
          <b-list-group flush>
            <b-list-group-item
              @click="
                card = true;
                bank = false;
                wallet = false;
              "
              href="#"
            >
              <b-img
                :src="require('@/assets/icons/card-payment.svg')"
                class="mr-2"
              />
              Card Payment
            </b-list-group-item>
            <b-list-group-item
              @click="
                card = false;
                bank = false;
                wallet = true;
              "
              href="#"
            >
              <b-img
                :src="require('@/assets/icons/wallet-payment.svg')"
                class="mr-2"
              />
              Wallet Payment
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="choose-payment-action-mobile">
          <b-button
            class="primary-btn choose-payment-btn-mobile mb-3"
            @click="proceed"
          >
            Proceed
          </b-button>
          <b-button
            class="primary-outline-btn choose-payment-btn-mobile"
            @click="closeChoosePayment"
          >
            Cancel
          </b-button>
        </div>
      </div>
    </b-modal>

    <b-modal ref="book-apartment" hide-footer hide-header centered size="lg">
      <div class="">
        <div>
          <label for="booking_date">Choose a date</label>
          <b-form-datepicker
            id="booking_date"
            v-model="bookingDate"
            class="mb-2"
          ></b-form-datepicker>
        </div>
        <b-form-textarea
          class="mb-4"
          id="textarea"
          v-model="note"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <b-button
          class="primary-outline-btn rent-apartment-btn mr-3"
          style="padding-right: 1em; padding-left: 1em; width: 10em"
          @click="$refs['book-apartment'].hide()"
        >
          Close
        </b-button>
        <b-button
          class="primary-btn rent-apartment-btn"
          style="
            padding-right: 2em;
            padding-left: 2em;
            white-space: nowrap;
            width: 15em;
          "
          @click="validateDateAndProcessed"
        >
          Book
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="booking-success" hide-footer hide-header centered size="lg">
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <b-img
          class="mt-1"
          fluid
          :src="require('@/assets/icons/modal-success.svg')"
        />
        <p style="font-size: 1.5em; margin-top: 2em">
          You have successfully book this apartment {{ apartment.name }}
        </p>
        <b-button
          class="primary-btn mt-3 btn-lg"
          style="width: 40%"
          @click="goToBooking"
        >
          Go To booking
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="successfully-paid" hide-footer centered size="lg">
      <div id="successfully-paid">
        <b-img
          fluid
          :src="require('@/assets/icons/modal-success.svg')"
          class="mb-5"
        />
        <div class="successfully-paid-text-mobile">
          You have successfully paid your rent for {{ apartment.name }}
        </div>
        <b-button
          class="primary-btn btn-lg successfully-paid-btn mt-5"
          @click="$router.push('/my-rents/tenancy')"
        >
          View Rent Dashboard
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="logginNotification" hide-footer centered size="lg">
      <div id="successfully-paid">
        <b-img
          fluid
          :src="require('@/assets/icons/txn-failure.svg')"
          class="mb-5"
        />
        <div class="successfully-paid-text">
          You have to login before you can take this action
        </div>
        <b-button
          class="primary-btn btn-lg successfully-paid-btn mt-5"
          @click="$router.push('/auth/login')"
        >
          Go to Login page
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="insufficient-fund" hide-footer centered size="lg">
      <div id="successfully-paid">
        <b-img
          fluid
          :src="require('@/assets/icons/txn-failure.svg')"
          class="mb-5"
        />
        <div class="successfully-paid-text">
          insufficient Funds please enter amount less or equal to your balance
        </div>
        <b-button
          class="primary-btn btn-lg successfully-paid-btn mt-5"
          @click="$refs['insufficient-fund'].hide()"
        >
          close
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  props: ["apartment", "formKycs"],
  components: {},
  data() {
    return {
      agreementNote: null,
      loggedIn: false,
      kycs: [],
      cards: [],
      bookingDate: null,
      isBooking: null,
      note: "",
      country: null,
      firstname: null,
      lastname: null,
      phone: null,
      email: null,
      home_address: null,
      date_of_birth: null,
      state: null,
      gender: null,
      userProfileError: false,
    };
  },
  computed: {
    ...mapState({
      favoritiesIds: (state) => state.apartment.favoritiesIds,
    }),
    ...mapGetters({
      getFavoriteById: "apartment/getFavoriteById",
      walletBalance: "auth/getWalletBalance",
    }),
  },
  mounted() {
    this.kycs = this.formKycs;
    this.apiGet(`/system-data/agreement note`).then((res) => {
      this.agreementNote = res.data.data.system_data;
    });
    this.apiGet(`/system-data/service charge`).then(() => {});
    this.apiGet(`/system-data/bank account`).then(() => {});
    this.fetchProfile();
    this.loggedIn = this.$store.state.auth.isLoggedIn;
  },
  methods: {
    fetchProfile() {
      this.apiGet(this.ROUTES.profile).then((res) => {
        const { data, success } = res.data;
        const { user } = data;
        if (success) {
          this.firstname = user.first_name;
          this.lastname = user.last_name;
          this.phone = user.phone_number;
          this.email = user.email;
          this.country = user.country;
          this.state = user.state;
          this.gender = user.gender;
          this.home_address = user.home_address;
          this.date_of_birth = user.date_of_birth;
        }
        // validate user profile is complete
        if (
          !this.firstname ||
          !this.lastname ||
          !this.phone ||
          !this.email ||
          !this.country ||
          !this.state ||
          !this.gender ||
          !this.home_address ||
          !this.date_of_birth
        ) {
          this.userProfileError = true;
        }
      });
    },
    validate() {
      this.kycs = this.kycs.map((kyc) => {
        if (!kyc.name) {
          kyc.hasError = false;
          kyc.error = `${kyc.placeholder} is required`;
        } else {
          kyc.hasError = true;
          kyc.error = ``;
        }
        return kyc;
      });
    },
    validateAndSubmitKysc() {
      this.validate();
      // check if form is valid
      if (this.kycs.find((kyc) => !kyc.name)) {
        return;
      } else {
        let formData = new FormData();
        if (this.kycs.length > 0) {
          this.kycs.map((kyc) => {
            formData.append(`${kyc.type}[${kyc.id}]`, kyc.name);
          });
        }

        const url = `user/apartments/${this.apartment.id}/kycs-enroll`;

        this.apiPost(url, formData).then(() => {
          this.$refs["kyc-form"].hide();
          this.$refs["before-payment"].show();
        });
      }
    },
    formatCurrency(number) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(number);
    },
    ...mapMutations({
      SET_FAVORITIES_IDS: "apartment/SET_FAVORITIES_IDS",
    }),
    async addOrRemoveFavorites(id) {
      if (this.loggedIn) {
        const url = `user/apartment-favorites/${id}`;
        const res = await this.apiPost(url);

        const { apartment } = res.data.data;

        this.SET_FAVORITIES_IDS(apartment.id);
      } else {
        this.$refs["logginNotification"].show();
      }
    },

    async proceed() {
      if (this.card) {
        this.$refs["choose-payment"].hide();
        this.$refs["confirm-payment"].show();
      } else if (this.bank) {
        this.$refs["choose-payment"].hide();
        this.$refs["choose-bank"].show();
      } else if (this.wallet) {
        this.payWitWallet();
      }
    },
    async payWitWallet() {
      if (Number(this.walletBalance) < Number(this.apartment.price)) {
        this.$refs["insufficient-fund"].show();
        return;
      }
      try {
        const formData = new FormData();
        let cbUrl;
        if (this.isBooking) {
          cbUrl = `${this.callbackBaseUrl}/my-rents/bookings`;
          formData.append("booking_start_date", this.bookingDate);
          formData.append("note", this.note);
          formData.append("callbackUrl", cbUrl);
        } else {
          cbUrl = `${this.callbackBaseUrl}/my-rents/tenancy`;
          formData.append("callbackUrl", cbUrl);
        }
        formData.append("pay_with_wallet", 1);
        const url = `user/apartment-rentals/${this.apartment.id}`;
        await this.apiPost(url, formData);

        if (this.isBooking) {
          this.$refs["booking-success"].show();
        } else {
          this.$refs["successfully-paid"].show();
        }
      } catch (err) {
        alert("insufficient funds");
      }
    },
    async payWithAnExitingCard(id) {
      try {
        const formData = new FormData();
        let cbUrl;
        if (this.isBooking) {
          cbUrl = `${this.callbackBaseUrl}/my-rents/bookings`;
          formData.append("booking_start_date", this.bookingDate);
          formData.append("note", this.note);
          formData.append("callbackUrl", cbUrl);
        } else {
          cbUrl = `${this.callbackBaseUrl}/my-rents/tenancy`;
          formData.append("callbackUrl", cbUrl);
        }
        formData.append("payment_card_id", id);
        const url = `user/apartment-rentals/${this.apartment.id}`;

        await this.apiPost(url, formData);

        this.$refs["list-cards"].hide();

        if (this.isBooking) {
          this.$refs["booking-success"].show();
        } else {
          this.$refs["successfully-paid"].show();
        }
      } catch (err) {
        // console.log(err);
      }
    },
    validateDateAndProcessed() {
      if (this.bookingDate) {
        this.$refs["book-apartment"].hide();
        this.$refs["kyc-form"].show();
        this.isBooking = true;
      } else {
        return;
      }
    },
    goToBooking() {
      window.location.href = "/my-rents/bookings";
    },
    async submitCardDeposit() {
      try {
        const formData = new FormData();
        let cbUrl;
        if (this.isBooking) {
          cbUrl = `${this.callbackBaseUrl}/my-rents/bookings`;
          formData.append("booking_start_date", this.bookingDate);
          formData.append("note", this.note);
          formData.append("callbackUrl", cbUrl);
        } else {
          cbUrl = `${this.callbackBaseUrl}/my-rents/tenancy`;
          formData.append("callbackUrl", cbUrl);
        }
        const url = `user/apartment-rentals/${this.apartment.id}`;

        const { data } = await this.apiPost(url, formData);

        const { authorization_url } = data.data;

        window.location.href = authorization_url;
      } catch (err) {
        //
      }
    },
    bookApartment() {
      if (this.loggedIn) {
        this.$refs["book-apartment"].show();
      } else {
        this.$refs["logginNotification"].show();
      }
    },
    rentApartment() {
      if (this.loggedIn) {
        this.$refs["rent-apartment"].show();
      } else {
        this.$refs["logginNotification"].show();
      }
    },
    closeRentApartment() {
      this.$refs["rent-apartment"].hide();
    },
    acceptAndProceed() {
      this.$refs["rent-apartment"].hide();
      this.$refs["kyc-form"].show();
    },
    beforePayment() {
      this.$refs["kyc-form"].hide();
      this.$refs["before-payment"].hide();
    },
    closeBeforePayment() {
      this.$refs["before-payment"].hide();
    },
    apartmentAgreement() {
      this.$refs["before-payment"].hide();
      this.$refs["apartment-agreement"].show();
    },
    closeApartmentAgreement() {
      this.$refs["apartment-agreement"].hide();
    },
    choosePayment() {
      this.$refs["apartment-agreement"].hide();
      this.$refs["choose-payment"].show();
    },
    closeChoosePayment() {
      this.$refs["choose-payment"].hide();
    },
    successfullyPaid() {
      this.router.push({ path: "/apartments" });
      this.$refs["choose-payment"].hide();
      this.$refs["successfully-paid"].show();
    },
  },
};
</script>

<style>
#details-mobile {
  /* //margin-top: 2em; */
  margin-bottom: 2em;
}
.rent-apartment-body-mobile {
  padding: 1em 1em;
}
.rent-apartment-title-mobile {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  color: #3c4043;
}
.rent-apartment-subtitle-mobile {
  font-family: "Circular Std Book", sans-serif;
  margin-top: 1em;
  color: #3c4043;
  opacity: 0.8;
}
.rent-apartment-btn {
  font-family: "Circular Std Book", sans-serif;
}
.kyc-form-body-mobile {
  /* //padding: 0 4em; */
}
.tenant-info-form-mobile {
  /* //border: 0.5px solid #cfcfcf;
  //border-radius: 10px;
  //padding: 4em; */
}
#before-payment-mobile {
  padding: 1em;
  text-align: center;
}
.before-payment-text-mobile {
  font-family: "Circular Std Book", sans-serif;
  font-size: 1.5em;
  color: #3c4043;
  margin-bottom: 1em;
}
.before-payment-btn {
  font-family: "Circular Std Book", sans-serif;
  width: 8em;
}
.before-payment-action-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#apartment-agreement-mobile {
  padding-top: 1em;
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
.apartment-agreement-action-mobile {
  margin-top: 2em;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-family: "Circular Std Book", sans-serif;
}
#choose-payment-mobile {
  padding-top: 1em;
}
.choose-payment-list-mobile {
  background-color: #efeff3;
  padding: 1em 2em;
  font-family: "Circular Std Book", sans-serif;
  border-radius: 10px;
}
.list-group-item {
  background-color: #efeff3;
  transition: 0.5s ease;
}
.choose-payment-action-mobile {
  margin-top: 2em;
  margin-bottom: 1em;
  font-family: "Circular Std Book", sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
}
#successfully-paid-mobile {
  text-align: center;
  padding: 1em;
}
.successfully-paid-text-mobile {
  font-family: "Circular Std Book", sans-serif;
  font-size: 0.1em;
  color: #3c4043;
}
.successfully-paid-btn {
  font-family: "Circular Std Book", sans-serif;
  padding-left: 1em;
  padding-right: 1em;
}
</style>
