/* eslint-disable vue/valid-v-on */
<template>
  <b-row id="check-in" class="justify-content-lg-center align-items-lg-center">
    <b-col lg="6" class="mb-lg-0 mb-5">
      <p class="check-in-title">Everything you need is a tap away</p>
      <p class="check-in-subtitle">
        Fresh Towels, wi-fi, close to a fine restaurant, with a view of the
        ocean or just a simple place for the night.
      </p>
      <b-button @click="action" id="check-in-btn" class="mt-3">
        Check-in
      </b-button>
    </b-col>
    <b-col lg="6">
      <b-img fluid :src="require('@/assets/images/check-in.svg')" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  methods: {
    action() {
      this.$router.push("/apartments");
    },
  },
};
</script>

<style>
#check-in {
  padding-top: 4em;
  padding-bottom: 5em;
}
.check-in-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 3em;
  color: #3c4043;
}
.check-in-subtitle {
  font-size: 1.375em;
  margin-top: 1em;
  color: #3c4043;
}
#check-in-btn {
  width: 250px;
  height: 50px;
  background: #c221cf;
  border-radius: 5px;
  border-color: #c221cf;
}
#check-in-btn:hover {
  background-color: #84168d;
  border-color: #84168d;
}
#check-in-btn:active,
#check-in-btn:focus {
  color: #ffffff;
}
</style>
