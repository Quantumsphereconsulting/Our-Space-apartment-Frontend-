<template>
  <div>
    <div v-if="loading" class="main-loader">
      <beat-loader :loading="true" :color="'#c221cf'" />
    </div>
    <component v-else :is="layout">
      <transition name="fade" mode="out-in">
        <slot />
      </transition>
    </component>
  </div>
</template>

<script>
const defaultLayout = "AppDefaultLayout";
export default {
  computed: {
    // get current layout from the router level
    // if no layout is specified, use the default layout
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`../layouts/${layout}.vue`);
    },
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.main-loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
