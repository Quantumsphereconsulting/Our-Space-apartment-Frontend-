<template>
  <div>
    <ListYourApartmentHeader />
    <HowToSteps />
    <Testimonials />
    <FAQs />
    <CTA />
  </div>
</template>

<script>
import ListYourApartmentHeader from "./ListYourApartmentHeader";
import HowToSteps from "./HowToSteps";
import Testimonials from "./Testimonials";
import FAQs from "./FAQs";
import CTA from "./CTA";
export default {
  components: {
    ListYourApartmentHeader,
    HowToSteps,
    Testimonials,
    FAQs,
    CTA,
  },
};
</script>
