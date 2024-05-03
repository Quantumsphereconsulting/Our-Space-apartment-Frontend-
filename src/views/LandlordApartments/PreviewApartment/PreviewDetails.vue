<template>
  <div class="p-details">
    <div class="d-flex justify-content-between flex-lg-row flex-column">
      <div>
        <p class="pd-title">{{ apartment.name }}</p>
        <div class="pd-subtitle">
          <span class="mr-2 text-muted">
            <fa-icon :icon="['fas', 'building']" style="font-size: 1em" />
          </span>
          <span>
            <small v-if="apartment.category" class="text-muted text-capitalize">
              {{ apartment.category.name }} apartment
            </small>
          </span>
        </div>
        <div class="pd-subtitle">
          <span class="mr-2 text-muted">
            <fa-icon :icon="['fas', 'map-marker']" style="font-size: 1em" />
          </span>
          <span>
            <small class="text-muted">
              {{ location.full_address }}
            </small>
          </span>
        </div>
        <div class="pd-subtitle mt-3">
          <b-badge
            class="mr-3"
            v-if="apartment.is_verified"
            pill
            variant="success"
          >
            Verified
          </b-badge>
          <b-badge v-else class="mr-3" pill variant="danger">
            Unverified
          </b-badge>
          <b-badge
            href="javascript:void(0)"
            v-if="apartment.is_active"
            pill
            variant="success"
            @click="confirm"
          >
            Active
          </b-badge>
          <b-badge
            href="javascript:void(0)"
            v-else
            pill
            variant="warning"
            @click="confirm"
          >
            Inactive
          </b-badge>
        </div>
      </div>
      <p class="pd-price mt-lg-0 mt-4">
        <span class="pd-price-amt">
          ₦{{ apartment.price | currencyFormat }}
        </span>
        <span
          v-if="apartment.apartment_duration"
          class="pd-price-freq text-muted"
        >
          /{{ apartment.apartment_duration.period }}
        </span>
      </p>
    </div>
    <hr class="my-lg-4 my-2" />
    <PreviewFeatures :amenities="requiredAmenities" />
    <hr class="my-lg-4 my-2" />
    <PreviewKYC :kycs="chosenKycs" />
    <hr class="my-lg-4 my-2" />
    <p style="color: #3c4043; font-size: 1.5em">Description</p>
    <p style="color: #3c4043; font-size: 1.125em; opacity: 0.8">
      {{ apartment.description }}
    </p>
    <hr class="my-lg-4 my-2" />
    <PreviewAmenities :amenities="chosenAmenities" />
    <b-modal
      v-model="confirmToggleStatus"
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
          class="text-warning"
          style="font-size: 4em"
        />
        <p style="font-size: 1.5em; margin-top: 1em">Are you sure?</p>
        <p v-if="apartment">
          <span v-if="apartment.is_active">
            Please note, this will <strong>deactivate</strong> this apartment.
          </span>
          <span v-else>
            Please note, this will <strong>activate</strong> this apartment.
          </span>
        </p>
        <div class="d-flex justify-content-center mt-4">
          <b-button
            class="btn secondary-outline-btn mr-3 w-100"
            @click="confirmToggleStatus = false"
          >
            Cancel
          </b-button>
          <b-button class="btn primary-btn w-100" @click="toggleStatus">
            Confirm
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="toggling"
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
          Please wait, the status of <strong>{{ apartment.name }}</strong> is
          being updated...
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import PreviewFeatures from "./components/PreviewFeatures";
import PreviewKYC from "./components/PreviewKYC";
import PreviewAmenities from "./components/PreviewAmenities";
export default {
  components: {
    PreviewFeatures,
    PreviewKYC,
    PreviewAmenities,
  },
  props: {
    apartment: null,
    chosenKycs: {},
    chosenAmenities: {},
    requiredAmenities: {},
    location: {},
  },
  data() {
    return {
      confirmToggleStatus: false,
      toggling: false,
    };
  },
  methods: {
    confirm() {
      this.confirmToggleStatus = true;
    },
    async toggleStatus() {
      this.confirmToggleStatus = false;
      this.toggling = true;
      const url = `${this.ROUTES.apartment}/${this.apartment.id}/active`;
      await this.apiPatch(url).then((res) => {
        const { success, message } = res.data;
        if (success) {
          this.apiSuccess("Action Successful", message);
          this.$emit("updated");
        }
      });
      this.toggling = false;
    },
  },
};
</script>

<style>
.p-details {
  margin-top: 3em;
  margin-bottom: 3em;
}
.pd-title {
  color: #3c4043;
  font-size: 2em;
  margin-bottom: 0;
}
.pd-subtitle {
  color: #3c4043;
  font-size: 1.125em;
}
.pd-price {
  color: #3c4043;
}
.pd-price-amt {
  font-size: 1.75em;
}
.pd-price-freq {
  font-size: 1.5em;
}
</style>
