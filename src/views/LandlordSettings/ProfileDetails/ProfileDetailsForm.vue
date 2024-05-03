<template>
  <div>
    <div style="border-bottom: 1px solid #c4c4c4">
      <p style="color: #3c4043; font-size: 1.125em">Personal Information</p>
    </div>
    <div class="mt-4 d-lg-flex d-none align-items-center">
      <input
        type="file"
        ref="file"
        :name="uploadFieldName"
        @change="onFileChange($event.target.name, $event.target.files)"
        style="display: none"
        accept="image/*"
      />
      <b-img
        class="mr-4"
        style="width: 7em; height: 7em; border-radius: 50%"
        fluid
        :src="avatar"
      />
      <b-button
        v-if="uploadingAvatar"
        class="primary-outline-btn btn-lg"
        disabled
      >
        Changing your profile image...
      </b-button>
      <b-button
        v-else
        class="primary-outline-btn btn-lg"
        @click="launchFilePicker"
      >
        Change your profile image
      </b-button>
    </div>
    <div class="mt-4 d-lg-none align-items-center">
      <input
        type="file"
        ref="file"
        :name="uploadFieldName"
        @change="onFileChange($event.target.name, $event.target.files)"
        style="display: none"
        accept="image/*"
      />
      <b-img
        class="mr-4"
        style="width: 7em; height: 7em; border-radius: 50%"
        fluid
        :src="avatar"
      />
      <b-button class="primary-outline-btn" @click="launchFilePicker()">
        Change your profile image
      </b-button>
    </div>
    <form @submit.prevent="submit">
      <b-row class="mt-5 mb-5">
        <b-col xl="6">
          <b-row>
            <b-col xl="6">
              <b-form-group>
                <b-form-input
                  v-model.trim="$v.firstname.$model"
                  class="ls-form-input"
                  placeholder="First Name"
                />
                <div
                  class="invalid-prompt"
                  v-if="submitted && !$v.firstname.required"
                >
                  <p class="invalid-text">Your first name is required</p>
                </div>
              </b-form-group>
            </b-col>
            <b-col xl="6">
              <b-form-group>
                <b-form-input
                  class="ls-form-input"
                  placeholder="Last Name"
                  v-model.trim="$v.lastname.$model"
                />
                <div
                  class="invalid-prompt"
                  v-if="submitted && !$v.lastname.required"
                >
                  <p class="invalid-text">Your last name is required</p>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group>
            <vue-tel-input
              mode="international"
              default-country="NG"
              :dropdown-options="phoneOptions"
              v-model.trim="$v.phone.$model"
            />
            <div class="invalid-prompt" v-if="submitted && !$v.phone.required">
              <p class="invalid-text">Your phone number is required</p>
            </div>
          </b-form-group>
          <b-form-group>
            <div style="position: relative">
              <b-form-input
                disabled
                v-model.trim="$v.email.$model"
                class="ls-form-input"
                placeholder="Email Address"
                @input="validateEmail"
              />
              <transition name="fade">
                <fa-icon
                  v-if="validEmail"
                  :icon="['fas', 'check']"
                  style="
                    position: absolute;
                    color: #24cb99;
                    opacity: 0.8;
                    left: 92.5%;
                    bottom: 30%;
                  "
                />
              </transition>
            </div>
            <div class="invalid-prompt" v-if="submitted && !$v.email.required">
              <p class="invalid-text">Your email is required</p>
            </div>
            <div class="invalid-prompt" v-if="submitted && !$v.email.email">
              <p class="invalid-text">Your email must be a valid email</p>
            </div>
          </b-form-group>
        </b-col>
        <b-col xl="6">
          <b-row>
            <b-col xl="6">
              <b-form-group>
                <b-form-select
                  v-model.trim="$v.gender.$model"
                  :options="genders"
                  class="ls-form-input"
                  placeholder="Gender"
                />
                <div
                  class="invalid-prompt"
                  v-if="submitted && !$v.gender.required"
                >
                  <p class="invalid-text">Your gender is required</p>
                </div>
              </b-form-group>
            </b-col>
            <b-col xl="6">
              <b-form-group>
                <date-picker
                  v-model.trim="$v.dob.$model"
                  valueType="format"
                  placeholder="Date of Birth"
                  :disabled-date="disabledAfterToday"
                />
                <div
                  class="invalid-prompt"
                  v-if="submitted && !$v.dob.required"
                >
                  <p class="invalid-text">Your date of birth is required</p>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group>
            <b-form-textarea
              v-model="address"
              class="ls-form-textarea"
              placeholder="Home Address"
              rows="4"
              no-resize
            />
          </b-form-group>
        </b-col>
      </b-row>
      <div style="border-bottom: 1px solid #c4c4c4">
        <p style="color: #3c4043; font-size: 1.125em">
          National Identification
        </p>
      </div>
      <b-row class="mt-5 mb-5">
        <b-col xl="6">
          <b-form-group>
            <b-form-select
              class="ls-form-input"
              v-model="country"
              :options="countries"
              @change="fetchStates"
            />
          </b-form-group>
        </b-col>
        <b-col xl="6">
          <b-form-group>
            <div style="position: relative">
              <b-form-select
                v-model="state"
                :options="states"
                class="ls-form-input"
              />
              <clip-loader
                style="position: absolute; bottom: 10%; left: 92%"
                :loading="fetchingStates"
                :color="'#c221cf'"
                size="1.5em"
              />
            </div>
          </b-form-group>
        </b-col>
        <b-col xl="6">
          <b-form-group>
            <b-form-file placeholder="Government Issued ID" />
          </b-form-group>
        </b-col>
        <b-col xl="6">
          <b-form-group>
            <b-form-input
              v-model="nin"
              class="ls-form-input"
              placeholder="NIN"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button
        v-if="!submitting"
        type="submit"
        class="primary-btn btn-lg mb-5 btn-block"
      >
        Update Profile
      </b-button>
      <scale-loader v-if="submitting" :loading="true" :color="'#c221cf'" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";

