<template>
  <div>
    <div id="p-controls" class="d-lg-block d-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.5em; color: #c221cf">
          <span> Wallet </span>
        </p>
        <div>
          <b-button
            class="primary-btn btn-lg"
            @click="$router.push({ name: 'NewLandlordApartments' })"
          >
            List New Apartment
          </b-button>
        </div>
      </div>
      <div class="wallet-balance">
        <b-row>
          <b-col xl="6" style="border-right: 1px solid #e0e0e0">
            <p class="wb-title">Wallet balance</p>
            <p class="wb-subtitle">
              &#8358; {{ parseFloat(walletBalance).toLocaleString() }}
            </p>
          </b-col>
          <b-col
            xl="6"
            class="d-flex justify-content-center align-items-center"
          >
            <b-button
              class="primary-btn btn-lg px-4 mr-3"
              @click="depositAmount = true"
            >
              <fa-icon class="mr-2" :icon="['far', 'money-bill-alt']" />
              Deposit Funds
            </b-button>
            <b-button
              class="primary-outline-btn btn-lg px-4"
              @click="$refs['withdraw'].show()"
            >
              <fa-icon class="mr-2" :icon="['far', 'money-bill-alt']" />
              Withdraw Funds
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <div id="p-controls-mobile" class="d-lg-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.2em; color: #c221cf">
          <span> Wallet </span>
        </p>
        <div class="d-flex justify-content-center">
          <b-button
            class="primary-btn"
            @click="$router.push({ name: 'NewLandlordApartments' })"
          >
            List New Apartment
          </b-button>
        </div>
      </div>
      <div class="wallet-balance">
        <b-row>
          <b-col xl="6">
            <p class="wb-title">Wallet balance</p>
            <p class="wb-subtitle">
              &#8358; {{ parseFloat(walletBalance).toLocaleString() }}
            </p>
          </b-col>
          <b-col
            xl="6"
            class="d-flex justify-content-center align-items-center"
          >
            <b-button class="primary-btn mr-3" @click="depositAmount = true">
              Deposit Funds
            </b-button>
            <b-button
              class="primary-outline-btn"
              @click="$refs['withdraw-mobile'].show()"
            >
              Withdraw Funds
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal
      v-model="depositAmount"
      hide-footer
      hide-header
      centered
      no-close-on-esc
      no-close-on-backdrop
    >
      <div
        style="
          font-family: 'Circular Std Book', sans-serif;
          text-align: center;
          padding: clamp(2em, 5vw, 4em);
        "
        class="d-flex justify-content-center align-items-center flex-column"
      >
        <p style="font-size: 1.5em; color: #3c4043; margin-top: 2em">
          How much do you want to fund your wallet with?
        </p>
        <b-form-input class="c-form-input" v-model="amount" />
        <div
          class="mt-4 w-100 d-flex justify-content-center"
          style="margin-bottom: 2em"
        >
          <b-button
            class="red-outline-btn w-100 mr-2"
            @click="depositAmount = false"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn w-100"
            v-if="amount"
            @click="
              depositAmount = false;
              choosePayment = true;
            "
          >
            Proceed
          </b-button>
          <b-button class="primary-btn w-100" v-else disabled>
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="choosePayment"
      hide-footer
      hide-header
      centered
      size=""
      no-close-on-esc
      no-close-on-backdrop
    >
      <div
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Choose Payment Method
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please choose any of the payment methods below and proceed to fund
          your wallet with the sum of <strong> ₦{{ amount }} </strong>
        </p>
        <div
          style="
            background-color: #efeff3;
            padding: 1em 1em;
            border-radius: 10px;
          "
        >
          <b-list-group flush>
            <b-list-group-item
              class="pmt-method"
              style="position: relative"
              href="#"
              @click="
                card = true;
                bankk = false;
              "
            >
              <b-img
                :src="require('@/assets/icons/card-payment.svg')"
                class="mr-2"
              />
              Card Payment
              <fa-icon
                v-if="card"
                :icon="['fas', 'check']"
                style="
                  position: absolute;
                  color: #24cb99;
                  opacity: 0.8;
                  left: 92.5%;
                  bottom: 35%;
                "
              />
            </b-list-group-item>
            <b-list-group-item
              class="pmt-method"
              style="position: relative"
              href="#"
              @click="
                card = false;
                bankk = true;
              "
            >
              <b-img
                :src="require('@/assets/icons/bank-payment.svg')"
                class="mr-2"
              />
              Bank Payment
              <fa-icon
                v-if="bankk"
                :icon="['fas', 'check']"
                style="
                  position: absolute;
                  color: #24cb99;
                  opacity: 0.8;
                  left: 92.5%;
                  bottom: 35%;
                "
              />
            </b-list-group-item>
          </b-list-group>
        </div>
        <div
          class="mt-4 d-flex justify-content-center"
          style="margin-bottom: 2em"
        >
          <b-button
            class="red-outline-btn mr-2"
            style="width: 100%"
            @click="
              choosePayment = false;
              depositAmount = true;
            "
          >
            Cancel
          </b-button>
          <b-button class="primary-btn" style="width: 100%" @click="proceed">
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="byBank"
      hide-footer
      hide-header
      centered
      size=""
      no-close-on-esc
      no-close-on-backdrop
      @hidden="resetBankTransfer"
    >
      <form
        @submit.prevent="submitBankTransfer"
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Bank Transfer
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please transfer the sum of <strong> ₦{{ amount }} </strong> to the
          account below and send us your proof of payment.
        </p>
        <div
          style="
            background-color: #efeff3;
            padding: 1em 1em;
            border-radius: 10px;
          "
        >
          {{ systemAccount }}
        </div>
        <b-form-file
          class="mt-3 mb-3"
          placeholder="Proof of Payment"
          v-model.trim="$v.paymentProof.$model"
        />
        <div
          class="invalid-prompt"
          v-if="submitted && !$v.paymentProof.required"
        >
          <p class="invalid-text">Your proof of payment is required</p>
        </div>
        <div
          class="mt-4 d-flex justify-content-center"
          style="margin-bottom: 2em"
        >
          <b-button
            class="red-outline-btn mr-2"
            style="width: 100%"
            @click="byBank = false"
          >
            Cancel
          </b-button>
          <b-button class="primary-btn" style="width: 100%" type="submit">
            Submit
          </b-button>
        </div>
      </form>
    </b-modal>
    <b-modal
      v-model="settingUp"
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
          Please wait, we're setting up secure payment with Paystack...
        </p>
      </div>
    </b-modal>
    <b-modal
      ref="withdraw"
      size="lg"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <div
        style="font-family: 'Circular Std Book', sans-serif; padding: 4em 8em"
      >
        <p
          style="
            font-family: 'Circular Std', sans-serif;
            font-weight: 500;
            font-size: 1.5em;
            color: #c221cf;
          "
        >
          Withdraw Funds
        </p>
        <p style="color: #3c4043; opacity: 0.8; margin-bottom: 2em">
          Please enter your withdrawal details below to withdraw funds.
        </p>
        <p style="color: #c221cf; font-size: 0.8em">YOUR ACCOUNT</p>
        <div
          style="
            border: 1px dashed #c221cf;
            padding: 1em;
            border-radius: 5px;
            cursor: pointer;
          "
          @click="selectBankAccount"
        >
          <div v-if="withdrawalAccount">
            <p style="color: #3c4043; margin-bottom: 0">
              {{ withdrawalAccount.bank_name }} ({{
                withdrawalAccount.account_number
              }})
            </p>
            <p style="color: #3c4043; opacity: 0.8; margin-bottom: 0">
              Account Name: {{ withdrawalAccount.account_name }}
            </p>
          </div>
          <div
            v-else
            class="d-flex justify-content-center align-content-center"
          >
            <p style="color: #c221cf; margin-bottom: 0">
              Click to select a bank account
            </p>
          </div>
        </div>
        <div
          class="invalid-prompt"
          v-if="submitted && !$v.withdrawalAccount.required"
        >
          <p class="invalid-text">Your withdrawal account is required</p>
        </div>
        <hr class="my-4" />
        <b-form-group>
          <b-form-input
            style="
              height: 4.375em;
              border: 1px solid rgba(60, 64, 67, 0.6);
              border-radius: 5px;
            "
            placeholder="Enter amount you wish to withdraw"
            v-model.trim="withdrawalAmount"
          />
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.withdrawalAmount.required"
          >
            <p class="invalid-text">Your withdrawal amount is required</p>
          </div>
        </b-form-group>
        <b-form-group>
          <b-form-textarea
            style="
              height: 6.25em;
              border: 1px solid rgba(60, 64, 67, 0.6);
              border-radius: 5px;
              margin-top: 1em;
            "
            no-resize
            placeholder="Additional Note (optional)"
            v-model="note"
          />
        </b-form-group>
        <div class="mt-4 d-flex justify-content-between">
          <b-button
            class="red-outline-btn w-100 mr-4"
            @click="$refs['withdraw'].hide()"
          >
            Cancel
          </b-button>
          <b-button class="primary-btn w-100" @click="submit">
            Withdraw
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="selectBank"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <div
        style="font-family: 'Circular Std Book', sans-serif; padding: 2em 2em"
      >
        <p
          style="
            font-family: 'Circular Std', sans-serif;
            font-weight: 500;
            font-size: 1.25em;
            color: #c221cf;
          "
        >
          Select Bank Account
        </p>
        <div v-if="bankAccounts.length <= 0">
          <b-alert show variant="info">
            You haven't setup any bank accounts. Setup bank accounts
            <span
              style="text-decoration: underline; cursor: pointer"
              @click="$router.push({ name: 'LandlordBankAccounts' })"
            >
              here
            </span>
          </b-alert>
        </div>
        <div v-else>
          <div
            v-for="(bankAccount, index) in bankAccounts"
            :key="index"
            style="
              border: 1px solid #cecece;
              padding: 1em;
              border-radius: 5px;
              cursor: pointer;
              position: relative;
              margin-bottom: 1em;
            "
            @click="chooseWithdrawalBank(bankAccount)"
          >
            <div>
              <p style="color: #3c4043; margin-bottom: 0">
                {{ bankAccount.bank_name }} ({{ bankAccount.account_number }})
              </p>
              <p style="color: #3c4043; opacity: 0.8; margin-bottom: 0">
                Account Name: {{ bankAccount.account_name }}
              </p>
            </div>
            <fa-icon
              v-if="
                withdrawalAccount && withdrawalAccount.id === bankAccount.id
              "
              :icon="['fas', 'check']"
              style="
                position: absolute;
                color: #24cb99;
                opacity: 0.8;
                left: 92.5%;
                bottom: 40%;
              "
            />
          </div>
        </div>

        <div class="mt-4 d-flex justify-content-between">
          <b-button class="red-outline-btn w-100" @click="selectBank = false">
            Cancel
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal ref="withdraw-mobile" size="lg" centered hide-header hide-footer>
      <div
        style="font-family: 'Circular Std Book', sans-serif; padding: 2em 2em"
      >
        <p
          style="
            font-family: 'Circular Std', sans-serif;
            font-weight: 500;
            font-size: 1.5em;
            color: #c221cf;
          "
        >
          Withdraw Funds
        </p>
        <p style="color: #3c4043; opacity: 0.8; margin-bottom: 2em">
          Please enter the bank account details you wish to withdraw your funds
          to.
        </p>
        <p style="color: #c221cf; font-size: 0.8em">YOUR ACCOUNT</p>
        <div
          style="
            border: 1px dashed #c221cf;
            padding: 1em;
            border-radius: 5px;
            cursor: pointer;
          "
          @click="selectBankAccount"
        >
          <div v-if="withdrawalAccount">
            <p style="color: #3c4043; margin-bottom: 0">
              {{ withdrawalAccount.bank_name }} ({{
                withdrawalAccount.account_number
              }})
            </p>
            <p style="color: #3c4043; opacity: 0.8; margin-bottom: 0">
              Account Name: {{ withdrawalAccount.account_name }}
            </p>
          </div>
          <div
            v-else
            class="d-flex justify-content-center align-content-center"
          >
            <p style="color: #c221cf; margin-bottom: 0">
              Click to select a bank account
            </p>
          </div>
        </div>
        <div
          class="invalid-prompt"
          v-if="submitted && !$v.withdrawalAccount.required"
        >
          <p class="invalid-text">Your withdrawal account is required</p>
        </div>
        <hr class="my-4" />
        <b-form-input
          style="
            height: 4.375em;
            border: 1px solid rgba(60, 64, 67, 0.6);
            border-radius: 5px;
          "
          placeholder="Enter amount you wish to withdraw"
          v-model.trim="withdrawalAmount"
        />
        <div
          class="invalid-prompt"
          v-if="submitted && !$v.withdrawalAmount.required"
        >
          <p class="invalid-text">Your withdrawal amount is required</p>
        </div>
        <b-form-textarea
          style="
            height: 6.25em;
            border: 1px solid rgba(60, 64, 67, 0.6);
            border-radius: 5px;
            margin-top: 1em;
          "
          no-resize
          placeholder="Additional Note (optional)"
          v-model="note"
        />
        <div class="mt-4 d-flex justify-content-between">
          <b-button
            class="red-outline-btn w-100 mr-4"
            @click="$refs['withdraw-mobile'].hide()"
          >
            Cancel
          </b-button>
          <b-button class="primary-btn w-100" @click="submitMobile">
            Withdraw
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      ref="confirm-withdraw"
      size="lg"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <div
        style="font-family: 'Circular Std Book', sans-serif; padding: 4em 8em"
      >
        <p
          style="
            font-family: 'Circular Std', sans-serif;
            font-weight: 500;
            font-size: 1.5em;
            color: #3c4043;
            text-align: center;
          "
        >
          Are you sure?
        </p>
        <p
          style="
            color: #3c4043;
            text-align: center;
            font-size: 1.3em;
            opacity: 0.8;
          "
          v-if="withdrawalAmount && withdrawalAccount"
        >
          Please note that the sum of
          <i class="font-weight-bold">N{{ withdrawalAmount }}</i> will be
          withdrawn to {{ withdrawalAccount.account_number }} ({{
            withdrawalAccount.bank_name
          }})
          <i class="font-weight-bold">{{ withdrawalAccount.account_name }}</i>
        </p>
        <div v-if="!submitting" class="mt-4 d-flex justify-content-between">
          <b-button
            class="red-outline-btn w-100 mr-4"
            @click="
              $refs['confirm-withdraw'].hide();
              $refs['withdraw'].show();
            "
          >
            Cancel
          </b-button>
          <b-button class="primary-btn w-100" @click="submitRequest">
            Proceed
          </b-button>
        </div>
        <scale-loader v-else class="mt-4" :loading="true" :color="'#c221cf'" />
      </div>
    </b-modal>
    <b-modal
      ref="confirm-withdraw-mobile"
      size="lg"
      centered
      hide-header
      hide-footer
    >
      <div
        style="font-family: 'Circular Std Book', sans-serif; padding: 2em 2em"
      >
        <p
          style="
            font-family: 'Circular Std', sans-serif;
            font-weight: 500;
            font-size: 1.5em;
            color: #3c4043;
            text-align: center;
          "
        >
          Are you sure?
        </p>
        <p
          style="
            color: #3c4043;
            text-align: center;
            font-size: 1.3em;
            opacity: 0.8;
          "
          v-if="withdrawalAmount && withdrawalAccount"
        >
          Please note that the sum of
          <i class="font-weight-bold">N{{ withdrawalAmount }}</i> will be
          withdrawn to {{ withdrawalAccount.account_number }} ({{
            withdrawalAccount.bank_name
          }})
          <i class="font-weight-bold">{{ withdrawalAccount.account_name }}</i>
        </p>
        <div v-if="!submitting" class="mt-4 d-flex justify-content-between">
          <b-button
            class="red-outline-btn w-100 mr-4"
            @click="$refs['confirm-withdraw-mobile'].hide()"
          >
            Cancel
          </b-button>
          <b-button class="primary-btn w-100" @click="submitRequest">
            Proceed
          </b-button>
        </div>
        <scale-loader v-else class="mt-4" :loading="true" :color="'#c221cf'" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    withdrawalAccount: { required },
    withdrawalAmount: { required },
    paymentProof: { required },
  },
  mounted() {
    this.txnRef = this.$route.query.reference;
    this.fetchProfile();
    this.fetchBankAccounts();
  },
  methods: {
    confirm() {
      this.$refs["withdraw"].hide();
      this.$refs["confirm-withdraw"].show();
    },
    confirmMobile() {
      this.$refs["withdraw-mobile"].hide();
      this.$refs["confirm-withdraw-mobile"].show();
    },
    async proceed() {
      if (this.card) {
        this.choosePayment = false;
        await this.addFundsCard();
      } else if (this.bankk) {
        this.choosePayment = false;
        await this.getSystemBankAccount();
      }
    },
    async addFundsCard() {
      this.settingUp = true;
      let data = new FormData();
      data.append("amount", parseInt(this.amount.replace(/,/g, "")));
      let cbUrl = `${this.callbackBaseUrl}/landlord-wallet`;
      data.append("callbackUrl", cbUrl);
      await this.apiPost(this.ROUTES.addFunds, data).then((res) => {
        const { success, message, data } = res.data;
        if (success) {
          this.apiSuccess("Payment Process Initiated", message);
          const { authorization_url } = data;
          let a = document.createElement("a");
          a.href = authorization_url;
          a.click();
        }
      });
      this.settingUp = false;
    },
    getSystemBankAccount() {
      const url = `${this.ROUTES.systemData}/bank account`;
      this.apiGet(url).then((res) => {
        const { system_data } = res.data.data;
        this.systemAccount = system_data.content;
        this.byBank = true;
      });
    },
    fetchProfile() {
      this.apiGet(this.ROUTES.profile).then((res) => {
        const { user } = res.data.data;
        this.$store.dispatch("auth/updateWalletBalance", {
          balance: user.wallet_balance,
        });
        this.walletBalance = this.$store.getters["auth/getWalletBalance"];
        if (this.txnRef) {
          this.$router.push({ name: "LandlordWallet" });
        }
      });
    },
    fetchBankAccounts() {
      this.apiGet(this.ROUTES.bankAccounts).then((res) => {
        const { success, data } = res.data;
        if (success) {
          const { bank_accounts } = data;
          this.bankAccounts = bank_accounts.data;
        }
      });
    },
    selectBankAccount() {
      this.selectBank = true;
    },
    confirmSelectBank() {},
    chooseWithdrawalBank(bankAccount) {
      this.withdrawalAccount = bankAccount;
      this.selectBank = false;
    },
    submit() {
      this.submitted = true;
      this.paymentProof = 1;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        this.confirm();
      }
    },
    submitMobile() {
      this.submitted = true;
      this.paymentProof = 1;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        this.confirmMobile();
      }
    },
    submitBankTransfer() {
      this.submitted = true;
      this.withdrawalAccount = 1;
      this.withdrawalAmount = "1";
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        const data = new FormData();
        data.append("amount", this.amount.replace(/,/g, ""));
        data.append("proof_of_payment[0]", this.paymentProof);
        this.apiPost(this.ROUTES.fundingRequests, data).then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.apiSuccess("Action Successful", message);
            this.byBank = false;
            this.$emit("request");
          }
        });
        this.withdrawalAccount = null;
        this.withdrawalAmount = null;
      }
    },
    submitRequest() {
      let data = new FormData();
      data.append("bank_account_id", this.withdrawalAccount.id);
      data.append(
        "amount",
        parseFloat(this.withdrawalAmount.replace(/,/g, ""))
      );
      data.append("reason", this.note);
      this.apiPost(this.ROUTES.withdrawalRequests, data).then((res) => {
        const { success, message } = res.data;
        if (success) {
          this.apiSuccess(message, "Our team will get back to you shortly.");
          this.$emit("request");
        }
        this.$refs["confirm-withdraw"].hide();
        this.$refs["confirm-withdraw-mobile"].hide();
      });
    },
    resetBankTransfer() {
      this.paymentProof = null;
      this.amount = null;
      this.$v.$reset();
    },
  },
  data() {
    return {
      walletBalance: this.$store.getters["auth/getWalletBalance"],
      depositAmount: false,
      choosePayment: false,
      amount: null,
      card: false,
      bankk: false,
      settingUp: false,
      txnRef: null,
      bankAccounts: [],
      withdrawalAccount: null,
      selectBank: false,
      withdrawalAmount: null,
      note: null,
      submitted: false,
      byBank: false,
      systemAccount: null,
      paymentProof: null,
    };
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  watch: {
    amount: function (newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.amount = result));
    },
    withdrawalAmount: function (newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.withdrawalAmount = result));
    },
  },
};
</script>

