import store from "@/store/index.js";

export default [
  {
    path: "/history/favorite-property",
    name: "FavoriteProperty",
    component: () =>
      import(
        /* webpackChunkName: "History" */ "@/views/History/FavoriteProperty"
      ),
    meta: {
      title: "Favorite Property - Our Space",
      authRequired: true,
      middleware: (to, from, next) => {
        // let auth = fakeUser.isLogged();
        if (
          store.state.auth.isLoggedIn &&
          !store.state.auth.isGoogleAuth &&
          !store.state.auth.emailVerifiedAt
        ) {
          next({ name: "Home" });
        }
      },
    },
  },
  {
    path: "/history/recently-viewed",
    name: "RecentlyViewed",
    component: () =>
      import(
        /* webpackChunkName: "History" */ "@/views/History/RecentlyViewed"
      ),
    meta: {
      title: "Recently Viewed - Our Space",
      authRequired: true,
      middleware: (to, from, next) => {
        // let auth = fakeUser.isLogged();
        if (
          store.state.auth.isLoggedIn &&
          !store.state.auth.isGoogleAuth &&
          !store.state.auth.emailVerifiedAt
        ) {
          next({ name: "Home" });
        }
      },
    },
  },
];
