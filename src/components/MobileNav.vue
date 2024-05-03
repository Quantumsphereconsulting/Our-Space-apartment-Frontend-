<template>
  <b-navbar id="mobile-nav" sticky>
    <b-container>
      <b-navbar-brand @click="$router.push('/')">
        <b-img
          style="width: 8em"
          :src="require('@/assets/logos/our-space-logo-white-medium.svg')"
        />
      </b-navbar-brand>
      <b-navbar-nav style="padding-top: 0.5em" @click="toggleNav">
        <b-img :src="require('@/assets/icons/menu.svg')" />
      </b-navbar-nav>
    </b-container>
    <div id="mySidenav" class="sidenav">
      <b-img
        style="width: 11em; margin-bottom: 1.4em; margin-left: 1em"
        :src="require('@/assets/logos/our-space-logo-white-medium.svg')"
      />
      <div class="d-flex flex-column">
        <SideNavItem
          class="sidenav-item"
          route-name="Landlord"
          :inner-route="[]"
          :img-src="require('@/assets/icons/dashboard-icon.svg')"
          menu-name="Dashboard"
        />
        <SideNavItem
          class="sidenav-item"
          route-name="LandlordApartments"
          :inner-route="[
            'EditLandlordApartments',
            'NewLandlordApartments',
            'PreviewLandlordApartments',
          ]"
          :img-src="require('@/assets/icons/apartments-icon.svg')"
          menu-name="Apartments"
        />
        <SideNavItem
          class="sidenav-item"
          route-name="LandlordTenants"
          :inner-route="['ViewLandlordTenant']"
          :img-src="require('@/assets/icons/tenants-icon.svg')"
          menu-name="Tenants"
        />
        <SideNavItem
          class="sidenav-item"
          route-name="LandlordWallet"
          :inner-route="['TransactionHistory']"
          :img-src="require('@/assets/icons/wallet-icon.svg')"
          menu-name="Wallet"
        />
        <SideNavItem
          class="sidenav-item"
          route-name="LandlordProfileDetails"
          :inner-route="[
            'LandlordSecurity',
            'LandlordBankAccounts',
            'LandlordNotifications',
          ]"
          :img-src="require('@/assets/icons/settings-icon.svg')"
          menu-name="Settings"
        />
        <div
          id="copyright"
          style="
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            padding-bottom: 1em;
          "
        >
          <p
            style="
              font-size: 0.8em;
              color: #ffffff;
              opacity: 0.8;
              margin-bottom: 0;
            "
          >
            &copy; {{ new Date().getFullYear() }} Our Space
          </p>
          <small
            style="
              font-size: 0.6em;
              color: #ffffff;
              opacity: 0.8;
              margin-top: 1em;
              bottom: 10%;
            "
          >
            Powered by
            <a
              style="text-decoration: none; color: #ffffff"
              href="https://softwebdigital.com"
              target="_blank"
            >
              Soft-Web Digital
            </a>
          </small>
        </div>
      </div>
    </div>
  </b-navbar>
</template>

<script>
import SideNavItem from "./SideNavItem";
export default {
  mounted() {
    document.body.style.backgroundColor = "white";
  },
  components: {
    SideNavItem,
  },
  data() {
    return {
      navOpen: false,
    };
  },
  methods: {
    toggleNav() {
      // toggle side navigation in mobile view for the landlord dashboard
      if (this.navOpen) {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("copyright").style.display = "none";
      } else {
        document.getElementById("mySidenav").style.width = "20em";
        document.getElementById("copyright").style.display = "block";
      }
      this.navOpen = !this.navOpen;
    },
  },
};
</script>

<style>
#mobile-nav {
  background-color: #c221cf;
  padding-top: 1.3em;
  padding-bottom: 1.5em;
  box-shadow: 0px 50px 80px rgba(20, 27, 45, 0.05);
}
/* The side navigation menu */
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #c221cf; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 2em; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}
/* The navigation menu links */
.sidenav .sidenav-item {
  font-size: 0.5em;
}
#copyright {
  transition: 1s ease;
}
/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
