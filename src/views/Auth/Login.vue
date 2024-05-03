<template>
  <div>
    <b-container id="login" class="d-none d-lg-block">
      <p id="login-title">Welcome</p>
      <p id="login-subtitle">
        Input your details below to log into your personal account on Our Space
      </p>
      <LoginForm />
    </b-container>
    <!--mobile view-->
    <b-container id="login-mobile" class="d-lg-none">
      <p id="login-title-mobile">Welcome</p>
      <p id="login-subtitle-mobile">
        Input your details below to log into your personal account on Our Space
      </p>
      <LoginFormMobile />
    </b-container>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm";
import LoginFormMobile from "./components/LoginFormMobile";
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
    LoginForm,
    LoginFormMobile,
  },
};
</script>

<style>
#login {
  margin-top: 6em;
  text-align: center;
}
#login-mobile {
  margin-top: 3em;
  text-align: center;
}
#login-title {
  color: #3c4043;
  font-size: 3em;
}
#login-title-mobile {
  color: #3c4043;
  font-size: 2em;
}
#login-subtitle {
  color: #3c4043;
  opacity: 0.8;
  margin-bottom: 2em;
}
#login-subtitle-mobile {
  color: #3c4043;
  opacity: 0.8;
  font-size: 0.9em;
  margin-bottom: 2em;
}
</style>
