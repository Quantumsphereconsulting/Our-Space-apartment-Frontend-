// import store from "../../store/index.js";

export default [
  {
    path: "/how-it-works/user",
    name: "HowItWorksUser",
    component: () =>
      import(
        /* webpackChunkName: "HowItWorks" */ "@/views/HowItWorks/User/Index"
      ),
    meta: {
      title: "How It Works - Our Space",
      authRequired: false,
    },
  },
  {
    path: "/how-it-works/landlord",
    name: "HowItWorksLandLord",
    component: () =>
      import(
        /* webpackChunkName: "HowItWorks" */ "@/views/HowItWorks/Landlord/Index"
      ),
    meta: {
      title: "How It Works - Our Space",
      authRequired: false,
    },
  },
];
