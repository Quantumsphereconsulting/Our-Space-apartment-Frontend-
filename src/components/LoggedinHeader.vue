<template>
  <b-navbar
    toggleable="lg"
    sticky
    :class="[
      $route.name === 'Home' ||
      $route.name === 'Blog' ||
      $route.name === 'ViewBlog' ||
      $route.name === 'About' ||
      $route.name === 'Login' ||
      $route.name === 'SignUp' ||
      $route.name === 'ForgotPassword' ||
      $route.name === 'ResetPassword' ||
      $route.name === 'PrivacyPolicy' ||
      $route.name === 'Terms'
        ? 'menubar-home'
        : 'menubar',
    ]"
  >
    <b-container>
      <b-navbar-brand>
        <router-link to="/">
          <b-img
            style="height: 35px; width: auto"
            :src="require('@/assets/logos/our-space-logo-large.svg')"
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="justify-content-end" is-nav>
        <b-navbar-nav>
          <b-nav-item
            class="menubar-items"
            href="javascript:void(0)"
            @mouseenter="apartments = true"
            @mouseleave="apartments = false"
            @click="routeMenu('apartments')"
          >
            Apartments
            <transition name="fade">
              <div
                v-if="
                  apartments ||
                  $route.name === 'Apartments' ||
                  $route.name === 'ViewApartment'
                "
                class="dot"
                style="margin-left: 34px"
              />
            </transition>
          </b-nav-item>
          <b-nav-item
            class="menubar-items"
            href="#"
            @mouseenter="howItWorks = true"
            @mouseleave="howItWorks = false"
            @click="routeMenu('howItWorks')"
          >
            How It Works
            <transition name="fade">
              <div v-if="howItWorks" class="dot" style="margin-left: 36px" />
            </transition>
          </b-nav-item>

          <b-nav-item
            class="menubar-items"
            href="#"
            @mouseenter="listYourApartment = true"
            @mouseleave="listYourApartment = false"
            @click="routeMenu('listYourApartment')"
          >
            List Your Apartment
            <transition name="fade">
              <div
                v-if="listYourApartment"
                class="dot"
                style="margin-left: 50px"
              />
            </transition>
          </b-nav-item>
          <b-nav-item
            class="menubar-items mx-2"
            href="#"
            @mouseenter="notification = true"
            @mouseleave="notification = false"
            @click="routeMenu('notifications')"
          >
            <b-img
              fluid
              style="width: 1em; opacity: 0.8"
              :src="require('@/assets/icons/notifications.svg')"
            />
          </b-nav-item>
          <b-nav-item-dropdown :right="true" no-caret no-flip>
            <template #button-content>
              <div
                class="menubar-dropdown d-flex justify-content-between align-items-center p-2 px-3"
              >
                <span class="mr-3">
                  <fa-icon :icon="['fas', 'bars']" />
                </span>
                <span>
                  <b-img
                    style="height: 1.5em; width: 1.5em; border-radius: 50%"
                    fluid
                    :src="avatar"
                  />
                </span>
              </div>
            </template>
            <b-dropdown-item
              id="first-item"
              @click="$router.push({ name: 'Tenancy' })"
              href="javascript:void(0)"
            >
              <fa-icon :icon="['fas', 'bed']" class="mr-2" />
              My Rents
            </b-dropdown-item>
            <b-dropdown-item
              href="javascript:void(0)"
              @click="$router.push({ name: 'FavoriteProperty' })"
            >
              <fa-icon :icon="['fas', 'ellipsis-h']" class="mr-2" />
              History
            </b-dropdown-item>
            <b-dropdown-item
              href="javascript:void(0)"
              @click="$router.push({ name: 'Wallet' })"
            >
              <fa-icon :icon="['fas', 'wallet']" class="mr-2" />
              Wallet
            </b-dropdown-item>
            <b-dropdown-item
              href="javascript:void(0)"
              @click="$router.push({ name: 'ProfileUpdate' })"
            >
              <fa-icon :icon="['fas', 'cog']" class="mr-2" />
              Settings
            </b-dropdown-item>
            <b-dropdown-item
              id="last-item"
              href="javascript:void(0)"
              @click="confirmLogout = true"
            >
              <fa-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
              Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
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
    <div
      class="d-lg-block d-none"
      v-if="isLoggedIn && !emailVerifiedAt && !isGoogleAuth"
      style="
        width: 100%;
        background-color: red;
        color: white;
        position: absolute;
        top: 74px;
        right: 0;
        left: 0;
      "
    >
      <b-alert class="m-0 rounded-0" show variant="info">
        <div
          class="d-flex flex-lg-row flex-column justify-content-lg-center align-items-lg-center align-items-start m-0"
        >
          <p class="pb-0 pr-lg-3 m-0">
            We have sent a verification link to your email address
          </p>
          <b-button
            class="mt-lg-0 mt-2"
            @click="reSendVerificationEmail"
            variant="info"
          >
            Re-send link
          </b-button>
        </div>
      </b-alert>
    </div>
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
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      avatar: "auth/getAvatar",
      isLoggedIn: "auth/getIsLoggedIn",
      emailVerifiedAt: "auth/getEmailVerifiedAt",
      isGoogleAuth: "auth/getIsGoogleAuth",
      userType: "auth/getType",
    }),
  },
  data() {
    return {
      apartments: false,
      howItWorks: false,
      listYourApartment: false,
      notification: false,
      login: false,
      confirmLogout: false,
    };
  },
  mounted() {},
  methods: {
    reSendVerificationEmail() {
      const formData = new FormData();
      formData.append("callbackUrl", `${this.callbackBaseUrl}/auth/verify`);
      this.apiPost("user/email/resend", formData).then((res) => {
        const { message } = res.data;
        this.apiSuccess(
          message,
          "The verification link has been sent to your email address"
        );
      });
    },
    async logout() {
      this.$refs["logging-out"].show();
      this.apiPost(this.ROUTES.logout, {}).then(async (res) => {
        const { success, message } = res.data;
        if (success) {
          this.$refs["logging-out"].hide();
          await this.$store.dispatch("auth/clearSession");
          // clear google session if it's a google session
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
    routeMenu(menu) {
      switch (menu) {
        case "apartments":
          this.$router.push("/apartments").catch(() => {});
          break;
        case "howItWorks":
          this.$router.push("/how-it-works/user").catch(() => {});
          break;
        case "listYourApartment":
          if (this.userType === "tenant") {
            this.$router.push({ name: "LandlordKYC" });
          } else {
            this.$router.push({ name: "Landlord" });
          }
          break;
        case "notifications":
          this.$router.push("/notifications").catch(() => {});
          break;
      }
    },
  },
};
</script>

<style>
.menubar {
  background-color: #ffffff;
  box-shadow: 0px 50px 80px rgba(20, 27, 45, 0.05);
  transition: 0.5s ease;
}
.menubar-home {
  border-bottom: 0.01em solid #cfcfcf;
  background-color: #ffffff;
  transition: 0.5s ease;
}
.menubar-items {
  font-size: 0.9em;
  color: #3c4043;
  margin-right: 0.8em;
  line-height: 3em;
}
.menubar-dropdown {
  border: 0.01em solid #cfcfcf;
  border-radius: 30px;
}
.dropdown-toggle::after {
  display: none;
}
.dropdown:focus-visible {
  outline: none;
}
.dropdown-menu {
  padding: 0;
  border-radius: 1em;
}
.dropdown-item {
  font-size: 0.9em;
  padding-left: 2em;
  padding-top: 0.5em;
  padding-bottom: 0.7em;
  transition: 0.15s;
}
.dropdown-item:hover {
  background-color: #c221cf;
  color: #ffffff;
}
#first-item:hover {
  border-radius: 15px 15px 0 0;
}
.first-item:hover {
  border-radius: 15px 15px 0 0;
  cursor: pointer;
}
#last-item:hover {
  border-radius: 0 0 15px 15px;
}
.navbar-toggler:focus {
  box-shadow: none;
}
.navbar-light .navbar-toggler {
  border-color: transparent;
}
.dot {
  height: 10px;
  width: 10px;
  background-color: #c221cf;
  border-radius: 50%;
  margin-top: -10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.nested-dropdown button {
  background-color: transparent;
  border-color: transparent;
  color: #3c4043;
  font-size: 1em;
  float: left;
  padding-top: 0em;
  padding-bottom: 0em;
  width: 100%;
}
.nested-dropdown button:hover,
.nested-dropdown button:active,
.nested-dropdown button:focus {
  background-color: transparent;
  border-color: transparent;
}
.nested-dropdown:hover button {
  color: #ffffff;
}
#dropdown-2__BV_toggle_ {
  margin-left: -4em;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none;
}
</style>
