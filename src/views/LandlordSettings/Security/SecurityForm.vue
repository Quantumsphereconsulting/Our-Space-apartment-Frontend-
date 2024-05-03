<template>
  <div>
    <div style="border-bottom: 1px solid #c4c4c4">
      <p style="color: #3c4043; font-size: 1.125em">Change Password</p>
    </div>
    <form @submit.prevent="submit">
      <b-row class="mt-5 mb-4">
        <b-col xl="6">
          <b-form-group>
            <div style="position: relative">
              <b-form-input
                class="ls-form-input"
                placeholder="Enter Old Password"
                :class="{ 'form-error': $v.password.$error }"
                :type="passwordType"
                v-model.trim="$v.password.$model"
              />
              <div
                style="
                  position: absolute;
                  left: 90%;
                  font-size: 1.1em;
                  bottom: 20%;
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
            <div
              class="invalid-prompt"
              v-if="submitted && !$v.password.required"
            >
              <p class="invalid-text">Your current password is required</p>
            </div>
            <div
              class="invalid-prompt"
              v-if="submitted && !$v.password.minLength"
            >
              <p class="invalid-text">
                Your password must have at least 8 characters
              </p>
            </div>
          </b-form-group>
          <b-form-group>
            <div style="position: relative">
              <b-form-input
                class="ls-form-input"
                :class="{ 'form-error': $v.newPassword.$error }"
                :type="newPasswordType"
                v-model.trim="$v.newPassword.$model"
                placeholder="Enter New Password"
              />
              <div
                style="
                  position: absolute;
                  left: 90%;
                  font-size: 1.1em;
                  bottom: 20%;
                  opacity: 0.5;
                  transition: 0.5s ease;
                  cursor: pointer;
                "
                @click="toggleView('newPassword')"
              >
                <fa-icon
                  v-if="newPasswordType === 'password'"
                  :icon="['far', 'eye']"
                />
                <fa-icon v-else :icon="['far', 'eye-slash']" />
              </div>
            </div>
            <div
              class="invalid-prompt"
              v-if="submitted && !$v.newPassword.required"
            >
              <p class="invalid-text">Your new password is required</p>
            </div>
          </b-form-group>
          <b-form-group>
            <div style="position: relative">
              <b-form-input
                :type="confirmPasswordType"
                v-model.trim="$v.confirmPassword.$model"
                class="ls-form-input"
                placeholder="Repeat New Password"
              />
              <div
                style="
                  position: absolute;
                  left: 90%;
                  font-size: 1.1em;
                  bottom: 20%;
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
            type="submit"
            class="primary-btn btn-lg mt-4 mb-5 btn-block"
          >
            Change Password
          </b-button>
          <scale-loader v-else :loading="true" :color="'#c221cf'" />
        </b-col>
      </b-row>
    </form>

    <div style="border-bottom: 1px solid #c4c4c4">
      <p style="color: #3c4043; font-size: 1.125em">
        2 Factor Authentication (2FA)
      </p>
    </div>
    <TwoFA />
  </div>
</template>

<script>
import TwoFA from "./component/2FA";
import { minLength, required, sameAs } from "vuelidate/lib/validators";
export default {
  components: { TwoFA },
  validations: {
    password: { required },
    newPassword: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAsPassword: sameAs("newPassword") },
  },
  data() {
    return {
      password: null,
      passwordType: "password",
      newPassword: null,
      newPasswordType: "password",
      confirmPassword: null,
      confirmPasswordType: "password",
      submitted: false,
    };
  },
  methods: {
    toggleView(password) {
      if (password === "password") {
        this.passwordType === "password"
          ? (this.passwordType = "text")
          : (this.passwordType = "password");
      } else if (password === "newPassword") {
        this.newPasswordType === "password"
          ? (this.newPasswordType = "text")
          : (this.newPasswordType = "password");
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
        data.append("old_password", this.password);
        data.append("new_password", this.newPassword);
        data.append("new_password_confirmation", this.confirmPassword);
        data.append("callbackUrl", this.callbackBaseUrl);
        this.apiPost(this.ROUTES.updatePassword, data).then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.apiSuccess("Update successful", message);
            this.refreshForm();
            this.showReset = false;
            this.showResetMobile = false;
          }
        });
      }
    },
    refreshForm() {
      this.password = null;
      this.passwordType = "password";
      this.newPassword = null;
      this.newPasswordType = "password";
      this.confirmPassword = null;
      this.confirmPasswordType = "password";
      this.submitted = false;
      this.$v.$reset();
    },
  },
};
</script>

<style>
.ls-form-input {
  height: 3.125em;
  border-radius: 5px;
  background: #f5f4ff;
  border: 1px solid rgba(255, 255, 255, 0.6);
}
.ls-form-input:active,
.ls-form-input:focus {
  background: #f5f4ff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: none;
}
</style>
