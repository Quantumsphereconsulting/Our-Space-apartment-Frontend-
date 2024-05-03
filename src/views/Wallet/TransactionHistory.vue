<template>
  <div id="transactions">
    <div class="d-flex justify-content-between">
      <p style="font-size: 1.375em; color: #3c4043">Transaction History</p>
    </div>
    <b-table
      class="ur-table"
      :items="transactions"
      :fields="fields"
      show-empty
      empty-text="There is no transaction history"
    >
      <template #cell(created_at)="row">
        <p
          style="
            color: #3c4043;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
          "
        >
          {{ new Date(row.value).toUTCString() }}
        </p>
      </template>
      <template #cell(payment_purpose)="row">
        <p
          style="
            color: #c221cf;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
            display: inline-block;
            cursor: pointer;
          "
          @click="viewTxn(row.item)"
        >
          <span v-if="row.value === 'wallet_fund'"> Fund Wallet </span>
          <span v-else-if="row.value === 'withdrawal_request'">
            Withdrawal Request
          </span>
          <span v-else-if="row.value === 'wallet_funding_request'">
            Wallet Funding Request
          </span>
          <span v-else-if="row.value === 'apartment_rental'">
            Apartment Rental/Booking
          </span>
        </p>
      </template>
      <template #cell(details)="row">
        <p
          style="
            color: #3c4043;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
            display: inline-block;
          "
        >
          {{ row.value }}
        </p>
      </template>
      <template #cell(amount)="row">
        <p
          style="
            color: #3c4043;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
          "
        >
          &#8358; {{ parseFloat(row.value).toLocaleString() }}
        </p>
      </template>
      <template #cell(status)="row">
        <div
          v-if="row.value === 'success'"
          class="txn-success"
          style="margin-top: 0.5em"
        >
          <span class="txn-success-text">Successful</span>
        </div>
        <div
          v-else-if="row.value === 'pending'"
          class="txn-pending"
          style="margin-top: 0.5em"
        >
          <span class="txn-pending-text">Pending</span>
        </div>
        <div v-else class="txn-failed" style="margin-top: 0.5em">
          <span class="txn-failed-text">Unsuccessful</span>
        </div>
      </template>
      <template #cell(more_actions)="row">
        <p
          style="
            color: #c221cf;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
            margin-left: 1.5em;
            display: inline-block;
            text-decoration: underline;
            cursor: pointer;
          "
          @click="viewTxn(row.item)"
        >
          View
        </p>
      </template>
    </b-table>
    <div class="text-center mt-5">
      <b-button
        class="primary-outline-btn btn-lg px-4"
        @click="$router.push({ name: 'UserTransactionHistory' })"
      >
        View All
      </b-button>
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
        v-if="currentTransaction"
      >
        <div class="d-flex justify-content-between mb-4">
          <p class="mb-0" style="font-size: 2em">
            <span v-if="currentTransaction.payment_purpose === 'wallet_fund'">
              Fund Wallet
            </span>
            <span
              v-else-if="
                currentTransaction.payment_purpose === 'withdrawal_request'
              "
            >
              Withdrawal Request
            </span>
            <span
              v-else-if="
                currentTransaction.payment_purpose === 'wallet_funding_request'
              "
            >
              Wallet Funding Request
            </span>
            <span
              v-else-if="
                currentTransaction.payment_purpose === 'apartment_rental'
              "
            >
              Apartment Rental
            </span>
          </p>
          <div
            class="txn-success-1"
            v-if="currentTransaction.status === 'success'"
          >
            <span class="txn-success-text-1">Successful</span>
          </div>
          <div
            v-else-if="currentTransaction.status === 'pending'"
            class="txn-pending"
          >
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
          v-if="currentTransaction"
        >
          <p style="color: #3c4043; opacity: 0.8">
            <span v-if="currentTransaction.payment_purpose === 'wallet_fund'">
              Fund Wallet
            </span>
            <span
              v-else-if="
                currentTransaction.payment_purpose === 'withdrawal_request'
              "
            >
              Withdrawal Request
            </span>
            <span
              v-else-if="
                currentTransaction.payment_purpose === 'wallet_funding_request'
              "
            >
              Wallet Funding Request
            </span>
            <span
              v-else-if="
                currentTransaction.payment_purpose === 'apartment_rental'
              "
            >
              Apartment Rental/Booking
            </span>
          </p>
          <p style="color: #3c4043; opacity: 0.8">
            N {{ parseFloat(currentTransaction.amount).toLocaleString() }}
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
  props: ["transactions"],
  mounted() {
    // console.log(this.transactions);
  },
  data() {
    return {
      fields: [
        { key: "created_at", label: "Date" },
        { key: "payment_purpose", label: "Action" },
        { key: "amount", label: "Amount" },
        { key: "status", label: "Status" },
        { key: "more_actions", label: "More Actions" },
      ],
      view: false,
      currentTransaction: null,
    };
  },
  methods: {
    viewTxn(transaction) {
      this.view = true;
      this.currentTransaction = transaction;
    },
  },
};
</script>

<style>
#transactions {
  margin-top: 3em;
  margin-bottom: 3em;
  border-radius: 10px;
}
.search-date {
  position: relative;
}
.search-date-icon {
  position: absolute;
  bottom: 41%;
  left: 90%;
}
.ur-table {
  margin-top: 2em;
}
.send-reminder {
  margin-left: 3em;
  margin-top: 1.3em;
  transition: 0.5s ease;
}
.send-reminder:hover {
  cursor: pointer;
  opacity: 0.8;
}
.txn-failed {
  background-color: rgba(255, 44, 44, 0.13);
  border-radius: 60px;
  padding: 0.5em 1em;
  display: inline-block;
}
.txn-failed-text {
  color: rgba(255, 44, 44, 0.9);
  font-size: 1.125em;
}
.txn-success {
  background-color: rgba(22, 157, 83, 0.13);
  border-radius: 60px;
  padding: 0.5em 1em;
  display: inline-block;
}
.txn-success-text {
  color: #169d53;
  font-size: 1.125em;
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
.txn-pending {
  background-color: #fff1d9;
  border-radius: 60px;
  padding: 0.5em 1em;
  display: inline-block;
}
.txn-pending-text {
  color: #ffba49;
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
