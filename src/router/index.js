import VueRouteMiddleware from "vue-route-middleware";
import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import apartment from "./routes/apartment";
import blog from "./routes/blog";
import about from "./routes/about";
import auth from "./routes/auth";
import privacyTerms from "./routes/privacy-terms";
import myRents from "./routes/my-rents";
import howItWorks from "./routes/how-it-works";
import history from "./routes/history";
import settings from "./routes/settings";
import wallet from "./routes/wallet";
import landlord from "./routes/landlord";
import notification from "./routes/notification";
import listYourApartment from "./routes/list-your-apartment";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/*webpackChunkName: 'Home'*/ "../views/Home/Index.vue"),
    meta: {
      title: "Home - Our Space",
    },
  },
  ...apartment,
  ...blog,
  ...about,
  ...auth,
  ...privacyTerms,
  ...myRents,
  ...history,
  ...settings,
  ...wallet,
  ...landlord,
  ...howItWorks,
  ...notification,
  ...listYourApartment,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const authRequired = to.matched.some((route) => route.meta.authRequired);
  if (!authRequired) return next();
  if (store.getters["auth/getIsLoggedIn"]) {
    next();
  } else {
    next({ name: "Login" });
  }
});

router.beforeEach(VueRouteMiddleware());

export default router;
