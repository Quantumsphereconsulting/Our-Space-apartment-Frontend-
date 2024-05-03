<template>
  <div id="cta">
    <b-container>
      <div class="cta-title">
        <span class="cta-title-time">Time</span> <span>Space is Money</span>
      </div>
      <div class="cta-subtitle">
        Join us today to earn up to N200,000 weekly!
      </div>
      <div class="text-center mt-3">
        <b-button @click="getStarted" id="get-started-btn-2" class="mt-3">
          Get Started
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    getStarted() {
      this.$router.push("/landlord").catch(() => {});
    },
  },
};
</script>

<style>
#cta {
  background-color: #f4f7fe;
  padding-top: 5em;
  padding-bottom: 5em;
}
.cta-title {
  text-align: center;
  font-size: 2em;
  font-weight: bold;
}
.cta-title-time {
  color: #84919b;
  text-decoration: line-through;
}
.cta-subtitle {
  margin-top: 0.5em;
  text-align: center;
  font-size: 1.125em;
}
</style>
