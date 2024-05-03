export default [
  {
    path: "/auth/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "@/views/Auth/Login.vue"),
    meta: {
      title: "Login - Our Space",
      layout: "AppAuthLayout",
      isAuth: true,
    },
  },
  {
    path: "/auth/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "@/views/Auth/SignUp.vue"),
    meta: {
      title: "Sign Up - Our Space",
      layout: "AppAuthLayout",
      isAuth: true,
    },
  },
  {
    path: "/auth/landlord-kyc",
    name: "LandlordKYC",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "@/views/Auth/LandlordKYC"),
    meta: {
      title: "Landlord KYC - Our Space",
      layout: "AppAuthLayout",
    },
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "@/views/Auth/ForgotPassword.vue"),
    meta: {
      title: "Forgot Password - Our Space",
      layout: "AppAuthLayout",
      isAuth: true,
    },
  },
  {
    path: "/auth/reset-password",
    name: "ResetPassword",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "@/views/Auth/ResetPassword.vue"),
    meta: {
      title: "Reset Password - Our Space",
      layout: "AppAuthLayout",
      isAuth: true,
    },
  },
  {
    path: "/auth/verify",
    name: "Verify",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "@/views/Auth/Verify.vue"),
    meta: {
      title: "Verify - Our Space",
      layout: "AppAuthLayout",
      isAuth: true,
    },
  },
  {
    path: "/auth/2fa",
    name: "2FA",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "@/views/Auth/TwoFA.vue"),
    meta: {
      title: "2 Factor Authentication - Our Space",
      layout: "AppAuthLayout",
      isAuth: true,
    },
  },
];
