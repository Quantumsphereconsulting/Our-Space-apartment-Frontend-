<template>
  <div>
    <div class="d-flex justify-content-between">
      <p>KYC Requirements</p>
    </div>
    <div class="a-form-container-empty" @click="$refs['new-kyc'].show()">
      <p style="color: #c221cf; text-decoration: underline; font-size: 1.3em">
        Click here to select requirements
      </p>
    </div>
    <b-modal ref="new-kyc" hide-footer centered size="lg" @hidden="submitKYCs">
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
        <div
          v-for="(kyc, index) in kycs"
          :key="index"
          @click="selectKYC(kyc.id)"
          class="ea-body-kyc"
        >
          <b-form-checkbox
            :checked="checkSelected(kyc.id)"
            @change="selectKYC"
            :value="kyc.id"
            :unchecked-value="kyc.id"
          />
          <div class="ml-3">
            <p class="mb-n1">{{ kyc.name }}</p>
            <small class="mt-n2">
              {{ kyc.description }}
            </small>
          </div>
        </div>
        <b-button
          type="btn"
          @click="$refs['new-kyc'].hide()"
          class="primary-btn mt-4 btn-block"
        >
          Submit
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    kycs: null,
  },
  data() {
    return {
      selectedKYCs: [],

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
      this.kycs.forEach((kyc) => {
        if (!this.selectedKYCs.includes(kyc.id)) {
          this.selectedKYCs.push(kyc.id);
        }
      });
      this.$emit("selected", this.selectedKYCs);
    },
    selectKYC(event) {
      let eventIndex = this.selectedKYCs.indexOf(event);
      if (eventIndex < 0) {
        this.selectedKYCs.push(event);
      } else {
        this.selectedKYCs.splice(eventIndex, 1);
      }
    },
    submitKYCs() {
      this.$emit("selected", this.selectedKYCs);
    },
    checkSelected(val) {
      if (this.selectedKYCs.includes(val)) {
        return val;
      }
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
  cursor: pointer;
}
</style>
