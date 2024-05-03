<template>
  <div class="mt-4 px-lg-4 px-2">
    <b-row>
      <b-col xl="6">
        <p style="color: #3c4043; letter-spacing: -0.02em">
          Prevent unauthorized access to your account by requesting
          authentication code during sign in.
        </p>
        <div
          style="border-bottom: 1px solid #c4c4c4"
          class="mt-5 mb-5 d-flex justify-content-between align-items-lg-center flex-lg-row flex-column"
        >
          <div>
            <p
              style="
                font-family: 'Circular Std', sans-serif;
                font-weight: 500;
                color: #3c4043;
                margin-bottom: 0;
              "
            >
              Email
            </p>
            <p style="color: #3c4043; opacity: 0.8">
              Set up your account to receive authentication codes via Email
            </p>
          </div>
          <div style="cursor: pointer">
            <b-form-checkbox
              @change="update2faStatus"
              class="mb-lg-0 mb-3"
              switch
              size="lg"
              v-model="twoFA"
              :value="true"
              :unchecked-value="false"
            />
          </div>
        </div>
      </b-col>
    </b-row>

    <!--    <div-->
    <!--      style="border-bottom: 1px solid #c4c4c4"-->
    <!--      class="mt-4 mb-4 d-flex justify-content-between align-items-lg-center flex-lg-row flex-column"-->
    <!--    >-->
    <!--      <div>-->
    <!--        <p-->
    <!--          style="-->
    <!--            font-family: 'Circular Std', sans-serif;-->
    <!--            font-weight: 500;-->
    <!--            color: #3c4043;-->
    <!--            margin-bottom: 0;-->
    <!--          "-->
    <!--        >-->
    <!--          SMS-->
    <!--        </p>-->
    <!--        <p style="color: #3c4043; opacity: 0.8">-->
    <!--          Set up your account to receive authentication codes via SMS-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <b-form-checkbox-->
    <!--        @change="check"-->
    <!--        class="mb-lg-0 mb-3"-->
    <!--        switch-->
    <!--        size="lg"-->
    <!--        v-model="value"-->
    <!--        value="accepted"-->
    <!--        unchecked-value="not_accepted"-->
    <!--        disabled-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div-->
    <!--      style="border-bottom: 1px solid #c4c4c4"-->
    <!--      class="mt-5 mb-5 d-flex justify-content-between align-items-lg-center flex-lg-row flex-column"-->
    <!--    >-->
    <!--      <div>-->
    <!--        <p-->
    <!--          style="-->
    <!--            font-family: 'Circular Std', sans-serif;-->
    <!--            font-weight: 500;-->
    <!--            color: #3c4043;-->
    <!--            margin-bottom: 0;-->
    <!--          "-->
    <!--        >-->
    <!--          Phone-->
    <!--        </p>-->
    <!--        <p style="color: #3c4043; opacity: 0.8">-->
    <!--          Set up your account to receive authentication codes via Phone call-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <b-form-checkbox-->
    <!--        @change="check"-->
    <!--        class="mb-lg-0 mb-3"-->
    <!--        switch-->
    <!--        disabled-->
    <!--        size="lg"-->
    <!--        v-model="value2"-->
    <!--        value="accepted"-->
    <!--        unchecked-value="not_accepted"-->
    <!--      />-->
    <!--    </div>-->

    <b-modal ref="2fa" size="lg" hide-footer hide-header centered>
      <div
        class="d-lg-block d-none"
        style="padding: 4em 10em; font-family: 'Circular Std Book', sans-serif"
      >
        <div class="d-flex align-items-start justify-content-center">
          <div>
            <div class="active-no">1</div>
            <p class="active-text">Confirm Number</p>
          </div>
          <div
            style="
              border-bottom: 1px solid #3c4043;
              width: 10em;
              margin: 2.8em 1.5em 1.5em 0;
              display: inline-block;
            "
          />
          <div>
            <div class="inactive-no">2</div>
            <p class="inactive-text">Enter Verification Code</p>
          </div>
        </div>
        <p class="confirm-title">Verify your phone number</p>
        <p class="confirm-subtitle">
          We would send an authentication code to this number when we need to
          authorize access to your account.
        </p>
        <b-form-group>
          <b-form-input class="c-form-input" v-model="country" />
        </b-form-group>
        <div class="d-flex">
          <b-form-group>
            <b-form-input
              class="c-form-input-ext mr-2"
              disabled
              placeholder="+234"
            />
          </b-form-group>
          <b-form-group>
            <b-form-input class="c-form-input-no" v-model="number" />
          </b-form-group>
        </div>
        <b-button class="primary-btn btn-lg btn-block">
          Send Verification Code
        </b-button>
      </div>
      <div class="d-lg-none">
        <div
          style="padding: 1em 2em; font-family: 'Circular Std Book', sans-serif"
        >
          <div
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <div class="active-no-mobile">1</div>
            <p class="active-text-mobile">Confirm Number</p>
          </div>
          <p class="confirm-title">Verify your phone number</p>
          <p class="confirm-subtitle">
            We would send an authentication code to this number when we need to
            authorize access to your account.
          </p>
          <b-form-group>
            <b-form-input class="c-form-input" v-model="country" />
          </b-form-group>
          <div class="d-flex">
            <b-form-group>
              <b-form-input
                class="c-form-input-ext mr-2"
                disabled
                placeholder="+234"
              />
            </b-form-group>
            <b-form-group>
              <b-form-input class="c-form-input-no-mobile" v-model="number" />
            </b-form-group>
          </div>
          <b-button class="primary-btn btn-block">
            Send Verification Code
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="confirmEmail"
      size="lg"
      hide-footer
      hide-header
      centered
      no-close-on-backdrop
    >
      <div
        class="d-lg-block d-none"
        style="padding: 4em 10em; font-family: 'Circular Std Book', sans-serif"
      >
        <div class="d-flex align-items-start justify-content-center">
          <div>
            <div :class="[currentPage === 1 ? 'active-no' : 'inactive-no']">
              1
            </div>
            <p :class="[currentPage === 1 ? 'active-text' : 'inactive-text']">
              Confirm Email
            </p>
          </div>
          <div
            style="
              border-bottom: 1px solid #3c4043;
              width: 10em;
              margin: 2.8em 1.5em 1.5em 0;
              display: inline-block;
            "
          />
          <div>
            <div :class="[currentPage === 2 ? 'active-no' : 'inactive-no']">
              2
            </div>
            <p :class="[currentPage === 2 ? 'active-text' : 'inactive-text']">
              Enter Verification Code
            </p>
          </div>
        </div>
        <p class="confirm-title">Verify your email address</p>
        <p class="confirm-subtitle">
          We will send an authentication code to this email when we need to
          authorize access to your account.
        </p>
        <b-form-group>
          <b-form-input class="c-form-input" v-model="currentEmail" disabled />
        </b-form-group>
        <scale-loader v-if="sendingCode" :loading="true" :color="'#c221cf'" />
        <b-button
          v-else
          class="primary-btn btn-lg btn-block"
          @click="sendVerificationCode"
        >
          Send Verification Code
        </b-button>
      </div>
      <div class="d-lg-none">
        <div
          style="padding: 1em 2em; font-family: 'Circular Std Book', sans-serif"
        >
          <div
            v-if="currentPage === 1"
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <div class="active-no-mobile">1</div>
            <p class="active-text-mobile">Confirm Email</p>
          </div>
          <div
            v-else-if="currentPage === 2"
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <div class="active-no-mobile">2</div>
            <p class="active-text-mobile">Enter Verification Code</p>
          </div>
          <p class="confirm-title">Verify your email address</p>
          <p class="confirm-subtitle">
            We will send an authentication code to this email when we need to
            authorize access to your account.
          </p>
          <b-form-group>
            <b-form-input
              class="c-form-input"
              v-model="currentEmail"
              disabled
            />
          </b-form-group>
          <b-button class="primary-btn btn-block" @click="sendVerificationCode">
            Send Verification Code
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "not_accepted",
      value2: "not_accepted",
      country: "Nigeria",
      number: "8184785903",
      twoFA: this.$store.getters["auth/get2faActive"],
      currentEmail: this.$store.getters["auth/getEmail"],
      currentPage: 1,
      confirmEmail: false,
      sendingCode: false,
    };
  },
  methods: {
    check() {
      if (this.value === "accepted" || this.value2 === "accepted") {
        this.$refs["2fa"].show();
      }
    },
    email() {
      if (this.twoFA) {
        this.confirmEmail = true;
      }
    },
    async sendVerificationCode() {
      this.sendingCode = true;
      await this.apiPost(this.ROUTES.resend2FA).then(() => {
        // console.log({ res });
      });
      this.sendingCode = false;
      // this.currentPage = 2;
    },
    update2faStatus() {
      this.apiPost(this.ROUTES.update2fa).then((res) => {
        const { success, message, data } = res.data;
        if (success) {
          this.apiSuccess("Action Successful", message);
          const { user } = data;
          const { is_2fa_active } = user;
          this.$store.dispatch("auth/update2faStatus", { is_2fa_active });
        }
      });
    },
  },
  mounted() {},
};
</script>

