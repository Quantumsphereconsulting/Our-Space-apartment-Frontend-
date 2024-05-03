<template>
  <div id="forgot-password-form" class="d-none d-lg-block">
    <form @submit.prevent="submit" novalidate>
      <b-form-group>
        <b-form-input
          class="forgot-password-email"
          v-model.trim="$v.code.$model"
          placeholder="Verification Code"
        />
        <div class="invalid-prompt" v-if="submitted && !$v.code.required">
          <p class="invalid-text">The verification code is required</p>
        </div>
      </b-form-group>
      <b-button
        v-if="!submitting"
        type="submit"
        class="primary-btn forgot-password-btn"
      >
        Verify and Continue
      </b-button>
      <scale-loader v-else :loading="true" :color="'#c221cf'" />
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
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    code: { required },
  },
  data() {
    return {
      code: null,
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
        data.append("code", this.code);
        this.apiPost(this.ROUTES.verify2fa, data)
          .then((res) => {
            const { success, data, message } = res.data;
            const { user, token } = data;
            if (success) {
              const { type, first_name } = user;
              this.$store.dispatch("auth/initSession", { user, token });
              if (type === "tenant") {
                this.$refs["login-success"].show();
              } else {
                this.$router.push({ name: "Landlord" }).then(() => {
                  this.apiSuccess(message, `Welcome back, ${first_name}`);
                });
              }
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
