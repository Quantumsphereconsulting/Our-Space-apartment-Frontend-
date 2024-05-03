<template>
  <div id="amenity" class="d-flex align-items-start">
    <b-img fluid :src="imgPath" class="mr-3" />
    <p
      style="
        font-size: 1.2em;
        color: #3c4043;
        opacity: 0.8;
        white-space: nowrap;
      "
    >
      {{ amenityName }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    imgPath: {
      required: true,
    },
    amenityName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
#amenity {
  margin-top: 0.5em;
}
</style>
