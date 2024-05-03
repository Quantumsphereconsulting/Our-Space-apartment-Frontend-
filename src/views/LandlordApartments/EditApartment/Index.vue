<template>
  <div>
    <b-container fluid>
      <scale-loader
        v-if="fetching"
        class="mt-5 loader"
        :loading="true"
        :color="'#c221cf'"
      />
      <div v-else>
        <EditControls :apartment="apartment" />
        <Gallery :apartment="apartment" />
        <EditApartmentForm
          :apartment="apartment"
          :location="location"
          :kycs="kycs"
          :chosen-kycs="chosenKYCs"
          :amenities="amenities"
          :chosen-amenities="chosenAmenities"
        />
      </div>
    </b-container>
  </div>
</template>

<script>
import EditControls from "./components/EditControls.vue";
import Gallery from "./EditGallery";
import EditApartmentForm from "./EditApartmentForm";
export default {
  components: {
    EditControls,
    Gallery,
    EditApartmentForm,
  },
  mounted() {
    this.fetchApartment();
    const t = this.$route.query.t;
    if (+new Date() - t <= 200000) this.warning = true;
  },
  methods: {
    fetchApartment() {
      this.fetching = true;
      let slug = this.$route.params.slug;
      let url = `${this.ROUTES.apartment}/${slug}`;
      this.apiGet(url).then(async (res) => {
        const { apartment } = res.data.data;
        this.apartment = apartment;
        this.featuredImage = apartment.featured_image;
        url = `${this.ROUTES.apartment}/${apartment.id}/location`;
        await this.apiGet(url).then((res) => {
          const { location } = res.data.data;
          this.location = location;
        });
        // get already selected kycs and kycs to be selected
        url = `${this.ROUTES.apartment}/${apartment.id}/kycs?show_for_selection=1`;
        await this.apiGet(url).then((res) => {
          const { system_apartment_kycs } = res.data.data;
          this.kycs = system_apartment_kycs;
        });
        url = `${this.ROUTES.apartment}/${apartment.id}/kycs?show_for_selection=0`;
        await this.apiGet(url).then((res) => {
          const { custom_apartment_kycs } = res.data.data;
          if (custom_apartment_kycs) {
            custom_apartment_kycs.forEach((kyc) => {
              this.chosenKYCs.push(kyc.id);
            });
          }
        });
        url = `${this.ROUTES.apartment}/${apartment.id}/amenities`;
        await this.apiGet(url).then((res) => {
          const { amenities } = res.data.data;
          this.chosenAmenities = amenities;
        });
        await this.apiGet(this.ROUTES.amenities).then((res) => {
          const { amenities } = res.data.data;
          this.amenities = amenities;
        });
        this.fetching = false;
      });
    },
  },
  data() {
    return {
      apartment: null,
      location: null,
      fetching: false,
      featuredImage: null,
      kycs: null,
      amenities: null,
      chosenKYCs: [],
      chosenAmenities: [],
      warning: false,
    };
  },
};
</script>
<style>
@media only screen and (min-width: 992px),
  only screen and (min-device-width: 992px) {
  .loader {
    padding-left: 22em;
  }
}
</style>
