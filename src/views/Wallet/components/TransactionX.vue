<template>
  <div id="transaction">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <p style="font-size: 0.9em; color: #c221cf; margin-bottom: 0">
          <span v-if="transaction.payment_purpose === 'wallet_fund'">
            Fund Wallet
          </span>
          <span
            v-else-if="transaction.payment_purpose === 'withdrawal_request'"
          >
            Withdrawal Request
          </span>
          <span
            v-else-if="transaction.payment_purpose === 'wallet_funding_request'"
          >
            Wallet Funding Request
          </span>
          <span v-else-if="transaction.payment_purpose === 'apartment_rental'">
            Apartment Rental/Booking
          </span>
        </p>
        <p style="font-size: 0.75em; color: #3c4043; opacity: 0.8">
          {{ new Date(transaction.created_at).toDateString() }}
          {{ new Date(transaction.created_at).toLocaleTimeString() }}
        </p>
      </div>
      <div class="txn-success mt-n4" v-if="transaction.status === 'success'">
        <span class="txn-success-text">Successful</span>
      </div>
      <div
        class="txn-pending mt-n4"
        v-else-if="transaction.status === 'pending'"
      >
        <span class="txn-pending-text">Pending</span>
      </div>
      <div class="txn-failed mt-n4" v-else>
        <span class="txn-failed-text">Unsuccessful</span>
      </div>
    </div>

    <div class="text-center">
      <p style="font-size: 1.125em; color: #3c4043; margin-bottom: 0em">
        {{ transaction.currency }}
        {{ parseFloat(transaction.amount).toLocaleString() }}
      </p>
    </div>
    <div
      class="d-flex justify-content-between"
      style="margin-top: 1em; margin-bottom: -1em"
    >
      <p style="color: #3c4043; font-size: 0.75em; opacity: 0.8">
        Detail:
        <span v-if="transaction.payment_purpose === 'wallet_fund'">
          Fund Wallet
        </span>
        <span v-else-if="transaction.payment_purpose === 'withdrawal_request'">
          Withdrawal Request
        </span>
        <span
          v-else-if="transaction.payment_purpose === 'wallet_funding_request'"
        >
          Wallet Funding Request
        </span>
        <span v-else-if="transaction.payment_purpose === 'apartment_rental'">
          Apartment Rental/Booking
        </span>
      </p>
      <p
        style="
          font-size: 0.75em;
          color: #c221cf;
          opacity: 0.8;
          cursor: pointer;
          text-decoration: underline;
        "
        @click="view = true"
      >
        View
      </p>
    </div>
    <b-modal
      v-model="view"
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
        <div class="d-flex justify-content-between mb-1">
          <p class="mb-0 mt-2" style="font-size: 1.2em">
            <span v-if="transaction.payment_purpose === 'wallet_fund'">
              Fund Wallet
            </span>
            <span
              v-else-if="transaction.payment_purpose === 'withdrawal_request'"
            >
              Withdrawal Request
            </span>
            <span
              v-else-if="
                transaction.payment_purpose === 'wallet_funding_request'
              "
            >
              Wallet Funding Request
            </span>
            <span v-else-if="transaction.payment_purpose === 'p'">
              Wallet Funding Request
            </span>
          </p>
          <div class="txn-success-1" v-if="transaction.status === 'success'">
            <span class="txn-success-text-1">Successful</span>
          </div>
          <div v-else-if="transaction.status === 'pending'" class="txn-pending">
            <span class="txn-pending-text">Pending</span>
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
          <p style="color: #3c4043; font-size: 1.125em">Amount</p>
        </div>
        <div
          class="d-flex justify-content-between align-items-center px-lg-4 px-2 pt-3"
        >
          <p style="color: #3c4043; opacity: 0.8">
            <span v-if="transaction.payment_purpose === 'wallet_fund'">
              Fund Wallet
            </span>
            <span
              v-else-if="transaction.payment_purpose === 'withdrawal_request'"
            >
              Withdrawal Request
            </span>
            <span
              v-else-if="
                transaction.payment_purpose === 'wallet_funding_request'
              "
            >
              Wallet Funding Request
            </span>
            <span
              v-else-if="transaction.payment_purpose === 'apartment_rental'"
            >
              Apartment Rental/Booking
            </span>
          </p>
          <p style="color: #3c4043; opacity: 0.8">
            N {{ parseFloat(transaction.amount).toLocaleString() }}
          </p>
        </div>

        <div class="text-center">
          <p
            class="close-receipt mt-lg-5 mt-3 d-inline-block"
            @click="view = false"
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
  data() {
    return {
      value: 65,
      max: 100,
      view: false,
    };
  },
  props: ["transaction"],
};
</script>

<style>
#transaction {
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #cecece;
  border-radius: 10px;
}
.txn-success-mobile {
  background-color: rgba(22, 157, 83, 0.13);
  border-radius: 60px;
  padding: 0.25em 0.5em;
  display: inline-block;
}
.txn-success-text-mobile {
  color: #169d53;
  font-size: 0.875em;
}
.txn-success-1 {
  background-color: #e0f1e9;
  border-radius: 60px;
  padding: 0.6em 1em;
  display: inline-block;
}
.txn-success-text-1 {
  color: #169d53;
  font-size: 1.125em;
}
.modal-body {
  padding: 0;
}
.pr-action:hover {
  cursor: pointer;
}
.close-receipt {
  color: #c221cf;
  text-decoration: underline;
  text-align: center;
  transition: 0.5s ease;
}
.close-receipt {
  cursor: pointer;
  opacity: 0.8;
}
</style>
