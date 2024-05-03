<template>
  <div id="apartments">
    <b-container>
      <p
        v-if="searchResult.city"
        style="
          font-family: Circular Std;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          font-feature-settings: 'liga' off;
          padding-top: 1.6rem;
          color: #c221cf;
        "
      >
        search results: {{ searchResult.city }}, {{ searchResult.state }}
      </p>
      <Controls
        @filterByPriceRange="filterByPriceRange"
        @filterByRatings="filterByRatings"
        @filterByCategories="filterByCategories"
        @filterCategory="filterCategory($event)"
        @filterAll="filterAll"
        @toggleView="toggleView"
      />
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <div v-else>
        <div v-if="apartments.data && apartments.data.length > 0">
          <div>
            <div v-if="!mapView">
              <hooper
                :auto-play="true"
                :transition="500"
                :play-speed="5000"
                v-show="featuredApartments.length > 0"
              >
                <slide
                  v-for="(featuredApartment, index) in featuredApartments"
                  :key="index"
                >
                  <Featured :apartment="featuredApartment" />
                </slide>
              </hooper>
              <ApartmentList
                @changepage="changepage($event)"
                :apartments="apartments"
              />
            </div>
            <div v-else>
              <GmapMap
                :center="mapCenter"
                :zoom="mapZoom"
                map-type-id="roadmap"
                style="
                  width: 100%;
                  height: 50em;
                  margin-bottom: 4em;
                  margin-top: 2em;
                "
                :options="{
                  mapTypeControl: false,
                  streetViewControl: false,
                }"
              >
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :clickable="true"
                  :draggable="false"
                  :icon="require('@/assets/icons/marker.png')"
                  @click="test(m, index)"
                  :label="m.label"
                />
                <gmap-info-window
                  :options="{
                    maxWidth: 300,
                    padding: 0,
                    pixelOffset: { width: 0, height: -40 },
                    shouldFocus: true,
                  }"
                  :position="infoWindow.position"
                  :opened="infoWindow.open"
                  @closeclick="infoWindow.open = false"
                >
                  <InfoWindow :apartment="infoWindow.apartment" />
                </gmap-info-window>
              </GmapMap>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center pt-5" v-else>
          <div>
            <p
              style="font-size: 1.2rem; padding-top: 0.6rem"
              class="text-center"
            >
              There are no active apartments
            </p>
            <div class="d-flex justify-content-center"></div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Controls from "./components/Controls";
