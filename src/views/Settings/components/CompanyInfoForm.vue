<template>
  <div id="pi-form" class="text-center">
    <div class="pi-title mt-3" style="font-size: 1.5em">
      Company Information
    </div>
    <div class="p-lg-5 py-4 px-2">
      <b-row class="px-lg-5">
        <b-col lg="6">
          <b-form-group>
            <b-form-input
              class="tenant-info-input"
              placeholder="Name of Employer"
            />
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group>
            <date-picker
              v-model="dob"
              valueType="format"
              type="year"
              placeholder="Year Employed"
              :disabled-date="disabledAfterToday"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="px-lg-5">
        <b-col lg="6">
          <b-form-group>
            <b-form-select
              class="tenant-info-select"
              v-model="country"
              :options="countryOptions"
            />
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group>
            <b-form-select
              class="tenant-info-select"
              v-model="state"
              :options="stateOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="px-lg-5">
        <b-col lg="12">
          <b-form-group>
            <b-form-input class="tenant-info-input" placeholder="Role" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="px-lg-5">
        <b-col lg="12">
          <b-form-textarea
            no-resize
            class="tenant-info-input"
            placeholder="Office Address"
          />
        </b-col>
      </b-row>
      <div class="px-lg-5">
        <b-button class="primary-btn mt-3 btn-block ti-btn">
          Update Profile
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      country: "nigeria",
      countryOptions: [{ value: "nigeria", text: "Nigeria" }],
      state: "benin",
      stateOptions: [{ value: "benin", text: "Benin" }],
      gender: "male",
      genderOptions: [
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
      ],
      dob: null,
    };
  },
  methods: {
    disabledAfterToday(date) {
      const today = new Date();
      return date > today;
    },
  },
};
</script>

<style>
.tenant-info-input {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
  height: 3.125em;
}
.tenant-info-input:focus {
  background-color: #f5f4ff;
}
.tenant-info-select {
  border: none;
  background-color: #f5f4ff;
  border-radius: 6px;
  height: 3.125em;
}
.tenant-info-select:focus {
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
</style>
