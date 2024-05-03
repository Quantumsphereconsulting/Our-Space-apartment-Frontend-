<template>
  <div>
    <div id="controls" class="d-lg-block d-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.5em; color: #c221cf">Apartments</p>
        <div>
          <b-button
            class="primary-btn btn-lg"
            @click="$router.push({ name: 'NewLandlordApartments' })"
          >
            List New Apartment
          </b-button>
        </div>
      </div>
      <div class="filter-bar">
        <div class="fb-wrapper mr-3">
          <date-picker
            valueType="MM/YYYY"
            placeholder="Date Listed"
            type="month"
            v-model="dateListed"
            @input="filter"
          />
        </div>
        <div class="fb-wrapper">
          <b-form-select
            class="fb-select"
            v-model="active"
            :options="actives"
            @change="filter"
          />
        </div>
        <div class="fb-wrapper ml-3">
          <b-form-select
            class="fb-select"
            v-model="verified"
            :options="verifieds"
            @change="filter"
          />
        </div>
        <div class="fb-wrapper ml-3">
          <b-form-select
            class="fb-select"
            v-model="featured"
            :options="featureds"
            @change="filter"
          />
        </div>
        <div class="fb-wrapper ml-3">
          <b-button
            class="primary-btn w-100"
            style="height: 3.125em"
            @click="resetFilter"
          >
            Reset
          </b-button>
        </div>
      </div>
    </div>
    <div id="controls-mobile" class="d-lg-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.2em; color: #c221cf">Apartments</p>
        <div>
          <b-button
            class="primary-btn"
            @click="$router.push({ name: 'NewLandlordApartments' })"
          >
            List New Apartment
          </b-button>
        </div>
      </div>
      <div class="filter-bar-mobile">
        <div class="fb-wrapper-mobile mr-3">
          <date-picker
            valueType="MM/YYYY"
            placeholder="Date Listed"
            type="month"
            v-model="dateListed"
            @input="filter"
          />
        </div>
        <div class="fb-wrapper-mobile">
          <b-form-select
            class="fb-select-mobile"
            v-model="active"
            :options="actives"
            @change="filter"
          />
        </div>
        <div class="fb-wrapper-mobile ml-3">
          <b-form-select
            class="fb-select-mobile"
            v-model="verified"
            :options="verifieds"
            @change="filter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: null,
      actives: [
        { text: "Active Status", value: null },
        { text: "Active", value: 1 },
        { text: "Inactive", value: 0 },
      ],
      verified: null,
      verifieds: [
        { text: "Verified Status", value: null },
        { text: "Verified", value: 1 },
        { text: "Unverified", value: 0 },
      ],
      featured: null,
      featureds: [
        { text: "Featured Status", value: null },
        { text: "Featured", value: 1 },
        { text: "Not Featured", value: 0 },
      ],
      dateListed: null,
    };
  },
  methods: {
    filter() {
      let dateAdded = "";
      let activeStatus = "";
      let verifiedStatus = "";
      let featuredStatus = "";
      if (this.dateListed) {
        dateAdded = this.dateListed;
      }
      if (this.active === 1) {
        activeStatus = 1;
      } else if (this.active === 0) {
        activeStatus = 0;
      }
      if (this.verified === 1) {
        verifiedStatus = 1;
      } else if (this.verified === 0) {
        verifiedStatus = 0;
      }
      if (this.featured === 1) {
        featuredStatus = 1;
      } else if (this.featured === 0) {
        featuredStatus = 0;
      }
      const url = `${this.ROUTES.apartment}?per_page=8&page=1&filter[date_added]=${dateAdded}&filter[is_active]=${activeStatus}&filter[is_verified]=${verifiedStatus}&filter[is_featured]=${featuredStatus}`;
      this.$emit("filtered", url);
    },
    resetFilter() {
      this.dateListed = null;
      this.active = null;
      this.verified = null;
      this.featured = null;
      this.filter();
    },
  },
};
</script>

<style scoped>
#controls {
  padding-top: 4.6em;
}
#controls-mobile {
  padding-top: 2.3em;
  text-align: center;
}
.filter-bar {
  margin-top: 4em;
  padding: 1em;
  border-radius: 10px;
  background-color: #f5f4ff;
  display: flex;
  justify-content: center;
}
.filter-bar-mobile {
  margin-top: 2em;
  padding: 1em;
  border-radius: 10px;
  background-color: #f5f4ff;
  display: flex;
  justify-content: center;
}
.fb-wrapper {
  width: 100%;
}
.fb-wrapper-mobile {
  width: 100%;
}
.fb-select {
  height: 3.125em;
  background: #f5f4ff;
}
.fb-select-mobile {
  height: 3.125em;
  background: #f5f4ff;
}
</style>

<style>
.mx-datepicker {
  width: 100%;
}
.mx-input-wrapper {
  height: 3.125em;
}
.mx-input {
  height: 100%;
  background-color: #f5f4ff;
  border-color: #ced4da !important;
  box-shadow: none;
  color: #3c4043;
  font-size: 1rem;
}
.mx-input:hover,
.mx-input:focus {
  border-color: #c221cf;
}
</style>
