<template>
  <div id="how-to-steps">
    <b-container>
      <b-row class="justify-content-lg-center align-items-lg-center">
        <b-col lg="6">
          <b-img
            fluid
            :src="require('@/assets/images/how-to-steps.jpg')"
            alt=""
          />
        </b-col>
        <b-col lg="6" class="mt-lg-0 mt-3">
          <p class="hts-title">Start renting out your space in 3 easy steps</p>
          <Steps />
          <b-button @click="getStarted" id="get-started-btn-2" class="mt-3">
            Get Started
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Steps from "./components/Steps";
export default {
  components: {
    Steps,
  },
  methods: {
    getStarted() {
      this.$router.push("/landlord").catch(() => {});
    },
  },
};
</script>

<style>
#how-to-steps {
  padding-top: 5em;
  padding-bottom: 5em;
}
.hts-title {
  font-size: 2em;
}
#get-started-btn-2 {
  width: 300px;
  height: 50px;
  background: #c221cf;
  color: #ffffff;
  border-radius: 5px;
  border-color: #ffffff;
}
#get-started-btn-2:active,
#get-started-btn-2:focus {
  color: #ffffff !important;
}
</style>
