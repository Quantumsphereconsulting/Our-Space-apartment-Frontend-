<template>
  <div id="control" class="d-lg-none">
    <multiselect
      v-model="value"
      :options="options"
      placeholder="Select one"
      label="name"
      track-by="name"
      class="mb-4"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: { name: "Two Bedroom Apartment", language: "2-bedroom" },
      options: [{ name: "Two Bedroom Apartment", language: "2-bedroom" }],
    };
  },
};
</script>

<style>
#control {
  margin-top: 2em;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
