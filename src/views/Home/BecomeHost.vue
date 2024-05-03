<template>
  <b-row
    id="become-host"
    class="justify-content-lg-center align-items-lg-center"
  >
    <b-col lg="6" class="mb-lg-0 mb-5">
      <b-img fluid :src="require('@/assets/images/check-in.svg')" />
    </b-col>
    <b-col lg="6">
      <p class="become-host-title">Become a host</p>
      <p class="become-host-subtitle">
        Host thousands of people in your home. <br />
        All you need to do is enlist your properties.
      </p>
      <b-button
        @click="$router.push('/landlord')"
        id="check-in-btn"
        class="mt-3"
        style=""
      >
        List Your Apartment
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {};
</script>

<style>
#become-host {
  padding-top: 4em;
  padding-bottom: 5em;
  /*background-image: url("../../assets/images/become-a-host-bg.svg");*/
  /*background-color: #f9f9fd;*/
  /*background-position: center;*/
  /*background-repeat: no-repeat;*/
  /*background-size: cover;*/
}
.become-host-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 3em;
  color: #3c4043;
}
.become-host-subtitle {
  font-size: 1.375em;
  margin-top: 1em;
  color: #3c4043;
}
</style>
