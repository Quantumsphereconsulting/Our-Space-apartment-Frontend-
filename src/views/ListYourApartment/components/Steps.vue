<template>
  <div id="steps">
    <div class="s-wrapper">
      <div class="s-title">
        <div class="s-title-num">01</div>
        <p class="s-title-text">Create an account</p>
      </div>
      <div class="s-body">
        Submit and verify all information about yourself.
        <br class="d-lg-block d-none" />
        This will only take 2 minutes
      </div>
    </div>
    <div class="s-wrapper">
      <div class="s-title">
        <div class="s-title-num">02</div>
        <p class="s-title-text">List Apartment</p>
      </div>
      <div class="s-body">
        Enter all the information about your apartment.
        <br class="d-lg-block d-none" />
        This will only take 4 minutes
      </div>
    </div>
    <div class="s-wrapper">
      <div class="s-title">
        <div class="s-title-num">03</div>
        <p class="s-title-text">Start getting bookings</p>
      </div>
      <div class="s-body s-body-no">
        Enter all the information about your apartment.
        <br class="d-lg-block d-none" />
        This will only take 4 minutes
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#steps {
  margin-top: 2em;
}
.s-wrapper {
}
.s-title {
  display: flex;
  align-items: center;
}
.s-title-num {
  background-color: #c221cf;
  color: #ffffff;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.s-title-text {
  margin-left: 1em;
  display: inline;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 1.27em;
}
.s-body {
  font-size: 1.21em;
  border-left: 2px solid #c221cf;
  margin-left: 0.6em;
  margin-top: 0.7em;
  margin-bottom: 0.7em;
  padding-bottom: 1.5em;
  padding-left: 1.8em;
}
.s-body-no {
  border-left: none;
}
</style>
