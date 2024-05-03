<template>
  <b-container id="signup">
    <p id="signup-title">One More Step!</p>
    <p id="signup-subtitle">
      Fill in your details to complete your registration as a landlord
    </p>
    <LandlordKYCForm />
    <LandlordKYCFormMobile />
  </b-container>
</template>

<script>
import LandlordKYCForm from "./components/LandlordKYCForm";
import LandlordKYCFormMobile from "./components/LandlordKYCFormMobile";
export default {
  components: {
    LandlordKYCForm,
    LandlordKYCFormMobile,
  },
};
</script>

<style>
#signup {
  margin-top: 6em;
  text-align: center;
}
#signup-title {
  color: #3c4043;
  font-size: 3em;
}
#signup-subtitle {
  color: #3c4043;
  opacity: 0.8;
  margin-bottom: 2em;
}
</style>
