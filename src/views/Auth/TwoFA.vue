<template>
  <b-container id="reset-password">
    <p id="reset-password-title">2 Factor Authentication</p>
    <div style="max-width: 30.1875em; margin: 0 auto">
      <p id="reset-password-subtitle">
        Your account has 2FA active. Please check your email or phone for your
        verification code to continue.
      </p>
    </div>
    <TwoFAForm />
    <TwoFAFormMobile />
  </b-container>
</template>

<script>
import TwoFAForm from "./components/TwoFAForm";
import TwoFAFormMobile from "./components/TwoFAFormMobile";
export default {
  components: {
    TwoFAForm,
    TwoFAFormMobile,
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
  text-align: center;
}
</style>
