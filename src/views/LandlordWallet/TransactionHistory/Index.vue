<template>
  <div>
    <b-container
      class="d-lg-block d-none"
      fluid
      style="padding-left: 23em; padding-right: 3em"
    >
      <Controls />
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <Transactions
        v-else
        :page-data="pageData"
        :transactions="transactions"
        @filter="filterTransactions"
      />
    </b-container>
    <b-container class="d-lg-none" fluid>
      <Controls />
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <MobileTransactions
        v-else
        :page-data="pageData"
        :transactions="transactions"
        @filter="filterTransactions"
      />
    </b-container>
  </div>
</template>

<script>
import Controls from "./components/Controls";
import Transactions from "./Transactions";
import MobileTransactions from "./MobileTransactions";
export default {
  components: {
    Controls,
    Transactions,
    MobileTransactions,
  },
  mounted() {
    this.fetchPaymentTransactions();
  },
  methods: {
    fetchPaymentTransactions() {
      const url = `${this.ROUTES.paymentTransactions}?per_page=20`;
      this.apiGet(url).then((res) => {
        const { payment_transactions } = res.data.data;
        const { data } = payment_transactions;
        this.transactions = data;
        this.pageData = payment_transactions;
      });
    },
    filterTransactions(transactionDate) {
      if (transactionDate) {
        const url = `${this.ROUTES.paymentTransactions}?per_page=20&filter[date_added]=${transactionDate}`;
        this.apiGet(url).then((res) => {
          const { payment_transactions } = res.data.data;
          const { data } = payment_transactions;
          this.transactions = data;
          this.pageData = payment_transactions;
        });
      } else {
        this.fetchPaymentTransactions();
      }
    },
  },
  data() {
    return {
      transactions: null,
      pageData: null,
    };
  },
};
</script>

<style></style>
