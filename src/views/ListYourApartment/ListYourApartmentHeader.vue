<template>
  <div>
    <div id="list-your-apartment-header">
      <b-container>
        <b-row>
          <b-col lg="6">
            <p class="header-title">Start Earning Now.</p>
            <p class="header-subtitle">
              With just a few clicks you can list and manage your apartments.
            </p>
            <b-button @click="getStarted" id="get-started-btn" class="mt-3">
              Get Started
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
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
#list-your-apartment-header {
  background-image: url("../../assets/images/list-your-apartment-header.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 15em 0;
}
.header-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3.8em;
  color: #ffffff;
  line-height: 1em;
}
.header-subtitle {
  margin-top: 1em;
  font-size: 1.375em;
  color: #ffffff;
}
#get-started-btn {
  width: 300px;
  height: 50px;
  background: #ffffff;
  color: #c221cf;
  border-radius: 5px;
  border-color: #ffffff;
}
#get-started-btn:active,
#get-started-btn:focus {
  color: #c221cf !important;
}
</style>
