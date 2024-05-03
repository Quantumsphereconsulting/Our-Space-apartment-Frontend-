export default [
  {
    path: "/notifications",
    name: "Notifications",
    component: () =>
      import(
        /* webpackChunkName: "Notifications" */ "@/views/Notifications/Index"
      ),
    meta: {
      title: "Notifications - Our Space",
      authRequired: true,
    },
  },
];
