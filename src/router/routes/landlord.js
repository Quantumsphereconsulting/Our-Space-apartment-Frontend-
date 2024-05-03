import store from "@/store";

export default [
  {
    path: "/landlord",
    name: "Landlord",
    component: () =>
      import(/* webpackChunkName: "Landlord" */ "@/views/Landlord/Index.vue"),
    meta: {
      title: "Landlord - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-apartments",
    name: "LandlordApartments",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordApartments/Index.vue"
      ),
    meta: {
      title: "Landlord Apartments - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-apartments/edit-apartment/:slug",
    name: "EditLandlordApartments",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordApartments/EditApartment/Index.vue"
      ),
    meta: {
      title: "Edit Apartment - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-apartments/new-apartment",
    name: "NewLandlordApartments",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordApartments/NewApartment/Index.vue"
      ),
    meta: {
      title: "New Apartment - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-apartments/preview-apartment/:slug",
    name: "PreviewLandlordApartments",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordApartments/PreviewApartment/Index.vue"
      ),
    meta: {
      title: "Preview Apartment - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-tenants",
    name: "LandlordTenants",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordTenants/Index.vue"
      ),
    meta: {
      title: "Tenants - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-tenants/view-tenant/:id",
    name: "ViewLandlordTenant",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordTenants/ViewTenant/Index.vue"
      ),
    meta: {
      title: "View Tenant - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-wallet",
    name: "LandlordWallet",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordWallet/Index.vue"
      ),
    meta: {
      title: "Wallet - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-wallet/transaction-history",
    name: "TransactionHistory",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordWallet/TransactionHistory/Index.vue"
      ),
    meta: {
      title: "Transaction History - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-settings/profile-details",
    name: "LandlordProfileDetails",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordSettings/ProfileDetails/Index.vue"
      ),
    meta: {
      title: "Profile Details Settings - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-settings/security",
    name: "LandlordSecurity",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordSettings/Security/Index.vue"
      ),
    meta: {
      title: "Security Settings - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-settings/bank-accounts",
    name: "LandlordBankAccounts",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordSettings/BankAccounts/Index"
      ),
    meta: {
      title: "Bank Accounts - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
  {
    path: "/landlord-settings/notifications",
    name: "LandlordNotifications",
    component: () =>
      import(
        /* webpackChunkName: "Landlord" */ "@/views/LandlordSettings/Notifications/Index"
      ),
    meta: {
      title: "Notifications - Our Space",
      layout: "AppLandlordLayout",
      authRequired: true,
    },
    beforeEnter(to, from, next) {
      if (store.getters["auth/getType"] === "landlord") {
        next();
      } else {
        next({ name: "LandlordKYC" });
      }
    },
  },
];
