<template>
  <div id="signup-form" class="d-none d-lg-block">
    <div class="user-type">
      <div
        class="mr-4"
        :class="{ 'ut-active': isUser, 'ut-inactive': !isUser }"
        @click="isUser = true"
      >
        <div :class="{ 'uti-active': isUser, 'uti-inactive': !isUser }"></div>
        <span class="uti-text">As User</span>
      </div>
      <div
        :class="{ 'ut-active': !isUser, 'ut-inactive': isUser }"
        @click="isUser = false"
      >
        <div :class="{ 'uti-active': !isUser, 'uti-inactive': isUser }"></div>
        <span class="uti-text">As Landlord</span>
      </div>
    </div>
    <form @submit.prevent="submit">
      <b-form-group>
        <b-form-input
          class="signup-fullname"
          :class="{ 'form-error': $v.fullname.$error }"
          type="text"
          v-model.trim="$v.fullname.$model"
          placeholder="Full name"
        />
        <div class="invalid-prompt" v-if="submitted && !$v.fullname.required">
          <p class="invalid-text">Your full name is required</p>
        </div>
      </b-form-group>
      <b-form-group>
        <b-form-input
          class="signup-email"
          :class="{ 'form-error': $v.email.$error }"
          type="text"
          v-model.trim="$v.email.$model"
          placeholder="Email Address"
        />
        <div class="invalid-prompt" v-if="submitted && !$v.email.required">
          <p class="invalid-text">Your email is required</p>
        </div>
        <div class="invalid-prompt" v-if="submitted && !$v.email.email">
          <p class="invalid-text">Your email must be a valid email</p>
        </div>
      </b-form-group>
      <b-form-group class="d-flex justify-content-center">
        <vue-tel-input
          v-model.trim="$v.phone.$model"
          :class="{ 'form-error': $v.phone.$error }"
          mode="international"
          default-country="NG"
          :dropdown-options="phoneOptions"
        />
        <div class="invalid-prompt" v-if="submitted && !$v.phone.required">
          <p class="invalid-text">Your phone number is required</p>
        </div>
      </b-form-group>
      <b-form-group>
        <b-form-input
          autocomplete="new-password"
          v-model.trim="$v.password.$model"
          class="signup-password"
          :class="{ 'form-error': $v.password.$error }"
          type="password"
          placeholder="Password"
        />
        <div class="invalid-prompt" v-if="submitted && !$v.password.required">
          <p class="invalid-text">Your password is required</p>
        </div>
        <div class="invalid-prompt" v-if="submitted && !$v.password.minLength">
          <p class="invalid-text">
            Your password must have at least 8 characters
          </p>
        </div>
      </b-form-group>
      <b-form-group>
        <b-form-input
          v-model.trim="$v.confirmPassword.$model"
          class="signup-password"
          :class="{ 'form-error': $v.confirmPassword.$error }"
          type="password"
          placeholder="Confirm Password"
        />
        <div
          class="invalid-prompt"
          v-if="submitted && !$v.confirmPassword.sameAsPassword"
        >
          <p class="invalid-text">Your password must be identical</p>
        </div>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
          v-model="terms"
          class="signup-terms"
          value="accepted"
          unchecked-value="not_accepted"
        >
          <span id="signup-terms-text"> I have read and agreed with the </span>
          <span id="signup-terms-action" @click="routeTerms($event)">
            Terms of Use
          </span>
          and
          <span id="signup-terms-action" @click="routePrivacy($event)">
            Privacy Policy.
          </span>
        </b-form-checkbox>
        <div
          class="invalid-prompt"
          v-if="submitted && terms === 'not_accepted'"
        >
          <p class="invalid-text">
            Please read & accept our terms before proceeding
          </p>
        </div>
      </b-form-group>
      <b-button v-if="!submitting" type="submit" class="primary-btn signup-btn">
        Create Account
      </b-button>
      <scale-loader v-else :loading="true" :color="'#c221cf'" />
    </form>
    <p class="signup-create">
      Already have an account?
      <span class="signup-create-action" @click="$router.push('/auth/login')">
        Sign in
      </span>
    </p>
    <b-modal
      v-model="signupSuccess"
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
          An email was sent to {{ validEmail }} to verify your account.
        </p>
        <b-button
          class="primary-btn mt-3"
          style="width: 100%; height: 3.125em"
          @click="finishSignup"
        >
          Continue
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { required, sameAs, email, minLength } from "vuelidate/lib/validators";
export default {
  validations: {
    fullname: { required },
    email: { required, email },
    phone: { required },
    password: { required, minLength: minLength(8) },
    confirmPassword: { sameAsPassword: sameAs("password") },
    nin: { required },
  },
  data() {
    return {
      terms: "not_accepted",
      showKYC: false,
      isUser: true,
      fullname: null,
      email: null,
      phone: null,
      password: null,
      confirmPassword: null,
      nin: null,
      phoneOptions: {
        showSearchBox: true,
        showFlags: true,
        showDialCodeInList: true,
        width: "270px",
        disabled: true,
      },
      submitted: false,
      signupSuccess: false,
      validEmail: null,
    };
  },
  methods: {
    routeTerms(e) {
      e.preventDefault();
      this.$router.push("/terms").catch();
    },
    routePrivacy(e) {
      e.preventDefault();
      this.$router.push("/privacy-policy").catch();
    },
    submit() {
      this.submitted = true;
      this.$v.$touch();
      this.handlePhoneError();
      if (this.$v.$invalid && this.terms === "not_accepted") {
        this.apiInvalidForm();
      } else {
        const fullNameSplit = this.fullname.split(" ");
        let data = new FormData();
        data.append("first_name", fullNameSplit[0]);
        data.append("last_name", fullNameSplit[fullNameSplit.length - 1]);
        data.append("email", this.email);
        data.append("password", this.password);
        data.append("password_confirmation", this.confirmPassword);
        data.append("phone_number", this.phone);
        let cbUrl = `${this.callbackBaseUrl}/auth/login`;
        data.append("callbackUrl", cbUrl);
        this.apiPostAuthSignUp(this.ROUTES.register, data).then((res) => {
          const { success, data } = res.data;
          const { token } = data;
          if (success) {
            this.$store.dispatch("auth/setToken", { token });
            this.validEmail = data?.user?.email;
            this.signupSuccess = true;
          }
        });
      }
    },
    handlePhoneError() {
      if (!this.$v.phone.required) {
        let all = document.getElementsByClassName("vue-tel-input");
        for (let i = 0; i < all.length; i++) {
          all[i].style.borderColor = "red";
        }
      } else {
        let all = document.getElementsByClassName("vue-tel-input");
        for (let i = 0; i < all.length; i++) {
          all[i].style.borderColor = "#ced4da";
        }
      }
    },
    finishSignup() {
      if (this.isUser) {
        this.$router.push({ name: "Login" }).then(() => {
          this.apiSuccess(
            `Sign up was successful`,
            "Please sign into your account to continue"
          );
        });
      } else {
        // if registering as landlord, reroute to kyc form
        this.$router.push({ name: "LandlordKYC" }).then(() => {
          this.apiSuccess(
            `Sign up was successful`,
            "Complete your registration as a landlord"
          );
        });
      }
    },
  },
};
</script>
<style scoped>
.signup-fullname {
  height: 3.125em;
  width: 30.1875em;
  margin: 0 auto;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.form-error {
  border-color: red;
}
.signup-email {
  height: 3.125em;
  width: 30.1875em;
  margin: 0 auto;
  background-color: #f5f4ff;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.vue-tel-input {
  width: 30.1875em;
  height: 3.125em;
  border-radius: 0.3125em;
  transition: 0.5s ease;
  color: #3c4043;
  border: 1px solid #ced4da;
  opacity: 0.5;
}
.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: #c221cf;
}
.signup-password {
  height: 3.125em;
  width: 30.1875em;
  margin: 0 auto;
  border-radius: 0.3125em;
  padding-left: 1em;
  transition: 0.5s ease;
  color: #3c4043;
  opacity: 0.5;
}
.signup-terms {
  width: 30.1875em;
  margin: 0 auto;
  opacity: 0.8;
  text-align: left;
}
#signup-terms-text {
  /*margin-left: 1em;*/
}
#signup-terms-action {
  color: #c221cf;
  transition: 0.5s ease;
}
#signup-terms-action:hover {
  cursor: pointer;
  color: #84168d;
}
.signup-btn {
  width: 30.1875em;
  margin: 1em auto;
  transition: 0.5s ease;
  height: 3.125em;
}
.signup-create {
  color: #3c4043;
  margin-top: 1em;
  font-size: 1.125em;
}
.signup-create-action {
  color: #c221cf;
  transition: 0.5s ease;
}
.signup-create-action:hover {
  color: #84168d;
  cursor: pointer;
}
.user-type {
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
}
.ut-inactive {
  width: 14.3125em;
  border: 1px solid #bcbcbc;
  padding: 15px 23px 15px 16px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 7px;
  cursor: pointer;
  transition: 0.3s ease;
}
.ut-active {
  width: 14.3125em;
  border: 1px solid #c221cf;
  padding: 15px 23px 15px 16px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 7px;
  cursor: pointer;
  transition: 0.3s ease;
}
.uti-inactive {
  height: 1em;
  width: 1em;
  border-radius: 50%;
  border: 1px solid #bcbcbc;
  margin-right: 11px;
  transition: 0.3s ease;
}
.uti-active {
  height: 1em;
  width: 1em;
  border-radius: 50%;
  background-color: #c221cf;
  box-shadow: 0 2px 0 #eaa9ef;
  border: 1px solid #c221cf;
  margin-right: 11px;
  transition: 0.3s ease;
}
.uti-text {
  color: #3c4043;
  letter-spacing: -0.03em;
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
</style>

<style>
input[type="checkbox"] {
  height: 1.2em;
  width: 1em;
}
</style>
