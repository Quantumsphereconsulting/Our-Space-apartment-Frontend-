<template>
  <div>
    <b-form-group class="mb-3">
      <label for="" style="letter-spacing: -1px">From</label>
      <b-form-input id="from" v-model="from"></b-form-input>
    </b-form-group>

    <b-form-group class="mb-3">
      <label for="" style="letter-spacing: -1px">To</label>
      <b-form-input id="to" v-model="to"></b-form-input>
    </b-form-group>

    <b-button
      class="primary-btn mt-3"
      style="width: 100%; padding: 10px"
      @click="selectPriceRange"
    >
      <span style="letter-spacing: -1px"> Set Range </span>
    </b-button>
  </div>
</template>

<script>
export default {
  watch: {
    from: function (newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.from = result));
    },
    to: function (newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.to = result));
    },
  },
  data() {
    return {
      from: null,
      to: null,
    };
  },
  methods: {
    selectPriceRange() {
      let to, from;
      if (this.from) {
        from = parseFloat(this.from.replace(/,/g, ""));
      }
      if (this.to) {
        to = parseFloat(this.to.replace(/,/g, ""));
      }
      const priceRange = { to, from };
      this.$store.dispatch("filter/updatePriceRange", { priceRange });
      this.$emit("selectedPriceRange");
    },
  },
};
</script>
