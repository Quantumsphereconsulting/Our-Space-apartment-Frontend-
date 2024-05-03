<template>
  <div id="mobile-upcoming-rents" class="mt-5">
    <p style="font-size: 1.25em; color: #3c4043; text-align: center">
      Transaction History
    </p>
    <!--    <div class="search-date-mobile">-->
    <!--      <b-form-input style="width: 100%" placeholder="Search by Date" />-->
    <!--      <b-img-->
    <!--        class="search-date-icon-mobile"-->
    <!--        :src="require('@/assets/icons/calender-icon.svg')"-->
    <!--      />-->
    <!--    </div>-->
    <div class="d-flex flex-column mt-3">
      <Transaction
        v-for="(transaction, index) in transactions"
        :key="index"
        :transaction="transaction"
      />
    </div>
    <div class="text-center mt-5">
      <b-button
        class="primary-outline-btn px-4"
        @click="$router.push({ name: 'TransactionHistory' })"
      >
        View All
      </b-button>
    </div>
  </div>
</template>

<script>
import Transaction from "./components/Transaction";
export default {
  components: {
    Transaction,
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
