<template>
  <div id="statistics" class="d-flex">
    <b-row>
      <b-col class="mt-3">
        <ListedApartmentStat :num-apartments="numApartments" />
      </b-col>
      <b-col class="mt-3">
        <CurrentTenantsStat :num-rentals="numRentals" />
      </b-col>
      <b-col class="mt-3">
        <WalletAmountStat />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ListedApartmentStat from "./components/ListedApartmentStat";
import CurrentTenantsStat from "./components/CurrentTenantsStat";
import WalletAmountStat from "./components/WalletAmountStat";
export default {
  components: {
    ListedApartmentStat,
    CurrentTenantsStat,
    WalletAmountStat,
  },
  props: {
    numApartments: null,
    numRentals: null,
  },
};
</script>

<style>
#statistics {
  padding-top: 4.6em;
}
</style>
