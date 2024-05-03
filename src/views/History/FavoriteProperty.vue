<template>
  <b-container id="favorite-property">
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
          v-for="(favorite, index) in getFavoritiesData"
          :key="index"
          cols="6"
          lg="3"
        >
          <FeaturedSliderPanel :apartment="favorite" location="viewApartment" />
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import Controls from "./components/Controls";
import FeaturedSliderPanel from "../Home/components/FeaturedSliderPanel";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    Controls,
    FeaturedSliderPanel,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getFavoritiesData: "apartment/getFavoritiesData",
    }),
  },
  methods: {
    ...mapMutations({
      SET_FAVORITIES_IDS_FRESH: "apartment/SET_FAVORITIES_IDS_FRESH",
      SET_FAVORITIES: "apartment/SET_FAVORITIES",
    }),
  },
  async mounted() {
    try {
      const url = `user/apartment-favorites`;
      const { data } = await this.apiGet(url);
      this.SET_FAVORITIES(data.data.apartments.data);
      this.SET_FAVORITIES_IDS_FRESH(data.data.apartments.data);
    } catch (err) {
      //
    }
  },
};
</script>

<style>
#favorite-property {
  margin-top: 4em;
  flex: 1 0 auto;
}
.fp-title {
  font-size: 2.25em;
  color: #3c4043;
}
</style>
