<template>
  <div class="" id="featured">
    <b-row class="justify-content-center align-items-center">
      <b-col lg="7">
        <b-img
          style="height: 400px; width: 650px; object-fit: cover"
          fluid
          rounded
          :src="apartment.featured_image"
        />
      </b-col>
      <b-col lg="5">
        <p class="mt-lg-0 mt-3" style="color: #c221cf">
          {{ formatCurrency(apartment.price) }}/{{
            apartment.apartment_duration.period
          }}
        </p>
        <p
          class="d-none d-lg-flex text-capitalize"
          style="
            color: #3c4043;
            font-family: 'Circular Std';
            font-weight: bold;
            font-size: 3em;
            margin: 0;
            line-height: 1em;
          "
        >
          {{ apartment.name }}
        </p>
        <p
          class="d-lg-none text-capitalize"
          style="
            color: #3c4043;
            font-family: 'Circular Std';
            font-weight: bold;
            font-size: 2.5em;
            margin: 0;
            line-height: 1em;
          "
        >
          {{ apartment.name }}
        </p>
        <p class="pt-4 text-capitalize">
          No. {{ apartment.location.house_number }},
          {{ apartment.location.street }}
        </p>
        <div>
          <span>
            <b-img
              v-bind="mainProps"
              :src="apartment.category.icon"
              class="mr-2"
            />
            <small class="text-muted">{{ apartment.category.name }}</small>
          </span>
          <span class="mx-2 text-muted">
            <fa-icon :icon="['fas', 'circle']" style="font-size: 0.3em" />
          </span>
          <span>
            <small class="text-muted">{{ apartment.stays }} stays so far</small>
          </span>
        </div>
        <p
          class="truncate"
          style="
            color: #3c4043;
            opacity: 0.8;
            letter-spacing: -0.8px;
            margin-top: 1em;
          "
        >
          {{ apartment.description | truncate(150) }}
        </p>
        <b-button
          class="primary-btn mt-3"
          style="width: 12em; padding: 10px"
          @click="$router.push(`/apartments/${apartment.slug}`)"
        >
          View Apartment
          <fa-icon :icon="['fas', 'long-arrow-alt-right']" class="ml-1" />
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["apartment"],
  data() {
    return {
      mainProps: {
        // blank: true,
        // blankColor: '#777',
        width: 20,
        height: 20,
        class: "m1",
      },
    };
  },
  methods: {
    formatCurrency(number) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(number);
    },
    truncate(text, limit) {
      return text.substring(0, limit);
    },
  },
};
</script>

<style>
#featured {
  margin-top: 1em;
  margin-bottom: 2em;
}

.truncate {
  /*width: 500px;*/
  max-height: 100px;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
