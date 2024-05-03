<template>
  <div>
    <div id="hotels" class="d-none d-lg-block">
      <b-row class="d-flex">
        <b-col lg="6">
          <p class="hotels-title">
            Hotels aren’t always the answer for leisure seekers.
          </p>
        </b-col>
        <b-col lg="6">
          <p class="hotels-subtitle">
            They are always seeking something extra. Hosts aren’t always
            reliable. So we’re changing the game—with spaces that inspire and
            delight, that fulfil needs without sacrificing style, all while
            delivering seamless, personalized experiences. Check-in, request
            fresh towels and get dinner recommendations—all from your phone. By
            eliminating inefficiencies as we grow, we can deliver hospitality
            that’s both remarkable and accessible. Because everyone should be
            able to afford an extraordinary place to stay.
          </p>
        </b-col>
      </b-row>
      <div class="mt-5">
        <b-img fluid :src="require('@/assets/images/about-hotels.svg')" />
      </div>
    </div>
    <div id="hotels-mobile" class="d-lg-none">
      <p class="hotels-title-mobile">
        Hotels aren’t always the answer for leisure seekers.
      </p>
      <p class="hotels-subtitle-mobile">
        They are always seeking something extra. Hosts aren’t always reliable.
        So we’re changing the game—with spaces that inspire and delight, that
        fulfil needs without sacrificing style, all while delivering seamless,
        personalized experiences. Check-in, request fresh towels and get dinner
        recommendations—all from your phone. By eliminating inefficiencies as we
        grow, we can deliver hospitality that’s both remarkable and accessible.
        Because everyone should be able to afford an extraordinary place to
        stay.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#hotels {
  margin-top: -3em;
  margin-bottom: 2em;
}
#hotels-mobile {
  margin-top: 4em;
  margin-bottom: 2em;
}
.hotels-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3.5em;
  letter-spacing: -4px;
  line-height: 1.2em;
  color: #3c4043;
}
.hotels-title-mobile {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 2em;
  letter-spacing: -3px;
  line-height: 1.2em;
  color: #3c4043;
  text-align: center;
}
.hotels-subtitle {
  letter-spacing: -0.03em;
  opacity: 0.6;
  color: #3c4043;
  padding-right: 3em;
}
.hotels-subtitle-mobile {
  letter-spacing: -0.03em;
  opacity: 0.6;
  color: #3c4043;
  text-align: center;
}
</style>