<style>
.active-no {
  height: 3.45em;
  width: 3.45em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #c221cf;
  padding: 0em;
  font-size: 1.5em;
  color: #ffffff;
  font-family: "Circular Std", sans-serif;
  font-weight: 700;
}
.active-no-mobile {
  height: 3em;
  width: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #c221cf;
  padding: 0em;
  font-size: 1.5em;
  color: #ffffff;
  font-family: "Circular Std", sans-serif;
  font-weight: 700;
}
.inactive-no {
  height: 3.45em;
  width: 3.45em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #c221cf;
  padding: 0em;
  font-size: 1.5em;
  color: #c221cf;
  font-family: "Circular Std", sans-serif;
  font-weight: 700;
}
.active-text {
  font-family: "Circular Std", sans-serif;
  color: #3c4043;
  font-weight: 700;
  text-align: center;
  margin-top: 0.8em;
  //width: 8em;
  letter-spacing: -0.02em;
  margin-left: -3em;
  width: 10.5em;
}
.active-text-mobile {
  font-family: "Circular Std", sans-serif;
  color: #3c4043;
  font-weight: 700;
  text-align: center;
  margin-top: 0.4em;
  width: 10.5em;
  letter-spacing: -0.02em;
}
.inactive-text {
  text-align: center;
  margin-top: 0.8em;
  width: 10.5em;
  letter-spacing: -0.02em;
  margin-left: -2.4em;
}
.confirm-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #3c4043;
  letter-spacing: -0.05em;
  margin-top: 1em;
  text-align: center;
}
.confirm-subtitle {
  color: #3c4043;
  letter-spacing: -0.02em;
  text-align: center;
  margin-top: 1em;
  margin-bottom: 2em;
}
.c-form-input,
.c-form-input:active,
.c-form-input:focus {
  background: #f5f4f5;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  height: 3.125em;
}
.c-form-input-ext {
  background: #f5f4f5;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  height: 3.125em;
  width: 4.3125em;
}
.c-form-input-no,
.c-form-input-no:active,
.c-form-input-no:focus {
  background: #f5f4f5;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  height: 3.125em;
  width: 23em;
}
.c-form-input-no-mobile,
.c-form-input-no-mobile:active,
.c-form-input-no-mobile:focus {
  background: #f5f4f5;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  height: 3.125em;
  width: 13.8em;
}
.custom-switch.b-custom-control-lg .custom-control-label::before,
.input-group-lg .custom-switch .custom-control-label::before {
  cursor: pointer;
}
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #c221cf;
  background-color: #c221cf;
}
</style>
