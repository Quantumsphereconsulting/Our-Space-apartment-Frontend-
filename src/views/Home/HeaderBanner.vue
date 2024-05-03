<template>
  <div>
    <div id="landing-banner">
      <b-row class="justify-content-lg-center align-items-lg-center">
        <b-col lg="6">
          <p class="landing-banner-title">Go where you feel at home</p>
          <p class="landing-banner-subtitle">
            Creative, homey and fully serviced. Get the very best of short-stay
            spaces. Welcome to the future of hospitality.
          </p>
        </b-col>
        <b-col class="d-none d-lg-block" lg="6">
          <b-img fluid :src="require('@/assets/images/header-picture.jpg')" />
        </b-col>
      </b-row>
    </div>
    <div class="search">
      <b-card no-body class="pt-4" style="border: none">
        <div style="box-sizing: border-box; border-radius: 5px">
          <div class="google-auto-complete-container">
            <vue-google-autocomplete
              ref="address"
              id="map"
              classname="google-auto-complete"
              placeholder="Where are you going?"
              v-on:placechanged="getAddressData"
              types="(regions)"
              country="ng"
            >
            </vue-google-autocomplete>

            <div class="icon">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="50" height="50" rx="10" fill="#C221CF" />
                <path
                  d="M28.5 27H27.71L27.43 26.73C28.41 25.59 29 24.11 29 22.5C29 18.91 26.09 16 22.5 16C18.91 16 16 18.91 16 22.5C16 26.09 18.91 29 22.5 29C24.11 29 25.59 28.41 26.73 27.43L27 27.71V28.5L32 33.49L33.49 32L28.5 27ZM22.5 27C20.01 27 18 24.99 18 22.5C18 20.01 20.01 18 22.5 18C24.99 18 27 20.01 27 22.5C27 24.99 24.99 27 22.5 27Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "HeaderBanner",
  components: { VueGoogleAutocomplete },
  data: function () {
    return {
      address: "",
      place: "",
    };
  },

  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus();
  },

  methods: {
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData: function (addressData, placeResultData) {
      this.address = addressData;
      this.place = placeResultData;
      const state = placeResultData.address_components.find(
        (value) => value.types[0] === "administrative_area_level_1"
      );
      // console.log(state);
      this.$router.push(
        `/apartments?city=${addressData.locality}&state=${state.long_name}`
      );
    },
  },
};
</script>
<style>
/* On screens that are 992px wide or less, go from four columns to two columns */
@media screen and (max-width: 1920px) {
  .search {
    max-width: 500px;
    width: 100%;
    margin-top: -6.5em;
  }
  .google-auto-complete {
    width: 500px;
    height: 72px;
    font-size: 24px;
  }
  .icon {
    padding-top: 10px;
    padding-right: 10px;
  }
  .icon svg {
    width: 50px;
    height: 50px;
  }
  .pac-item {
    font-size: 18px;
  }
  .pac-item-query {
    font-size: 18px;
  }
}

/* On screens that are 600px wide or less, make the columns stack on top of each other instead of next to each other */
@media screen and (max-width: 1080px) {
  .search {
    max-width: 400px;
    width: 100%;
    margin-top: -5.5em;
  }
  .google-auto-complete {
    width: 400px;
    height: 60px;
    font-size: 20px;
  }
  .icon svg {
    width: 40px;
    height: 40px;
  }
  .pac-item {
    font-size: 18px;
  }
  .pac-item-query {
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .search {
    margin-top: 0.5em;
  }
  .pac-item {
    font-size: 16px;
  }
  .pac-item-query {
    font-size: 16px;
  }
}

@media screen and (max-width: 600px) {
  .search {
    max-width: 100%;
    width: 100%;
  }
  .google-auto-complete {
    width: 100%;
    height: 50px;
    font-size: 16px;
  }
  .icon svg {
    width: 30px;
    height: 30px;
  }
  .pac-item {
    font-size: 14px;
  }
  .pac-item-query {
    font-size: 14px;
  }
}

.pac-container {
  background-color: #fff;
  position: absolute !important;
  z-index: 1000;
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
  /* background-color: #c221cf; */
  width: 37px;
  height: 37px;
  background-image: url("../../assets/images/maplog.png");
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
}
.pac-item-query {
  border: none;
  color: #3c4043;
  font-family: Circular Std;
  font-style: normal;
  font-weight: normal;
}
.icon {
  position: absolute;
  right: 0;
  top: 0;
}
.google-auto-complete-container {
  position: relative;
}

.google-auto-complete {
  border: 0.5px solid #3c4043 !important;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 5px;
  color: #3c4043;
}
.google-auto-complete:focus {
  outline: none;
}
#landing-banner {
  margin-top: 3em;
}
.landing-banner-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3.8em;
  color: #3c4043;
  line-height: 1em;
}
.landing-banner-subtitle {
  margin-top: 1em;
  font-size: 1.375em;
  color: #3c4043;
}

.search-button {
  margin-top: 0.5em;
  margin-left: 0.5em;
  border-radius: 8px;
  background-color: #c221cf;
  border-color: #c221cf;
}
.search-button:hover {
  background-color: #84168d;
  border-color: #84168d;
}
</style>
