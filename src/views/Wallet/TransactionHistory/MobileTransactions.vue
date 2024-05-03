<template>
  <div id="mobile-upcoming-rents" class="mt-5">
    <div class="search-date-mobile">
      <date-picker
        valueType="MM/YYYY"
        placeholder="Search by Date"
        type="month"
        v-model="dateRented"
        @input="filter"
      />
    </div>
    <div class="d-flex flex-column mt-3">
      <TransactionX
        v-for="(transaction, index) in transactions"
        :key="index"
        :transaction="transaction"
      />
    </div>
    <Paginator
      v-if="data"
      :current-page="data.current_page"
      :last-page="data.last_page"
      :go-to-next="data.next_page_url"
      :go-to-prev="data.prev_page_url"
      @click="paginate"
    />
  </div>
</template>

<script>
import TransactionX from "../components/TransactionX";
import Paginator from "./components/Paginator";
export default {
  components: {
    TransactionX,
    Paginator,
  },
  mounted() {
    this.transactionList = this.transactions;
    this.data = this.pageData;
  },
  props: ["transactions", "pageData"],
  data() {
    return {
      view: false,
      currentTransaction: null,
      transactionList: [],
      data: null,
      dateRented: null,
    };
  },
  methods: {
    viewTxn(transaction) {
      this.view = true;
      this.currentTransaction = transaction;
    },
    paginate(payment_transactions) {
      if (payment_transactions) {
        this.data = payment_transactions;
        this.transactionList = payment_transactions.data;
      }
    },
    filter() {
      this.$emit("filter", this.dateRented);
    },
  },
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
