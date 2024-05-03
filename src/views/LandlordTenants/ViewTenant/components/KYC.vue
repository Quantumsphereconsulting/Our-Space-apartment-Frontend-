<template>
  <div class="d-inline-block mr-lg-4">
    <div class="kyc"></div>
    <p class="kyc-title">Voters Card</p>
  </div>
</template>

<script>
export default {
  props: ["kyc"],
  mounted() {
    // console.log(this.kyc);
  },
};
</script>

<style>
.kyc {
  width: 18.75em;
  height: 12.5em;
  background-color: #c4c4c4;
  border-radius: 5px;
}
.kyc-title {
  font-size: 1.5em;
  color: #3c4043;
  margin-top: 0.7em;
  text-align: center;
}
</style>
