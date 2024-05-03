<template>
  <b-container fluid id="mobile-main-nav">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <span style="color: #3c4043; opacity: 0.8; font-size: 1.25em">
          Hello,
        </span>
        <p class="my-0">
          <span
            style="
              font-family: 'Circular Std', sans-serif;
              font-weight: bold;
              color: #3c4043;
              font-size: 1.25em;
            "
          >
            {{ lastname }}!
          </span>
        </p>
      </div>

      <div class="d-flex">
        <div
          class="notification-mobile"
          @click="$router.push({ name: 'LandlordNotifications' })"
        >
          <b-img
            fluid
            style="width: 1.2em"
            :src="require('../assets/icons/notifications.svg')"
          />
          <div class="indicator"></div>
        </div>
        <b-dropdown
          no-caret
          :right="true"
          class="avatar-wrapper"
          variant="link"
          toggle-class="text-decoration-none"
        >
          <template #button-content>
            <b-img :src="avatar" class="avatar" />
          </template>

          <b-dropdown-item
            id="first-item"
            href="javascript:void(0)"
            @click="$router.push({ name: 'LandlordApartments' })"
          >
            <fa-icon :icon="['fas', 'home']" class="mr-2" />
            My Apartments
          </b-dropdown-item>
          <b-dropdown-item
            href="javascript:void(0)"
            @click="$router.push({ name: 'LandlordTenants' })"
          >
            <fa-icon :icon="['fas', 'user']" class="mr-2" /> My Tenants
          </b-dropdown-item>
          <b-dropdown-item
            href="javascript:void(0)"
            @click="$router.push({ name: 'LandlordWallet' })"
          >
            <fa-icon :icon="['fas', 'wallet']" class="mr-2" />
            Wallet
          </b-dropdown-item>
          <b-dropdown-item
            href="javascript:void(0)"
            @click="$router.push({ name: 'LandlordProfileDetails' })"
          >
            <fa-icon :icon="['fas', 'cog']" class="mr-2" />
            Settings
          </b-dropdown-item>
          <b-dropdown-item href="javascript:void(0)">
            <fa-icon :icon="['far', 'question-circle']" class="mr-2" />
            Help
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item
            href="javascript:void(0)"
            @click="$router.push({ name: 'Apartments' })"
          >
            <fa-icon :icon="['fas', 'outdent']" class="mr-2" />
            Switch to Tenant
          </b-dropdown-item>
          <b-dropdown-item
            id="last-item"
            href="javascript:void(0)"
            @click="confirmLogout = true"
          >
            <fa-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
            Logout
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <!--    <div class="mt-4">-->
    <!--      <div style="position: relative">-->
    <!--        <infinite-search-->
    <!--          :data-source="currentOptions"-->
    <!--          :value="currentValue"-->
    <!--          v-on:select="handleOnSelect"-->
    <!--        />-->
    <!--        <fa-icon :icon="['fas', 'search']" class="search-mobile" />-->
    <!--      </div>-->
    <!--    </div>-->
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
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
// import VueInfiniteAutocomplete from "vue-infinite-autocomplete";

export default {
  components: {},
  computed: {
    ...mapGetters({
      lastname: "auth/getLastname",
      avatar: "auth/getAvatar",
      isGoogleAuth: "auth/getIsGoogleAuth",
    }),
  },
  mounted() {
    this.fetchApartments();
  },
  data() {
    return {
      currentValue: "",
      currentOptions: [],
      confirmLogout: false,
    };
  },
  methods: {
    fetchApartments() {
      const url = `${this.ROUTES.apartment}`;
      this.currentOptions = [];
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        if (apartments) {
          apartments.data.forEach((apartment) => {
            this.currentOptions.push({
              text: apartment.name,
              id: apartment.slug,
            });
          });
        }
      });
    },
    async logout() {
      this.$refs["logging-out"].show();
      this.apiPost(this.ROUTES.logout, {}).then(async (res) => {
        const { success, message } = res.data;
        if (success) {
          this.$refs["logging-out"].hide();
          await this.$store.dispatch("auth/clearSession");
          if (this.isGoogleAuth) {
            await this.$gAuth.signOut();
            await this.$store.dispatch("auth/clearGoogleSession");
          }
          this.$router.push({ name: "Login" }).then(() => {
            this.apiSuccess(message, "Thank you for using Our Space");
          });
        }
      });
    },
    handleOnSelect(selectedValue) {
      if (selectedValue) {
        this.$router.push({
          name: "PreviewLandlordApartments",
          params: { slug: selectedValue.id },
        });
      }
    },
  },
};
</script>

<style>
#mobile-main-nav {
  margin-top: 2em;
}

.search-mobile {
  position: absolute;
  bottom: 35%;
  left: 90%;
  font-size: 1.2em;
  opacity: 0.7;
}
.notification-mobile {
  position: relative;
  background-color: #f5f4ff;
  padding: 1em 1.2em 1em 1.2em;
  border-radius: 10px;
  height: 3.5em;
  width: 3.5em;
  margin-right: 0.6em;
}
</style>
