<template>
  <div style="flex: 1 0 auto">
    <b-container class="d-lg-block d-none" id="wallet">
      <p class="w-title">Wallet</p>
      <b-card
        no-body
        style="margin-top: 2em; margin-bottom: 3em; border-radius: 10px"
        class="border-0"
      >
        <Controls />
        <scale-loader
          v-if="apiBusy"
          class="mt-5"
          :loading="true"
          :color="'#c221cf'"
        />
        <TransactionHistory :transactions="transactions" v-else />
      </b-card>
    </b-container>
    <b-container class="d-lg-none" fluid>
      <Controls />
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
  data() {
    return {
      transactions: null,
    };
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
};
</script>

<style>
#wallet {
  margin-top: 4em;
}
.w-title {
  font-size: 2.25em;
  color: #3c4043;
}
</style>
