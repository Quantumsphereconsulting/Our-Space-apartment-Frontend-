<template>
  <div>
    <div class="d-flex justify-content-between">
      <p>KYC Requirements</p>
      <p v-if="false" class="a-form-action" @click="$refs['new-kyc'].show()">
        Edit selection
      </p>
    </div>
    <div v-if="false" class="a-form-container">
      <b-row>
        <b-col xl="6">
          <p class="d-flex align-items-center mb-4">
            <fa-icon
              :icon="['fas', 'circle']"
              style="font-size: 0.5em; margin-right: 1em"
            />
            <span style="font-size: 1.2em">Full Name</span>
          </p>
          <p class="d-flex align-items-center mb-4">
            <fa-icon
              :icon="['fas', 'circle']"
              style="font-size: 0.5em; margin-right: 1em"
            />
            <span style="font-size: 1.2em">Country</span>
          </p>
          <p class="d-flex align-items-center mb-4">
            <fa-icon
              :icon="['fas', 'circle']"
              style="font-size: 0.5em; margin-right: 1em"
            />
            <span style="font-size: 1.2em">State</span>
          </p>
        </b-col>
        <b-col xl="6">
          <p class="d-flex align-items-center mb-4">
            <fa-icon
              :icon="['fas', 'circle']"
              style="font-size: 0.5em; margin-right: 1em"
            />
            <span style="font-size: 1.2em">Phone Number</span>
          </p>
          <p class="d-flex align-items-center mb-4">
            <fa-icon
              :icon="['fas', 'circle']"
              style="font-size: 0.5em; margin-right: 1em"
            />
            <span style="font-size: 1.2em">Government Issued ID</span>
          </p>
          <p class="d-flex align-items-center mb-4">
            <fa-icon
              :icon="['fas', 'circle']"
              style="font-size: 0.5em; margin-right: 1em"
            />
            <span style="font-size: 1.2em">Date of Birth</span>
          </p>
        </b-col>
      </b-row>
      <p
        class="mt-4 mb-n3 text-center a-form-action"
        @click="$refs['edit-kyc'].show()"
      >
        View more
      </p>
    </div>
    <div v-else class="a-form-container-empty" @click="$refs['new-kyc'].show()">
      <p style="color: #c221cf; text-decoration: underline; font-size: 1.3em">
        Click here to select requirements
      </p>
    </div>
    <b-modal ref="new-kyc" hide-footer centered size="lg">
      <template #modal-header="{ close }">
        <div class="d-flex flex-lg-row flex-column align-items-center">
          <p class="ea-header">Check the Box to Select KYC Requirements</p>
          <p class="ea-header-action" @click="selectAll">Select All</p>
        </div>
        <b-img
          style="cursor: pointer"
          :src="require('@/assets/icons/modal-close.svg')"
          @click="close()"
        />
      </template>
      <div class="ea-body px-lg-4 px-1">
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="fullname"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Full Name</p>
            <small class="mt-n2">
              This would require first and last name
            </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="country"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Country</p>
            <small class="mt-n2">
              This would require country of residence
            </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="state"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">State</p>
            <small class="mt-n2"> This would require state of residence </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="gender"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Gender</p>
            <small class="mt-n2"> This would require state of residence </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="phone"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Phone Number</p>
            <small class="mt-n2"> This would require phone number </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="govID"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Government Issued ID</p>
            <small class="mt-n2">
              This would require a piece of government issued id
            </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="dob"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Date of Birth</p>
            <small class="mt-n2">
              This would require the date of birth of the tenant
            </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="email"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Email Address</p>
            <small class="mt-n2">
              This would require a valid email address
            </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="home"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Home Address</p>
            <small class="mt-n2">
              This would require a valid home address
            </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="tin"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Tax Identification Number</p>
            <small class="mt-n2">
              This would require a tax identification number
            </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="marital"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Marital Status</p>
            <small class="mt-n2"> This would require a marital status </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="bank"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Bank Statement</p>
            <small class="mt-n2">
              This would require a current bank statement
            </small>
          </div>
        </div>
        <div class="ea-body-kyc">
          <b-form-checkbox
            v-model="passport"
            value="selected"
            unchecked-value="not_selected"
          />
          <div class="ml-3">
            <p class="mb-n1">Passport</p>
            <small class="mt-n2">
              This would require a recent passport photograph
            </small>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullname: "un_selected",
      country: "un_selected",
      state: "un_selected",
      gender: "un_selected",
      phone: "un_selected",
      govID: "un_selected",
      dob: "un_selected",
      email: "un_selected",
      home: "un_selected",
      tin: "un_selected",
      marital: "un_selected",
      bank: "un_selected",
      passport: "un_selected",
    };
  },
  methods: {
    selectAll() {
      this.fullname = "selected";
      this.country = "selected";
      this.state = "selected";
      this.gender = "selected";
      this.phone = "selected";
      this.govID = "selected";
      this.dob = "selected";
      this.email = "selected";
      this.home = "selected";
      this.tin = "selected";
      this.marital = "selected";
      this.bank = "selected";
      this.passport = "selected";
    },
    fetchKYCs() {
      // const url = `${this.ROUTES.apartment}/`;
    },
  },
};
</script>

<style>
.a-form-container {
  background-color: #f5f4ff;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 2em;
}
.a-form-container-empty {
  background-color: #f5f4ff;
  border: 1px dashed #c221cf;
  border-radius: 5px;
  padding-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.ea-header {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  padding-top: 0.6em;
  color: #3c4043;
}
.ea-header-action {
  font-family: "Circular Std Book", sans-serif;
  font-size: 1em;
  color: #c221cf;
  cursor: pointer;
  margin-left: 0.8em;
  padding-top: 1em;
}
.ea-body {
  font-family: "Circular Std Book", sans-serif;
}
.ea-body-kyc {
  background-color: #f5f4ff;
  padding: 1em 2em;
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}
</style>
