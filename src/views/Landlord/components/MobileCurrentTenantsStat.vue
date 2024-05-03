<template>
  <div id="current-tenants-stat-mobile">
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
        {{ numTenants }}
      </p>
    </div>
    <p style="color: #3c4043; margin-bottom: 0; opacity: 0.8; font-size: 0.8em">
      Current Tenants
    </p>

    <p
      class="view-all-mobile float-right"
      @click="$router.push({ name: 'LandlordTenants' })"
    >
      View all >>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    numTenants: {
      default: 0,
    },
  },
};
</script>

<style>
#current-tenants-stat-mobile {
  background-color: #eaeaff;
  padding: 1em 1em 0em 1em;
  border-radius: 10px;
  width: 100%;
  margin-left: 0.5em;
}
</style>
