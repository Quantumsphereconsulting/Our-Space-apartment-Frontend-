<template>
  <div id="details" class="d-none d-lg-block">
    <b-row>
      <b-col lg="9" class="pe-5">
        <div style="border-bottom: 0.01em solid #cfcfcf">
          <div class="d-flex justify-content-between">
            <p style="color: #3c4043; font-size: 2em">
              {{ apartment.name }} in {{ apartment.location.city.name }}
            </p>
            <p
              :class="[
                getFavoriteById(apartment.id)
                  ? 'add-to-fave-active'
                  : 'add-to-fave',
              ]"
              @click="addOrRemoveFavorites(apartment.id)"
            >
              Add to favorites
              <fa-icon
                :icon="['fas', 'heart']"
                style="margin-left: 0.5em; font-size: 1em"
              />
            </p>
          </div>
          <p
            class="d-flex align-items-center justify-content-between"
            style="color: #3c4043; opacity: 0.8"
          >
            <span>{{ apartment.location.full_address }}</span>
            <span>{{ apartment.stays }} stays so far</span>
          </p>
        </div>
        <p style="margin-top: 1.5em; color: #3c4043; opacity: 0.8">
          {{ apartment.description }}
        </p>
      </b-col>
      <b-col lg="3">
        <p style="font-size: 1.3em; padding-left: 1rem">
          {{ formatCurrency(apartment.price) }} /
          <span style="font-size: 0.8em">{{
            apartment.apartment_duration.period
          }}</span>
        </p>
        <b-button
          class="primary-btn btn-lg mt-3"
          style="width: 12em; padding: 10px; margin-left: 1em"
          :disabled="!apartment.available_for_rent"
          @click="rentApartment"
        >
          Rent Apartment
        </b-button>
        <b-button
          @click="bookApartment"
          class="primary-outline-btn btn-lg mt-4"
          style="width: 12em; padding: 10px; margin-left: 1em"
        >
          Book Apartment
        </b-button>
      </b-col>
    </b-row>
    <b-modal ref="book-apartment" hide-footer hide-header centered size="">
      <div class="rent-apartment-body">
        <div>
          <label for="booking_date">Choose a date</label>
          <b-form-datepicker
            :date-disabled-fn="dateDisabled"
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
        <div class="d-flex align-items-center">
          <b-button
            class="primary-outline-btn rent-apartment-btn mr-3"
            style="padding-right: 1em; padding-left: 1em; width: 100%"
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
              width: 100%;
            "
            @click="validateDateAndProcessed"
          >
            Book
          </b-button>
        </div>
      </div>
    </b-modal>

    <b-modal ref="booking-success" hide-footer hide-header centered size="">
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

    <b-modal ref="rent-apartment" hide-footer hide-header centered size="">
      <div class="rent-apartment-body">
        <p class="rent-apartment-title">Rent Apartment Requirements</p>
        <p class="rent-apartment-subtitle">
          You are required to complete your profile before renting an apartment,
          please complete your profile
          <span class="link" @click="$router.push({ name: 'ProfileUpdate' })">
            here.
          </span>
        </p>
        <p class="rent-apartment-subtitle mb-5">
          <strong>Please note:</strong> we won’t share your details with any
          third party.
        </p>
        <div class="d-flex align-items-center">
          <b-button
            class="primary-outline-btn rent-apartment-btn mr-3"
            style="
              padding-right: 1em;
              padding-left: 1em;
              width: 100%;
              height: 50px;
            "
            @click="closeRentApartment"
          >
            Close
          </b-button>
          <b-button
            class="primary-btn rent-apartment-btn"
            :disabled="userProfileError"
            style="
              padding-right: 2em;
              padding-left: 2em;
              white-space: nowrap;
              height: 50px;
              width: 100%;
            "
            @click="acceptAndProceed"
          >
            Accept and Proceed
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      ref="kyc-form"
      hide-footer
      scrollable
      centered
      size=""
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <div class="kyc-form-body">
        <!-- <p class="tenant-info-title">Tenant Information</p>
        <p class="tenant-info-subtitle">
          You will be required to fill a basic information form and a kyc form
          as requested by the landlord.
        </p>
        <div class="tenant-info-form mt-4 mb-5">
          <TenantInfoForm />
        </div> -->
        <p class="tenant-info-title">Landlord KYC</p>
        <p class="tenant-info-subtitle">
          You will be required to fill a basic information form and a kyc form
          as requested by the landlord.
        </p>
        <div class="tenant-info-form mt-3 mb-3">
          <div id="landlord-kyc-form">
            <b-row>
              <b-col v-for="(kyc, index) in formKycs" :key="index" lg="12">
                <b-form-group
                  v-if="kyc.datatype === 'string'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="kyc.hasError"
                >
                  <!-- @input="validate" -->
                  <b-form-input
                    v-model="kyc.name"
                    class="landlord-kyc-input"
                    :state="kyc.hasError"
                    :placeholder="kyc.placeholder"
                    size="lg"
                    style="height: 50px"
                  />
                </b-form-group>
                <b-form-group
                  v-else-if="kyc.datatype === 'text'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="kyc.hasError"
                >
                  <!-- @input="validate" -->
                  <b-form-input
                    v-model="kyc.name"
                    class="landlord-kyc-input"
                    :state="kyc.hasError"
                    :placeholder="kyc.placeholder"
                    size="lg"
                    style="height: 50px"
                  />
                </b-form-group>
                <b-form-group
                  v-else-if="kyc.datatype === 'integer'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="kyc.hasError"
                >
                  <b-form-input
                    v-model="kyc.name"
                    class="landlord-kyc-input"
                    :placeholder="kyc.placeholder"
                    size="lg"
                    style="height: 50px"
                    type="number"
                  />
                </b-form-group>
                <b-form-group
                  v-else-if="kyc.datatype === 'file'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="kyc.hasError"
                >
                  <b-form-file
                    v-model="kyc.name"
                    class="landlord-kyc-file"
                    size="lg"
                    style="height: 50px"
                    :placeholder="kyc.placeholder"
                  />
                </b-form-group>
                <b-form-group
                  v-else-if="kyc.datatype === 'image'"
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="kyc.hasError"
                >
                  <b-form-file
                    v-model="kyc.name"
                    class="landlord-kyc-file"
                    style="height: 50px"
                    accept="image/jpeg, image/png, image/gif"
                    size="lg"
                    :placeholder="kyc.placeholder"
                  />
                </b-form-group>
                <b-form-group
                  v-else
                  :id="`fieldset-${index}`"
                  :label-for="`input-${index}`"
                  :invalid-feedback="`${kyc.placeholder} is required`"
                  :state="kyc.hasError"
                >
                  <b-form-textarea
                    v-model="kyc.name"
                    style="height: 50px"
                    class="landlord-kyc-input"
                    size="lg"
                    :placeholder="kyc.placeholder"
                  />
                </b-form-group>
              </b-col>
              <!-- <b-col lg="12" class="mt-4">
                <b-form-select
                  class="landlord-kyc-select"
                  size="lg"
                  v-model="state"
                  :options="stateOptions"
                />
              </b-col>
              <b-col lg="12" class="mt-4">
                <b-form-select
                  class="landlord-kyc-select"
                  size="lg"
                  v-model="gender"
                  :options="genderOptions"
                />
              </b-col> -->
            </b-row>
          </div>
        </div>
        <b-button
          class="primary-btn mt-2 mb-4 btn-lg btn-block"
          style="font-family: 'Circular Std Book', sans-serif; height: 50px"
          @click="validateAndSubmitKysc"
        >
          Make Payment
        </b-button>
      </div>
    </b-modal>
    <b-modal ref="before-payment" hide-footer hide-header centered size="">
      <div id="before-payment">
        <p
          class="text-left"
          style="
            font-family: Circular Std;
            font-style: normal;
            font-weight: normal;
            font-size: 24px;
            line-height: 30px;

            color: #3c4043;
          "
        >
          Disclaimer Alert!
        </p>
        <p
          style="
            font-family: Circular Std;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 20px;
            color: #3c4043;
          "
          class="text-left"
        >
          Before you make payment, please read the agreement based on what the
          landlord requires.
        </p>
        <div class="d-flex align-items-center pt-5">
          <b-button
            class="primary-outline-btn btn-lg before-payment-btn mr-3"
            @click="beforePayment"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn btn-lg before-payment-btn"
            @click="apartmentAgreement"
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal ref="apartment-agreement" hide-footer hide-header centered size="">
      <div id="apartment-agreement">
        <p class="apartment-agreement-title">
          {{ agreementNote.title }}
        </p>
        <p class="apartment-agreement-date">
          {{ agreementNote.updated_at }}
        </p>
        <p class="apartment-agreement-text">
          {{ agreementNote.content }}
        </p>
        <p class="apartment-agreement-action d-flex align-items-center">
          <b-button
            class="primary-outline-btn apartment-agreement-btn mr-4"
            @click="closeApartmentAgreement"
          >
            Disagree
          </b-button>
          <b-button
            class="primary-btn apartment-agreement-btn"
            @click="choosePayment"
          >
            Agree
          </b-button>
        </p>
      </div>
    </b-modal>
    <b-modal ref="choose-payment" hide-footer hide-header centered size="">
      <div id="choose-payment">
        <p class="apartment-agreement-title">Choose Payment Method</p>
        <p class="apartment-agreement-text">
          The rent fee payable for one year for ventola appartment is
          <strong> {{ formatCurrency(apartment.price) }} </strong> Please choose
          your payment method to proceed.
        </p>
        <div class="choose-payment-list">
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
                :src="require('../../../assets/icons/card-payment.svg')"
                class="mr-2"
              />
              Card Payment
            </b-list-group-item>
            <!-- <b-list-group-item
              @click="
                card = false;
                bank = true;
                wallet = false;
              "
              href="#"
            >
              <b-img
                :src="require('../../../assets/icons/bank-payment.svg')"
                class="mr-2"
              />
              Bank Payment
            </b-list-group-item> -->
            <b-list-group-item
              @click="
                card = false;
                bank = false;
                wallet = true;
              "
              href="#"
            >
              <b-img
                :src="require('../../../assets/icons/wallet-payment.svg')"
                class="mr-2"
              />
              Wallet Payment
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="choose-payment-action">
          <b-button
            class="primary-outline-btn choose-payment-btn mr-4"
            @click="closeChoosePayment"
          >
            Cancel
          </b-button>
          <b-button class="primary-btn choose-payment-btn" @click="proceed">
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>

    <b-modal ref="confirm-payment" hide-footer hide-header centered size="">
      <div
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
          text-align: center;
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Please confirm transaction?
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please note that the sum of
          <strong>N {{ formatCurrency(apartment.price) }}</strong> will be
          charged directly from your credit card.
        </p>
        <div class="mt-5 d-flex align-items-center">
          <b-button
            class="red-outline-btn mr-2"
            style="width: 100%; height: 50px"
            @click="$refs['confirm-payment'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            style="width: 100%; height: 50px"
            @click.prevent="submitCardDeposit"
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>
    <!-- bank-success -->
    <b-modal ref="list-cards" hide-footer hide-header centered size="">
      <div
        class=""
        style="text-align: center;font-family: 'Circular Std Book', sans-serif; padding: 20px min-height: 200px;"
      >
        <h1 class=" ">Cards</h1>
        <h5>Choose which card to use</h5>
        <b-row cols="2">
          <b-col
            class="position-relative text-white"
            v-for="(card, index) in cards"
            :key="index"
          >
            <b-img
              class="mt-1"
              rounded
              fluid
              :src="require('../../../assets/images/card_bg.svg')"
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
                  :src="require('../../../assets/images/chip.png')"
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
    <!-- bank-success -->
    <b-modal ref="bank-success" hide-footer hide-header centered size="">
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: 5em;
        "
      >
        <b-img
          class="mt-1"
          fluid
          :src="require('../../../assets/icons/modal-success.svg')"
        />
        <p style="font-size: 1.5em; margin-top: 2em">
          You have successfully funded your wallet with
        </p>
        <p style="font-size: 2em">{{ formatCurrency(apartment.price) }}</p>
        <b-button
          class="primary-btn mt-3 btn-lg"
          style="width: 40%"
          @click="$refs['bank-success'].hide()"
        >
          Go To Wallet
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="successfully-paid" hide-footer centered size="">
      <div id="successfully-paid">
        <b-img
          fluid
          :src="require('../../../assets/icons/modal-success.svg')"
          class="mb-5"
        />
        <div class="successfully-paid-text">
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
    <b-modal ref="logginNotification" hide-footer centered size="">
      <div id="successfully-paid">
        <b-img
          fluid
          :src="require('../../../assets/icons/txn-failure.svg')"
          class="mb-5"
        />
        <div class="successfully-paid-text">
          You have to Loggin befor you can take this action
        </div>
        <b-button
          class="primary-btn btn-lg successfully-paid-btn mt-5"
          @click="$router.push('/auth/login')"
        >
          Go to Login page
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="insufficient-fund" hide-footer centered size="">
      <div id="successfully-paid">
        <b-img
          fluid
          :src="require('../../../assets/icons/txn-failure.svg')"
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

    <b-modal v-model="modalShowBank" hide-footer centered size="">
      <div
        class="d-flex align-items-center justify-content-center"
        style="font-size: 2rem"
      >
        {{ formatCurrency(apartment.price) }}
      </div>
      <div style="padding: 0 40px">
        <b-form-group :id="`fieldset-${1}`" :label-for="`input-${1}`">
          <b-form-file
            v-model="proof_of_payment"
            class="landlord-kyc-file mt-4"
            multiple
            size="lg"
            :placeholder="'Proof of payment'"
          />
        </b-form-group>
      </div>
      <div class="d-flex align-items-center justify-content-center pt-4 pb-3">
        <b-button
          class="red-outline-btn btn-lg mr-5"
          style="width: 140px"
          @click="modalShowBank = !modalShowBank"
        >
          Cancel
        </b-button>
        <b-button
          class="primary-btn btn-lg successfully-paid-btn"
          style="width: 140px"
          @click="payWithBank"
        >
          Submit
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// import TenantInfoForm from "./components/TenantInfoForm";
// import LandlordKYCForm from "./components/LandlordKYCForm";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  props: ["apartment", "formKycs"],
  components: {
    // TenantInfoForm,
    // LandlordKYCForm,
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
  data() {
    return {
      // formKycs: [],
      agreementNote: null,
      proof_of_payment: [],
      loggedIn: false,
      bank: false,
      card: false,
      wallet: false,
      cards: [],
      res: {},
      isfavorite: false,
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
      modalShowBank: false,
    };
  },
  methods: {
    async payWithBank() {
      const formData = new FormData();

      formData.append("amount", Number(this.apartment.price));
      if (this.proof_of_payment.length > 0) {
        this.proof_of_payment.forEach((proof_of_payment) => {
          formData.append(`proof_of_payment`, proof_of_payment);
        });
      }

      const url = `user/wallet-funding-requests/`;
      await this.apiPost(url, formData);

      if (this.isBooking) {
        this.$router.push("/my-rents/bookings");
      } else {
        this.$router.push("/my-rents/tenancy");
      }
    },
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
    dateDisabled() {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      // const weekday = date.getDay()
      // const day = date.getDate()
      // Return `true` if the date should be disabled
      // console.log(ymd, date);
      // return weekday === 0 || weekday === 6 || day === 13
    },
    validate() {
      this.formKycs = this.formKycs.map((kyc) => {
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
      if (this.formKycs.find((kyc) => !kyc.name)) {
        return;
      } else {
        let formData = new FormData();
        if (this.formKycs.length > 0) {
          this.formKycs.map((kyc) => {
            formData.append(`${kyc.type}[${kyc.id}]`, kyc.name);
          });
        }

        const url = `user/apartments/${this.apartment.id}/kycs-enroll`;

        this.apiPost(url, formData).then(() => {
          // console.log(res);
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

      // console.log(apartment)
    },
    async proceed() {
      if (this.card) {
        this.$refs["choose-payment"].hide();
        this.$refs["confirm-payment"].show();
      } else if (this.bank) {
        this.$refs["choose-payment"].hide();
        this.modalShowBank = true;
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
        if (this.isBooking) {
          formData.append("booking_start_date", this.bookingDate);
          formData.append("note", this.note);
          formData.append(
            "callbackUrl",
            "https://apptest.ourspace.ng/my-rents/bookings"
          );
        } else {
          formData.append(
            "callbackUrl",
            "https://apptest.ourspace.ng/my-rents/tenancy"
          );
        }
        formData.append("pay_with_wallet", 1);
        const url = `user/apartment-rentals/${this.apartment.id}`;
        await this.apiPost(url, formData);

        this.$refs["list-cards"].hide();

        if (this.isBooking) {
          this.$refs["booking-success"].show();
        } else {
          this.$refs["successfully-paid"].show();
        }

        // console.log(data.data);
      } catch (err) {
        alert("insuficient fund");
        // console.log(err);
      }
    },
    async payWithAnExitingCard(id) {
      try {
        const formData = new FormData();

        if (this.isBooking) {
          formData.append("booking_start_date", this.bookingDate);
          formData.append("note", this.note);
          formData.append(
            "callbackUrl",
            "https://apptest.ourspace.ng/my-rents/bookings"
          );
        } else {
          formData.append(
            "callbackUrl",
            "https://apptest.ourspace.ng/my-rents/tenancy"
          );
        }
        // formData.append('callbackUrl', 'http://localhost:8080/my-rents/tenancy')
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
        if (this.isBooking) {
          formData.append("booking_start_date", this.bookingDate);
          formData.append("note", this.note);
          formData.append(
            "callbackUrl",
            "https://apptest.ourspace.ng/my-rents/bookings"
          );
        } else {
          formData.append(
            "callbackUrl",
            "https://apptest.ourspace.ng/my-rents/tenancy"
          );
        }
        const url = `user/apartment-rentals/${this.apartment.id}`;

        const { data } = await this.apiPost(url, formData);

        const { authorization_url } = data.data;

        window.location.href = authorization_url;
        // const getCardsurl = `user/payment-cards`;

        // const res = await this.apiGet(getCardsurl);

        // const { payment_cards } = res.data.data;

        // if (payment_cards.data.length > 0) {
        //   this.cards = payment_cards.data;

        //   this.$refs["list-cards"].show();
        //   this.$refs["confirm-payment"].hide();
        // } else {
        //   const { data } = await this.apiPost(url, formData);

        //   const { authorization_url } = data.data;

        //   window.location.href = authorization_url;
        // }

        //

        // this.$refs['confirm-payment'].hide();
        // this.$refs['bank-success'].show();
      } catch (err) {
        // console.log(err);
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
  mounted() {
    this.apiGet(`/system-data/agreement note`).then((res) => {
      this.agreementNote = res.data.data.system_data;
      // console.log(res);
    });

    this.apiGet(`/system-data/service charge`).then(() => {
      // console.log(res);
    });

    this.apiGet(`/system-data/bank account`).then(() => {
      // console.log(res);
    });

    this.fetchProfile();

    this.loggedIn = this.$store.state.auth.isLoggedIn;
    this.favoritiesIds.map((id) => {
      if (id === this.apartment.id) {
        this.isfavorite = true;
      }
    });
    // console.log(this.loggedIn);
  },
};
</script>

<style>
#details {
  margin-bottom: 4em;
}
.add-to-fave {
  color: #3c4043;
  opacity: 0.8;
  cursor: pointer;
  padding-top: 0.6em;
  transition: 0.5s ease;
}

.link {
  color: #c221cf;
  text-decoration: underline;
}

.add-to-fave-active {
  color: #c221cf;
  opacity: 0.8;
  cursor: pointer;
  padding-top: 0.6em;
  transition: 0.5s ease;
}
.add-to-fave:hover {
  cursor: pointer;
  color: #c221cf;
}
.rent-apartment-body {
  padding: 4em 4em 4em 4em;
}
.rent-apartment-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  color: #3c4043;
}
.rent-apartment-subtitle {
  font-family: "Circular Std Book", sans-serif;
  margin-top: 1em;
  color: #3c4043;
  opacity: 0.8;
}
.rent-apartment-btn {
  font-family: "Circular Std Book", sans-serif;
}

.kyc-form-body {
  padding: 0 4em;
}
.tenant-info-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  color: #3c4043;
}
.tenant-info-subtitle {
  font-family: "Circular Std Book", sans-serif;
  color: #3c4043;
  opacity: 0.8;
}
.tenant-info-form {
  border: 0.5px solid #cfcfcf;
  border-radius: 10px;
  padding: 1em;
}
#before-payment {
  padding: 4em;
  text-align: center;
}
.before-payment-text {
  font-family: "Circular Std Book", sans-serif;
  font-size: 1.75em;
  color: #3c4043;
  margin-bottom: 1.5em;
}
.before-payment-btn {
  font-family: "Circular Std Book", sans-serif;
  width: 100% !important;
}
#apartment-agreement {
  padding: 4em;
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
  height: 50px !important;
}
#choose-payment {
  padding: 4em;
}
.choose-payment-list {
  background-color: #efeff3;
  padding: 2em 3em;
  font-family: "Circular Std Book", sans-serif;
  border-radius: 10px;
}
.list-group-item {
  background-color: #efeff3;
  transition: 0.5s ease;
}
.choose-payment-action {
  margin-top: 2em;
  font-family: "Circular Std Book", sans-serif;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
.choose-payment-btn {
  width: 100%;
  height: 50px !important;
}

@media screen and (max-width: 1920px) {
  #successfully-paid {
    text-align: center;
    padding: 4em;
  }
}

@media screen and (max-width: 1024px) {
  #successfully-paid {
    text-align: center;
    padding: 1.5em;
  }
}

.successfully-paid-text {
  font-family: "Circular Std Book", sans-serif;
  font-size: 1.5em;
  color: #3c4043;
}
.successfully-paid-btn {
  font-family: "Circular Std Book", sans-serif;
  padding-left: 2em;
  padding-right: 2em;
}
#landlord-kyc-form {
  font-family: "Circular Std Book", sans-serif;
  font-weight: normal;
}
.landlord-kyc-input {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
}
.landlord-kyc-input:focus {
  background-color: #f5f4ff;
}
.landlord-kyc-select {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
}
.landlord-kyc-select:focus {
  box-shadow: none;
  border-color: transparent;
}
.custom-file-label {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
}
.custom-file-input:focus {
  box-shadow: none;
  border: none;
}
.custom-file-label::after {
  background-color: transparent;
}
/* .custom-file-input ~ .custom-file-label[data-browse]::after {
  content: url("../../../../assets/icons/file-upload.svg");
  padding-top: 0.6em;
} */
</style>
