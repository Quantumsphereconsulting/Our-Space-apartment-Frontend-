<template>
  <div id="testimonials">
    <b-container>
      <p class="testimonial-header">Hear from our Incredible Hosts</p>
      <vueper-slides
        class="no-shadow"
        :visible-slides="3"
        :dragging-distance="70"
        :breakpoints="breakpoints"
        :gap="2"
        :bullets="false"
        :init-slide="2"
        fixed-height="450px"
      >
        <vueper-slide>
          <template #content>
            <Testimonial />
          </template>
        </vueper-slide>
        <vueper-slide>
          <template #content>
            <Testimonial />
          </template>
        </vueper-slide>
        <vueper-slide>
          <template #content>
            <Testimonial />
          </template>
        </vueper-slide>
        <vueper-slide>
          <template #content>
            <Testimonial />
          </template>
        </vueper-slide>
      </vueper-slides>
    </b-container>
  </div>
</template>

<script>
import Testimonial from "./components/Testimonial";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: {
    VueperSlides,
    VueperSlide,
    Testimonial,
  },
  data() {
    return {
      breakpoints: {
        900: {
          visibleSlides: 1,
        },
      },
    };
  },
};
</script>

<style>
#testimonials {
  background-color: #f4f7fe;
  padding-top: 5em;
  padding-bottom: 1em;
}
.testimonial-header {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2em;
}
</style>
