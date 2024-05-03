<template>
  <div id="mobile-statistics">
    <MobileWalletAmountStat />
    <div class="d-flex mt-3">
      <MobileListedApartmentStat :num-apartments="numApartments" />
      <MobileCurrentTenantsStat :num-tenants="numTenants" />
    </div>
  </div>
</template>

<script>
import MobileListedApartmentStat from "./components/MobileListedApartmentStat";
import MobileWalletAmountStat from "./components/MobileWalletAmountStat";
import MobileCurrentTenantsStat from "./components/MobileCurrentTenantsStat";
export default {
  components: {
    MobileWalletAmountStat,
    MobileListedApartmentStat,
    MobileCurrentTenantsStat,
  },
  props: {
    numApartments: null,
    numTenants: null,
  },
};
</script>

<style>
#mobile-statistics {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>
