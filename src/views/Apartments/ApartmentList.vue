<template>
  <div id="apartment-list">
    <b-row
      class="d-lg-flex d-none"
      style="overflow-x: hidden; margin-bottom: 3em"
    >
      <b-col
        v-for="(apartment, index) in apartments.data"
        :key="index"
        cols="6"
        lg="3"
      >
        <FeaturedSliderPanel :apartment="apartment" />
      </b-col>
    </b-row>
    <b-row class="d-lg-none">
      <b-col
        v-for="(apartment, index) in apartments.data"
        :key="index"
        cols="6"
        lg="3"
      >
        <FeaturedSliderPanelMobile :apartment="apartment" />
      </b-col>
    </b-row>
    <b-pagination
      align="center"
      v-model="apartments.current_page"
      :total-rows="apartments.total"
      :per-page="apartments.per_page"
      aria-controls="my-table"
      @change="changepage"
      pills
      first-number
      last-number
      limit="8"
    />
  </div>
</template>

<script>
import FeaturedSliderPanel from "../Home/components/FeaturedSliderPanel";
import FeaturedSliderPanelMobile from "../Home/components/FeaturedSliderPanelMobile";
export default {
  components: {
    FeaturedSliderPanel,
    FeaturedSliderPanelMobile,
  },
  props: ["apartments"],
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      rows: 100,
    };
  },
  computed: {},
  methods: {
    changepage(page) {
      this.$emit("changepage", page);
    },
    viewApartment() {
      this.$router.push("/view-apartment");
    },
  },
};
</script>

<style>
#apartment-list {
  margin-top: 5em;
  margin-bottom: 4em;
}
</style>
