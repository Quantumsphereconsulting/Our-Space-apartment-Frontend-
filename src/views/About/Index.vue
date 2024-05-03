<template>
  <div>
    <AboutHeader />
    <b-container>
      <Hotels />
      <OurSpace />
      <Leadership />
    </b-container>
    <HowItWorks />
    <b-container>
      <CheckIn />
    </b-container>
  </div>
</template>

<script>
import AboutHeader from "./AboutHeader.vue";
import Hotels from "./Hotels";
import OurSpace from "./OurSpace";
import Leadership from "./Leadership";
import HowItWorks from "./HowItWorks";
import CheckIn from "./CheckIn";

export default {
  components: {
    AboutHeader,
    Hotels,
    OurSpace,
    Leadership,
    HowItWorks,
    CheckIn,
  },
};
</script>

<style></style>
