<template>
  <div>
    <LoggedinHeader v-if="loggedIn" />
    <Header v-else />
    <transition name="fade" mode="out-in">
      <slot />
    </transition>
  </div>
</template>

<script>
import LoggedinHeader from "../components/LoggedinHeader";

export default {
  name: "AppAuthLayout",
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
