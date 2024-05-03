<template>
  <div id="mobile-listed-apartments">
    <p style="font-size: 1.25em; color: #3c4043">Listed Apartments</p>
    <b-row class="mt-3">
      <b-col cols="12" v-for="(apartment, index) in apartmentList" :key="index">
        <ListedApartment :apartment="apartment" class="mb-3 w-100" />
      </b-col>
    </b-row>
    <!--    <div class="d-flex flex-column mt-3"></div>-->
    <p
      style="color: #c221cf; margin-top: 1em; float: right"
      @click="$router.push({ name: 'LandlordApartments' })"
    >
      View all >>
    </p>
  </div>
</template>

<script>
import ListedApartment from "./components/ListedApartment";
export default {
  components: {
    ListedApartment,
  },
  mounted() {
    this.apartmentList = this.apartments.data;
    this.apartmentData = this.apartments;
  },
  props: {
    apartments: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      apartmentList: [],
      apartmentData: null,
    };
  },
};
</script>

<style>
#mobile-listed-apartments {
  margin-top: 4em;
  margin-bottom: 4em;
}
</style>
