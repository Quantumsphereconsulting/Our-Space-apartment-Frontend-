<template>
  <div id="login-form-mobile" class="d-lg-none">
    <form @submit.prevent="submit">
      <b-form-group>
        <div class="login-email-wrapper">
          <b-form-input
            class="login-email-mobile"
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
            class="valid-email-mobile"
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
            class="login-password-mobile"
            :class="{ 'form-error': $v.password.$error || invalidLogin }"
            :type="type"
            v-model="password"
            placeholder="Password"
            @blur="resetInvalidLogin"
            @input="resetInvalidLogin"
          />
          <div class="toggle-view-mobile" @click="toggleView">
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
        <b-button type="submit" class="primary-btn login-btn-mobile">
          Login
        </b-button>
        <div class="pm-awesome-divider-div">
          <div class="pm-awesome-divider" data-label="or"></div>
        </div>
        <div
          class="mt-3 d-flex flex-column"
          style="width: 100%; margin: 0 auto"
        >
          <b-button
            type="button"
            class="google-outline-btn login-btn-mobile mb-3"
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

      <p class="login-create-mobile">
        New here?
        <span
          class="login-create-action-mobile"
          @click="$router.push('/auth/signup')"
        >
          Create an account
        </span>
      </p>
      <p
        class="login-forgot-mobile"
        @click="$router.push('/auth/forgot-password')"
      >
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
          padding: clamp(2em, 5vw, 5em);
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
        this.apiPost(this.ROUTES.login, data).then((res) => {
          const { success, data, message } = res.data;
          const { user, token } = data;
          if (success) {
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
.valid-email-mobile {
  position: absolute;
  color: #24cb99;
  opacity: 0.8;
  left: 92%;
  bottom: 30%;
  transition: 0.5s ease;
}
.login-email-mobile {
  background-color: #f5f4ff;
  border-color: #f5f4ff;
  height: 3.125em;
  margin: 0 auto;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.login-password-mobile {
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
.toggle-view-mobile {
  position: absolute;
  left: 92%;
  font-size: 1.1em;
  bottom: 22%;
  opacity: 0.5;
  transition: 0.5s ease;
  cursor: pointer;
}
.login-btn-mobile {
  height: 3.125em;
  width: 100%;
}
.login-create-mobile {
  color: #3c4043;
  margin-top: 2em;
}
.login-create-action-mobile {
  color: #c221cf;
  transition: 0.5s ease;
}
.login-create-action-mobile:hover {
  color: #84168d;
  cursor: pointer;
}
.login-forgot-mobile {
  color: #c221cf;
  margin-top: 4em;
  transition: 0.5s ease;
}
.login-forgot-mobile:hover {
  cursor: pointer;
  opacity: 0.8;
}
.invalid-prompt {
  height: 1em;
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
  margin-top: 5px;
  width: 100%;
}
.pm-awesome-divider {
  height: 1px;
  width: 100%;
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
