export default [
  {
    path: "/list-your-apartment",
    name: "ListYourApartment",
    component: () =>
      import(
        /* webpackChunkName: "ListYourApartment" */ "@/views/ListYourApartment/Index"
      ),
    meta: {
      title: "List Your Apartment - Our Space",
    },
  },
];
