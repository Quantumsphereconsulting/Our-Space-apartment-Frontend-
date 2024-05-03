<template>
  <div id="mobile-upcoming-rents" class="mt-5">
    <p style="font-size: 1.25em; color: #3c4043; text-align: center">
      Transaction History
    </p>
    <div class="d-flex flex-column mt-3">
      <TransactionX
        v-for="(transaction, index) in transactions"
        :key="index"
        :transaction="transaction"
      />
    </div>
    <div class="text-center mt-5">
      <b-button
        class="primary-outline-btn px-4"
        @click="$router.push({ name: 'UserTransactionHistory' })"
      >
        View All
      </b-button>
    </div>
  </div>
</template>

<script>
import TransactionX from "./components/TransactionX";
export default {
  components: {
    TransactionX,
  },
  props: ["transactions"],
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
