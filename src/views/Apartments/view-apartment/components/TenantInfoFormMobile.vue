<template>
  <div id="tenant-info-form-mobile">
    <b-row>
      <b-col lg="6">
        <b-form-input
          class="tenant-info-input mb-4"
          placeholder="Firstname"
          disabled
          v-model="firstname"
          size="lg"
        />
      </b-col>
      <b-col lg="6">
        <b-form-input
          class="tenant-info-input"
          placeholder="Lastname"
          disabled
          v-model="lastname"
          size="lg"
        />
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col lg="6">
        <b-form-select
          class="tenant-info-select mb-4"
          size="lg"
          disabled
          v-model="country"
        />
      </b-col>
      <b-col lg="6">
        <b-form-select
          class="tenant-info-select"
          size="lg"
          v-model="state"
          disabled
        />
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col lg="6">
        <b-form-select
          class="tenant-info-select mb-4"
          size="lg"
          v-model="gender"
          disabled
        />
      </b-col>
      <b-col lg="6">
        <b-form-input
          class="tenant-info-input"
          placeholder="Phone Number"
          size="lg"
          disabled
          v-model="phone"
        />
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col lg="6">
        <b-form-input
          class="tenant-info-input mb-4"
          size="lg"
          placeholder="Date of Birth"
          disabled
          v-model="date_of_birth"
          type="date"
        />
      </b-col>
      <b-col lg="6">
        <b-form-input
          class="tenant-info-input"
          size="lg"
          disabled
          v-model="email"
          placeholder="Email Address"
        />
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col lg="12">
        <b-form-textarea
          class="tenant-info-input"
          size="lg"
          disabled
          v-model="home_address"
          placeholder="Home Address"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      country: "nigeria",
      firstname: null,
      lastname: null,
      phone: null,
      email: null,
      home_address: null,
      date_of_birth: null,
      state: "benin",
      gender: "male",
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      this.apiGet(this.ROUTES.profile).then((res) => {
        const { data, success } = res.data;
        const { user } = data;
        if (success) {
          this.firstname = user.first_name;
          this.lastname = user.last_name;
          this.phone = user.phone_number;
          this.email = user.email;
          this.country = user.country;
          this.state = user.state;
          this.gender = user.gender;
          this.home_address = user.home_address;
          this.date_of_birth = user.date_of_birth;
        }
      });
    },
  },
};
</script>

<style>
#tenant-info-form-mobile {
  font-family: "Circular Std Book", sans-serif;
  font-weight: normal;
}
.tenant-info-input {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
}
.tenant-info-input:focus {
  background-color: #f5f4ff;
}
.tenant-info-select {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
}
.tenant-info-select:focus {
  box-shadow: none;
  border-color: transparent;
}
.custom-file-label {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
}
.custom-file-input:focus {
  box-shadow: none;
  border: none;
}
.custom-file-label::after {
  background-color: transparent;
}
.custom-file-input ~ .custom-file-label[data-browse]::after {
  content: url("../../../../assets/icons/file-upload.svg");
  padding-top: 0.6em;
}
</style>
