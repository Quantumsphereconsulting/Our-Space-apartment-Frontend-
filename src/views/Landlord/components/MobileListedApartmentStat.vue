<template>
  <div id="listed-apartment-stat-mobile">
    <div class="d-flex justify-content-between align-items-start">
      <div class="la-stat-avatar-mobile">
        <b-img
          style="width: 1.1em"
          :src="require('@/assets/icons/apartments-icon.svg')"
        />
      </div>
      <p
        style="
          font-size: 1.5em;
          color: #3c4043;
          font-family: 'Circular Std', sans-serif;
          font-weight: bold;
        "
      >
        {{ numApartments }}
      </p>
    </div>
    <p style="color: #3c4043; margin-bottom: 0; opacity: 0.8; font-size: 0.8em">
      Listed Apartments
    </p>

    <p
      class="view-all-mobile float-right"
      @click="$router.push({ name: 'LandlordApartments' })"
    >
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
#listed-apartment-stat-mobile {
  background-color: #eaeaff;
  padding: 1em 1em 0em 1em;
  border-radius: 10px;
  width: 100%;
  margin-right: 0.5em;
}
.la-stat-avatar-mobile {
  padding: 0.6em;
  background-color: #3c4043;
  border-radius: 15px 5px;
  margin-right: 1.5em;
}
.view-all-mobile {
  font-size: 0.75em;
  margin-top: 1em;
  color: #3c4043;
  display: inline-block;
  transition: 0.5s ease;
}
.view-all-mobile:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
