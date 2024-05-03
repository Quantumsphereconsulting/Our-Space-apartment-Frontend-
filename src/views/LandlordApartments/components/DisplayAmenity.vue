<template>
  <div class="mb-3">
    <div id="amenity" class="d-flex align-items-center">
      <b-img fluid :src="amenity.icon" class="mr-3" />
      <div>
        <p
          style="
            font-size: 1.2em;
            color: #3c4043;
            opacity: 0.8;
            white-space: nowrap;
            margin-bottom: 0;
          "
        >
          {{ amenity.name }}
        </p>
        <small class="text-muted" v-if="amenity.pivot">
          {{ amenity.pivot.total_number }} in total
        </small>
        <small class="text-muted" v-else> {{ amenity.total }} in total </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amenity: null,
  },
};
</script>
