<template>
  <div id="controls">
    <div
      class="d-flex"
      style="border-bottom: 0.01em solid #cfcfcf; margin-bottom: 3em"
    >
      <div
        class="d-flex flex-column"
        @click="$router.push('/my-rents/tenancy')"
      >
        <p
          class="mb-1 text-center control-item"
          :class="{ 'control-item-active': $route.name === 'Tenancy' }"
        >
          Tenancy
        </p>
        <b-img
          v-if="$route.name === 'Tenancy'"
          class="rent-tab-active"
          :src="require('@/assets/icons/rent-tab-active.svg')"
        />
        <b-img
          v-else
          class="rent-tab-active"
          :src="require('@/assets/icons/rent-tab-inactive.svg')"
        />
      </div>
      <div
        class="d-flex flex-column"
        @click="$router.push('/my-rents/bookings')"
      >
        <p
          class="mb-1 text-center control-item"
          :class="{ 'control-item-active': $route.name === 'Bookings' }"
        >
          Bookings
        </p>
        <b-img
          v-if="$route.name === 'Bookings'"
          class="rent-tab-active"
          :src="require('@/assets/icons/rent-tab-active.svg')"
        />
        <b-img
          v-else
          class="rent-tab-active"
          :src="require('@/assets/icons/rent-tab-inactive.svg')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#controls {
  margin-top: 2em;
}
.control-item {
  font-size: 1.125em;
  color: #3c4043;
}
.control-item-active {
  color: #c221cf;
}
.control-item:hover {
  cursor: pointer;
}
</style>