<style>
#p-controls {
  padding-top: 4.6em;
}
#p-controls-mobile {
  padding-top: 2.3em;
  text-align: center;
}
.wallet-balance {
  margin-top: 3em;
  padding: 2em;
  border: 1px solid #e0e0e0;
  box-shadow: 0 12px 51px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.wb-title {
  color: #3c4043;
  font-size: 0.9375em;
  opacity: 0.6;
  letter-spacing: -1px;
  margin-bottom: 0;
  margin-top: 1em;
}
.wb-subtitle {
  color: #3c4043;
  font-size: 2.25em;
}
.c-form-input,
.c-form-input:active,
.c-form-input:focus {
  background: #f5f4f5;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  height: 3.125em;
}
.wallet-outline-btn:hover,
.wallet-outline-btn:active,
.wallet-outline-btn:focus {
  background-color: #ffffff;
  border-color: #c221cf;
  color: #c221cf;
}
.red-outline-btn {
  background-color: #ffffff;
  border-color: #ff0000;
  color: #ff0000;
}
.red-outline-btn:hover,
.red-outline-btn:active,
.red-outline-btn:focus {
  background-color: #ffffff;
  border-color: #ff0000;
  color: #ffffff;
}
.pmt-method {
  background-color: #efeff3;
  transition: 0.5s ease;
}
.resend-otp {
  transition: 0.5s ease;
  margin-top: 2em;
}
.resend-otp:hover {
  cursor: pointer;
  opacity: 0.8;
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
</style>
