<template>
  <div style="flex: 1 0 auto">
    <scale-loader
      v-if="apiBusy"
      class="mt-5"
      :loading="true"
      :color="'#c221cf'"
    />
    <div v-else>
      <b-container>
        <ApartmentBreadcrumb :title="apartment.name" />
        <scale-loader
          v-if="apiBusy"
          class="mt-5"
          :loading="true"
          :color="'#c221cf'"
        />
        <Gallery :apartment="apartment" :Gallery="mobileGalleriesImages" />
        <Details :apartment="apartment" :formKycs="formKycs" />
        <ReviewsAmenities :apartment="apartment" :reviews="apartment.reviews" />
        <Landlord :landlord="apartment.user" />
      </b-container>
      <!--mobile views-->
      <b-container>
        <!-- <Control /> -->
      </b-container>
      <GalleryMobile :Gallries="mobileGalleriesImages" />
      <b-container>
        <DetailsMobile :apartment="apartment" :formKycs="formKycs" />
        <ReviewsAmenitiesMobile
          :apartment="apartment"
          :reviews="apartment.reviews"
        />
        <LandlordMobile :landlord="apartment.user" />
      </b-container>
    </div>
  </div>
</template>

<script>
import ApartmentBreadcrumb from "./components/ApartmentBreadcrumb";

import Gallery from "./Gallery";
import GalleryMobile from "./GalleryMobile";
import Details from "./Details";
import DetailsMobile from "./DetailsMobile";
import ReviewsAmenities from "./ReviewsAmenities";
import ReviewsAmenitiesMobile from "./ReviewsAmenitiesMobile";
import Landlord from "./Landlord";
import LandlordMobile from "./LandlordMobile";

export default {
  components: {
    ApartmentBreadcrumb,
    Gallery,
    GalleryMobile,
    Details,
    DetailsMobile,
    ReviewsAmenities,
    ReviewsAmenitiesMobile,
    Landlord,
    LandlordMobile,
  },
  mounted() {
    this.fetchApartment(this.$route.params.id);
  },
  data() {
    return {
      apartment: {},
      landlord: {},
      mobileGalleriesImages: [],
      formKycs: [],
      system_apartment_kycs: [],
      custom_apartment_kycs: [],
    };
  },
  methods: {
    addFeatureImage(image) {
      this.mobileGalleriesImages.push(image);
    },
    mergeGallries(arrays) {
      arrays.forEach((gallery) => {
        if (gallery.media) {
          gallery.media.map((media) => {
            this.mobileGalleriesImages.push(media.original_url);
          });
        }
      });
    },
    fetchKycs(id) {
      this.apiGet(`user/apartments/${id}/kycs?show_for_selection=1`).then(
        (res) => {
          if (res.data.data.system_apartment_kycs) {
            this.decentralizeApartmentKycs(
              res.data.data.system_apartment_kycs,
              "system_apartment_kycs"
            );
          }
          if (res.data.data.custom_apartment_kycs) {
            this.decentralizeApartmentKycs(
              res.data.data.custom_apartment_kycs,
              "custom_apartment_kycs"
            );
          }
        }
      );
    },
    decentralizeApartmentKycs(kycs, type) {
      kycs.forEach((kyc) => {
        const model = {};
        model["name"] = null;
        model["id"] = kyc.id;
        model["datatype"] = kyc.datatype.name;
        model["placeholder"] = kyc.name;
        model["hasError"] = null;
        model["error"] = "";
        model.type = type;

        this.formKycs.push(model);
      });
    },
    fetchLandlord(id) {
      const url = `user/landlord-requests/${id}`;
      this.apiGet(url).then((res) => {
        const { landlord } = res.data.data;
        this.landlord = landlord;
      });
    },
    fetchApartment(slugOrId) {
      const url = `apartments/${slugOrId}`;
      this.apiGet(url).then((res) => {
        const { apartment } = res.data.data;
        this.apartment = apartment;
        this.fetchKycs(apartment.id);
        this.addFeatureImage(this.apartment.featured_image);
        this.mergeGallries(apartment.galleries);
      });
    },
  },
};
</script>
