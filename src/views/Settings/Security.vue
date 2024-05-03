<template>
  <b-container id="profile-update">
    <div class="d-flex justify-content-between align-items-center">
      <p class="pu-title">Settings</p>
      <p class="logout d-flex align-items-start" @click="logout">
        <b-img class="mr-3" :src="require('@/assets/icons/logout.svg')" />
        <span style="color: #c221cf"> Logout </span>
      </p>
    </div>
    <b-card
      no-body
      style="
        margin-top: 2em;
        margin-bottom: 3em;
        border-radius: 10px;
        border: none;
      "
      class="p-lg-4 py-2 px-3"
    >
      <Controls />
      <div
        class="mt-2 mb-4 text-center"
        style="font-family: 'Circular Std Book', sans-serif"
      >
        <b-img fluid :src="require('@/assets/images/security-setting.svg')" />
        <br />
        <b-button
          class="mt-4 primary-btn px-lg-5 d-lg-block d-none"
          style="height: 3.125em; margin: 0 auto"
          @click="showReset = true"
        >
          Click Here to Reset Password
        </b-button>
        <b-button
          class="mt-4 primary-btn px-lg-5 d-lg-none w-100"
          style="height: 3.125em"
          @click="showResetMobile = true"
        >
          Click Here to Reset Password
        </b-button>
      </div>
    </b-card>
    <b-modal
      ref="logging-out"
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
        <scale-loader class="mt-1" :loading="true" :color="'#c221cf'" />
        <p style="font-size: 1.5em; margin-top: 2em">
          Please wait, you are being logged out of your account...
        </p>
      </div>
    </b-modal>
    <b-modal
      v-model="showReset"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
      size="lg"
      @hidden="refreshForm"
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <p style="font-size: 1.875em">Reset Password</p>
        <form ref="reset-password" class="mt-4" @submit.prevent="submit">
          <b-form-group>
            <div class="reset-password-wrapper">
              <b-form-input
                autocomplete="new-password"
                class="reset-password"
                :class="{ 'form-error': $v.password.$error }"
                :type="passwordType"
                v-model.trim="$v.password.$model"
                placeholder="Current Password"
              />
              <div class="toggle-view" @click="toggleView('password')">
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
          </b-form-group>
          <b-form-group>
            <div class="reset-password-wrapper">
              <b-form-input
                autocomplete="new-password"
                class="reset-password"
                :class="{ 'form-error': $v.newPassword.$error }"
                :type="newPasswordType"
                v-model.trim="$v.newPassword.$model"
                placeholder="New Password"
              />
              <div class="toggle-view" @click="toggleView('newPassword')">
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
            <div class="reset-password-wrapper">
              <b-form-input
                autocomplete="new-password"
                class="reset-password"
                :class="{ 'form-error': $v.confirmPassword.$error }"
                :type="confirmPasswordType"
                v-model.trim="$v.confirmPassword.$model"
                placeholder="Confirm Password"
              />
              <div class="toggle-view" @click="toggleView('confirmPassword')">
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
            class="primary-btn reset-btn"
          >
            Reset Password
          </b-button>
          <scale-loader v-else :loading="true" :color="'#c221cf'" />
          <p
            class="mb-0 mt-3 text-danger"
            style="cursor: pointer"
            @click="showReset = false"
          >
            Cancel
          </p>
        </form>
      </div>
    </b-modal>
    <b-modal
      v-model="showResetMobile"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
      @hidden="refreshForm"
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1.5em, 3vw, 3em);
        "
      >
        <p style="font-size: 1.3em">Reset Password</p>
        <form ref="reset-password" class="mt-4" @submit.prevent="submit">
          <b-form-group>
            <div class="reset-password-wrapper-mobile">
              <b-form-input
                autocomplete="new-password"
                class="reset-password-mobile"
                :class="{ 'form-error': $v.password.$error }"
                :type="passwordType"
                v-model.trim="$v.password.$model"
                placeholder="Current Password"
              />
              <div class="toggle-view-mobile" @click="toggleView('password')">
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
          </b-form-group>
          <b-form-group>
            <div class="reset-password-wrapper-mobile">
              <b-form-input
                autocomplete="new-password"
                class="reset-password-mobile"
                :class="{ 'form-error': $v.newPassword.$error }"
                :type="newPasswordType"
                v-model.trim="$v.newPassword.$model"
                placeholder="New Password"
              />
              <div
                class="toggle-view-mobile"
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
            <div class="reset-password-wrapper-mobile">
              <b-form-input
                autocomplete="new-password"
                class="reset-password-mobile"
                :class="{ 'form-error': $v.confirmPassword.$error }"
                :type="confirmPasswordType"
                v-model.trim="$v.confirmPassword.$model"
                placeholder="Confirm Password"
              />
              <div
                class="toggle-view-mobile"
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
            class="primary-btn reset-btn"
          >
            Reset Password
          </b-button>
          <scale-loader v-else :loading="true" :color="'#c221cf'" />
          <p
            class="mb-0 mt-3 text-danger"
            style="cursor: pointer"
            @click="showReset = false"
          >
            Cancel
          </p>
        </form>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import Controls from "./components/Controls";
