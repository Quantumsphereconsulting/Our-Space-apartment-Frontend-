<template>
  <div>
    <b-container id="forgot-password" class="d-none d-lg-block">
      <p id="forgot-password-title">Forgot Password</p>
      <p id="forgot-password-subtitle">
        Want to retrieve your password? Please enter your email address
      </p>
      <ForgotPasswordForm />
    </b-container>
    <!--mobile view-->
    <b-container id="forgot-password-mobile" class="d-lg-none">
      <p id="forgot-password-title-mobile">Forgot Password</p>
      <p id="forgot-password-subtitle-mobile">
        Want to retrieve your password? Please enter your email address
      </p>
      <ForgotPasswordFormMobile />
    </b-container>
  </div>
</template>

<script>
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ForgotPasswordFormMobile from "./components/ForgotPasswordFormMobile";
import store from "@/store";
export default {
  beforeRouteEnter(to, from, next) {
    // if logged in, redirect to homepage
    if (store.getters["auth/getIsLoggedIn"]) {
      next({ name: "Home" });
    } else {
      return next();
    }
  },
  components: {
    ForgotPasswordForm,
    ForgotPasswordFormMobile,
  },
};
</script>

<style>
#forgot-password {
  margin-top: 6em;
  text-align: center;
}
#forgot-password-mobile {
  margin-top: 3em;
  text-align: center;
}
#forgot-password-title {
  color: #3c4043;
  font-size: 3em;
}
#forgot-password-title-mobile {
  color: #3c4043;
  font-size: 2em;
}
#forgot-password-subtitle {
  color: #3c4043;
  opacity: 0.8;
  margin-bottom: 2em;
}
#forgot-password-subtitle-mobile {
  color: #3c4043;
  opacity: 0.8;
  font-size: 0.9em;
  margin-bottom: 2em;
}
</style>
