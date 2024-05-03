<template>
  <div id="listed-apartments">
    <p style="font-size: 1.375em; color: #3c4043">Listed Apartments</p>
    <b-row class="mt-4">
      <b-col
        xl="3"
        lg="6"
        v-for="(apartment, index) in apartmentList"
        :key="index"
      >
        <ListedApartment :apartment="apartment" />
      </b-col>
    </b-row>
    <div class="d-flex mt-4"></div>
    <div class="d-flex mb-n4 justify-content-end">
      <p
        class="ur-view-all"
        @click="$router.push({ name: 'LandlordApartments' })"
      >
        View all >>
      </p>
    </div>
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
#listed-apartments {
  margin-top: 3em;
  margin-bottom: 4em;
  border: 1px solid #cecece;
  border-radius: 10px;
  padding: 2em;
}
.ur-view-all {
  color: #c221cf;
  transition: 0.5s ease;
}
.ur-view-all:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
