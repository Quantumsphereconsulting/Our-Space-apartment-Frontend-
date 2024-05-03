<template>
  <div>
    <div>
      <div id="m-controls" class="d-lg-block d-none">
        <div class="d-flex flex-xl-row flex-column justify-content-between">
          <p style="font-size: 1.5em; color: #c221cf">
            <span class="mr-2"> Settings </span>
          </p>
          <p
            class="logout d-flex align-items-start"
            @click="confirmLogout = true"
          >
            <b-img class="mr-3" :src="require('@/assets/icons/logout.svg')" />
            <span style="color: #c221cf"> Logout </span>
          </p>
        </div>
      </div>
      <div id="m-controls-mobile" class="d-lg-none">
        <div class="d-flex flex-xl-row flex-column justify-content-between">
          <p style="font-size: 1.2em; color: #c221cf">
            <span class="mr-2"> Settings </span>
          </p>
        </div>
      </div>
    </div>
    <div id="ls-controls">
      <div
        class="d-flex flex-lg-row flex-column"
        style="border-bottom: 0.01em solid #cfcfcf; margin-bottom: 3em"
      >
        <div
          class="d-flex flex-column mb-lg-0 mb-2"
          @click="$router.push({ name: 'LandlordProfileDetails' })"
        >
          <p
            class="mb-1 text-center control-item"
            :class="{
              'control-item-active': $route.name === 'LandlordProfileDetails',
            }"
          >
            Profile Details
          </p>
          <b-img
            v-if="$route.name === 'LandlordProfileDetails'"
            :src="require('@/assets/icons/history-tab-active.svg')"
          />
          <b-img
            v-else
            :src="require('@/assets/icons/history-tab-inactive.svg')"
          />
        </div>
        <div
          class="d-flex flex-column"
          @click="$router.push({ name: 'LandlordBankAccounts' })"
        >
          <p
            class="mb-1 text-center control-item"
            :class="{
              'control-item-active': $route.name === 'LandlordBankAccounts',
            }"
          >
            Bank Accounts
          </p>
          <b-img
            v-if="$route.name === 'LandlordBankAccounts'"
            :src="require('@/assets/icons/history-tab-active.svg')"
          />
          <b-img
            v-else
            :src="require('@/assets/icons/history-tab-inactive.svg')"
          />
        </div>
        <div
          class="d-flex flex-column"
          @click="$router.push({ name: 'LandlordSecurity' })"
        >
          <p
            class="mb-1 text-center control-item"
            :class="{
              'control-item-active': $route.name === 'LandlordSecurity',
            }"
          >
            Security
          </p>
          <b-img
            v-if="$route.name === 'LandlordSecurity'"
            :src="require('@/assets/icons/history-tab-active.svg')"
          />
          <b-img
            v-else
            :src="require('@/assets/icons/history-tab-inactive.svg')"
          />
        </div>
        <div
          class="d-flex flex-column"
          @click="$router.push({ name: 'LandlordNotifications' })"
        >
          <p
            class="mb-1 text-center control-item"
            :class="{
              'control-item-active': $route.name === 'LandlordNotifications',
            }"
          >
            Notifications
          </p>
          <b-img
            v-if="$route.name === 'LandlordNotifications'"
            :src="require('@/assets/icons/history-tab-active.svg')"
          />
          <b-img
            v-else
            :src="require('@/assets/icons/history-tab-inactive.svg')"
          />
        </div>
      </div>
    </div>
    <b-modal
      ref="logging-out"
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
          Please wait, you are being logged out of your account...
        </p>
      </div>
    </b-modal>
    <b-modal
      v-model="confirmLogout"
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
        <fa-icon
          :icon="['fas', 'exclamation-triangle']"
          class="text-danger"
          style="font-size: 4em"
        />
        <p style="font-size: 1.5em; margin-top: 1em; margin-bottom: 0">
          Are you sure?
        </p>
        <p>This will end your current session on OurSpace</p>
        <div class="d-flex justify-content-center mt-4">
          <b-button
            class="btn secondary-outline-btn mr-3 w-100"
            @click="confirmLogout = false"
          >
            Cancel
          </b-button>
          <b-button class="btn primary-btn w-100" @click="logout">
            Confirm
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
      confirmLogout: false,
    };
  },
  methods: {
    logout() {
      this.$refs["logging-out"].show();
      this.apiPost(this.ROUTES.logout, {})
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.$refs["logging-out"].hide();
            this.$store.dispatch("auth/clearSession");
            this.$router.push({ name: "Login" }).then(() => {
              this.apiSuccess(message, "Thank you for using Our Space");
            });
          }
        })
        .catch()
        .then(() => {
          this.$refs["logging-out"].hide();
          this.$store.dispatch("auth/clearSession");
          this.$router.push({ name: "Login" }).then(() => {
            this.apiSuccess(
              "You have logged out successfully",
              "Thank you for using Our Space"
            );
          });
        });
    },
  },
};
</script>

<style>
#ls-controls {
  margin-top: 2em;
  margin-bottom: 3em;
}
.control-item {
  font-size: 1.125em;
  color: #3c4043;
  opacity: 0.5;
  transition: 0.5s ease;
}
.control-item-active {
  color: #c221cf;
  opacity: 1;
}
.control-item:hover {
  cursor: pointer;
}
#m-controls {
  padding-top: 4.6em;
}
#m-controls-mobile {
  padding-top: 2.3em;
  text-align: center;
}
.back {
  transition: 0.5s ease;
}
.back:hover {
  opacity: 0.8;
  cursor: pointer;
}
.logout:hover {
  cursor: pointer;
}
</style>