import Featured from "./Featured";
import ApartmentList from "./ApartmentList";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
import InfoWindow from "./components/InfoWindow";
export default {
  components: {
    Controls,
    Featured,
    ApartmentList,
    Hooper,
    Slide,
    InfoWindow,
  },
  mounted() {
    this.fetchApartments(1);
  },
  data() {
    return {
      apartments: {},
      featuredApartment: {},
      featuredApartments: [],
      intervalid1: "",
      searchResult: {},
      count: 1,
      mapView: false,
      markers: [],
      mapCenter: { lat: 6.5227, lng: 3.6218 },
      mapZoom: 10,
      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
        template: "",
        apartment: null,
      },
    };
  },
  methods: {
    filterAll() {
      this.searchResult = {};
      this.fetchApartments(1);
    },
    changepage(page) {
      this.fetchApartments(page);
    },
    filterCategory(category) {
      this.fetchApartmentsByCategory(category.id);
    },
    filterByCategories(category) {
      this.fetchApartmentsByCategories(category);
    },
    filterByRatings(ratings) {
      this.fetchApartmentsByRating(ratings);
    },
    filterByPriceRange(ratings) {
      this.fetchApartmentsByPriceRange(ratings);
    },
    fetchApartmentsByPriceRange(priceRange) {
      const url = `apartments?is_featured=1&per_page=24&price_range=${[
        priceRange.from,
        priceRange.to,
      ]}`;
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments;
        this.markers = [];
        apartments.data.forEach((apartment) => {
          this.markers.push({
            position: {
              lat: parseFloat(apartment.location.latitude),
              lng: parseFloat(apartment.location.longitude),
            },
            apartment,
            label: {
              text: this.abbreviateNumber(parseInt(apartment.price)),
              className: "marker-label",
            },
          });
        });
        this.featuredApartments = apartments.data.filter(
          (apartment) => apartment.is_featured === true
        );
      });
    },
    fetchApartmentsByRating(ratings) {
      const url = `apartments?is_featured=1&per_page=24&ratings=${ratings}`;
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments;
        this.markers = [];
        apartments.data.forEach((apartment) => {
          this.markers.push({
            position: {
              lat: parseFloat(apartment.location.latitude),
              lng: parseFloat(apartment.location.longitude),
            },
            apartment,
            label: {
              text: this.abbreviateNumber(parseInt(apartment.price)),
              className: "marker-label",
            },
          });
        });
        this.featuredApartments = apartments.data.filter(
          (apartment) => apartment.is_featured === true
        );
      });
    },
    fetchApartmentsByCategories(category) {
      const url = `apartments?is_featured=1&per_page=24&categories=${category}`;
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments;
        this.markers = [];
        apartments.data.forEach((apartment) => {
          this.markers.push({
            position: {
              lat: parseFloat(apartment.location.latitude),
              lng: parseFloat(apartment.location.longitude),
            },
            apartment,
            label: {
              text: this.abbreviateNumber(parseInt(apartment.price)),
              className: "marker-label",
            },
          });
        });
        this.featuredApartment = apartments.data.find(
          (apartment) => apartment.is_featured === true
        );
      });
    },
    fetchApartmentsByCategory(category) {
      const url = `apartments?is_featured=1&per_page=24&categories=${category}`;
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments;
        this.markers = [];
        apartments.data.forEach((apartment) => {
          this.markers.push({
            position: {
              lat: parseFloat(apartment.location.latitude),
              lng: parseFloat(apartment.location.longitude),
            },
            apartment,
            label: {
              text: this.abbreviateNumber(parseInt(apartment.price)),
              className: "marker-label",
            },
          });
        });
        this.featuredApartments = apartments.data.filter(
          (apartment) => apartment.is_featured === true
        );
      });
    },
    fetchApartments() {
      const url = `apartments?is_featured=1`;
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments;
        this.markers = [];
        apartments.data.forEach((apartment) => {
          this.markers.push({
            position: {
              lat: parseFloat(apartment.location.latitude),
              lng: parseFloat(apartment.location.longitude),
            },
            apartment,
            label: {
              text: this.abbreviateNumber(parseInt(apartment.price)),
              className: "marker-label",
            },
          });
        });
        this.featuredApartments = apartments.data.filter(
          (apartment) => apartment.is_featured === true
        );
      });
    },
    fetchApartmentsByLocation(page, city, state) {
      const url = `apartments?is_featured=1&per_page=24&search=${
        (city, state)
      }&page=${page}`;
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments;
        this.markers = [];
        apartments.data.forEach((apartment) => {
          this.markers.push({
            position: {
              lat: parseFloat(apartment.location.latitude),
              lng: parseFloat(apartment.location.longitude),
            },
            apartment,
            label: {
              text: this.abbreviateNumber(parseInt(apartment.price)),
              className: "marker-label",
            },
          });
        });
        this.featuredApartments = apartments.data.filter(
          (apartment) => apartment.is_featured === true
        );
      });
    },
    toggleView(mapView) {
      this.mapView = mapView;
    },
    test(marker, index) {
      this.mapCenter = marker.position;
      this.mapZoom = 12;
      this.openInfoWindowTemplate(index);
    },
    openInfoWindowTemplate(index) {
      let marker = this.markers[index];
      this.infoWindow.position = {
        lat: marker.position.lat,
        lng: marker.position.lng,
      };
      this.infoWindow.open = true;
      this.infoWindow.apartment = marker.apartment;
    },
    abbreviateNumber(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
      }
      return num;
    },
  },
};
</script>
<style>
.hooper {
  height: 100% !important;
}
#apartments {
  flex: 1 0 auto;
}
.marker-label {
  margin-top: -10px !important;
  font-family: "Circular Std Book", sans-serif !important;
  font-size: 1em !important;
  color: #ffffff !important;
}
</style>
