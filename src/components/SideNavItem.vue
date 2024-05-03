<template>
  <div
    id="sidenav-item"
    @click="$router.push({ name: routeName })"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <transition name="fade">
      <div
        v-if="
          hover === true ||
          $route.name === routeName ||
          innerRoute.includes($route.name)
        "
        class="active-nav"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <b-img
        v-if="
          hover === true ||
          $route.name === routeName ||
          innerRoute.includes($route.name)
        "
        class="s-active"
        :src="require('@/assets/icons/sidenav-active.svg')"
      />
    </transition>
    <div class="d-flex justify-content-center align-items-start item">
      <b-img :src="imgSrc" style="margin-right: 1.875em" />
      <p style="color: #ffffff">{{ menuName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    routeName: {
      type: String,
      required: true,
    },
    innerRoute: {
      type: Array,
    },
    imgSrc: {
      required: true,
    },
    menuName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style>
#sidenav-item {
  font-size: 1.4em;
  margin-bottom: 1em;
  position: relative;
  height: 3.75em;
}
#sidenav-item:hover {
  cursor: pointer;
}
.active-nav {
  height: inherit;
  background-color: #ffffff;
  opacity: 0.1;
  transition: 0.5s ease;
}
.item {
  position: absolute;
  left: 20%;
  bottom: 5%;
}
.s-active {
  position: absolute;
  bottom: 15%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
