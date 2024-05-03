<template>
  <div style="font-family: 'Circular Std Book', sans-serif" v-if="apartment">
    <b-img
      style="width: 100%; height: auto"
      rounded
      :src="apartment.featured_image"
      class="mb-3"
    />
    <p
      class="mb-0"
      style="color: #c221cf; cursor: pointer"
      @click="$router.push(`/apartments/${apartment.slug}`)"
    >
      {{ apartment.name }}
    </p>
    <p style="opacity: 0.6">{{ apartment.location.full_address }}</p>
    <div class="d-flex">
      <p class="mb-0">
        N {{ parseFloat(apartment.price).toLocaleString() }}/{{
          apartment.apartment_duration.period
        }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["apartment"],
};
</script>
