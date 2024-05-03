<template>
  <div>
    <div id="e-controls" class="d-lg-block d-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.5em; color: #c221cf">
          <span
            @click="$router.push({ name: 'LandlordApartments' })"
            class="back mr-2"
          >
            Apartments
          </span>
          <span class="mr-2"> >> </span>
          <span>Edit Apartment</span>
        </p>
        <div>
          <b-button
            class="primary-outline-btn btn-lg mr-4"
            @click="confirmDelete = true"
          >
            <fa-icon :icon="['far', 'trash-alt']" class="mr-2" />
            Delete Apartment
          </b-button>
          <b-button
            class="primary-btn btn-lg"
            @click="$router.push({ name: 'NewLandlordApartments' })"
          >
            List New Apartment
          </b-button>
        </div>
      </div>
    </div>
    <div id="e-controls-mobile" class="d-lg-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.2em; color: #c221cf">
          <span
            @click="$router.push({ name: 'LandlordApartments' })"
            class="back mr-2"
          >
            Apartments
          </span>
          <span class="mr-2"> >> </span>
          <span>Edit Apartment</span>
        </p>
        <div class="d-flex">
          <b-button
            class="primary-outline-btn mr-4"
            @click="confirmDelete = true"
          >
            <fa-icon :icon="['far', 'trash-alt']" class="mr-2" />
            Delete Apartment
          </b-button>
          <b-button
            class="primary-btn"
            @click="$router.push({ name: 'NewLandlordApartments' })"
          >
            List New Apartment
          </b-button>
        </div>
      </div>
    </div>
    <b-modal
      v-model="confirmDelete"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <fa-icon
          :icon="['fas', 'exclamation-triangle']"
          class="text-danger"
          style="font-size: 4em"
        />
        <p style="font-size: 1.5em; margin-top: 1em; margin-bottom: 0">
          Are you sure?
        </p>
        <p v-if="apartment">
          Please note, this will remove
          <strong>{{ apartment.name }}</strong> from Our Space. This action is
          irreversible.
        </p>
        <div class="d-flex justify-content-center mt-4">
          <b-button
            class="btn secondary-outline-btn mr-3 w-100"
            @click="confirmDelete = false"
          >
            Cancel
          </b-button>
          <b-button class="btn primary-btn w-100" @click="deleteApartment">
            Confirm
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="deleting"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <scale-loader class="mt-1" :loading="true" :color="'#c221cf'" />
        <p v-if="apartment" style="font-size: 1.5em; margin-top: 2em">
          Please wait, <strong>{{ apartment.name }}</strong> is being deleted...
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    apartment: null,
  },
  data() {
    return {
      confirmDelete: false,
      deleting: false,
    };
  },
  methods: {
    deleteApartment() {
      this.confirmDelete = false;
      this.deleting = true;
      const url = `${this.ROUTES.apartment}/${this.apartment.id}`;
      this.apiDelete(url).then(() => {
        this.deleting = false;
        this.$router.push({ name: "LandlordApartments" });
      });
    },
  },
};
</script>

<style>
#e-controls {
  padding-top: 4.6em;
  padding-left: 22em;
  padding-right: 2em;
}
#e-controls-mobile {
  padding-top: 2.3em;
  text-align: center;
}
.back {
  transition: 0.5s ease;
}
.back:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