export default {
  validations: {
    firstname: { required },
    lastname: { required },
    phone: { required },
    email: { required, email },
    gender: { required },
    dob: { required },
  },
  mounted() {
    this.fetchProfile();
    this.fetchCountries();
  },
  data() {
    return {
      avatar: this.$store.getters["auth/getAvatar"],
      uploadFieldName: "file",
      uploadingAvatar: false,
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      country: null,
      countries: [
        {
          value: null,
          text: "Please select a country",
        },
      ],
      state: null,
      states: [
        {
          value: null,
          text: "Please select a state",
        },
      ],
      gender: null,
      genders: [
        {
          value: null,
          text: "Please select a gender",
          disabled: true,
        },
        {
          value: "male",
          text: "Male",
        },
        {
          value: "female",
          text: "Female",
        },
        {
          value: "other",
          text: "Other",
        },
      ],
      dob: null,
      address: null,
      phoneOptions: {
        showSearchBox: true,
        showFlags: true,
        showDialCodeInList: true,
        width: "270px",
        disabled: false,
      },
      validEmail: false,
      fetchingStates: false,
      submitted: false,
      nin: null,
    };
  },
  methods: {
    fetchProfile() {
      this.apiGet(this.ROUTES.profile).then(async (res) => {
        const { user } = res.data.data;
        this.firstname = user.first_name;
        this.lastname = user.last_name;
        this.email = user.email;
        this.validateEmail();
        this.phone = user.phone_number;
        this.country = user.country;
        if (this.country) {
          await this.fetchStates();
        }
        this.state = user.state;
        this.gender = user.gender;
        this.dob = user.date_of_birth;
        this.address = user.home_address;
      });
    },
    fetchCountries() {
      axios.defaults.headers.common[
        "X-CSCAPI-KEY"
      ] = `WHloOXhBRVo1WEJwVWNuSExrb1dHemdxQTZvN0JyVGlJeU5nVzZlZQ==`; // please update the api key
      axios.get("https://api.countrystatecity.in/v1/countries").then((res) => {
        const { data } = res;
        this.countries = [
          {
            value: null,
            text: "Please select a country",
            disabled: true,
          },
        ];
        data.forEach((country) => {
          this.countries.push({
            value: country.name,
            text: country.name,
          });
        });
      });
    },
    async fetchStates() {
      this.fetchingStates = true;
      let chosenCountry;
      this.states = [
        {
          value: null,
          text: "Please select a state",
        },
      ];
      await axios
        .get("https://api.countrystatecity.in/v1/countries")
        .then((res) => {
          const { data } = res;
          chosenCountry = data.filter((country) => {
            return country.name === this.country;
          });
        });
      let ciso = chosenCountry[0].iso2;
      axios
        .get(`https://api.countrystatecity.in/v1/countries/${ciso}/states`)
        .then((res) => {
          const { data } = res;
          data.forEach((state) => {
            this.states.push({
              value: state.name,
              text: state.name,
            });
          });
        })
        .catch()
        .then(() => (this.fetchingStates = false));
    },
    validateEmail() {
      this.validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        this.email
      );
    },
    disabledAfterToday(date) {
      const today = new Date();
      return date > today;
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    async onFileChange(fieldName, file) {
      this.uploadingAvatar = true;
      let imageFile = file[0];
      if (file.length > 0) {
        let formData = new FormData();
        let imageURL = URL.createObjectURL(imageFile);
        formData.append("avatar", imageFile);
        let fileSize = imageFile.size / 1024 / 1024;
        if (fileSize > 2) {
          this.$notify({
            title: "Invalid Image Size",
            text: "Please select an image less than 2MB",
            type: "error",
          });
        } else {
          // upload the image here
          await this.apiPost(this.ROUTES.updateAvatar, formData).then((res) => {
            const { data, message } = res.data;
            const { user } = data;
            const { avatar } = user;
            this.$store.dispatch("auth/updateAvatar", { avatar });
            this.apiSuccess("Image Uploaded", message);
          });
        }
        // Emit the FormData and image URL to the parent component
        this.avatar = imageURL;
        // this.$emit("input", { formData, imageURL });
      } else {
        this.$notify({
          title: "No Image Selected",
          text: "Please select an image to upload",
          type: "warning",
        });
      }
      this.uploadingAvatar = false;
    },
    submit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        let data = new FormData();
        data.append("first_name", this.firstname);
        data.append("last_name", this.lastname);
        data.append("email", this.email);
        data.append("phone_number", this.phone);
        data.append("country", this.country);
        data.append("state", this.state);
        data.append("gender", this.gender);
        data.append("date_of_birth", this.dob);
        data.append("home_address", this.address);
        let cbUrl = `${this.callbackBaseUrl}`;
        data.append("callbackUrl", cbUrl);
        data.append("_method", "PATCH");
        this.apiPost(this.ROUTES.updateProfile, data).then((res) => {
          const { success, message, data } = res.data;
          const { user } = data;
          if (success) {
            this.apiSuccess("Update Successful", message);
            this.$store.dispatch("auth/initSession", {
              user,
              token: this.$store.getters["auth/getToken"],
            });
            this.fetchProfile();
          }
        });
      }
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
.ls-form-textarea {
  height: 5em;
  border-radius: 5px;
  background: #f5f4ff;
  border: 1px solid rgba(255, 255, 255, 0.6);
}
.ls-form-textarea:active,
.ls-form-textarea:focus {
  background: #f5f4ff;
  border: 1px solid rgba(255, 255, 255, 0.6);
}
.custom-file-input {
  box-shadow: none;
  border: none;
}
.custom-file-label {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
  height: 3.125em;
  padding-top: 0.9em;
}
.custom-file-input:focus {
  box-shadow: none;
  border: none;
}
.custom-file-label::after {
  background-color: transparent;
}
.custom-file-input ~ .custom-file-label[data-browse]::after {
  content: url("../../../assets/icons/file-upload.svg");
  padding-top: 1em;
}
.vue-tel-input {
  height: 3.125em;
  border-radius: 0.3125em;
  transition: 0.5s ease;
  color: #3c4043;
  border: 1px solid #f5f4ff;
}
.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: #f5f4ff;
}
.vti__input {
  background-color: #f5f4ff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.invalid-prompt {
  height: 1em;
  display: inline-block;
  text-align: left;
  margin: 0;
}
.invalid-text {
  font-size: 0.8em;
  color: #ff0000;
  opacity: 0.6;
}
.mx-datepicker {
  width: 100%;
}
.mx-input-wrapper {
  height: 3.125em;
}
.mx-input {
  height: 100%;
  background-color: #f5f4ff;
  border-color: #f5f4ff;
  box-shadow: none;
  color: #3c4043;
  font-size: 1rem;
}
.mx-input:hover,
.mx-input:focus {
  border-color: #f5f4ff;
}
</style>
