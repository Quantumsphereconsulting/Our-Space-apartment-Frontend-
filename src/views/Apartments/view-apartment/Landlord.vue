<template>
  <div id="landlord" class="d-none d-lg-block">
    <div class="d-flex justify-content-start align-items-center mb-5">
      <b-img
        width="90px"
        height="90px"
        rounded="circle"
        :src="landlord.avatar"
        class="mr-4"
      />
      <div>
        <p style="color: #3c4043; font-size: 2em">
          Landlord: <span style="opacity: 0.5">{{ landlord.full_name }}</span>
        </p>
        <star-rating
          style="margin-top: -1em"
          v-model="landlord.rating"
          :read-only="true"
          :show-rating="true"
          :star-size="25"
        />
        <div class="mt-3">
          <span style="color: #3c4043; opacity: 0.8"
            >Joined Our Space since
            {{ landlord.created_at | moment("YYYY") }}</span
          >
          <span class="mx-2 text-muted">
            <fa-icon :icon="['fas', 'circle']" style="font-size: 0.3em" />
          </span>
        </div>
      </div>
    </div>
    <div>
      <p
        v-show="landlord.apartments.length > 0"
        style="font-size: 1.3em; color: #3c4043"
      >
        Other apartments listed by
        <span style="opacity: 0.5">{{ landlord.full_name }}</span>
      </p>
      <b-row class="mt-5">
        <b-col
          v-for="(otherApartment, index) in landlord.apartments"
          :key="index"
          lg="3"
        >
          <FeaturedSliderPanel
            :apartment="otherApartment"
            location="viewApartment"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import FeaturedSliderPanel from "../../Home/components/FeaturedSliderPanel.vue";

export default {
  components: {
    FeaturedSliderPanel,
    StarRating,
  },
  props: ["landlord"],
  data() {
    return {
      rating: 4,
    };
  },
  methods: {
    formatCurrency(number) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(number);
    },
  },
};
</script>

<style>
#landlord {
  margin-top: 3em;
  margin-bottom: 3em;
}
.vue-star-rating-rating-text[data-v-fde73a0c] {
  display: none;
}
</style>
