<template>
  <div id="login-form">
    <form @submit.prevent="submit" novalidate>
      <b-form-group>
        <div class="login-email-wrapper">
          <b-form-input
            class="login-email"
            :class="{ 'form-error': $v.email.$error || invalidLogin }"
            type="email"
            v-model.trim="$v.email.$model"
            placeholder="Email Address"
            @input="validateEmail"
            @blur="resetInvalidLogin"
          />
          <fa-icon
            v-if="validEmail"
            :icon="['fas', 'check']"
            class="valid-email"
          />
        </div>
        <div class="invalid-prompt" v-if="submitted && !$v.email.required">
          <p class="invalid-text">Your email is required</p>
        </div>
        <div class="invalid-prompt" v-if="submitted && !$v.email.email">
          <p class="invalid-text">Your email must be a valid email</p>
        </div>
      </b-form-group>
      <b-form-group>
        <div class="login-password-wrapper">
          <b-form-input
            autocomplete="new-password"
            class="login-password"
            :class="{ 'form-error': $v.password.$error || invalidLogin }"
            :type="type"
            v-model.trim="$v.password.$model"
            placeholder="Password"
            @blur="resetInvalidLogin"
            @input="resetInvalidLogin"
          />
          <div class="toggle-view" @click="toggleView">
            <fa-icon v-if="type === 'password'" :icon="['far', 'eye']" />
            <fa-icon v-else :icon="['far', 'eye-slash']" />
          </div>
        </div>
        <div class="invalid-prompt" v-if="submitted && !$v.password.required">
          <p class="invalid-text">Your password is required</p>
        </div>
        <div class="invalid-prompt" v-if="submitted && invalidLogin">
          <p class="invalid-text">Your email or password is invalid</p>
        </div>
      </b-form-group>
      <scale-loader v-if="submitting" :loading="true" :color="'#c221cf'" />
      <div v-else>
        <b-button type="submit" class="primary-btn login-btn"> Login </b-button>
        <div class="pm-awesome-divider-div">
          <div class="pm-awesome-divider" data-label="or"></div>
        </div>
        <div class="mt-3 d-flex" style="width: 30.1875em; margin: 0 auto">
          <b-button
            type="button"
            class="google-outline-btn login-btn"
            @click="googleSignIn"
          >
            <b-img
              class="mr-2"
              :src="require('@/assets/icons/google-icon-multicolor.svg')"
            />
            Sign in with Google
          </b-button>
        </div>
      </div>

      <p class="login-create">
        New here?
        <span class="login-create-action" @click="$router.push('/auth/signup')">
          Create an account
        </span>
      </p>
      <p class="login-forgot" @click="$router.push('/auth/forgot-password')">
        Forgot password?
      </p>
    </form>
    <b-modal
      ref="login-success"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 4em);
        "
      >
        <b-img
          class="mt-1"
          fluid
          :src="require('@/assets/icons/modal-success.svg')"
        />
        <p style="font-size: 1.5em; margin-top: 2em">
          You have successfully logged into your account
        </p>
        <b-button
          class="primary-btn mt-3"
          style="width: 100%; height: 3.125em"
          @click="
            $refs['login-success'].hide();
            $router.push('/apartments');
          "
        >
          Go To Apartments
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  validations: {
    email: { required, email },
    password: { required },
  },
  data() {
    return {
      validEmail: false,
      email: null,
      password: null,
      type: "password",
      submitted: false,
    };
  },
  methods: {
    submit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        let data = new FormData();
        data.append("email", this.email);
        data.append("password", this.password);
        this.apiPostAuth(this.ROUTES.login, data).then((res) => {
          const { success, data, message } = res.data;
          const { user, token } = data;
          if (success) {
            // after successful login, check if user's 2fa is active and redirect if so
            const { type, first_name, is_2fa_active } = user;
            this.$store.dispatch("auth/initSession", { user, token });
            if (is_2fa_active) {
              this.$router.push({ name: "2FA" });
            } else {
              if (type === "tenant") {
                this.$refs["login-success"].show();
              } else {
                this.$router.push({ name: "Landlord" }).then(() => {
                  this.apiSuccess(message, `Welcome back, ${first_name}`);
                });
              }
            }
          }
        });
      }
    },
    validateEmail() {
      this.validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        this.email
      );
    },
    toggleView() {
      this.type === "password"
        ? (this.type = "text")
        : (this.type = "password");
    },
    async googleSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        if (this.$gAuth.isAuthorized) {
          const authResponse = googleUser.getAuthResponse();
          const { id_token } = authResponse;
          let data = new FormData();
          let cbUrl = `${this.callbackBaseUrl}/auth/reset-password`;
          // send the id_token to the backend to enable google authentication
          data.append("access_token", id_token);
          data.append("callbackUrl", cbUrl);
          this.apiPost(this.ROUTES.loginGoogle, data).then((res) => {
            if (res.data) {
              const { data, success, message } = res.data;
              const { user, token } = data;
              if (success) {
                const { type, first_name } = user;
                this.$store.dispatch("auth/initSession", { user, token });
                this.$store.dispatch("auth/initGoogleSession");
                if (type === "tenant") {
                  this.$refs["login-success"].show();
                } else {
                  this.$router.push({ name: "Landlord" }).then(() => {
                    this.apiSuccess(message, `Welcome back, ${first_name}`);
                  });
                }
              }
            }
          });
        }
      } catch (error) {
        //on fail do something
        // console.warn({ error });
        return null;
      }
    },
    resetInvalidLogin() {
      if (this.invalidLogin) {
        this.invalidLogin = false;
      }
    },
  },
};
</script>

