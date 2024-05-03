<template>
  <div id="a-booking">
    <b-row>
      <b-col xl="8">
        <div class="d-flex">
          <b-img
            style="
              width: 5em;
              height: 5em;
              border-radius: 50%;
              margin-right: 2em;
            "
            fluid
            :src="booking.user.avatar"
          />
          <div>
            <p style="font-size: 1.125em; margin-bottom: 0">
              <span style="color: #3c4043; margin-right: 0.5em">Tenant:</span>
              <span style="color: #c221cf; text-transform: capitalize">
                {{ booking.user.full_name }}
              </span>
            </p>
            <p style="font-size: 0.9em; margin-bottom: 0">
              <span style="color: #3c4043; margin-right: 0.5em">Email:</span>
              <span style="opacity: 0.8">{{ booking.user.email }}</span>
            </p>
            <p style="font-size: 0.9em; margin-bottom: 0">
              <span style="color: #3c4043; margin-right: 0.5em">
                Intended Date:
              </span>
              <span style="opacity: 0.8">
                {{ new Date(booking.started_at).toDateString() }}
              </span>
            </p>
            <p style="font-size: 0.9em; margin-bottom: 0">
              <span style="color: #3c4043; margin-right: 0.5em">
                Phone Number:
              </span>
              <span style="opacity: 0.8">{{ booking.user.phone_number }}</span>
            </p>
          </div>
        </div>
      </b-col>
      <b-col xl="4">
        <div
          class="float-lg-right mt-lg-0 mt-3 d-lg-block d-flex justify-content-between"
        >
          <p style="color: #3c4043; margin-bottom: 2.1em">
            <span style="font-size: 1.5em"
              >₦{{ parseFloat(booking.apartment.price).toLocaleString() }}</span
            >
          </p>
          <p
            style="color: #c221cf; text-decoration: underline; cursor: pointer"
            class="ml-lg-0 ml-3 mt-lg-0 mt-1"
            @click="showReceipt"
          >
            View Receipt
          </p>
        </div>
      </b-col>
    </b-row>
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
        <p style="font-size: 1.1em; opacity: 0.8">#00001</p>
        <div class="d-flex justify-content-between">
          <p style="font-size: 1.1em">10th August, 2021</p>
          <div class="d-lg-flex d-none">
            <p class="mr-5 pr-action">
              <b-img
                class="mr-1"
                fluid
                :src="require('@/assets/icons/receipt-pdf-white.svg')"
              />
              Download PDF
            </p>
            <p class="pr-action">
              <b-img
                class="mr-1"
                fluid
                :src="require('@/assets/icons/print-receipt-white.svg')"
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
        >
          <p style="color: #3c4043; opacity: 0.8">Ventola Apartment</p>
          <p style="color: #3c4043; opacity: 0.8">
            <span style="font-size: 1.5em">N 0</span>.00
          </p>
        </div>
        <p class="d-flex justify-content-end mt-3">
          Inclusive of VAT at <strong class="ml-2">25%</strong>
        </p>
        <div
          style="background: rgba(60, 64, 67, 0.02); border-radius: 10px"
          class="d-flex justify-content-between mt-3 px-lg-4 px-2 pt-3"
        >
          <p style="color: #3c4043; font-size: 1.125em">Total:</p>
          <p style="color: #3c4043; font-size: 1.125em">
            <span style="font-size: 1.5em">N 0</span>.00
          </p>
        </div>
        <div class="text-center">
          <p
            class="close-receipt mt-lg-5 mt-3 d-inline-block"
            @click="closeReceipt"
          >
            Close
          </p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.booking) {
      //
    }
  },
  methods: {
    showReceipt() {
      const url = `${this.ROUTES.paymentTransactions}?filter[id]=${this.booking.payment_transaction_id}`;
      this.apiGet(url).then(() => {
        //
      });
      this.$refs["receipt"].show();
    },
    closeReceipt() {
      this.$refs["receipt"].hide();
    },
  },
  props: {
    booking: null,
  },
  data() {
    return {
      paymentTransaction: null,
    };
  },
};
</script>

<style>
#a-booking {
  margin-top: 1em;
}
.modal-body {
  padding: 0;
}
.pr-action:hover {
  cursor: pointer;
}
.close-receipt {
  color: #3c4043;
  text-decoration: underline;
  text-align: center;
  transition: 0.5s ease;
}
.close-receipt {
  cursor: pointer;
  opacity: 0.8;
}
</style>
