<template>
  <div>
    <div class="row mt-4 mb-4">
      <div class="d-lg-block d-none col-lg-9">
        <b-img fluid :src="require('@/assets/images/featured-line.svg')" />
      </div>
      <div class="col-lg-3">
        <p class="featured-link" @click="$router.push('/featured-apartments')">
          All Featured Apartments
          <fa-icon :icon="['fas', 'long-arrow-alt-right']" class="ml-1" />
        </p>
      </div>
    </div>
    <div>
      <div class="row d-lg-flex d-none">
        <div
          class="col-lg-3"
          v-for="(apartment, index) in apartments"
          :key="index"
        >
          <FeaturedSliderPanel :apartment="apartment" />
        </div>
      </div>
      <div class="row d-lg-none">
        <div
          class="col-6"
          v-for="(apartment, index) in apartments"
          :key="index"
        >
          <FeaturedSliderPanelMobile :apartment="apartment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeaturedSliderPanel from "./FeaturedSliderPanel";
import FeaturedSliderPanelMobile from "./FeaturedSliderPanelMobile";

export default {
  components: { FeaturedSliderPanel, FeaturedSliderPanelMobile },
  props: ["apartments"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>

<style>
.featured-link {
  /* font-size: 0.9em; */
  color: #c221cf;
  transition: 0.5s ease;
  cursor: pointer;
}
.featured-link:hover {
  opacity: 0.8;
}
#prev-btn {
  border-radius: 50% !important;
  height: 50px !important;
  width: 50px !important;
  background-color: #c221cf !important;
  border-color: #c221cf !important;
  color: #ffffff !important;
  font-size: 1.5em !important;
  margin-right: 0.8em !important;
}
#next-btn {
  border-radius: 50% !important;
  height: 50px !important;
  width: 50px !important;
  background-color: #c221cf !important;
  border-color: #c221cf !important;
  color: #ffffff !important;
  font-size: 1.5em !important;
  right: 0 !important;
}
.btn-icon {
  font-size: 0.9em;
  opacity: 0.9;
}
</style>
