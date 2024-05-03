<template>
  <div id="forgot-password-form" class="d-none d-lg-block">
    <form @submit.prevent="submit" novalidate>
      <b-form-group>
        <div class="email-wrapper">
          <b-form-input
            class="forgot-password-email"
            :class="{ 'form-error': $v.email.$error }"
            type="email"
            v-model.trim="$v.email.$model"
            placeholder="Email Address"
            @input="validateEmail"
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
      <b-button
        v-if="!submitting"
        type="submit"
        class="primary-btn forgot-password-btn"
      >
        Request Password Reset
      </b-button>
      <scale-loader v-else :loading="true" :color="'#c221cf'" />
    </form>
    <b-modal
      ref="reset-success"
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
        <p
          style="font-size: 1.5em; margin-top: 2em; text-transform: capitalize"
        >
          {{ message }}
        </p>
        <b-button
          class="primary-btn mt-3"
          style="width: 100%; height: 3.125em"
          @click="
            $refs['reset-success'].hide();
            $router.push({ name: 'Login' });
          "
        >
          Go Back
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
  },
  data() {
    return {
      validEmail: false,
      email: null,
      submitted: false,
      message: "",
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
        let cbUrl = `${this.callbackBaseUrl}/auth/reset-password`;
        data.append("callbackUrl", cbUrl);
        this.apiPost(this.ROUTES.forgotPassword, data)
          .then((res) => {
            const { success, message } = res.data;
            if (success) {
              this.message = message;
              this.email = "";
              this.validEmail = false;
              this.$v.$reset();
              this.$refs["reset-success"].show();
            }
          })
          .finally(() => (this.submitted = false));
      }
    },
    validateEmail() {
      this.validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        this.email
      );
    },
  },
};
</script>

<style>
.form-error {
  border-color: red;
}
.email-wrapper {
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
.forgot-password-email {
  height: 3.125em;
  width: 30.1875em;
  margin: 0 auto;
  background-color: #f5f4ff;
  border-color: #f5f4ff;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.forgot-password-btn {
  height: 3.125em;
  width: 30.1875em;
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
