export default [
  {
    path: "/apartments",
    name: "Apartments",
    component: () =>
      import(
        /* webpackChunkName: "Apartments" */ "@/views/Apartments/Index.vue"
      ),
    meta: {
      title: "Apartments - Our Space",
    },
  },
  {
    path: "/apartments/:id",
    name: "ViewApartment",
    component: () =>
      import(
        /* webpackChunkName: "Apartments" */ "@/views/Apartments/view-apartment/Index.vue"
      ),
    meta: {
      title: "View Apartment - Our Space",
    },
  },
  {
    path: "/featured-apartments",
    name: "FeaturedApartments",
    component: () =>
      import(
        /* webpackChunkName: "Apartments" */ "@/views/Apartments/FeaturedApartments.vue"
      ),
    meta: {
      title: "Featured Apartments - Our Space",
    },
  },
];
