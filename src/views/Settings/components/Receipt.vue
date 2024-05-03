<template>
  <div
    id="receipt"
    class="d-flex justify-content-between align-content-center align-items-center"
  >
    <div class="d-flex align-items-start">
      <b-img width="50" :src="require('@/assets/icons/receipt-avatar.svg')" />
      <div class="ml-4 mt-1">
        <p style="font-size: 1.125em; color: #3c4043; margin-bottom: 0">
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
        <small style="color: #3c4043; opacity: 0.8; margin-top: -1em">
          {{ receipt.created_at | moment("dddd, MMMM Do YYYY") }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    receipt: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
};
</script>

<style>
#receipt {
}
</style>
