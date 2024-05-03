<template>
  <div>
    <div id="m-controls" class="d-lg-block d-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.5em; color: #c221cf">
          <span
            @click="$router.push({ name: 'LandlordApartments' })"
            class="back mr-2"
          >
            Apartments
          </span>
          <span class="mr-2"> >> </span>
          <span>New Apartment</span>
        </p>
      </div>
    </div>
    <div id="m-controls-mobile" class="d-lg-none">
      <div class="d-flex flex-xl-row flex-column justify-content-between">
        <p style="font-size: 1.2em; color: #c221cf">
          <span
            @click="$router.push({ name: 'LandlordApartments' })"
            class="back mr-2"
          >
            Apartments
          </span>
          <span class="mr-2"> >> </span>
          <span>New Apartment</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#m-controls {
  padding-top: 4.6em;
  padding-left: 22em;
  padding-right: 2em;
}
#m-controls-mobile {
  padding-top: 2.3em;
  text-align: center;
}
.back {
  transition: 0.5s ease;
}
.back:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
