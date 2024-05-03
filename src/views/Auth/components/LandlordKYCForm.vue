<template>
  <div id="signup-form" class="d-none d-lg-block">
    <div class="user-type">
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
        <b-form-file
          class="signup-file"
          v-model.trim="$v.file.$model"
          :class="{ 'form-error': submitted && $v.file.$error }"
          placeholder="Upload Government Issued ID"
        />
        <br />
        <div class="invalid-prompt mt-3" v-if="submitted && !$v.file.required">
          <p class="invalid-text">Your government issued id is required</p>
        </div>
      </b-form-group>
      <b-button
        v-if="!submitting"
        type="submit"
        class="primary-btn signup-btn mt-4"
      >
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
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    file: { required },
  },
  data() {
    return {
      isUser: false,
      file: null,
      nin: null,
      submitted: false,
    };
  },
  methods: {
    routeTerms(e) {
      e.preventDefault();
      this.$router.push("/terms").catch();
    },
    submit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid || !this.file) {
        this.apiInvalidForm();
      } else {
        let fd = new FormData();
        fd.append("national_identity_number", this.nin);
        fd.append("kycs[0]", this.file);
        this.apiPost(this.ROUTES.landlordRequest, fd).then((res) => {
          const { message, success } = res.data;
          if (success) {
            this.$router.push({ name: "Tenancy" }).then(() => {
              this.apiSuccess(message, "Our team will get back to you soon");
            });
          }
        });
      }
    },
  },
};
</script>
<style>
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
  margin-left: 1em;
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
  height: 3.125em;
  margin: 1em auto;
  transition: 0.5s ease;
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
  margin: 2em auto;
  /*margin-bottom: 2em;*/
  width: 30.1875em;
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
  width: 100%;
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
.custom-file-label {
  background-color: #f5f4ff;
  border-radius: 6px;
  height: 3.125em;
  display: flex;
  opacity: 0.8;
  border: 1px dashed #c321d0;
  align-items: center;
}
.custom-file-input:focus {
  box-shadow: none;
  border: none;
}
.custom-file-label::after {
  background-color: transparent;
}
.custom-file-input {
  height: 3.125em;
}
.custom-file-input ~ .custom-file-label[data-browse]::after {
  content: url("../../../assets/icons/file-upload-1.svg");
  padding-top: 0.8em;
  border-left: none;
}
.signup-file {
  width: 30.1875em;
}
</style>

<style>
input[type="checkbox"] {
  height: 1.2em;
  width: 1em;
}
</style>
