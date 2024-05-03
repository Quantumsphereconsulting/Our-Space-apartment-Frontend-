<template>
  <div>
    <div style="border-bottom: 1px solid #c4c4c4">
      <p style="color: #3c4043; font-size: 1.125em">Bank Information</p>
    </div>
    <form @submit.prevent="submit">
      <b-row class="mt-5 mb-4">
        <b-col xl="6">
          <b-form-group>
            <b-form-select
              v-model="bank"
              :options="banks"
              class="ls-form-input"
              @change="verifyAccountNumber"
            />
            <div class="invalid-prompt" v-if="submitted && !$v.bank.required">
              <p class="invalid-text">Your bank is required</p>
            </div>
          </b-form-group>
          <b-form-group>
            <b-form-input
              class="ls-form-input"
              placeholder="Enter Account Number"
              v-model="accountNumber"
              @input="verifyAccountNumber"
              @keypress="isNumber($event)"
              :disabled="verifying"
            />
            <div
              class="invalid-prompt"
              v-if="submitted && !$v.accountNumber.required"
            >
              <p class="invalid-text">Your account number is required</p>
            </div>
            <div
              class="invalid-prompt"
              v-if="submitted && !$v.accountNumber.minLength"
            >
              <p class="invalid-text">
                Your account number must be 10 digits long
              </p>
            </div>
          </b-form-group>
          <b-form-group>
            <div style="position: relative">
              <b-form-input
                class="ls-form-input"
                placeholder="Account Name"
                disabled
                v-model="accountName"
              />
              <clip-loader
                style="position: absolute; bottom: 10%; left: 92%"
                :loading="verifying"
                :color="'#c221cf'"
                size="1.5em"
              />
            </div>
            <div
              class="invalid-prompt"
              v-if="submitted && !$v.accountName.required"
            >
              <p class="invalid-text">Your account name is required</p>
            </div>
          </b-form-group>
          <b-button
            v-if="!submitting"
            type="submit"
            class="primary-btn btn-lg mb-5 btn-block"
          >
            Add Bank Information
          </b-button>
          <scale-loader v-if="submitting" :loading="true" :color="'#c221cf'" />
        </b-col>
      </b-row>
    </form>
    <div style="border-bottom: 1px solid #c4c4c4">
      <p style="color: #3c4043; font-size: 1.125em">Bank Accounts</p>
    </div>
    <b-table :items="bankAccounts" :fields="fields" responsive="sm">
      <template #cell(bank_name)="row">
        <p
          style="
            color: #3c4043;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
            white-space: nowrap;
          "
        >
          {{ row.value }}
        </p>
      </template>
      <template #cell(account_number)="row">
        <p
          style="
            color: #3c4043;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
            white-space: nowrap;
          "
        >
          {{ row.value }}
        </p>
      </template>
      <template #cell(account_name)="row">
        <p
          style="
            color: #3c4043;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
            white-space: nowrap;
          "
        >
          {{ row.value }}
        </p>
      </template>
      <template #cell(actions)="row">
        <p
          style="
            color: #3c4043;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
            margin-left: 1em;
            display: inline-block;
            cursor: pointer;
          "
          @click="confirmDeleteBankAccount(row.item)"
        >
          <fa-icon :icon="['far', 'trash-alt']" class="text-danger" />
        </p>
      </template>
    </b-table>
    <b-modal
      v-model="confirmDelete"
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
        <fa-icon
          :icon="['fas', 'exclamation-triangle']"
          class="text-warning"
          style="font-size: 4em"
        />
        <p style="font-size: 1.5em; margin-top: 1em">Are you sure?</p>
        <p v-if="currentBankAccount">
          Please note, this will remove the
          <strong>
            {{ currentBankAccount.account_number }},
            {{ currentBankAccount.bank_name }}
          </strong>
          bank account from Our Space. This action is irreversible.
        </p>
        <div class="d-flex justify-content-center mt-4">
          <b-button
            class="btn secondary-outline-btn mr-3 w-100"
            @click="confirmDelete = false"
          >
            Cancel
          </b-button>
          <b-button class="btn primary-btn w-100" @click="deleteBankAccount">
            Confirm
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="deleting"
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
          Please wait, the bank account is being deleted...
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import banks from "./banks.json"; // vurrent list of banks for paystack api
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  validations: {
    bank: { required },
    accountNumber: { required, minLength: minLength(10) },
    accountName: { required },
  },
  mounted() {
    this.listBanks();
    this.fetchBankAccounts();
  },
  data() {
    return {
      bank: null,
      banks: [{ value: null, text: "Please select a bank", disabled: true }],
      accountNumber: null,
      accountName: null,
      verifying: false,
      submitted: false,
      bankAccounts: [],
      fields: [
        { key: "bank_name", label: "Bank" },
        { key: "account_number", label: "Account Number" },
        { key: "account_name", label: "Account Name" },
        { key: "actions", label: "Actions" },
      ],
      confirmDelete: false,
      deleting: false,
      currentBankAccount: null,
    };
  },
  methods: {
    fetchBankAccounts() {
      this.apiGet(this.ROUTES.bankAccounts).then((res) => {
        const { success, data } = res.data;
        if (success) {
          const { bank_accounts } = data;
          this.bankAccounts = bank_accounts.data;
        }
      });
    },
    listBanks() {
      this.banks = [
        { value: null, text: "Please select a bank", disabled: true },
      ];
      banks.forEach((bank) => {
        this.banks.push({
          value: { code: bank.code, name: bank.name },
          text: bank.name,
          disabled: false,
        });
      });
    },
    verifyAccountNumber() {
      this.accountName = null;
      if (this.accountNumber.toString().length === 10) {
        this.paystackVerify();
      }
    },
    isNumber(event) {
      const keysAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const keyPressed = event.key;
      if (!keysAllowed.includes(keyPressed)) {
        event.preventDefault();
      }
    },
    formReset() {
      this.submitted = false;
      this.bank = null;
      this.accountNumber = null;
      this.accountName = null;
      this.$v.$reset();
    },
    async paystackVerify() {
      this.verifying = true;
      this.accountName = null;
      delete axios.defaults.headers.common["X-CSCAPI-KEY"]; // header is inserted during country api lookup
      await axios
        .get(
          `https://api.paystack.co/bank/resolve?account_number=${this.accountNumber}&bank_code=${this.bank.code}`,
          {
            headers: {
              Authorization: `Bearer sk_test_23803a403bcf66fca0408366515471864b8aa924`, // note, pls update paystack secret key
            },
          }
        )
        .then((res) => {
          const { data, message, status } = res.data;
          if (status) {
            this.$notify({
              title: "Account Found Successfully!",
              text: `${message}`,
              type: "success",
            });
            this.accountName = data.account_name;
          }
        })
        .catch((err) => {
          this.$notify({
            title: "An Error Occurred!",
            text: `${err.response.data.message}`,
            type: "error",
          });
        })
        .then(() => {
          this.verifying = false;
        });
    },
    submit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        let data = new FormData();
        data.append("bank_name", this.bank.name);
        data.append("account_number", this.accountNumber);
        data.append("account_name", this.accountName);
        this.apiPost(this.ROUTES.bankAccounts, data).then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.apiSuccess("Action Successful", message);
            this.formReset();
            this.fetchBankAccounts();
          }
        });
      }
    },
    confirmDeleteBankAccount(bankAccount) {
      this.currentBankAccount = bankAccount;
      this.confirmDelete = true;
    },
    deleteBankAccount() {
      this.confirmDelete = false;
      this.deleting = true;
      const url = `${this.ROUTES.bankAccounts}/${this.currentBankAccount.id}`;
      this.apiDelete(url)
        .then()
        .catch()
        .then(() => {
          this.fetchBankAccounts();
          this.deleting = false;
        });
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
</style>
