<template>
  <div>
    <div class="d-flex">
      <b-form-checkbox
        :value="amenity.id"
        unchecked-value=""
        @change="selectAmenity"
      >
        <b-img :src="amenity.icon" class="ml-2 mr-1" />
        <span style="font-size: 1.1em; letter-spacing: -1px">
          {{ amenity.name }}
        </span>
      </b-form-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: ["amenity"],
  methods: {
    selectAmenity(event) {
      let currentAmenities = this.$store.getters["filter/getAmenities"];
      if (!event) {
        let amenityIndex = currentAmenities.indexOf(this.amenity.id);
        if (amenityIndex >= 0) {
          currentAmenities.splice(amenityIndex, 1);
        }
      } else {
        currentAmenities.push(event);
      }
      this.$store.dispatch("filter/updateAmenities", {
        amenities: currentAmenities,
      });
      this.$emit("selectedAmenity");
    },
  },
};
</script>
