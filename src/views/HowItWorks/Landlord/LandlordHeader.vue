<template>
  <div id="hiw-landlord-header">
    <b-container>
      <p class="hiw-title">
        How It Works For <span class="hiw-type">Landlords</span>
      </p>
      <b-img
        fluid
        class="mt-2"
        :src="require('@/assets/images/hiw-landlord.jpg')"
      />
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
#hiw-landlord-header {
  background-color: #f4f7fe;
  padding-top: 4em;
  padding-bottom: 4em;
}
.hiw-title {
  font-size: 2.25em;
  color: #3c4043;
}
.hiw-type {
  color: #c221cf;
}
</style>
