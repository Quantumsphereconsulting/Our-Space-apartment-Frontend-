export default [
  {
    path: "/settings/profile-update",
    name: "ProfileUpdate",
    component: () =>
      import(
        /* webpackChunkName: "Settings" */ "@/views/Settings/ProfileUpdate"
      ),
    meta: {
      title: "Profile Update - Our Space",
      authRequired: true,
    },
  },
  {
    path: "/settings/receipts",
    name: "Receipts",
    component: () =>
      import(/* webpackChunkName: "Settings" */ "@/views/Settings/Receipts"),
    meta: {
      title: "Receipts - Our Space",
      authRequired: true,
    },
  },
  {
    path: "/settings/security",
    name: "Security",
    component: () =>
      import(/* webpackChunkName: "Settings" */ "@/views/Settings/Security"),
    meta: {
      title: "Security - Our Space",
      authRequired: true,
    },
  },
];
