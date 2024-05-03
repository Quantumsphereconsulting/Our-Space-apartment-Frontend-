<template>
  <div id="ml-apartments">
    <b-row>
      <b-col v-for="(apartment, index) in apartmentList" :key="index" cols="6">
        <ListedApartment :apartment="apartment" class="ml-apartment" />
      </b-col>
    </b-row>
    <Paginator
      v-if="apartmentData"
      :current-page="apartmentData.current_page"
      :last-page="apartmentData.last_page"
      :go-to-next="apartmentData.next_page_url"
      :go-to-prev="apartmentData.prev_page_url"
      @click="paginate"
    />
  </div>
</template>

<script>
import ListedApartment from "@/views/Landlord/components/ListedApartment.vue";
import Paginator from "@/views/LandlordApartments/components/Paginator.vue";
export default {
  components: {
    ListedApartment,
    Paginator,
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
  methods: {
    paginate(apartments) {
      if (apartments) {
        this.apartmentList = apartments.data;
        this.apartmentData = apartments;
      }
    },
  },
};
</script>

<style>
#ml-apartments {
  margin-top: 2em;
  margin-bottom: 2em;
}
.ml-apartment {
  margin-top: 1em;
}
</style>
