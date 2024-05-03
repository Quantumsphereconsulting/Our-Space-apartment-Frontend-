export default [
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: () =>
      import(/* webpackChunkName: "Privacy" */ "@/views/PrivacyTerms/Privacy"),
    meta: {
      title: "Privacy Policy - Our Space",
    },
  },
  {
    path: "/terms",
    name: "Terms",
    component: () =>
      import(/* webpackChunkName: "Privacy" */ "@/views/PrivacyTerms/Terms"),
    meta: {
      title: "Terms - Our Space",
    },
  },
];
