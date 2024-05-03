<template>
  <div>
    <div id="check-in" class="d-lg-block d-none">
      <b-img fluid :src="require('@/assets/images/about-check-in.png')" />
      <div class="check-in-text">
        <p class="check-in-title">Everything you need is a tap away.</p>
        <p class="checkin-subtitle">
          Fresh Towels, wi-fi, close to a fine restaurant, with a view of the
          ocean or just a simple place for the night.
        </p>
        <b-button
          class="primary-btn btn-lg"
          style="padding-left: 2em; padding-right: 2em; margin-top: 2em"
          @click="$router.push('/auth/login')"
        >
          Check In
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#check-in {
  margin-top: 4em;
  margin-bottom: 4em;
  position: relative;
  text-align: center;
}
#check-in-mobile {
  margin-top: 4em;
  margin-bottom: 4em;
  position: relative;
  text-align: center;
}
.check-in-text {
  position: absolute;
  width: fit-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.check-in-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3.5em;
  letter-spacing: -4px;
  color: #ffffff;
}
.check-in-title-mobile {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 1em;
  letter-spacing: -2px;
  color: #ffffff;
}
.checkin-subtitle {
  letter-spacing: -0.03em;
  opacity: 0.6;
  text-align: center;
  color: #ffffff;
}
.checkin-subtitle-mobile {
  letter-spacing: -0.03em;
  opacity: 0.6;
  text-align: center;
  color: #ffffff;
}
</style>
