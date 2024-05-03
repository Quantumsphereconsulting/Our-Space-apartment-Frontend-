<template>
  <div>
    <div class="d-flex justify-content-between">
      <p>KYC Requirements</p>
      <p class="a-form-action" @click="$refs['edit-kyc'].show()">
        Edit selection
      </p>
    </div>
    <div class="a-form-container">
      <b-row>
        <b-col v-for="(kyc, index) in selectedKYCs" :key="index" xl="6">
          <p
            v-if="checkSelected(kyc) === kyc && index < 6"
            class="d-flex align-items-center mb-4"
          >
            <fa-icon
              :icon="['fas', 'circle']"
              style="font-size: 0.5em; margin-right: 1em"
            />
            <span style="font-size: 1.2em">{{ getKYCName(kyc) }}</span>
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
    <b-modal ref="edit-kyc" hide-footer centered size="lg" @hidden="submitKYCs">
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
          @click="$refs['edit-kyc'].hide()"
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
    selected: null,
  },
  mounted() {
    this.selectedKYCs = this.selected;
  },
  data() {
    return {
      selectedKYCs: [],
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
      if (this.selected.includes(val)) {
        return val;
      }
    },
    getKYCName(val) {
      let name;
      this.kycs.every((kyc) => {
        if (kyc.id === val) {
          name = kyc.name;
          return false;
        }
        return true;
      });
      return name;
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
.a-form-action {
  color: #c221cf;
  text-decoration: underline;
  transition: 0.5s ease;
}
.a-form-action:hover {
  cursor: pointer;
  opacity: 0.8;
}
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #c221cf;
  background-color: #c221cf;
}
</style>