<style scoped>
.form-error {
  border-color: red;
}
.login-email-wrapper {
  position: relative;
}
.valid-email {
  position: absolute;
  color: #24cb99;
  opacity: 0.8;
  left: 69%;
  bottom: 30%;
  transition: 0.5s ease;
}
.login-email {
  width: 30.1875em;
  height: 3.125em;
  margin: 0 auto;
  /* background-color: #f5f4ff;
  border-color: #f5f4ff; */
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.login-password {
  width: 30.1875em;
  height: 3.125em;
  margin: 0 auto;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.login-password-wrapper {
  position: relative;
}
.toggle-view {
  position: absolute;
  left: 69%;
  font-size: 1.1em;
  bottom: 22%;
  opacity: 0.5;
  transition: 0.5s ease;
  cursor: pointer;
}
.login-btn {
  width: 30.1875em;
  height: 3.125em;
  margin: 0 auto;
}
.login-create {
  color: #3c4043;
  margin-top: 1em;
  font-size: 1.125em;
}
.login-create-action {
  color: #c221cf;
  transition: 0.5s ease;
}
.login-create-action:hover {
  color: #84168d;
  cursor: pointer;
}
.login-forgot {
  color: #c221cf;
  margin-top: 5em;
  font-size: 1.125em;
  transition: 0.5s ease;
}
.login-forgot:hover {
  cursor: pointer;
  opacity: 0.8;
}

.invalid-prompt {
  height: 1em;
  width: 30.1875em;
  display: inline-block;
  text-align: left;
  margin: 0;
}
.invalid-text {
  font-size: 0.8em;
  color: #ff0000;
  opacity: 0.6;
}
.pm-awesome-divider-div {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 0 32px;
}
.pm-awesome-divider {
  height: 1px;
  width: 30.1875em;
  border-top: solid thin #f0f0f0;
  margin: 24px 0;
  text-align: center;
}
.pm-awesome-divider:after {
  content: attr(data-label);
  display: inline-block;
  background: #fff;
  padding: 0 32px;
  position: relative;
  top: -10px;
  font-size: 1em;
  color: #9b9b9b;
}
</style>
