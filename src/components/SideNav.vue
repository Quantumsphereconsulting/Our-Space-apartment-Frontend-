<template>
  <div id="sidenav">
    <div
      @click="$router.push('/')"
      class="logo"
      style="
        border-bottom: 1px solid #cecece;
        padding-bottom: 2em;
        padding-left: 1em;
        cursor: pointer;
      "
    >
      <b-img
        fluid
        style="width: 14em"
        :src="require('@/assets/logos/our-space-logo-white-medium.svg')"
      />
    </div>
    <div class="d-flex flex-column" style="padding-top: 6em">
      <SideNavItem
        route-name="Landlord"
        :inner-route="[]"
        :img-src="require('@/assets/icons/dashboard-icon.svg')"
        menu-name="Dashboard"
      />
      <SideNavItem
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
        route-name="LandlordTenants"
        :inner-route="['ViewLandlordTenant']"
        :img-src="require('@/assets/icons/tenants-icon.svg')"
        menu-name="Tenants"
      />
      <SideNavItem
        route-name="LandlordWallet"
        :inner-route="['TransactionHistory']"
        :img-src="require('@/assets/icons/wallet-icon.svg')"
        menu-name="Wallet"
      />
      <SideNavItem
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
        style="
          width: 100%;
          text-align: center;
          padding-bottom: 1em;
          margin-top: 4em;
          margin-bottom: 0;
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
</template>

<script>
import SideNavItem from "./SideNavItem";
export default {
  components: {
    SideNavItem,
  },
};
</script>

<style>
#sidenav {
  height: 100%;
  width: 20em;
  position: fixed;
  background-color: #c221cf;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 2em;
}
</style>
