<template>
  <div id="landlord-mobile" class="d-lg-none">
    <div class="d-flex justify-content-start align-items-center mb-5">
      <b-img :src="landlord.avatar" width="60" class="mr-4" />
      <div>
        <p style="color: #3c4043; font-size: 1.1em">
          Landlord: <span style="opacity: 0.5">{{ landlord.full_name }}</span>
        </p>
        <star-rating
          style="margin-top: -1em"
          v-model="landlord.rating"
          :read-only="true"
          :show-rating="false"
          :star-size="15"
        />
        <div class="mt-1" style="font-size: 0.8em">
          <span style="color: #3c4043; opacity: 0.8"
            >Joined Our Space since
            {{ landlord.created_at | moment("YYYY") }}</span
          >
          <!-- <span style="color: #3c4043; opacity: 0.8">
            {{ landlord.email }}
          </span> -->
        </div>
      </div>
    </div>
    <div>
      <p style="font-size: 1.1em; color: #3c4043">
        Other apartments listed by
        <span style="opacity: 0.5">{{ landlord.full_name }}</span>
      </p>
      <b-row cols="2" v-if="landlord.apartments.length > 0" class="mt-5">
        <b-col
          v-for="(apartment, index) in landlord.apartments"
          :key="index"
          lg="6"
        >
          <FeaturedSliderPanel
            :apartment="apartment"
            location="viewApartment"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import FeaturedSliderPanel from "../../Home/components/FeaturedSliderPanel";
export default {
  props: ["landlord"],
  components: {
    StarRating,
    FeaturedSliderPanel,
  },
  data() {
    return {
      rating: 4,
    };
  },
};
</script>

<style>
#landlord-mobile {
  margin-bottom: 3em;
}
</style>
