export default [
  {
    path: "/about-us",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "About" */ "@/views/About/Index.vue"),
    meta: {
      title: "About Us - Our Space",
    },
  },
];
