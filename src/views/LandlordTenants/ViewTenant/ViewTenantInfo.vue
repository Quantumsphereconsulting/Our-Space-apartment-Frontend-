<template>
  <div v-if="rental" id="view-tenant-info">
    <b-img style="width: 20%" fluid :src="rental.user.avatar" />
    <p
      class="mt-3 mb-0 text-capitalize"
      style="color: #3c4043; font-size: 1.5em"
    >
      {{ rental.user.full_name }}
    </p>
    <p class="mt-n1" style="color: #3c4043; font-size: 1.125em; opacity: 0.8">
      {{ rental.user.email }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["rental"],
};
</script>

<style>
#view-tenant-info {
  margin-top: 3em;
  margin-bottom: 3em;
  text-align: center;
}
</style>
