<template>
  <div id="listed-apartment-stat">
    <div
      class="d-flex align-items-start"
      style="border-bottom: 1px solid #ced4da; padding-bottom: 0.5em"
    >
      <div class="la-stat-avatar">
        <b-img :src="require('@/assets/icons/apartments-icon.svg')" />
      </div>
      <div>
        <p style="color: #3c4043; margin-bottom: 0">Listed Apartments</p>
        <p style="font-size: 1.5em; color: #3c4043">{{ numApartments }}</p>
      </div>
    </div>
    <p class="view-all" @click="$router.push({ name: 'LandlordApartments' })">
      View all >>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    numApartments: {
      default: 0,
    },
  },
};
</script>

<style>
#listed-apartment-stat {
  background-color: #eaeaff;
  padding: 2em 2em 0em 2em;
  border-radius: 10px;
  display: inline-block;
  margin-right: 2.4em;
  width: 21.25em;
}
.la-stat-avatar {
  padding: 1em;
  background-color: #3c4043;
  border-radius: 15px 5px;
  margin-right: 1.5em;
}
.view-all {
  margin-top: 1em;
  color: #3c4043;
  display: inline-block;
  transition: 0.5s ease;
}
.view-all:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
