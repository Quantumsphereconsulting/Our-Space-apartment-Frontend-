import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "@/store/auth";
import apartment from "@/store/apartment";
import wallet from "@/store/wallet";
import myRent from "@/store/myRent";
import filter from "@/store/filter";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, apartment, wallet, myRent, filter },
  plugins: [
    createPersistedState({
      paths: ["auth", "apartment", "filter"],
    }),
  ],
});
