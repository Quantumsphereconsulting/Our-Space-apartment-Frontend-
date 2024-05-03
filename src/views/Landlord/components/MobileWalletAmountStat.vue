<template>
  <div id="wallet-amount-stat-mobile">
    <div class="text-center">
      <p
        style="
          font-size: 1.5em;
          color: #3c4043;
          margin-bottom: 0em;
          font-family: 'Circular Std', sans-serif;
          font-weight: bold;
        "
      >
        &#8358; {{ parseFloat(walletBalance).toLocaleString() }}
      </p>
      <p style="color: #3c4043; margin-bottom: 0; margin-top: 0; opacity: 0.8">
        Amount in Wallet
      </p>
    </div>
    <p
      class="view-all-2-mobile float-right"
      @click="$router.push({ name: 'LandlordWallet' })"
    >
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
#wallet-amount-stat-mobile {
  background-color: #faeee9;
  padding: 2em 2em 0em 2em;
  border-radius: 10px;
  display: inline-block;
  width: 100%;
}
.view-all-2-mobile {
  font-size: 0.75em;
  margin-top: 1em;
  color: #3c4043;
  display: inline-block;
  transition: 0.5s ease;
}
.view-all-2-mobile:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
