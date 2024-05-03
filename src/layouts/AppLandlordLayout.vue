<template>
  <div>
    <SideNav class="d-lg-block d-none" />
    <MainNav class="d-lg-flex d-none" />
    <MobileNav class="d-lg-none" />
    <MobileMainNav class="d-lg-none" />
    <transition name="fade" mode="out-in">
      <slot />
    </transition>
    <MobileFooter class="d-lg-none" />
  </div>
</template>

<script>
import SideNav from "../components/SideNav";
import MainNav from "../components/MainNav";
import MobileNav from "../components/MobileNav";
import MobileMainNav from "../components/MobileMainNav";
import MobileFooter from "../components/MobileFooter";

export default {
  name: "AppLandlordLayout",
  components: {
    SideNav,
    MainNav,
    MobileNav,
    MobileMainNav,
    MobileFooter,
  },
};
</script>

<style></style>
