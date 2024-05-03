<template>
  <div
    :class="[index < 6 && list ? 'd-flex' : !list ? 'd-flex' : 'd-none']"
    id="amenity"
    class="align-items-start"
  >
    <b-img :src="imgPath" class="mr-3" />
    <p
      style="
        font-size: 1.2em;
        color: #3c4043;
        opacity: 0.8;
        white-space: nowrap;
      "
    >
      {{ pivot }} {{ amenityName }}
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
    index: {
      type: Number,
    },
    list: {
      type: Boolean,
    },
    pivot: {
      type: Number,
    },
  },
};
</script>

<style>
#amenity {
  margin-top: 0.5em;
}
</style>
