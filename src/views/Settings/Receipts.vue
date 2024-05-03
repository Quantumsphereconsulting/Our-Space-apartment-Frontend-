<template>
  <b-container id="profile-update">
    <div class="d-flex justify-content-between align-items-center">
      <p class="pu-title">Settings</p>
      <p class="logout d-flex align-items-start" @click="logout">
        <b-img class="mr-3" :src="require('@/assets/icons/logout.svg')" />
        <span style="color: #c221cf"> Logout </span>
      </p>
    </div>
    <b-card
      no-body
      style="
        margin-top: 2em;
        margin-bottom: 3em;
        border-radius: 10px;
        border: none;
      "
      class="p-lg-4 py-2 px-3"
    >
      <Controls />
      <div class="py-lg-2">
        <b-list-group flush v-if="receipts.length > 0">
          <b-list-group-item
            v-for="receipt in receipts"
            :key="receipt.id"
            @click="showReceipt(receipt)"
            href="javascript:void(0)"
            class="px-0"
          >
            <Receipt :receipt="receipt" />
          </b-list-group-item>
        </b-list-group>
        <b-alert v-else-if="loaded" show variant="info">
          <h4 class="alert-heading mt-3">No Receipts.</h4>
          <p>
            You currently do not have any payment transactions. Your receipts
            will be listed here to track your transaction activities on the Our
            Space platform.
          </p>
        </b-alert>
      </div>
    </b-card>
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
            <span v-if="receipt.payment_purpose === 'apartment_rental'">
              Apartment Rental/Booking ({{ receipt.model.name }})
            </span>
            <span v-else-if="receipt.payment_purpose === 'wallet_fund'">
              Fund Wallet
            </span>
            <span v-else-if="receipt.payment_purpose === 'withdrawal_request'">
              Withdrawal Request
            </span>
            <span
              v-else-if="receipt.payment_purpose === 'wallet_funding_request'"
            >
              Wallet Funding Request
            </span>
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
    <b-modal
      ref="logging-out"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <scale-loader class="mt-1" :loading="true" :color="'#c221cf'" />
        <p style="font-size: 1.5em; margin-top: 2em">
          Please wait, you are being logged out of your account...
        </p>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import Controls from "./components/Controls";
import Receipt from "./components/Receipt";

export default {
  components: { Controls, Receipt },
  created() {
    this.fetchReceipts();
  },
  data() {
    return {
      receipts: [],
      receipt: null,
      loaded: false,
    };
  },
  methods: {
    fetchReceipts() {
      this.apiGet(this.ROUTES.fetchReceipts).then((res) => {
        const { success, data } = res.data;
        if (success) {
          const { payment_transactions } = data;
          this.receipts = payment_transactions.data;
        }

        this.loaded = true;
      });
    },
    showReceipt(receipt) {
      this.receipt = receipt;
      this.$refs["receipt"].show();
    },
    closeReceipt() {
      this.$refs["receipt"].hide();
    },
    formatCurrency(number) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(number);
    },
    logout() {
      this.$refs["logging-out"].show();
      this.apiPost(this.ROUTES.logout, {})
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.$refs["logging-out"].hide();
            this.$store.dispatch("auth/clearSession");
            this.$router.push({ name: "Login" }).then(() => {
              this.apiSuccess(message, "Thank you for using Our Space");
            });
          }
        })
        .finally(() => {
          this.$refs["logging-out"].hide();
          this.$store.dispatch("auth/clearSession");
          this.$router.push({ name: "Login" }).then(() => {
            this.apiSuccess(
              "You have logged out successfully",
              "Thank you for using Our Space"
            );
          });
        });
    },
  },
};
</script>

<style>
#profile-update {
  margin-top: 4em;
  flex: 1 0 auto;
}
.pu-title {
  font-size: 2.25em;
  color: #3c4043;
}
.logout:hover {
  cursor: pointer;
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
