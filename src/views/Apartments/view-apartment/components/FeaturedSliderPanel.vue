<template>
  <div>
    <div id="panel-header">
      <b-img
        rounded=""
        id="panel-header-img"
        :src="apartment.featured_image"
        fluid
        @click="routeMenu(apartment.slug)"
      />
      <fa-icon
        class="d-none d-lg-block"
        id="panel-header-action"
        :icon="['fas', 'chevron-circle-right']"
      />
      <div id="overlay"></div>
    </div>
    <h5 class="mt-3 mb-0" style="color: #3c4043">
      {{ apartment.name }}
    </h5>
    <div>
      <span>
        <b-img v-bind="mainProps" :src="apartment.category.icon" class="mr-2" />
        <small class="text-muted">{{ apartment.category.name }}</small>
      </span>
      <span class="mx-2 text-muted">
        <fa-icon :icon="['fas', 'circle']" style="font-size: 0.3em" />
      </span>
      <span>
        <small class="text-muted">{{ apartment.stays }} Stays</small>
      </span>
    </div>
    <div>
      <p class="mt-2">
        {{ formatCurrency(apartment.price) }}
        <span class="text-muted">
          {{ apartment.apartment_duration.period }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
    },
    apartment: {
      type: Object,
    },
  },
  data() {
    return {
      mainProps: {
        width: 20,
        height: 20,
        class: "m1",
      },
    };
  },
  methods: {
    routeMenu(slug) {
      if (this.location === "viewApartment") {
        this.$router.push(`/apartments/${slug}`);
      }
    },
    formatCurrency(number) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(number);
    },
  },
};
</script>

<style>
#panel-header {
  position: relative;
}
#panel-header-img {
  display: block;
  transition: 0.5s ease;
}
#panel-header:hover #panel-header-img {
  opacity: 0.7;
  cursor: pointer;
}

#panel-header-action {
  position: absolute;
  top: 50%;
  left: 230px;
  color: #ffffff;
  font-size: 1.3em;
  transition: 0.5s ease;
}

#panel-header-action:hover {
  font-size: 1.5em;
  cursor: pointer;
}
</style>
