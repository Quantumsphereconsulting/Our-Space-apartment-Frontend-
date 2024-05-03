import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FA_ICONS from "./fa-icons";

import * as VueGoogleMaps from "vue2-google-maps";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import vueAwesomeCountdown from "vue-awesome-countdown";

Vue.use(vueAwesomeCountdown, "vac");

import Header from "./components/Header.vue";
import Footer from "./components/Footer";
import Multiselect from "vue-multiselect";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

import { Vuelidate } from "vuelidate";

import Notifications from "vue-notification";

import("./assets/css/main.css");

import apiService from "@/services/api.service";

import ScaleLoader from "vue-spinner/src/ScaleLoader";
import BeatLoader from "vue-spinner/src/BeatLoader";
import ClipLoader from "vue-spinner/src/ClipLoader";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import GAuth from "vue-google-oauth2";
const GAuthOptions = {
  clientId:
    "50055734665-h1opb2s674h0u3p2vrrrltj7ldv80rbg.apps.googleusercontent.com", // please update api keys
  scope: "profile email",
  prompt: "select_account",
};

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCCNHHUMptUdIGEdklVCwyLd53xTbgcB9M", // please update api keys
    libraries: "places",
  },
});

import truncate from "@/filters/truncate";
import currencyFormat from "@/filters/currency-format";
import fileSizeFormat from "@/filters/file-size-format";

library.add(...FA_ICONS);

Vue.component("Header", Header);
Vue.component("Footer", Footer);
Vue.component("fa-icon", FontAwesomeIcon);
Vue.component("multiselect", Multiselect);
Vue.component("scale-loader", ScaleLoader);
Vue.component("beat-loader", BeatLoader);
Vue.component("clip-loader", ClipLoader);
Vue.component("date-picker", DatePicker);

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VueTelInput);
Vue.use(GAuth, GAuthOptions);

Vue.use(require("vue-moment"));

Vue.mixin(apiService);

Vue.filter("truncate", truncate);
Vue.filter("currencyFormat", currencyFormat);
Vue.filter("fileSizeFormat", fileSizeFormat);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
