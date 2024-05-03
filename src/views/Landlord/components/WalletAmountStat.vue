<template>
  <div id="wallet-amount-stat">
    <div
      class="d-flex align-items-start"
      style="border-bottom: 1px solid #ced4da; padding-bottom: 0.5em"
    >
      <div class="la-stat-avatar">
        <b-img :src="require('@/assets/icons/apartments-icon.svg')" />
      </div>
      <div>
        <p style="color: #3c4043; margin-bottom: 0">Amount in Wallet</p>
        <p style="font-size: 1.5em; color: #3c4043">
          &#8358; {{ parseFloat(walletBalance).toLocaleString() }}
        </p>
      </div>
    </div>
    <p class="view-all-2" @click="$router.push({ name: 'LandlordWallet' })">
      View Wallet >>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      walletBalance: this.$store.getters["auth/getWalletBalance"],
    };
  },
};
</script>

<style>
#wallet-amount-stat {
  background-color: #faeee9;
  padding: 2em 2em 0em 2em;
  border-radius: 10px;
  display: inline-block;
  width: 21.25em;
}
.la-stat-avatar {
  padding: 1em;
  background-color: #3c4043;
  border-radius: 15px 5px;
  margin-right: 1.5em;
}
.view-all-2 {
  margin-top: 1em;
  color: #3c4043;
  display: inline-block;
  transition: 0.5s ease;
}
.view-all-2:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
