<template>
  <b-container id="reset-password">
    <p id="reset-password-title">Reset Password</p>
    <p id="reset-password-subtitle">Input a new secure password below</p>
    <ResetPasswordForm />
    <ResetPasswordFormMobile />
  </b-container>
</template>

<script>
import ResetPasswordForm from "./components/ResetPasswordForm";
import ResetPasswordFormMobile from "./components/ResetPasswordFormMobile";
import store from "@/store";
export default {
  beforeRouteEnter(to, from, next) {
    if (store.getters["auth/getIsLoggedIn"]) {
      next({ name: "Home" });
    } else {
      return next();
    }
  },
  components: {
    ResetPasswordForm,
    ResetPasswordFormMobile,
  },
};
</script>

<style>
#reset-password {
  margin-top: 6em;
  text-align: center;
}
#reset-password-title {
  color: #3c4043;
  font-size: 3em;
}
#reset-password-subtitle {
  color: #3c4043;
  opacity: 0.8;
  margin-bottom: 2em;
}
</style>
