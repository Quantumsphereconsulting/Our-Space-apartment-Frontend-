<template>
  <div>
    <b-container id="signup" class="d-none d-lg-block">
      <p id="signup-title">Create Account</p>
      <p id="signup-subtitle">
        Input your details below to create a free account on Our Space
      </p>
      <SignUpForm />
    </b-container>
    <!--mobile view-->
    <b-container id="signup-mobile" class="d-lg-none">
      <p id="signup-title-mobile">Create Account</p>
      <p id="signup-subtitle-mobile">
        Input your details below to create a free account on Our Space
      </p>
      <SignUpFormMobile />
    </b-container>
  </div>
</template>

<script>
import SignUpForm from "./components/SignUpForm";
import SignUpFormMobile from "./components/SignUpFormMobile";
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
    SignUpForm,
    SignUpFormMobile,
  },
};
</script>

<style>
#signup {
  margin-top: 6em;
  text-align: center;
}
#signup-mobile {
  margin-top: 3em;
  text-align: center;
}
#signup-title {
  color: #3c4043;
  font-size: 3em;
}
#signup-title-mobile {
  color: #3c4043;
  font-size: 2em;
}
#signup-subtitle {
  color: #3c4043;
  opacity: 0.8;
  margin-bottom: 2em;
}
#signup-subtitle-mobile {
  color: #3c4043;
  opacity: 0.8;
  font-size: 0.9em;
  margin-bottom: 2em;
}
</style>
