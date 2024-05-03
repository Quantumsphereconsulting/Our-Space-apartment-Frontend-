<template>
  <div id="current-tenants-stat">
    <div
      class="d-flex align-items-start"
      style="border-bottom: 1px solid #ced4da; padding-bottom: 0.5em"
    >
      <div class="ct-stat-avatar">
        <b-img :src="require('@/assets/icons/apartments-icon-black.svg')" />
      </div>
      <div>
        <p style="color: #3c4043; margin-bottom: 0">Current Tenants</p>
        <p style="font-size: 1.5em; color: #3c4043">{{ numRentals }}</p>
      </div>
    </div>
    <p class="view-all-1" @click="$router.push({ name: 'LandlordTenants' })">
      View all >>
    </p>
  </div>
</template>

<script>
export default {
  props: ["numRentals"],
};
</script>

<style>
#current-tenants-stat {
  background-color: #e9faf5;
  padding: 2em 2em 0em 2em;
  border-radius: 10px;
  display: inline-block;
  margin-right: 2.4em;
  width: 21.25em;
}
.ct-stat-avatar {
  padding: 1em;
  background-color: #ffffff;
  border-radius: 15px 5px;
  margin-right: 1.5em;
}
.view-all-1 {
  margin-top: 1em;
  color: #3c4043;
  display: inline-block;
  transition: 0.5s ease;
}
.view-all-1:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
