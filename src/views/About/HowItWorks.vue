<template>
  <div>
    <div id="how-it-works" class="d-none d-lg-block">
      <b-container>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <p class="how-it-works-title">How our space works</p>
            <p class="how-it-works-subtitle">
              We have three simple steps to getting you the perfect
              apartment/space.
            </p>
          </div>
          <b-button
            class="primary-btn"
            style="height: 3em; padding-right: 3em; padding-left: 3em"
            @click="$router.push('/how-it-works/user')"
          >
            Start Exploring
          </b-button>
        </div>
        <div class="d-flex mt-5">
          <div class="how-it-works-box">
            <p class="how-it-works-title-2">Explore</p>
            <p class="how-it-works-subtitle-2">
              Start by exploring Stays or Apartments. Apply filters like entire
              homes, self-check-in, or pricing to narrow your options. You can
              also save favourites to a wishlist.
            </p>
          </div>
          <div class="how-it-works-box">
            <p class="how-it-works-title-2">Book</p>
            <p class="how-it-works-subtitle-2">
              Once you’ve found what you’re looking for, learn about your host,
              read past guest reviews, and get the details on cancellation
              options—then book in just a few clicks.
            </p>
          </div>
          <div class="how-it-works-box">
            <p class="how-it-works-title-2">Enjoy</p>
            <p class="how-it-works-subtitle-2">
              You’re all set! Connect with your host through the app for local
              tips, questions or advice.
            </p>
          </div>
        </div>
      </b-container>
    </div>
    <div id="how-it-works-mobile" class="d-lg-none">
      <b-container class="text-center">
        <p class="how-it-works-title-mobile">How our space works</p>
        <p class="how-it-works-subtitle">
          We have three simple steps to getting you the perfect apartment/space.
        </p>
        <b-button
          class="primary-btn"
          style="
            margin-top: 1em;
            margin-bottom: 3em;
            height: 3em;
            padding-right: 3em;
            padding-left: 3em;
          "
          @click="$router.push('/how-it-works/user')"
        >
          Start Exploring
        </b-button>
        <div>
          <div class="how-it-works-box-mobile">
            <p class="how-it-works-title-2">Explore</p>
            <p class="how-it-works-subtitle-2">
              Start by exploring Stays or Apartments. Apply filters like entire
              homes, self-check-in, or pricing to narrow your options. You can
              also save favourites to a wishlist.
            </p>
          </div>
          <div class="how-it-works-box-mobile">
            <p class="how-it-works-title-2">Book</p>
            <p class="how-it-works-subtitle-2">
              Once you’ve found what you’re looking for, learn about your host,
              read past guest reviews, and get the details on cancellation
              options—then book in just a few clicks.
            </p>
          </div>
          <div class="how-it-works-box-mobile">
            <p class="how-it-works-title-2">Enjoy</p>
            <p class="how-it-works-subtitle-2">
              You’re all set! Connect with your host through the app for local
              tips, questions or advice.
            </p>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#how-it-works {
  margin-top: 2em;
  padding-top: 5em;
  padding-bottom: 5em;
  background-color: #efeff3;
}
#how-it-works-mobile {
  //margin-top: 1em;
  padding-top: 2em;
  padding-bottom: 3em;
  background-color: #efeff3;
}
.how-it-works-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3.5em;
  letter-spacing: -4px;
  color: #3c4043;
}
.how-it-works-title-mobile {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 2em;
  letter-spacing: -2px;
  color: #3c4043;
}
.how-it-works-subtitle {
  margin-top: -1em;
  letter-spacing: -0.03em;
  opacity: 0.6;
  color: #230b34;
}
.how-it-works-title-2 {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  letter-spacing: -1.5px;
  border-left: 3px solid #c221cf;
  padding-left: 1em;
  margin-left: -1.1em;
  color: #3c4043;
}
.how-it-works-subtitle-2 {
  letter-spacing: -0.03em;
  opacity: 0.6;
  color: #230b34;
}
.how-it-works-box {
  border-left: 1px solid #cfcfcf;
  height: 13em;
  padding-top: 3em;
  padding-left: 1em;
  padding-right: 2em;
}
.how-it-works-box-mobile {
  //border-bottom: 1px solid #cfcfcf;
  //height: 13em;
  //padding-left: 1em;
  //padding-right: 2em;
}
</style>
