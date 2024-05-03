<template>
  <div id="preview-features">
    <b-row v-if="amenities.length">
      <b-col xl="6" v-for="(amenity, index) in amenities" :key="index">
        <div class="feature">
          <b-img class="mr-4" :src="amenity.icon" />
          <div>
            <p class="feature-title">{{ amenity.name }}</p>
            <p class="feature-subtitle" v-if="amenity.pivot">
              Has {{ amenity.pivot.total_number }}
              {{ amenity.name.toLowerCase() }}(s)
            </p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-alert v-else show variant="info">
      <h4 class="alert-heading mt-3">No Required Amenities!</h4>
      <p>
        This apartment currently doesn't have any listed required amenities.
        Edit apartment to choose required amenities now.
      </p>
    </b-alert>
  </div>
</template>

<script>
export default {
  props: {
    amenities: null,
  },
};
</script>

<style>
#preview-features {
}
.feature {
  display: flex;
  align-items: center;
}
.feature-title {
  color: #3c4043;
  font-size: 1.125em;
  margin-top: 1em;
  margin-bottom: 0;
}
.feature-subtitle {
  color: #3c4043;
  opacity: 0.8;
}
</style>
