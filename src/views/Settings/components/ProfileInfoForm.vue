<template>
  <div>
    <div id="pi-form" class="text-center">
      <div class="pi-title mt-3" style="font-size: 1.5em">
        Profile Information
      </div>
      <div class="profile-picture">
        <Avatar :current-image="true" />
      </div>
      <form
        @submit.prevent="submit"
        class="p-lg-5 p-md-5 p-sm-5 py-4 px-2"
        novalidate
      >
        <b-row class="px-lg-5">
          <b-col lg="6">
            <b-form-group>
              <b-form-input
                class="ti-input"
                placeholder="Firstname"
                :class="{ 'form-error': $v.firstname.$error }"
                v-model.trim="$v.firstname.$model"
              />
              <div
                class="invalid-prompt"
                v-if="submitted && !$v.firstname.required"
              >
                <p class="invalid-text">Your first name is required</p>
              </div>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <b-form-input
                class="ti-input"
                placeholder="Lastname"
                :class="{ 'form-error': $v.lastname.$error }"
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
        <b-row class="px-lg-5">
          <b-col lg="6">
            <b-form-group>
              <b-form-select
                class="ti-select"
                :class="{ 'form-error': $v.country.$error }"
                v-model.trim="$v.country.$model"
                :options="countries"
                @change="fetchStates"
              />
              <div
                class="invalid-prompt"
                v-if="submitted && !$v.country.required"
              >
                <p class="invalid-text">Your country is required</p>
              </div>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <b-form-select
                class="ti-select"
                :class="{ 'form-error': $v.state.$error }"
                v-model.trim="$v.state.$model"
                :options="states"
              />
              <!-- <clip-loader
                style="position: absolute; bottom: 10%; left: 92%"
                :loading="fetchingStates"
                :color="'#c221cf'"
                size="1.5em"
              /> -->
              <div
                class="invalid-prompt"
                v-if="submitted && !$v.state.required"
              >
                <p class="invalid-text">Your state is required</p>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="px-lg-5">
          <b-col lg="6">
            <b-form-group>
              <b-form-select
                class="ti-select"
                v-model="gender"
                :options="genderOptions"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <vue-tel-input
                v-model.trim="$v.phone.$model"
                :class="{ 'form-error': $v.phone.$error }"
                mode="international"
                default-country="NG"
                :dropdown-options="phoneOptions"
                :input-options="inputOptions"
              />
              <div
                class="invalid-prompt"
                v-if="submitted && !$v.phone.required"
              >
                <p class="invalid-text">Your phone number is required</p>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- <b-row class="px-lg-5">
          <b-col cols="12">
            <b-form-group>
              <b-form-file
                v-model.trim="$v.governmentID.$model"
                :class="{ 'form-error': $v.governmentID.$error }"
                class="ti-file d-lg-block d-none"
                placeholder="Click here to upload your Government Issued ID"
              />
              <b-form-file
                v-model.trim="$v.governmentID.$model"
                :class="{ 'form-error': $v.governmentID.$error }"
                class="ti-file d-lg-none"
                placeholder="Government Issued ID"
              />
              <div
                class="invalid-prompt"
                v-if="submitted && !$v.governmentID.required"
              >
                <p class="invalid-text">Your government id is required</p>
              </div>
            </b-form-group>
          </b-col>
        </b-row> -->
        <b-row class="mt-2 px-lg-5">
          <b-col lg="6">
            <b-form-group>
              <date-picker
                v-model.trim="$v.dob.$model"
                :class="{ 'form-error': $v.dob.$error }"
                valueType="format"
                placeholder="Date of Birth"
                :disabled-date="disabledAfterToday"
              />
              <div class="invalid-prompt" v-if="submitted && !$v.dob.required">
                <p class="invalid-text">Your dob is required</p>
              </div>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group>
              <b-form-input
                class="ti-input"
                :class="{ 'form-error': $v.email.$error }"
                type="email"
                v-model.trim="$v.email.$model"
                placeholder="Email Address"
              />
              <div
                class="invalid-prompt"
                v-if="submitted && !$v.email.required"
              >
                <p class="invalid-text">Your email is required</p>
              </div>
              <div class="invalid-prompt" v-if="submitted && !$v.email.email">
                <p class="invalid-text">Your email must be a valid email</p>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="px-lg-5">
          <b-col cols="12">
            <b-form-group>
              <b-form-textarea
                :class="{ 'form-error': $v.address.$error }"
                v-model.trim="$v.address.$model"
                class="ti-input-text"
                placeholder="Home Address"
                no-resize
                no-auto-shrink
              />
              <div
                class="invalid-prompt"
                v-if="submitted && !$v.address.required"
              >
                <p class="invalid-text">Your home address is required</p>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="px-lg-5">
          <b-button type="submit" class="primary-btn mt-3 btn-block ti-btn">
            Update Profile
          </b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar";
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
export default {
  components: {
    Avatar,
  },
  validations: {
    firstname: { required },
    lastname: { required },
    country: { required },
    state: { required },
    gender: { required },
    phone: { required },
    // governmentID: { required },
    dob: { required },
    email: { required, email },
    address: { required },
  },
  data() {
    return {
      firstname: null,
      lastname: null,
      country: null,
      countries: [{ text: "Select country", value: null }],
      state: null,
      states: [{ value: null, text: "Select state" }],
      gender: "male",
      genderOptions: [
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
      ],
      phoneOptions: {
        showSearchBox: true,
        showFlags: true,
        showDialCodeInList: true,
        width: "270px",
        disabled: true,
      },
      inputOptions: {
        placeholder: "Phone Number",
      },
      phone: null,
      governmentID: null,
      dob: null,
      email: null,
      address: null,
      submitted: false,
    };
  },
  methods: {
    fetchCountries() {
      axios.defaults.headers.common[
        "X-CSCAPI-KEY"
      ] = `WHloOXhBRVo1WEJwVWNuSExrb1dHemdxQTZvN0JyVGlJeU5nVzZlZQ==`;
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
    fetchProfile() {
      this.apiGet(this.ROUTES.profile).then(async (res) => {
        const { data, success } = res.data;
        const { user } = data;
        if (success) {
          this.firstname = user.first_name;
          this.lastname = user.last_name;
          this.phone = user.phone_number;
          this.email = user.email;
          this.country = user.country;
          if (this.country) {
            await this.fetchStates();
          }
          this.state = user.state;
          this.dob = user.date_of_birth;
          this.address = user.home_address;
        }
      });
    },
    disabledAfterToday(date) {
      const today = new Date();
      return date > today;
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
        data.append("callbackUrl", this.callbackUrl);
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
  mounted() {
    this.fetchProfile();
    this.fetchCountries();
  },
};
</script>

<style>
.form-error {
  border-color: red;
}
.profile-picture {
  position: relative;
  display: inline-block;
}
.settings-form {
  /* //padding: 0 15em; */
  text-align: -webkit-center;
}
.ti-input {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
  height: 3.125em;
}
.ti-input-text {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
  height: 5.125em;
}
.ti-input:focus {
  background-color: #f5f4ff;
}
.ti-select {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
  height: 3.125em;
}
.ti-select:focus {
  box-shadow: none;
  border-color: transparent;
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
.ti-btn {
  height: 3.125em;
}
.custom-file-label {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
  width: 100%;
  opacity: 0.5;
  height: 3.125em;
  padding-top: 0.8em;
  text-align: left;
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
  width: 100%;
  height: 3.125em;
  border-radius: 0.3125em;
  transition: 0.5s ease;
  color: #3c4043;
  border: 1px solid #f5f4ff;
  opacity: 0.5;
}
.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: #f5f4ff;
}
.vti__input {
  background-color: #f5f4ff;
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
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
