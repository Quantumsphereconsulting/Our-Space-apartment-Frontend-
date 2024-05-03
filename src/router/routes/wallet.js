import store from "@/store/index.js";

export default [
  {
    path: "/wallet",
    name: "Wallet",
    component: () =>
      import(/* webpackChunkName: "Wallet" */ "@/views/Wallet/Index"),
    meta: {
      title: "Wallet - Our Space",
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
    path: "/wallet/transaction-history",
    name: "UserTransactionHistory",
    component: () =>
      import(
        /* webpackChunkName: "Wallet" */ "@/views/Wallet/TransactionHistory/Index.vue"
      ),
    meta: {
      title: "Wallet - Our Space",
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
