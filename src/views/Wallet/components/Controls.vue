<template>
  <div
    id="controls"
    class="d-flex justify-content-between align-items-center flex-lg-row flex-column wallet-balance"
  >
    <div class="mb-lg-0 mb-1">
      <p style="font-size: 1.125em; color: #3c4043" class="mb-0">
        Wallet balance
      </p>
      <p style="font-size: 2.25em; color: #3c4043; display: inline-block">
        {{ formatCurrency(walletBalance) }}
      </p>
      <!-- <span style="font-size: 1em">.00</span> -->
    </div>

    <div class="mb-lg-0 mb-4">
      <b-button
        class="primary-btn btn-lg"
        @click="$refs['deposit-amount'].show()"
      >
        <b-img
          class="mr-1"
          style="height: 1em; width: 2em"
          :src="require('../../../assets/icons/deposit-wallet.svg')"
        />
        Deposit Funds
      </b-button>
    </div>

    <div class="d-none">
      <b-button
        class="primary-outline-btn wallet-outline-btn btn-lg"
        @click="$refs['withdraw-amount'].show()"
      >
        <b-img
          class="mr-1"
          style="height: 1em"
          :src="require('../../../assets/icons/withdraw-wallet.svg')"
        />
        Withdraw Funds
      </b-button>
    </div>

    <!-- withdraw-amount modal -->
    <b-modal ref="withdraw-amount" hide-footer hide-header centered size="">
      <div
        id="wa-body"
        style="font-family: 'Circular Std Book', sans-serif; text-align: center"
        class="p-lg-5 px-2 py-1 d-flex justify-content-center align-items-center flex-column"
      >
        <p style="font-size: 1.5em; color: #3c4043; margin-top: 2em">
          How much do you want to withdraw from your account?
        </p>
        <b-form-group>
          <b-form-input
            class="c-form-input"
            placeholder="0.00"
            v-model.trim="withdraw.withdrawalAmount"
          />
          <div
            class="invalid-prompt"
            v-if="$v.withdraw.withdrawalAmount.$error"
          >
            <p class="invalid-text">Your withdrawal amount is required</p>
          </div>
        </b-form-group>
        <div
          class="mt-3 d-flex justify-content-center"
          style="margin-bottom: 2em"
        >
          <b-button
            class="red-outline-btn mr-2"
            @click="$refs['withdraw-amount'].hide()"
            style="width: 60%"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            style="width: 60%"
            @click="confirmWithdrawalAmount"
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- Enter Bank Details -->
    <b-modal ref="bank-details" hide-footer hide-header centered size="lg">
      <div
        class="p-lg-5 p-2"
        style="font-family: 'Circular Std Book', sans-serif"
      >
        <p
          style="
            font-family: 'Circular Std', sans-serif;
            font-size: 1.5em;
            color: #c221cf;
            margin-bottom: 0;
          "
        >
          Enter Bank Details
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please enter the bank account details you wish to withdraw your funds
          to.
        </p>
        <b-form-select
          v-model="bank.bank"
          :options="banks"
          style="height: 4.375em"
          class="ls-form-input mt-3"
        />
        <div class="invalid-prompt" v-if="submitted && $v.bank.bank.$error">
          <p class="invalid-text">Your bank is required</p>
        </div>
        <b-form-group>
          <b-form-input
            style="height: 4.375em"
            class="ls-form-input mt-3"
            placeholder="Recipient Account Number"
            v-model="bank.accountNumber"
            @input="verifyAccountNumber"
            @keypress="isNumber($event)"
            :disabled="verifying"
          />
          <div
            class="invalid-prompt"
            v-if="submitted && $v.bank.accountNumber.$error"
          >
            <p class="invalid-text">Your account number is required</p>
          </div>
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.bank.accountNumber.minLength"
          >
            <p class="invalid-text">
              Your account number must be 10 digits long
            </p>
          </div>
        </b-form-group>
        <b-form-group>
          <div style="position: relative">
            <b-form-input
              style="height: 4.375em"
              class="ls-form-input mt-3"
              placeholder="Account Name"
              disabled
              v-model="bank.accountName"
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
            v-if="submitted && $v.bank.accountName.$error"
          >
            <p class="invalid-text">Your account name is required</p>
          </div>
        </b-form-group>

        <b-form-textarea
          placeholder="Personalized Note (optional)"
          class="mt-3"
          style="height: 6.25em"
        />
        <div class="mt-4 mb-3 d-flex justify-content-between">
          <b-button
            class="red-outline-btn mr-2"
            style="width: 100%"
            @click="$refs['bank-details'].hide()"
          >
            Cancel
          </b-button>
          <b-button class="primary-btn" style="width: 100%" @click="submit">
            Transfer
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- select-exiting-bank -->
    <b-modal
      ref="select-exiting-bank"
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
          <div v-if="withdrawalAccount.account">
            <p style="color: #3c4043; margin-bottom: 0">
              {{ withdrawalAccount.account.bank_name }} ({{
                withdrawalAccount.account.account_number
              }})
            </p>
            <p style="color: #3c4043; opacity: 0.8; margin-bottom: 0">
              Account Name: {{ withdrawalAccount.account.account_name }}
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
        <b-alert show variant="info">
          Or User new bank
          <span
            style="text-decoration: underline; cursor: pointer"
            @click="
              $refs['bank-details'].show();
              $refs['select-exiting-bank'].hide();
              selectBank = false;
            "
          >
            here
          </span>
        </b-alert>
        <div
          class="invalid-prompt"
          v-if="submitted && $v.withdrawalAccount.account.$error"
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
            v-model.trim="withdraw.withdrawalAmount"
          />
          <div
            class="invalid-prompt"
            v-if="submitted && $v.withdraw.withdrawalAmount.$error"
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
            @click="$refs['select-exiting-bank'].hide()"
          >
            Cancel
          </b-button>

          <b-button class="primary-btn w-100" @click="moveToConfirmWithdraw">
            Withdraw
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- list-exiting-bank -->
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
            You haven't setup any bank accounts. enter new bank accounts
            <span
              style="text-decoration: underline; cursor: pointer"
              @click="
                $refs['bank-details'].show();
                $refs['select-exiting-bank'].hide();
                selectBank = false;
              "
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
                withdrawalAccount.account &&
                withdrawalAccount.account.id === bankAccount.id
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

    <!-- withdraw-confirmation -->
    <b-modal
      ref="withdraw-confirmation"
      hide-footer
      hide-header
      centered
      size="lg"
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 4em);
        "
      >
        <p
          style="
            font-family: 'Circular Std', sans-serif;
            font-size: 1.625em;
            color: #3c4043;
          "
        >
          Are you sure?
        </p>
        <p
          v-if="withdrawalAccount.account"
          style="color: #3c4043; font-size: 1.5em; opacity: 0.8"
        >
          Please note that the sum of
          <strong>{{ formatCurrency(withdraw.withdrawalAmount) }}</strong> will
          be transferred to {{ withdrawalAccount.account.account_number }} ({{
            withdrawalAccount.account.bank_name
          }}) {{ withdrawalAccount.account.account_name }}
        </p>
        <div class="mt-5 mb-3 d-flex justify-content-center">
          <b-button
            class="red-outline-btn mr-2"
            style="width: 40%"
            @click="$refs['withdraw-confirmation'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            style="width: 40%"
            @click="submitRequest"
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- withdraw-success -->
    <b-modal ref="withdraw-success" hide-footer hide-header centered size="">
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <b-img
          class="mt-1"
          fluid
          :src="require('../../../assets/icons/modal-success.svg')"
        />
        <p style="font-size: 1.5em; margin-top: 2em">
          You have successfully withdrawn the sum of
          <strong>{{ formatCurrency(withdraw.withdrawalAmount) }}</strong> to
          your bank account.
        </p>
        <b-button
          class="primary-btn mt-3 btn-lg"
          style="width: 40%"
          @click="closeSuccessWithdraw"
        >
          Go To Wallet
        </b-button>
      </div>
    </b-modal>

    <!-- deposit-amount -->
    <b-modal
      ref="deposit-amount"
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
        <b-form-input class="c-form-input" v-model="deposit.amount" />
        <div
          class="mt-4 w-100 d-flex justify-content-center"
          style="margin-bottom: 2em"
        >
          <b-button
            class="red-outline-btn w-100 mr-2"
            @click="$refs['deposit-amount'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn w-100"
            v-if="deposit.amount"
            @click="confirmDepositAmount"
          >
            Proceed
          </b-button>
          <b-button class="primary-btn w-100" v-else disabled>
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>
    <!-- <b-modal ref="deposit-amount" hide-footer hide-header centered size="">
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
        <b-form-input class="c-form-input" v-model="deposit.amount" />
        <div
          class="mt-3 d-flex justify-content-center"
          style="margin-bottom: 2em"
        >
          <b-button
            class="red-outline-btn mr-2"
            @click="$refs['deposit-amount'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            @click="
              confirmDepositAmount
            "
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal> -->

    <!-- choose-payment -->
    <b-modal ref="choose-payment" hide-footer hide-header centered size="">
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
          Please choose any of the payment methods below to fund your wallet
          with the sum of <strong> ₦ {{ deposit.amount }}</strong>
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
              href="#"
              @click="
                card = true;
                bankk = false;
              "
            >
              <b-img
                :src="require('../../../assets/icons/card-payment.svg')"
                class="mr-2"
              />
              Card Payment
            </b-list-group-item>
            <b-list-group-item
              class="pmt-method"
              href="#"
              @click="
                card = false;
                bankk = true;
              "
            >
              <b-img
                :src="require('../../../assets/icons/bank-payment.svg')"
                class="mr-2"
              />
              Bank Payment
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
            @click="$refs['choose-payment'].hide()"
          >
            Cancel
          </b-button>
          <b-button class="primary-btn" style="width: 100%" @click="proceed">
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- add-card -->
    <b-modal ref="add-card" hide-footer hide-header centered size="">
      <div
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Add Card Details
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          You will receive an OTP on your registered phone number to verify your
          card.
        </p>
        <div
          style="position: relative; margin-top: 2em"
          class="d-lg-block d-none"
        >
          <label
            style="
              text-transform: uppercase;
              font-size: 0.8em;
              position: absolute;
              top: 15%;
              left: 2%;
            "
          >
            Card Number
          </label>
          <b-form-input
            placeholder="0000 0000 0000 0000"
            style="height: 4.375em; padding-top: 2em"
          />
          <b-img
            fluid
            :src="require('../../../assets/icons/mastercard.svg')"
            style="height: 2.5em; position: absolute; left: 90%; bottom: 20%"
          />
        </div>
        <div style="position: relative; margin-top: 2em" class="d-lg-none">
          <label
            style="
              text-transform: uppercase;
              font-size: 0.8em;
              position: absolute;
              top: 15%;
              left: 4%;
            "
          >
            Card Number
          </label>
          <b-form-input
            placeholder="0000 0000 0000 0000"
            style="height: 4.375em; padding-top: 2em"
          />
          <b-img
            fluid
            :src="require('../../../assets/icons/mastercard.svg')"
            style="height: 2.5em; position: absolute; left: 80%; bottom: 20%"
          />
        </div>
        <div class="d-flex justify-content-center flex-lg-row flex-column">
          <div
            style="position: relative; margin-top: 2em"
            class="w-100 mr-lg-3"
          >
            <label
              style="
                text-transform: uppercase;
                font-size: 0.8em;
                position: absolute;
                top: 15%;
                left: 4%;
              "
            >
              Card Expiry
            </label>
            <b-form-input
              placeholder="MM/CYY"
              style="height: 4.375em; padding-top: 2em"
            />
          </div>
          <div style="position: relative; margin-top: 2em" class="w-100">
            <label
              style="
                text-transform: uppercase;
                font-size: 0.8em;
                position: absolute;
                top: 15%;
                left: 4%;
              "
            >
              CVV
            </label>
            <b-form-input
              placeholder="123"
              style="height: 4.375em; padding-top: 2em"
            />
          </div>
        </div>
        <b-form-checkbox
          class="mt-3"
          id="checkbox-1"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
        >
          Set as default payment method
        </b-form-checkbox>
        <div
          class="mt-5 d-flex justify-content-center"
          style="margin-bottom: 2em"
        >
          <b-button
            class="red-outline-btn mr-2"
            style="width: 100%"
            @click="$refs['add-card'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            style="width: 100%"
            @click="
              $refs['add-card'].hide();
              $refs['enter-otp'].show();
            "
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- enter-otp -->
    <b-modal ref="enter-otp" hide-footer hide-header centered size="">
      <div
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
          text-align: center;
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Enter OTP
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please enter the one time otp code that has been sent to your email
          and registered phone number. Do not disclose code to anyone.
        </p>
        <div class="mt-4 d-flex justify-content-center">
          <b-form-input
            size="lg"
            placeholder="*"
            style="
              width: 4em;
              height: 4em;
              border-radius: 10px;
              text-align: center;
            "
            class="mr-3"
          />
          <b-form-input
            size="lg"
            placeholder="*"
            style="
              width: 4em;
              height: 4em;
              border-radius: 10px;
              text-align: center;
            "
            class="mr-3"
          />
          <b-form-input
            size="lg"
            placeholder="*"
            style="
              width: 4em;
              height: 4em;
              border-radius: 10px;
              text-align: center;
            "
            class="mr-3"
          />
          <b-form-input
            size="lg"
            placeholder="*"
            style="
              width: 4em;
              height: 4em;
              border-radius: 10px;
              text-align: center;
            "
          />
        </div>
        <div
          class="mt-5 d-flex justify-content-center"
          style="margin-bottom: 2em"
        >
          <b-button
            class="red-outline-btn mr-2"
            style="width: 30%"
            @click="$refs['enter-otp'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            style="width: 30%"
            @click="
              $refs['enter-otp'].hide();
              $refs['confirm-card'].show();
            "
          >
            Proceed
          </b-button>
        </div>
        <p class="resend-otp">Resend code in 00:20</p>
      </div>
    </b-modal>

    <!-- confirm-card -->
    <b-modal ref="confirm-card" hide-footer hide-header centered size="">
      <div
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
          text-align: center;
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Are you sure?
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please note that the sum of <strong>N240,000.00</strong> will be
          charged directly from your credit card.
        </p>
        <div class="mt-5 d-flex justify-content-center">
          <b-button
            class="red-outline-btn mr-2"
            style="width: 40%"
            @click="$refs['confirm-card'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            style="width: 40%"
            @click="
              $refs['confirm-card'].hide();
              $refs['card-success'].show();
            "
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- card-success -->
    <b-modal ref="card-success" hide-footer hide-header centered size="">
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <b-img
          class="mt-1"
          fluid
          :src="require('../../../assets/icons/modal-success.svg')"
        />
        <p style="font-size: 1.5em; margin-top: 2em">
          You have successfully funded your wallet with
        </p>
        <p style="font-size: 2em">&#8358; 240,000.00</p>
        <b-button
          class="primary-btn mt-3 btn-lg"
          style="width: 40%"
          @click="$refs['card-success'].hide()"
        >
          Go To Wallet
        </b-button>
      </div>
    </b-modal>

    <!-- authenticate-payment -->
    <b-modal
      ref="authenticate-payment"
      hide-footer
      hide-header
      centered
      size="lg"
    >
      <div
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
          text-align: center;
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Authenticate Payment
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please tap the button below to authenticate with your bank.
        </p>
        <div class="mt-5 d-flex justify-content-center">
          <b-button
            class="red-outline-btn mr-2"
            style="width: 40%"
            @click="$refs['authenticate-payment'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            style="width: 40%"
            @click="
              $refs['authenticate-payment'].hide();
              $refs['confirm-payment'].show();
            "
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- confirm-payment -->
    <b-modal ref="confirm-payment" hide-footer hide-header centered size="">
      <div
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
          text-align: center;
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Are you sure?
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please note that the sum of
          <strong>₦ {{ deposit.amount }}</strong> will be charged directly from
          your credit card.
        </p>
        <div class="mt-5 d-flex justify-content-center">
          <b-button
            class="red-outline-btn mr-2"
            style="width: 40%"
            @click="$refs['confirm-payment'].hide()"
          >
            Cancel
          </b-button>
          <b-button
            class="primary-btn"
            style="width: 40%"
            @click.prevent="submitCardDeposit"
          >
            Proceed
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- bank-success -->
    <b-modal ref="list-cards" hide-footer hide-header centered size="">
      <div
        class=""
        style="text-align: center;font-family: 'Circular Std Book', sans-serif; padding: 20px min-height: 200px;"
      >
        <h1 class=" ">Cards</h1>
        <h5>Choose which card to use</h5>
        <b-row cols="2">
          <b-col
            class="position-relative text-white"
            v-for="(card, index) in cards"
            :key="index"
          >
            <b-img
              class="mt-1"
              rounded
              fluid
              :src="require('../../../assets/images/card_bg.svg')"
            />
            <div
              @click="payWithAnExitingCard(card.id)"
              style="inset: 0px 0px 0px 0px"
              class="position-absolute d-flex flex-column align-items-baseline p-4"
            >
              <h4 class="font-weight-bold">{{ card.bank }}</h4>
              <div class="d-flex align-items-center pt-4">
                <b-img
                  class="pr-3"
                  :src="require('../../../assets/images/chip.png')"
                />
                <h3 class="">
                  {{ card.first_6digits }} ******** {{ card.last_4digits }}
                </h3>
              </div>
              <h5 class="pt-3">
                {{ card.expiry_month }} - {{ card.expiry_year }}
              </h5>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <!-- bank-success -->
    <b-modal ref="bank-success" hide-footer hide-header centered size="">
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <b-img
          class="mt-1"
          fluid
          :src="require('../../../assets/icons/modal-success.svg')"
        />
        <p style="font-size: 1.5em; margin-top: 2em">
          You have successfully funded your wallet with
        </p>
        <p style="font-size: 2em">₦ {{ deposit.amount }}</p>
        <b-button
          class="primary-btn mt-3 btn-lg"
          style="width: 40%"
          @click="closeSuccessCardPayment"
        >
          Go To Wallet
        </b-button>
      </div>
    </b-modal>

    <!-- wallet-funding-success -->
    <b-modal
      ref="wallet-funding-success"
      hide-footer
      hide-header
      centered
      size=""
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: 40px;
        "
      >
        <b-img
          class="mt-1"
          fluid
          :src="require('../../../assets/icons/modal-success.svg')"
        />
        <p style="font-size: 1em; margin-top: 2em">
          Your request to fund your wallet with ₦ {{ deposit.amount }} is
          awaiting approver from the admin this might take less than 10mins
        </p>
        <b-button
          class="primary-btn mt-3 btn-lg"
          style="width: 40%"
          @click="closeSuccessBankPayment"
        >
          Go To Wallet
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="bank-failed" hide-footer hide-header centered size="">
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <b-img
          class="mt-1"
          fluid
          :src="require('../../../assets/icons/txn-failure.svg')"
        />
        <p style="font-size: 1.5em; margin-top: 2em">
          Your transaction of {{ formatCurrency(deposit.amount) }} failed
        </p>
        <!-- <p style="font-size: 2em">{{formatCurrency(amount)}}</p> -->
        <b-button
          class="primary-btn mt-3 btn-lg"
          style="width: 40%"
          @click="closeFailedCardPayment"
        >
          Go To Wallet
        </b-button>
      </div>
    </b-modal>

    <b-modal ref="insufficient-fund" hide-footer centered size="">
      <div id="successfully-paid">
        <b-img
          fluid
          :src="require('../../../assets/icons/txn-failure.svg')"
          class="mb-5"
        />
        <div class="successfully-paid-text">
          insufficient Funds please enter amount less or equal to your balance
        </div>
        <b-button
          class="primary-btn btn-lg successfully-paid-btn mt-5"
          @click="$refs['insufficient-fund'].hide()"
        >
          close
        </b-button>
      </div>
    </b-modal>

    <b-modal
      v-model="modalShowBank"
      hide-footer
      hide-header
      centered
      size=""
      no-close-on-esc
      no-close-on-backdrop
      @hidden="resetBankTransfer"
    >
      <form
        @submit.prevent="payWithBank"
        style="
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(1em, 5vw, 4em);
        "
      >
        <p style="font-family: 'Circular Std', sans-serif; font-size: 1.5em">
          Bank Transfer
        </p>
        <p style="color: #3c4043; opacity: 0.8">
          Please transfer the sum of <strong> ₦{{ deposit.amount }} </strong> to
          the account below and send us your proof of payment.
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
          class="mt-3 mb-3 signup-file"
          placeholder="Proof of Payment"
          multiple
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
            @click="modalShowBank = false"
          >
            Cancel
          </b-button>
          <b-button class="primary-btn" style="width: 100%" type="submit">
            Submit
          </b-button>
        </div>
      </form>
    </b-modal>

    <!-- <b-modal v-model="modalShowBank" hide-footer centered size="">

      <div class="d-flex align-items-center justify-content-center" style="font-size: 2rem;">
        ₦ {{ deposit.amount  }}
      </div>
      <div style="padding: 0 40px">
        <b-form-group
          :id="`fieldset-${1}`"
          :label-for="`input-${1}`"
        >
          <b-form-file
            v-model="proof_of_payment"
            class="landlord-kyc-file mt-4"
            multiple
            size="lg"
            :placeholder="'Proof of payment'"
          />
        </b-form-group>
      </div>
      <div class="d-flex align-items-center justify-content-center pt-4 pb-3">
        <b-button
            class="red-outline-btn btn-lg mr-5"
            style="width: 140px"
            @click="modalShowBank = !modalShowBank"
          >
            Cancel
          </b-button>
        <b-button
          class="primary-btn btn-lg successfully-paid-btn"
          style="width: 140px"
          @click="payWithBank"
        >
          Submit
        </b-button>
      </div>
    </b-modal> -->
  </div>
