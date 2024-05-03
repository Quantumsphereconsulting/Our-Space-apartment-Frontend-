<template>
  <div>
    <div id="e-controls" class="d-lg-block d-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.5em; color: #c221cf">
          <span
            @click="$router.push({ name: 'LandlordWallet' })"
            class="back mr-2"
          >
            Wallet
          </span>
          <span class="mr-2"> >> </span>
          <span>Transaction History</span>
        </p>
        <div>
          <b-button
            class="primary-btn btn-lg"
            @click="$router.push({ name: 'NewLandlordApartments' })"
          >
            List New Apartment
          </b-button>
        </div>
      </div>
    </div>
    <div id="e-controls-mobile" class="d-lg-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.2em; color: #c221cf">
          <span
            @click="$router.push({ name: 'LandlordWallet' })"
            class="back mr-2"
          >
            Wallet
          </span>
          <span class="mr-2"> >> </span>
          <span>Transaction History</span>
        </p>
        <div class="d-flex justify-content-center">
          <b-button
            class="primary-btn"
            @click="$router.push({ name: 'NewLandlordApartments' })"
          >
            List New Apartment
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#e-controls {
  padding-top: 4.6em;
}
#e-controls-mobile {
  padding-top: 2.3em;
  text-align: center;
}
.back {
  transition: 0.5s ease;
}
.back:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
