<template>
  <div id="paginator">
    <div class="d-flex justify-content-center">
      <b-img
        class="p-trigger"
        @click="prev"
        :src="require('@/assets/icons/p-left.svg')"
      />
      <div class="p-page">{{ currentPage }}</div>
      <p class="p-text">of</p>
      <div class="p-page">{{ lastPage }}</div>
      <b-img
        class="p-trigger"
        @click="next"
        :src="require('@/assets/icons/p-right.svg')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentPage", "lastPage", "goToNext", "goToPrev"],
  methods: {
    async prev() {
      if (this.goToPrev) {
        await this.apiGet(this.goToPrev).then((res) => {
          const { payment_transactions } = res.data.data;
          this.$emit("click", payment_transactions);
        });
      }
    },
    async next() {
      if (this.goToNext) {
        await this.apiGet(this.goToNext).then((res) => {
          const { payment_transactions } = res.data.data;
          this.$emit("click", payment_transactions);
        });
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap");
#paginator {
  margin-top: 2em;
}
.p-trigger {
  cursor: pointer;
}
.p-text {
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  font-size: 0.875em;
  padding-top: 1em;
}
.p-page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5em;
  margin-left: 1em;
  margin-right: 1em;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  background-color: #eef2f5;
  border-radius: 5px;
  font-size: 0.875em;
  width: 2.2187em;
  height: 2.2187em;
}
</style>
