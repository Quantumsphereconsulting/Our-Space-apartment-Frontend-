<template>
  <div>
    <b-container
      class="d-lg-block d-none"
      fluid
      style="padding-left: 23em; padding-right: 3em"
    >
      <Controls @request="fetchPaymentTransactions" />
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <TransactionHistory :transactions="transactions" v-else />
    </b-container>
    <b-container class="d-lg-none" fluid>
      <Controls @request="fetchPaymentTransactions" />
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <MobileTransactionHistory :transactions="transactions" v-else />
    </b-container>
  </div>
</template>

<script>
import Controls from "./components/Controls";
import TransactionHistory from "./TransactionHistory";
import MobileTransactionHistory from "./MobileTransactionHistory";
export default {
  components: {
    Controls,
    TransactionHistory,
    MobileTransactionHistory,
  },
  mounted() {
    this.fetchPaymentTransactions();
  },
  methods: {
    async fetchPaymentTransactions() {
      const url = `${this.ROUTES.paymentTransactions}?per_page=3`;
      await this.apiGet(url).then((res) => {
        const { payment_transactions } = res.data.data;
        const { data } = payment_transactions;
        this.transactions = data;
      });
    },
  },
  data() {
    return {
      transactions: null,
    };
  },
};
</script>

<style></style>
