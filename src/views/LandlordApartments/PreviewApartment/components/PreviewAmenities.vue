<template>
  <div id="preview-amenities">
    <p style="font-size: 1.5em; color: #3c4043">Amenities</p>
    <b-row v-if="amenities.length">
      <b-col xl="4" v-for="(amenity, index) in amenities" :key="index">
        <DisplayAmenity :amenity="amenity" />
      </b-col>
    </b-row>
    <b-alert v-else show variant="info">
      <h4 class="alert-heading mt-3">No Unique Amenities!</h4>
      <p>
        This apartment currently doesn't have any listed unique amenities. Edit
        apartment to choose unique amenities now.
      </p>
    </b-alert>
  </div>
</template>

<script>
import DisplayAmenity from "@/views/LandlordApartments/components/DisplayAmenity";
export default {
  components: {
    DisplayAmenity,
  },
  props: {
    amenities: null,
  },
  data() {
    return {};
  },
};
</script>
