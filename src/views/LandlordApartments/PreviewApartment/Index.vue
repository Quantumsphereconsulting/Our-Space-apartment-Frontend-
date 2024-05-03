<template>
  <div>
    <b-container
      fluid
      class="d-lg-block d-none"
      style="padding-left: 23em; padding-right: 3em"
    >
      <scale-loader
        v-if="fetching"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <div v-else>
        <PreviewControls :apartment="apartment" />
        <PreviewGallery
          :apartment="apartment"
          :featured-image="apartment.featured_image"
        />
        <PreviewDetails
          :location="location"
          :required-amenities="requiredAmenities"
          :chosen-amenities="chosenAmenities"
          :chosen-kycs="chosenKYCs"
          :apartment="apartment"
          @updated="fetchApartment"
        />
      </div>
    </b-container>
    <b-container class="d-lg-none" fluid>
      <scale-loader
        v-if="fetching"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <div v-else>
        <PreviewControls :apartment="apartment" />
        <PreviewGallery
          :apartment="apartment"
          :featured-image="apartment.featured_image"
        />
        <PreviewDetails
          :location="location"
          :required-amenities="requiredAmenities"
          :chosen-amenities="chosenAmenities"
          :chosen-kycs="chosenKYCs"
          :apartment="apartment"
          @updated="fetchApartment"
        />
      </div>
    </b-container>
  </div>
</template>

<script>
import PreviewControls from "./components/PreviewControls";
import PreviewGallery from "./PreviewGallery";
import PreviewDetails from "./PreviewDetails";
export default {
  components: {
    PreviewControls,
    PreviewGallery,
    PreviewDetails,
  },
  mounted() {
    this.fetchApartment();
  },
  methods: {
    fetchApartment() {
      this.fetching = true;
      this.chosenKYCs = [];
      let slug = this.$route.params.slug;
      let url = `${this.ROUTES.apartment}/${slug}?include=category,apartmentDuration`;
      this.apiGet(url).then(async (res) => {
        const { apartment } = res.data.data;
        this.apartment = apartment;
        url = `${this.ROUTES.apartment}/${apartment.id}/location`;
        await this.apiGet(url).then((res) => {
          const { location } = res.data.data;
          this.location = location;
        });
        url = `${this.ROUTES.apartment}/${apartment.id}/kycs?show_for_selection=0`;
        await this.apiGet(url).then(async (res) => {
          const { system_apartment_kycs, custom_apartment_kycs } =
            res.data.data;
          if (system_apartment_kycs) {
            await system_apartment_kycs.forEach((kyc) => {
              this.chosenKYCs.push(kyc);
            });
          }
          if (custom_apartment_kycs) {
            await custom_apartment_kycs.forEach((kyc) => {
              this.chosenKYCs.push(kyc);
            });
          }
        });
        url = `${this.ROUTES.apartment}/${apartment.id}/amenities`;
        await this.apiGet(url).then(async (res) => {
          const { amenities } = res.data.data;
          if (amenities) {
            await amenities.forEach((amenity) => {
              if (amenity.is_primary) {
                this.requiredAmenities.push(amenity);
              } else {
                this.chosenAmenities.push(amenity);
              }
            });
          }
        });
        this.fetching = false;
      });
    },
  },
  data() {
    return {
      apartment: null,
      fetching: false,
      chosenKYCs: [],
      requiredAmenities: [],
      chosenAmenities: [],
      location: {},
    };
  },
};
</script>
