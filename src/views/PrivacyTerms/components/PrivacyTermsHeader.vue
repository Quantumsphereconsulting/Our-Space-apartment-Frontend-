<template>
  <div id="privacy-terms-header">
    <p id="privacy-terms-title">{{ title }}</p>
    <p id="privacy-terms-subtitle">{{ subtitle }}</p>
    <div class="mt-5 d-flex" style="position: relative">
      <div
        class="tab-items"
        :class="{ 'tab-items-active': $route.name === 'Terms' }"
        @mouseenter="terms = true"
        @mouseleave="terms = false"
        @click="$router.push('/terms')"
      >
        Terms of Use
        <transition name="fade">
          <b-img
            v-if="terms || $route.name === 'Terms'"
            id="privacy-terms-hover-1"
            :src="require('../../../assets/icons/privacy-terms-hover.svg')"
          />
        </transition>
      </div>
      <div
        class="tab-items"
        :class="{ 'tab-items-active': $route.name === 'PrivacyPolicy' }"
        @mouseenter="privacy = true"
        @mouseleave="privacy = false"
        @click="$router.push('/privacy-policy')"
      >
        Privacy Policy
        <transition name="fade">
          <b-img
            v-if="privacy || $route.name === 'PrivacyPolicy'"
            id="privacy-terms-hover-2"
            :src="require('../../../assets/icons/privacy-terms-hover.svg')"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      terms: false,
      privacy: false,
    };
  },
};
</script>

<style>
#privacy-terms-header {
  margin-top: 4em;
}
#privacy-terms-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3em;
  color: #3c4043;
}
#privacy-terms-subtitle {
  color: #3c4043;
  letter-spacing: 0.02em;
}
.tab-items {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  color: #3c4043;
  transition: 0.5s ease;
  margin-right: 3em;
  padding-bottom: 0.5em;
  display: inline-block;
}
.tab-items-active {
  color: #c221cf;
}
.tab-items:hover {
  cursor: pointer;
  color: #c221cf;
}
#privacy-terms-hover-1 {
  position: absolute;
  top: 80%;
  right: 100%;
  left: -10px;
  transition: 0.5s ease;
}
#privacy-terms-hover-2 {
  position: absolute;
  top: 80%;
  right: 50px;
  left: 135px;
  transition: 0.5s ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
