<template>
  <div style="display: flex; flex-direction: column; height: 100vh">
    <LoggedinHeader v-if="loggedIn" />
    <Header v-else />
    <transition name="fade" mode="out-in">
      <slot />
    </transition>
    <Footer />
  </div>
</template>

<script>
import LoggedinHeader from "../components/LoggedinHeader";
export default {
  name: "AppDefaultLayout",
  components: {
    LoggedinHeader,
  },
  data() {
    return {
      loggedIn: this.$store.getters["auth/getIsLoggedIn"],
    };
  },
};
</script>

<style>
.primary-color {
  color: #c221cf;
}
</style>
