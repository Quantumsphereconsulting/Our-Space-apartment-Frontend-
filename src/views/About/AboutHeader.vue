<template>
  <div>
    <div id="about-header" class="d-none d-lg-block">
      <p class="about-header-title">About Us</p>
      <p class="about-header-subtitle">
        We are building the future of hospitality and housing. At Our Space, we
        are on a mission to elevate hospitality and help leisure seekers find
        the best apartments they can call home.
      </p>
      <div class="about-slide"></div>
    </div>
    <b-container id="about-header-mobile" class="d-lg-none">
      <p class="about-header-title-mobile">About Us</p>
      <p class="about-header-subtitle-mobile">
        We are building the future of hospitality and housing. At Our Space, we
        are on a mission to elevate hospitality and help leisure seekers find
        the best apartments they can call home.
      </p>
    </b-container>
    <b-img
      class="d-lg-none"
      fluid
      :src="require('@/assets/images/about-slide-mobile.svg')"
    />
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
#about-header {
  margin-top: 8em;
  margin-bottom: 2em;
}
#about-header-mobile {
  margin-top: 4em;
  margin-bottom: 2em;
}
.about-header-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3.5em;
  letter-spacing: -4px;
  text-align: center;
  color: #3c4043;
}
.about-header-title-mobile {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 2.5em;
  letter-spacing: -4px;
  text-align: center;
  color: #3c4043;
}
.about-header-subtitle {
  letter-spacing: -0.03em;
  opacity: 0.6;
  text-align: center;
  color: #230b34;
  padding: 0 35%;
}
.about-header-subtitle-mobile {
  letter-spacing: -0.03em;
  opacity: 0.6;
  text-align: center;
  color: #230b34;
}
@keyframes ani {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 10000000px 0;
  }
}
.about-slide {
  margin-top: 4em;
  background: url("../../assets/images/about-slide.png") repeat-x 0 / 100% auto;
  height: 500px; /* this value is not important, just not zero */
  animation: ani 300000s linear infinite;
}
.about-slide-mobile {
  margin-top: 4em;
  background: url("../../assets/images/about-slide.png") repeat-x 0 / 100% auto;
  height: 1000px; /* this value is not important, just not zero */
  animation: ani 300000s linear infinite;
}
</style>
