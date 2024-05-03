<template>
  <div class="relative">
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
    <h5
      @click="routeMenu(apartment.slug)"
      class="mt-3 mb-0"
      style="color: #3c4043"
    >
      {{ apartment.name }}
    </h5>
    <div>
      <span class="mx-2 text-muted">
        <fa-icon :icon="['fas', 'circle']" style="font-size: 0.3em" />
      </span>
      <span> </span>
    </div>
    <div>
      <p class="mt-2">
        {{ formatCurrency(apartment.price) }} <span class="text-muted">/ </span>
      </p>
    </div>

    <div class="overlay m-0" v-show="!apartment.available_for_rent">
      This Apartment is not available for rent
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
    formatCurrency(number) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(number);
    },
    routeMenu(slug) {
      if (this.location === "viewApartment") {
        this.$router.push(`/apartments/${slug}`);
      }
    },
  },
};
</script>

<style>
.relative {
  position: relative;
}
.overlay {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.63);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 40px;
  color: white;
}

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
