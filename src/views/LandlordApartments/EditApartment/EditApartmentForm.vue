<template>
  <b-form @submit.prevent="submit" id="a-form">
    <b-alert class="mb-5" variant="info" show>
      <fa-icon :icon="['fas', 'fa-exclamation-circle']" class="mr-3" />
      Please note, you have to complete the apartment registration process for
      the apartment to be listed.
    </b-alert>
    <b-row>
      <b-col xl="4">
        <b-form-group label="Apartment Name">
          <b-form-input
            class="a-form-input"
            v-model.trim="$v.apartmentName.$model"
            placeholder="type here..."
          />
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.apartmentName.required"
          >
            <p class="invalid-text">Apartment name is required</p>
          </div>
        </b-form-group>
      </b-col>
      <b-col xl="4">
        <b-form-group label="Type of Apartment">
          <b-form-select
            class="a-form-input"
            v-model.trim="$v.apartmentType.$model"
            :options="apartmentTypes"
            @change="loadSubCategories"
          />
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.apartmentType.required"
          >
            <p class="invalid-text">Apartment type is required</p>
          </div>
        </b-form-group>
      </b-col>
      <b-col xl="4">
        <b-form-group label="Subtype of Apartment">
          <b-form-select
            class="a-form-input"
            v-model.trim="$v.subCategory.$model"
            :options="subCategoryOptions"
          />
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.subCategory.required"
          >
            <p class="invalid-text">Apartment subtype is required</p>
          </div>
        </b-form-group>
      </b-col>
      <b-col xl="4">
        <b-form-group label="Price">
          <b-input-group>
            <b-form-input
              class="a-form-input"
              v-model.trim="$v.price.$model"
              placeholder="00.00"
            />
            <template #append>
              <b-form-select
                class="a-form-input"
                v-model.trim="$v.duration.$model"
                :options="durations"
              />
            </template>
          </b-input-group>
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.price.required && !$v.duration.required"
          >
            <p class="invalid-text">Price & frequency are required</p>
          </div>
          <div
            class="invalid-prompt"
            v-else-if="submitted && !$v.duration.required && $v.price.required"
          >
            <p class="invalid-text">Frequency is required</p>
          </div>
          <div
            class="invalid-prompt"
            v-else-if="submitted && !$v.price.required && $v.duration.required"
          >
            <p class="invalid-text">Price is required</p>
          </div>
        </b-form-group>
      </b-col>
      <b-col xl="4">
        <b-form-group label="Street Location">
          <vue-google-autocomplete
            ref="address"
            id="map"
            :value="streetAddress"
            classname="form-control a-form-input w-100"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            country="ng"
          />
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.houseNum.required && !$v.streetName.required"
          >
            <p class="invalid-text">Street number && name are required</p>
          </div>
          <div
            class="invalid-prompt ml-2"
            v-else-if="
              submitted && !$v.streetName.required && $v.houseNum.required
            "
          >
            <p class="invalid-text">Street name is required</p>
          </div>
          <div
            class="invalid-prompt ml-2"
            v-else-if="
              submitted && !$v.houseNum.required && $v.streetName.required
            "
          >
            <p class="invalid-text">House Number is required</p>
          </div>
        </b-form-group>
      </b-col>
      <b-col xl="4">
        <b-form-group label="Landmark">
          <b-form-input
            class="a-form-input"
            v-model.trim="landmark"
            placeholder="type here..."
          />
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="divider" />
    <b-row>
      <b-col cols="12">
        <b-form-group label="Apartment Description">
          <b-textarea
            class="a-form-textarea"
            placeholder="type here..."
            v-model.trim="$v.description.$model"
            rows="5"
            no-resize
          />
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.description.required"
          >
            <p class="invalid-text">Description is required</p>
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="divider" />
    <b-row>
      <b-col xl="6">
        <EditKYC
          v-if="selectedKYCs.length"
          :kycs="kycs"
          :selected="selectedKYCs"
          @selected="getKYCs"
        />
        <NewKYC v-else :kycs="kycs" @selected="getKYCs" />
      </b-col>
      <b-col xl="6" class="mt-xl-0 mt-4">
        <EditAmenities
          v-if="selectedAmenities.length"
          :chosen-amenities="selectedAmenities"
          :amenities="amenities"
          @selected="getAmenities"
        />
        <NewAmenities
          v-else
          :chosen-amenities="selectedAmenities"
          :amenities="amenities"
          @selected="getAmenities"
        />
      </b-col>
    </b-row>
    <hr class="divider" />
    <div class="mt-4 d-lg-flex d-none justify-content-end">
      <b-button
        class="primary-outline-btn btn-lg mr-3"
        @click="previewApartment"
      >
        Preview Apartment
      </b-button>
      <b-button type="submit" class="primary-btn btn-lg">
        Save Changes
      </b-button>
    </div>
    <div class="mt-4 d-lg-none d-flex justify-content-between">
      <b-button class="primary-outline-btn mr-3" @click="previewApartment">
        Preview Apartment
      </b-button>
      <b-button type="submit" class="primary-btn">Save Changes</b-button>
    </div>
    <b-modal
      v-model="publishing"
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
        <p style="font-size: 1.5em; margin-top: 2em">
          Please wait, your changes are being saved...
        </p>
      </div>
    </b-modal>
  </b-form>
