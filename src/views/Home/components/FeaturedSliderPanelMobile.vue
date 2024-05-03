<template>
  <div class="relative">
    <div id="panel-header">
      <div style="position: relative">
        <b-img
          style="width: 200px; height: 150px; object-fit: cover"
          rounded
          id="panel-header-img"
          v-show="apartment.id && tapIndex === index"
          v-for="(image, index) in mergeGallries(
            apartment.galleries,
            apartment.featured_image
          )"
          :key="index"
          :src="image"
          fluid
          @click="routeMenu(apartment.slug)"
        />
        <b-img
          style="position: absolute; top: 8%; left: 5%; width: 40%"
          v-if="apartment.is_featured"
          :src="require('@/assets/images/featured-tag.svg')"
        />
      </div>
      <div
        v-show="
          apartment.id &&
          tapIndex <
            mergeGallries(apartment.galleries, apartment.featured_image)
              .length -
              1
        "
        id="panel-header-action"
      >
        <fa-icon
          class="d-none d-lg-block"
          :icon="['fas', 'chevron-circle-right']"
          @click="tapIndex++"
        />
      </div>
      <div v-show="apartment.id && tapIndex > 0" id="panel-header-action-left">
        <fa-icon
          class="d-none d-lg-block"
          :icon="['fas', 'chevron-circle-left']"
          @click="tapIndex--"
        />
      </div>
      <div id="overlay"></div>
    </div>
    <h5 @click="routeMenu(apartment.slug)" class="mt-2 mb-0 name">
      {{ apartment.name }}
    </h5>
    <!-- <h5 style="color: #3c4043">in Lekki Phase 1</h5> -->
    <div>
      <span>
        <b-img v-bind="mainProps" :src="apartment.category.icon" class="mr-1" />
        <small
          @click="routeMenu(apartment.slug)"
          class="text-muted"
          style="font-size: 0.7em"
        >
          {{ apartment.category.name }}
        </small>
      </span>
      <span class="mx-1 text-muted">
        <fa-icon :icon="['fas', 'circle']" style="font-size: 0.2em" />
      </span>
      <span>
        <small
          v-if="apartment.stays === 1"
          class="text-muted"
          style="font-size: 0.7em"
        >
          {{ apartment.stays }} stay
        </small>
        <small v-else class="text-muted" style="font-size: 0.7em">
          {{ apartment.stays }} stays
        </small>
      </span>
    </div>
    <div>
      <p class="mt-0" style="font-size: 0.9em">
        {{ formatCurrency(apartment.price) }}
        <span class="text-muted">
          / {{ apartment.apartment_duration.period }}
        </span>
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
      tapIndex: 0,
      mainProps: {
        // blank: true,
        // blankColor: '#777',
        width: 15,
        height: 15,
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
    mergeGallries(arrays, featured) {
      const galleriesImages = [];
      arrays.forEach((gallery) => {
        if (gallery.media) {
          gallery.media.map((media) => {
            galleriesImages.push(media.original_url);
          });
        }
      });

      galleriesImages.unshift(featured);

      return galleriesImages;
    },
    routeMenu(slug) {
      if (this.location === "viewApartment") {
        this.$router.push(`/apartments/${slug}`);
      }
      this.$router.push(`/apartments/${slug}`);
    },
  },
};
</script>

<style scoped>
.name {
  color: #3c4043;
  font-size: 0.9em;
}
.name:hover {
  color: #c221cf;
  cursor: pointer;
}
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

#panel-header-action-left {
  position: absolute;
  top: 50%;
  right: 230px;
  color: #ffffff;
  font-size: 1.3em;
  transition: 0.5s ease;
}

#panel-header-action:hover {
  font-size: 1.5em;
  cursor: pointer;
}

#panel-header-action-left:hover {
  font-size: 1.5em;
  cursor: pointer;
}
</style>
