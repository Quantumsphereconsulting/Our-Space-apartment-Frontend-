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
              <div
                v-if="
                  howItWorks ||
                  $route.name === 'HowItWorksUser' ||
                  $route.name === 'HowItWorksLandLord'
                "
                class="dot"
                style="margin-left: 36px"
              />
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
                v-if="listYourApartment || $route.name === 'ListYourApartment'"
                class="dot"
                style="margin-left: 50px"
              />
            </transition>
          </b-nav-item>
          <b-nav-item
            class="menubar-items"
            href="#"
            @mouseenter="login = true"
            @mouseleave="login = false"
            @click="routeMenu('login')"
          >
            Login / Sign-up
            <transition name="fade">
              <div
                v-if="
                  login ||
                  $route.name === 'Login' ||
                  $route.name === 'SignUp' ||
                  $route.name === 'ForgotPassword' ||
                  $route.name === 'LandlordKYC' ||
                  $route.name === 'ResetPassword' ||
                  $route.name === '2FA'
                "
                class="dot"
                style="margin-left: 40px"
              />
            </transition>
          </b-nav-item>
          <b-nav-item-dropdown :right="true">
            <template #button-content>
              <div
                class="menubar-dropdown d-flex justify-content-between align-content-between p-2 px-3"
              >
                <span class="mr-3">
                  <fa-icon :icon="['fas', 'bars']" />
                </span>
                <span>
                  <b-img
                    v-if="avatar"
                    style="height: 1.5em; width: 1.5em; border-radius: 50%"
                    fluid
                    :src="avatar"
                  />
                  <fa-icon v-else :icon="['fas', 'user-circle']" />
                </span>
              </div>
            </template>
            <b-dropdown-item id="first-item" @click="routeMenu('aboutUs')">
              About
            </b-dropdown-item>
            <b-dropdown-item id="last-item" @click="routeMenu('blog')">
              Blog
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
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
    }),
  },
  data() {
    return {
      apartments: false,
      howItWorks: false,
      listYourApartment: false,
      login: false,
    };
  },
  methods: {
    routeMenu(menu) {
      switch (menu) {
        case "apartments":
          this.$router.push("/apartments").catch(() => {});
          break;
        case "howItWorks":
          this.$router.push("/how-it-works/user").catch(() => {});
          break;
        case "listYourApartment":
          if (this.isLoggedIn) this.$router.push("/landlord").catch(() => {});
          else this.$router.push("/list-your-apartment").catch(() => {});
          break;
        case "aboutUs":
          this.$router.push("/about-us").catch(() => {});
          break;
        case "login":
          this.$router.push("/auth/login").catch(() => {});
          break;
        case "blog":
          this.$router.push("/blog").catch(() => {});
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
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
