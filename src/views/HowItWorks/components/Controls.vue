<template>
  <div id="controls">
    <div
      class="d-flex"
      style="border-bottom: 0.01em solid #cfcfcf; margin-bottom: 0"
    >
      <div
        class="d-flex flex-column"
        @click="$router.push('/how-it-works/user')"
      >
        <p
          class="mb-1 text-center control-item"
          :class="{ 'control-item-active': $route.name === 'HowItWorksUser' }"
        >
          User
        </p>
        <b-img
          v-if="$route.name === 'HowItWorksUser'"
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
        @click="$router.push('/how-it-works/landlord')"
      >
        <p
          class="mb-1 text-center control-item"
          :class="{
            'control-item-active': $route.name === 'HowItWorksLandLord',
          }"
        >
          Landlords
        </p>
        <b-img
          v-if="$route.name === 'HowItWorksLandLord'"
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