</template>
<script>
import NewKYC from "./components/NewKYC";
import EditKYC from "@/views/LandlordApartments/EditApartment/components/EditKYC";
import NewAmenities from "./components/NewAmenities";
import EditAmenities from "@/views/LandlordApartments/EditApartment/components/EditAmenities";
import { required } from "vuelidate/lib/validators";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: {
    NewKYC,
    EditKYC,
    EditAmenities,
    NewAmenities,
    VueGoogleAutocomplete,
  },
  watch: {
    price: function (newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.price = result));
    },
  },
  data() {
    return {
      apartmentName: null,
      apartmentLocation: null,
      price: null,
      houseNum: null,
      streetName: null,
      landmark: null,
      pet: 0,
      pets: [
        { text: "Not Allowed", value: 0 },
        { text: "Allowed", value: 1 },
      ],
      apartmentStays: 0,
      apartmentType: null,
      apartmentTypes: [
        {
          text: "Please select an apartment type",
          value: null,
          disabled: true,
        },
      ],
      duration: null,
      durations: [{ text: "frequency", value: null, disabled: true }],
      state: null,
      states: [{ text: "Please select State", value: null, disabled: true }],
      city: null,
      cities: [{ text: "Please select City", value: null, disabled: true }],
      lga: null,
      lgas: [{ text: "Please select LGA", value: null, disabled: true }],
      numBedrooms: 0,
      numLivingRooms: 0,
      numBathrooms: 0,
      numToilets: 0,
      parkingSpace: 0,
      description: null,
      submitted: false,
      publishing: false,
      selectedKYCs: [],
      selectedAmenities: [],
      streetAddress: null,
      subCategories: {},
      subCategoryOptions: [
        {
          text: "Please select an apartment sub type",
          value: null,
          disabled: true,
        },
      ],
      subCategory: null,
    };
  },
  props: {
    apartment: {
      required: true,
    },
    location: {
      required: true,
    },
    kycs: {
      required: true,
    },
    amenities: {
      required: true,
    },
    chosenKycs: {},
    chosenAmenities: {},
  },
  async mounted() {
    this.$store.dispatch("apartment/saveFeaturedImage", { image: null });
    this.fetchCategories();
    this.fetchDurations();
    this.fetchStates();
    if (this.apartment) {
      this.apartmentName = this.apartment.name;
      this.apartmentType = this.apartment.category_id;
      this.subCategory = this.apartment.sub_category_id;
      this.price = parseFloat(this.apartment.price).toString();
      this.duration = this.apartment.apartment_duration_id;
      this.description = this.apartment.description;
    }
    if (this.location) {
      this.houseNum = this.location.house_number;
      this.streetName = this.location.street;
      this.streetAddress = `${this.houseNum}, ${this.streetName}`;
      this.landmark = this.location.landmark;
      this.state = this.location.state_id;
      this.getCities();
      this.city = this.location.city_id;
      this.getLGAs();
      this.lga = this.location.local_government_id;
    }
    if (this.chosenKycs) {
      this.selectedKYCs = this.chosenKycs;
    }
    if (this.chosenAmenities) {
      this.chosenAmenities.forEach((amenity) => {
        this.selectedAmenities.push({
          id: amenity.id,
          name: amenity.name,
          total: amenity.pivot.total_number,
          icon: amenity.icon,
        });
      });
    }
  },
  validations: {
    apartmentName: { required },
    apartmentType: { required },
    price: { required },
    duration: { required },
    houseNum: { required },
    streetName: { required },
    description: { required },
    subCategory: { required },
  },
  methods: {
    fetchCategories() {
      const url = `${this.ROUTES.categories}?include=subCategories`;
      this.apiGet(url).then(async (res) => {
        this.apartmentTypes = [
          {
            text: "Please select an apartment type",
            value: null,
            disabled: true,
          },
        ];
        const { categories } = res.data.data;
        await categories.forEach((category) => {
          this.apartmentTypes.push({
            text: category.name,
            value: category.id,
            disabled: false,
          });
          if (category.sub_categories?.length) {
            this.subCategories[category.id] = [];
            category.sub_categories.forEach((subCategory) => {
              this.subCategories[category.id].push({
                text: subCategory.name,
                value: subCategory.id,
              });
            });
          }
        });
        if (this.apartment) {
          this.loadSubCategories(this.apartment.category_id);
          this.subCategory = this.apartment.sub_category_id;
        }
      });
    },
    fetchDurations() {
      this.apiGet(this.ROUTES.duration).then((res) => {
        this.durations = [{ text: "frequency", value: null, disabled: true }];
        const { apartment_durations } = res.data.data;
        apartment_durations.forEach((duration) => {
          this.durations.push({
            text: `per ${duration.period}`,
            value: duration.id,
            disabled: false,
          });
        });
      });
    },
    fetchStates() {
      const url = `${this.ROUTES.state}?do_not_paginate=1`;
      this.apiGet(url).then((res) => {
        this.states = [
          { text: "Please select State", value: null, disabled: true },
        ];
        const { states } = res.data.data;
        states.forEach((state) => {
          this.states.push({
            text: state.name,
            value: state.id,
            disabled: false,
          });
        });
      });
    },
    getCities() {
      const url = `${this.ROUTES.city}?do_not_paginate=1&state_id=${this.state}`;
      this.apiGet(url).then((res) => {
        this.cities = [
          { text: "Please select City", value: null, disabled: true },
        ];
        const { cities } = res.data.data;
        cities.forEach((city) => {
          this.cities.push({
            text: city.name,
            value: city.id,
            disabled: false,
          });
        });
      });
    },
    getLGAs() {
      const url = `${this.ROUTES.lga}?do_not_paginate=1&city_id=${this.city}`;
      this.apiGet(url).then((res) => {
        this.lgas = [
          { text: "Please select LGA", value: null, disabled: true },
        ];
        const { local_governments } = res.data.data;
        local_governments.forEach((lga) => {
          this.lgas.push({
            text: lga.name,
            value: lga.id,
            disabled: false,
          });
        });
      });
    },
    getKYCs(value) {
      this.selectedKYCs = value;
    },
    getAmenities(value) {
      this.selectedAmenities = value;
    },
    async submit() {
      this.submitted = true;
      // first get google map street location
      this.getStreetLocation();
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        this.publishing = true;
        const fd = new FormData();
        // update the featured image if it's set
        let featuredImage = this.$store.getters["apartment/getFeaturedImage"];
        featuredImage
          ? fd.append("featured_image", featuredImage.imageFile)
          : false;
        fd.append("category_id", this.apartmentType);
        fd.append("sub_category_id", this.subCategory);
        fd.append("apartment_duration_id", this.duration);
        fd.append("name", this.apartmentName);
        const price = parseFloat(this.price.replace(/,/g, ""));
        fd.append("price", price);
        fd.append("description", this.description);
        fd.append("_method", "PUT");
        let url = `${this.ROUTES.apartment}/${this.apartment.id}`;
        await this.apiPost(url, fd).then(async (res) => {
          // after successfully updating the apartment, update the amenities
          const { success, message, data } = res.data;
          if (success) {
            const { apartment } = data;
            if (this.selectedAmenities) {
              let data = [];
              this.selectedAmenities.forEach((amenity) => {
                let updatedAmenity = {
                  amenity_id: amenity.id,
                  total_number: amenity.total,
                };
                data.push(updatedAmenity);
              });
              let fd = { data };
              url = `${this.ROUTES.apartment}/${apartment.id}/amenities`;
              await this.apiPost(url, fd, "default");
            }
            // then update the location
            url = `${this.ROUTES.apartment}/${apartment.id}/location`;
            let fd = new FormData();
            fd.append("house_number", this.houseNum);
            fd.append("street", this.streetName);
            fd.append("landmark", this.landmark || "");
            fd.append("state_id", this.state || "");
            fd.append("city_id", this.city || "");
            fd.append("local_government_id", this.lga || "");
            await this.apiPost(url, fd).finally(() => {
              this.$router
                .push({
                  name: "PreviewLandlordApartments",
                  params: { slug: apartment.slug },
                })
                .then(() => {
                  this.apiSuccess(
                    message,
                    "Our team will get back to you shortly."
                  );
                });
            });
            // then update the kycs
            if (this.selectedKYCs.length) {
              url = `${this.ROUTES.apartment}/${apartment.id}/kycs`;
              fd = new FormData();
              this.selectedKYCs.forEach((kyc, index) => {
                fd.append(`system_apartment_kyc_ids[${index}]`, kyc);
              });
              await this.apiPost(url, fd).finally(() => {
                this.$router
                  .push({
                    name: "PreviewLandlordApartments",
                    params: { slug: apartment.slug },
                  })
                  .then(() => {
                    this.apiSuccess(
                      message,
                      "Our team will get back to you shortly."
                    );
                  });
              });
            }
          }
          this.publishing = false;
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    getAddressData(addressData, placeResultData, id) {
      // get address data from google map api
      const { street_number, route } = addressData;
      if (street_number) this.houseNum = street_number;
      if (route) this.streetName = route;
      this.address = addressData;
      localStorage.setItem("addressData", JSON.stringify(addressData));
    },
    getStreetLocation() {
      let streetLocation = localStorage.getItem("addressData");
      if (streetLocation) {
        streetLocation = JSON.parse(streetLocation);
        const { route, street_number } = streetLocation;
        if (route) this.streetName = route;
        if (street_number) this.houseNum = street_number;
      }
      localStorage.removeItem("addressData");
    },
    previewApartment() {
      if (this.apartment?.is_active && this.apartment?.is_verified) {
        const previewPage = `${this.callbackBaseUrl}/apartments/${this.apartment?.slug}`;
        window.open(previewPage, "_blank");
      } else {
        this.$router.push({
          name: "PreviewLandlordApartments",
          params: { slug: this.apartment?.slug },
        });
      }
    },
    loadSubCategories(value) {
      this.subCategory = null;
      this.subCategoryOptions = [
        {
          text: "Please select an apartment sub type",
          value: null,
          disabled: true,
        },
      ];
      const options = this.subCategories[value];
      options.forEach((option) => {
        this.subCategoryOptions.push(option);
      });
    },
  },
};
</script>

<style scoped>
#a-form {
  margin-top: 2em;
  margin-bottom: 4em;
}
@media only screen and (min-width: 992px),
  only screen and (min-device-width: 992px) {
  #a-form {
    padding-left: 22em;
    padding-right: 2em;
  }
}
.a-form-input {
  background-color: #f5f4ff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  color: #3c4043;
  opacity: 0.5;
  height: 3.125em;
}
.a-form-input:focus {
  background-color: #f5f4ff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
}
.divider {
  margin-top: 2em;
  margin-bottom: 2em;
}
.a-form-textarea {
  background-color: #f5f4ff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  color: #3c4043;
  opacity: 0.5;
  height: 9.133em;
}
.a-form-textarea:focus {
  background-color: #f5f4ff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
}

.custom-select:focus {
  box-shadow: none;
}
.invalid-prompt {
  height: 1em;
  display: inline-block;
  text-align: left;
  margin: 0;
}
.invalid-text {
  font-size: 0.8em;
  color: #ff0000;
  opacity: 0.6;
}
</style>
<style>
.pac-container {
  background-color: #fff;
  position: absolute !important;
  z-index: 10000 !important;
  box-shadow: 0px 30px 30px rgba(60, 64, 67, 0.05);
  border-radius: 5px;
  /* border-top: 1px solid #d9d9d9; */
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 5px;
}
.pac-icon {
  background-color: #c221cf;
  width: 37px;
  height: 37px;
  background-image: url("../../../assets/images/maplog.png");
  border-radius: 10px;
}
.pac-item {
  border: none;
  padding: 10px 15px;
  color: #3c4043;
  display: flex;
  align-items: center;
  font-family: Circular Std;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
}
.icon {
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 10px;
  padding-right: 10px;
}
.google-auto-complete-container {
  position: relative;
}

.google-auto-complete {
  border: 0.5px solid #3c4043 !important;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 24px;
  color: #3c4043;
}
.google-auto-complete:focus {
  outline: none;
}
</style>