import { minLength, required, sameAs } from "vuelidate/lib/validators";

export default {
  components: { Controls },
  validations: {
    password: { required },
    newPassword: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAsPassword: sameAs("newPassword") },
  },
  methods: {
    logout() {
      this.$refs["logging-out"].show();
      this.apiPost(this.ROUTES.logout, {})
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.$refs["logging-out"].hide();
            this.$store.dispatch("auth/clearSession");
            this.$router.push({ name: "Login" }).then(() => {
              this.apiSuccess(message, "Thank you for using Our Space");
            });
          }
        })
        .catch()
        .then(() => {
          this.$refs["logging-out"].hide();
          this.$store.dispatch("auth/clearSession");
          this.$router.push({ name: "Login" }).then(() => {
            this.apiSuccess(
              "You have logged out successfully",
              "Thank you for using Our Space"
            );
          });
        });
    },
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
        data.append("callbackUrl", this.callbackUrl);
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
  },
  data() {
    return {
      showReset: false,
      showResetMobile: false,
      password: null,
      passwordType: "password",
      newPassword: null,
      newPasswordType: "password",
      confirmPassword: null,
      confirmPasswordType: "password",
      submitted: false,
    };
  },
};
</script>

<style scoped>
#profile-update {
  margin-top: 4em;
  flex: 1 0 auto;
}
.form-error {
  border-color: red;
}
.reset-password-wrapper {
  position: relative;
}
.reset-password-wrapper-mobile {
  position: relative;
}
.reset-password {
  height: 3.125em;
  margin: 0 auto;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.reset-password-mobile {
  height: 3.125em;
  margin: 0 auto;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.toggle-view {
  position: absolute;
  left: 90%;
  font-size: 1.1em;
  bottom: 20%;
  opacity: 0.5;
  transition: 0.5s ease;
  cursor: pointer;
}
.toggle-view-mobile {
  position: absolute;
  left: 90%;
  font-size: 1.1em;
  bottom: 20%;
  opacity: 0.5;
  transition: 0.5s ease;
  cursor: pointer;
}
.pu-title {
  font-size: 2.25em;
  color: #3c4043;
}
.logout:hover {
  cursor: pointer;
}
.invalid-prompt {
  height: 1em;
  float: left;
  display: inline-block;
  text-align: left;
  margin: 0;
}
.invalid-text {
  font-size: 0.8em;
  color: #ff0000;
  opacity: 0.6;
}
.reset-btn {
  width: 100%;
  margin: 1em auto;
  transition: 0.5s ease;
  height: 3.125em;
}
</style>
