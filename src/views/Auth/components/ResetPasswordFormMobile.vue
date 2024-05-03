<template>
  <div id="reset-password-form-mobile" class="d-lg-none">
    <form @submit.prevent="submit" novalidate>
      <b-form-group>
        <div style="position: relative">
          <b-form-input
            autocomplete="new-password"
            class="reset-password-password-mobile"
            :type="passwordType"
            :class="{ 'form-error': $v.password.$error }"
            v-model.trim="$v.password.$model"
            placeholder="Enter New Password"
          />
          <div
            style="
              position: absolute;
              left: 90%;
              font-size: 1.1em;
              bottom: 22%;
              opacity: 0.5;
              transition: 0.5s ease;
              cursor: pointer;
            "
            @click="toggleView('password')"
          >
            <fa-icon
              v-if="passwordType === 'password'"
              :icon="['far', 'eye']"
            />
            <fa-icon v-else :icon="['far', 'eye-slash']" />
          </div>
        </div>
        <div class="invalid-prompt" v-if="submitted && !$v.password.required">
          <p class="invalid-text">Your new password is required</p>
        </div>
        <div class="invalid-prompt" v-if="submitted && !$v.password.minLength">
          <p class="invalid-text">
            Your new password must have at least 8 characters
          </p>
        </div>
      </b-form-group>
      <b-form-group>
        <div style="position: relative">
          <b-form-input
            class="reset-password-password-repeat-mobile"
            :type="confirmPasswordType"
            v-model.trim="$v.confirmPassword.$model"
            placeholder="Repeat Password"
          />
          <div
            style="
              position: absolute;
              left: 90%;
              font-size: 1.1em;
              bottom: 22%;
              opacity: 0.5;
              transition: 0.5s ease;
              cursor: pointer;
            "
            @click="toggleView('confirmPassword')"
          >
            <fa-icon
              v-if="confirmPasswordType === 'password'"
              :icon="['far', 'eye']"
            />
            <fa-icon v-else :icon="['far', 'eye-slash']" />
          </div>
        </div>
        <div
          class="invalid-prompt"
          v-if="submitted && !$v.confirmPassword.sameAsPassword"
        >
          <p class="invalid-text">Your new password must be identical</p>
        </div>
      </b-form-group>
      <b-button
        v-if="!submitting"
        class="primary-btn reset-password-btn-mobile mt-4"
        type="submit"
      >
        Reset Password
      </b-button>
      <scale-loader v-else :loading="true" :color="'#c221cf'" />
    </form>
  </div>
</template>

<script>
import { minLength, required, sameAs } from "vuelidate/lib/validators";
export default {
  validations: {
    password: { required, minLength: minLength(8) },
    confirmPassword: { sameAsPassword: sameAs("password") },
  },
  mounted() {
    this.fetchDetails();
  },
  data() {
    return {
      password: null,
      passwordType: "password",
      confirmPassword: null,
      confirmPasswordType: "password",
      submitted: false,
      token: null,
      email: null,
    };
  },
  methods: {
    fetchDetails() {
      let queryParams = this.$route.query;
      this.token = queryParams.token;
      this.email = queryParams.email;
      if (!this.token || !this.email) {
        this.$notify({
          title: "Invalid Reset Password Link",
          text: "Please use the reset password link sent to your email address",
          type: "error",
        });
      }
    },
    toggleView(password) {
      if (password === "password") {
        this.passwordType === "password"
          ? (this.passwordType = "text")
          : (this.passwordType = "password");
      } else {
        this.confirmPasswordType === "password"
          ? (this.confirmPasswordType = "text")
          : (this.confirmPasswordType = "password");
      }
    },
    submit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        const data = new FormData();
        data.append("token", this.token);
        data.append("email", this.email);
        data.append("password", this.password);
        data.append("password_confirmation", this.confirmPassword);
        let cbUrl = `${this.callbackBaseUrl}/auth/login`;
        data.append("callbackUrl", cbUrl);
        this.apiPost(this.ROUTES.resetPassword, data).then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.$router.push({ name: "Login" }).then(() => {
              this.apiSuccess(
                message,
                "Please login with your new credentials"
              );
            });
          }
        });
      }
    },
  },
};
</script>

<style>
.form-error {
  border-color: red;
}
.reset-password-password-mobile {
  height: 3.125em;
  margin: 0 auto;
  background-color: #f5f4ff;
  border-color: #f5f4ff;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.reset-password-password-repeat-mobile {
  height: 3.125em;
  margin: 0 auto;
  background-color: #f5f4ff;
  border-color: #f5f4ff;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.reset-password-btn-mobile {
  height: 3.125em;
  width: 100%;
  margin: 0 auto;
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
</style>
