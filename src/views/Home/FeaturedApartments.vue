<template>
  <div id="featured-apartments">
    <b-container>
      <p id="featured-apartments-title">Featured Apartments</p>
      <p id="featured-apartments-subtitle">Discover a world of choices</p>
      <p id="featured-apartments-body">
        From a room for the night to a complete apartment for as long as you as
        your journey dictates, <br class="d-lg-block d-none" />
        Our Space has the key to any preference.
      </p>
      <FeaturedSlider :apartments="apartments" class="mt-4" />
    </b-container>
  </div>
</template>

<script>
import FeaturedSlider from "./components/FeaturedSlider";

export default {
  components: { FeaturedSlider },
  data() {
    return {
      apartments: [],
    };
  },
  mounted() {
    this.fetchApartments(1);
  },
  methods: {
    fetchApartments() {
      const url = `apartments?per_page=4&is_featured=1`;
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments.data;
      });
    },
  },
};
</script>

<style>
#featured-apartments {
  background-color: #f9f9fd;
  margin-top: 4em;
  padding-top: 4em;
  padding-bottom: 5em;
}
#featured-apartments-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 3em;
  color: #3c4043;
}
#featured-apartments-subtitle {
  font-size: 1.75em;
  color: #3c4043;
}
#featured-apartments-body {
  margin-top: 1em;
  color: #3c4043;
  font-size: 1.1em;
}
</style>