</template>

<script>
import banks from "../../LandlordSettings/BankAccounts/banks.json";
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapMutations } from "vuex";
export default {
  // props: ['apartment'],
  validations: {
    bank: {
      bank: { required },
      accountNumber: { required, minLength: minLength(10) },
      accountName: { required },
    },
    withdraw: {
      withdrawalAmount: { required },
    },
    withdrawalAccount: {
      account: { required },
    },
    deposit: {
      amount: { required },
    },
    paymentProof: { required },
  },
  data() {
    return {
      bank: {
        bank: null,
        accountNumber: null,
        accountName: null,
      },
      modalShowBank: false,
      accountNumber: null,
      accountName: null,
      verifying: false,
      submitted: false,
      card: false,
      bankk: false,
      bankAccounts: [],
      selectBank: false,
      note: null,
      withdrawalAccount: {
        account: null,
      },
      withdraw: {
        withdrawalAmount: null,
      },
      deposit: {
        amount: null,
      },
      banks: [],
      cards: [],
      paymentProof: [],
      systemAccount: null,
    };
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      walletBalance: "auth/getWalletBalance",
    }),
  },
  methods: {
    getSystemBankAccount() {
      const url = `${this.ROUTES.systemData}/bank account`;
      this.apiGet(url).then((res) => {
        // console.log({ res });
        const { system_data } = res.data.data;
        this.systemAccount = system_data.content;
        this.modalShowBank = true;
      });
    },
    resetBankTransfer() {
      this.paymentProof = null;
      // this.deposit.amount = null;
      this.$v.$reset();
    },
    closeSuccessBankPayment() {
      this.deposit.amount = null;
      this.proof_of_payment = [];
      this.$refs["wallet-funding-success"].hide();
    },
    async payWithBank() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.paymentProof.$invalid) {
        this.apiInvalidForm();
      } else {
        const formData = new FormData();

        formData.append(
          "amount",
          parseFloat(this.deposit.amount.replace(/,/g, ""))
        );
        if (this.paymentProof.length > 0) {
          this.paymentProof.forEach((paymentProof, index) => {
            formData.append(`proof_of_payment[${index}]`, paymentProof);
          });
        }

        const url = `user/wallet-funding-requests/`;
        await this.apiPost(url, formData);

        this.modalShowBank = false;
        this.$refs["wallet-funding-success"].show();
      }
    },
    moveToConfirmWithdraw() {
      this.$v.$touch();
      if (this.$v.withdrawalAccount.account.$invalid) {
        this.apiInvalidForm();
      } else {
        this.$refs["withdraw-confirmation"].show();
      }
    },
    submit() {
      // console.log(walletBalance < Number(this.withdrawalAccount.account))
      // if(walletBalance < Number(this.withdrawalAccount.account)) {
      //   return
      // }else {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.bank.bank.$invalid) {
        this.apiInvalidForm();
      } else {
        let data = new FormData();
        data.append("bank_name", this.bank.bank.name);
        data.append("account_number", this.bank.accountNumber);
        data.append("account_name", this.bank.accountName);
        this.apiPost(this.ROUTES.bankAccounts, data).then((res) => {
          // console.log(res.data);
          const { success, message, data } = res.data;
          if (success) {
            this.withdrawalAccount.account = data.bank_account;
            this.apiSuccess("Action Successful", message);
            // this.fetchBankAccounts();
            this.$refs["withdraw-confirmation"].show();
          }
        });
      }
    },
    async submitRequest() {
      let data = new FormData();
      data.append("bank_account_id", this.withdrawalAccount.account.id);
      data.append(
        "amount",
        parseFloat(this.withdraw.withdrawalAmount.replace(/,/g, ""))
      );
      data.append("reason", this.note);
      await this.apiPost(this.ROUTES.withdrawalRequests, data).then((res) => {
        const { success, message } = res.data;
        if (success) {
          this.apiSuccess(message, "Our team will get back to you shortly.");
        }
        this.$refs["bank-details"].hide();
        this.$refs["select-exiting-bank"].hide();
        this.$refs["withdraw-success"].show();

        this.formReset();
      });
    },
    chooseWithdrawalBank(bankAccount) {
      this.withdrawalAccount.account = bankAccount;
      this.selectBank = false;
    },
    async fetchBankAccounts() {
      await this.apiGet(this.ROUTES.bankAccounts).then((res) => {
        const { success, data } = res.data;
        if (success) {
          const { bank_accounts } = data;
          this.bankAccounts = bank_accounts.data;
        }
      });
    },
    confirmDepositAmount() {
      this.$v.$touch();
      if (this.$v.deposit.$invalid) {
        this.apiInvalidForm();
      } else {
        this.$refs["deposit-amount"].hide();
        this.$refs["choose-payment"].show();
      }
    },
    selectBankAccount() {
      this.selectBank = true;
    },
    confirmWithdrawalAmount() {
      this.$v.$touch();
      if (this.$v.withdraw.$invalid) {
        this.apiInvalidForm();
      } else if (
        Number(this.walletBalance) < Number(this.withdraw.withdrawalAmount)
      ) {
        this.$refs["insufficient-fund"].show();
      } else {
        this.$refs["withdraw-amount"].hide();
        this.$refs["select-exiting-bank"].show();
      }
    },
    verifyAccountNumber() {
      if (this.bank.accountNumber.toString().length === 10) {
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
    async paystackVerify() {
      this.verifying = true;
      this.accountName = null;
      // eslint-disable-next-line no-undef
      await axios
        .get(
          `https://api.paystack.co/bank/resolve?account_number=${this.bank.accountNumber}&bank_code=${this.bank.bank.code}`,
          {
            headers: {
              Authorization: `Bearer sk_test_23803a403bcf66fca0408366515471864b8aa924`,
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
            this.bank.accountName = data.account_name;
            // console.log(data);
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
    formReset() {
      this.submitted = false;
      this.bank.bank = null;
      this.bank.accountNumber = null;
      this.bank.accountName = null;
      this.$v.$reset();
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
    closeSuccessCardPayment() {
      this.$refs["bank-success"].hide();
      this.amount = null;
    },
    closeSuccessWithdraw() {
      this.$refs["withdraw-success"].hide();
      this.$refs["withdraw-confirmation"].hide();
      this.withdraw.withdrawalAmount = null;
      this.withdrawalAccount.account = null;
    },
    closeFailedCardPayment() {
      this.$refs["bank-failed"].hide();
      this.amount = null;
    },
    ...mapMutations({
      SET_WALLET_BALANCE: "auth/SET_WALLET_BALANCE",
      SET_HISTORIES: "wallet/SET_HISTORIES",
    }),
    formatCurrency(number) {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(number);
    },
    proceed() {
      if (this.card) {
        this.$refs["choose-payment"].hide();
        this.$refs["confirm-payment"].show();
      } else if (this.bankk) {
        this.$refs["choose-payment"].hide();
        this.getSystemBankAccount();
      }
    },
    async payWithAnExitingCard(id) {
      try {
        const formData = new FormData();
        formData.append("amount", this.deposit.amount);
        formData.append("callbackUrl", "https://apptest.ourspace.ng/wallet");
        formData.append("payment_card_id", id);
        const url = `user/wallet/add-funds-with-paystack`;

        const { data } = await this.apiPost(url, formData);

        const { status } = data.data;

        if (status === "success") {
          const user = await this.apiGet("user");

          this.SET_WALLET_BALANCE(user.data.data.user.wallet_balance);

          const url = `user/wallet-history`;

          const { data } = await this.apiGet(url);

          this.SET_HISTORIES(data.data.wallet_history.data);

          this.$refs["list-cards"].hide();
          this.$refs["bank-success"].show();

          // this.amount = null
        } else {
          this.$refs["list-cards"].hide();
          this.$refs["bank-failed"].show();
        }
      } catch (err) {
        // console.log(err);
      }
    },
    async submitCardDeposit() {
      try {
        const formData = new FormData();
        formData.append(
          "amount",
          parseFloat(this.deposit.amount.replace(/,/g, ""))
        );
        formData.append("callbackUrl", "https://apptest.ourspace.ng/wallet");
        const url = `user/wallet/add-funds-with-paystack`;

        const { data } = await this.apiPost(url, formData);

        const { authorization_url } = data.data;

        window.location.href = authorization_url;
        // const getCardsurl = `user/payment-cards`;

        // const res = await this.apiGet(getCardsurl);

        // const { payment_cards } = res.data.data;

        // if (payment_cards.data.length > 0) {
        //   this.cards = payment_cards.data;

        //   this.$refs["list-cards"].show();
        //   this.$refs["confirm-payment"].hide();
        // } else {
        //   const { data } = await this.apiPost(url, formData);

        //   const { authorization_url } = data.data;

        //   window.location.href = authorization_url;
        // }

        //

        // this.$refs['confirm-payment'].hide();
        // this.$refs['bank-success'].show();
      } catch (err) {
        // console.log(err);
      }
    },
  },
  watch: {
    "deposit.amount": function (newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.deposit.amount = result));
      // console.log(result);
    },
    withdrawalAmount: function (newValue) {
      const result = newValue
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.withdrawalAmount = result));
    },
  },
  async mounted() {
    // SET_HISTORIES
    try {
      const url = `user/wallet-history`;
      const user = await this.apiGet("user");

      this.SET_WALLET_BALANCE(user.data.data.user.wallet_balance);
      const { data } = await this.apiGet(url);

      this.SET_HISTORIES(data.data.wallet_history.data);

      this.listBanks();
      this.fetchBankAccounts();
    } catch (err) {
      // console.log(err);
    }
  },
};
</script>

<style>
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

#successfully-paid {
  text-align: center;
  padding: 4em;
}
.successfully-paid-text {
  font-family: "Circular Std Book", sans-serif;
  font-size: 1.5em;
  color: #3c4043;
}
.successfully-paid-btn {
  font-family: "Circular Std Book", sans-serif;
  padding-left: 2em;
  padding-right: 2em;
}

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
