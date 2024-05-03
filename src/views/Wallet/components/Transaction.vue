<template>
  <div id="txn">
    <div v-if="type === 'success'" class="d-flex">
      <b-img
        fluid
        :src="require('../../../assets/icons/txn-success.svg')"
        class="mr-4"
      />
      <div>
        <p style="color: #3c4043" class="mb-0 pt-lg-3">
          {{ gethistory.log }}
        </p>
        <p style="color: #3c4043; opacity: 0.8" class="mt-lg-0 mt-3">
          {{ gethistory.created_at | moment("dddd, MMMM Do YYYY") }}
        </p>
      </div>
    </div>
    <div v-else class="d-flex">
      <b-img
        fluid
        :src="require('../../../assets/icons/txn-failure.svg')"
        class="mr-4"
      />
      <div>
        <p style="color: #3c4043" class="mb-0 pt-3">
          Your transaction was not successful. Please retry after 30 minutes.
        </p>
        <p style="color: #3c4043; opacity: 0.8" class="mt-lg-0 mt-3">
          August 12, 2021
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    gethistory: {
      type: Object,
    },
  },
  methods: {
    formatCurrency(number) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(number);
    },
  },
};
</script>

<style></style>
