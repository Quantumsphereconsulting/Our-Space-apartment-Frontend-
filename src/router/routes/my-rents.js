import store from "@/store/index.js";

export default [
  {
    path: "/my-rents/tenancy",
    name: "Tenancy",
    component: () =>
      import(/* webpackChunkName: "MyRents" */ "@/views/MyRents/Tenancy"),
    meta: {
      title: "Tenancy - Our Space",
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
    path: "/my-rents/bookings",
    name: "Bookings",
    component: () =>
      import(/* webpackChunkName: "MyRents" */ "@/views/MyRents/Bookings"),
    meta: {
      title: "Bookings - Our Space",
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
