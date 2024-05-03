<template>
  <b-container id="recently-viewed">
    <p class="fp-title">History</p>
    <Controls />
    <scale-loader
      v-if="apiBusy"
      class="mt-5"
      :loading="true"
      :color="'#c221cf'"
    />
    <div>
      <b-row style="overflow-x: hidden; margin-bottom: 3em">
        <b-col
          v-for="(apartment, index) in apartments"
          :key="index"
          cols="6"
          lg="3"
        >
          <FeaturedSliderPanel
            :apartment="apartment.model"
            location="viewApartment"
          />
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import Controls from "./components/Controls";
import FeaturedSliderPanel from "../Home/components/FeaturedSliderPanel";

export default {
  components: {
    Controls,
    FeaturedSliderPanel,
  },
  data() {
    return {
      apartments: [],
    };
  },
  async mounted() {
    try {
      const url = `user/views?model=apartments`;
      const { data } = await this.apiGet(url);

      this.apartments = data.data.views.data;
    } catch (err) {
      //
    }
  },
};
</script>

<style>
#recently-viewed {
  margin-top: 4em;
  flex: 1 0 auto;
}
.fp-title {
  font-size: 2.25em;
  color: #3c4043;
}
</style>
