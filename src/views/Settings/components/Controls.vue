<template>
  <div id="controls">
    <div class="d-flex flex-lg-row flex-column" style="margin-bottom: 3em">
      <div
        class="d-flex flex-column mb-lg-0 mb-2"
        @click="$router.push('/settings/profile-update')"
      >
        <p
          class="mb-1 text-center control-item"
          :class="{ 'control-item-active': $route.name === 'ProfileUpdate' }"
        >
          Profile Update
        </p>
        <b-img
          v-if="$route.name === 'ProfileUpdate'"
          :src="require('../../../assets/icons/history-tab-active.svg')"
          style="width: 10em; align-self: center"
        />
        <b-img
          v-else
          :src="require('../../../assets/icons/history-tab-inactive.svg')"
          style="width: 10em; align-self: center"
        />
      </div>
      <div
        class="d-flex flex-column mb-lg-0 mb-2"
        @click="$router.push('/settings/receipts')"
      >
        <p
          class="mb-1 text-center control-item"
          :class="{ 'control-item-active': $route.name === 'Receipts' }"
        >
          Receipts
        </p>
        <b-img
          v-if="$route.name === 'Receipts'"
          :src="require('../../../assets/icons/history-tab-active.svg')"
          style="width: 10em; align-self: center"
        />
        <b-img
          v-else
          :src="require('../../../assets/icons/history-tab-inactive.svg')"
          style="width: 10em; align-self: center"
        />
      </div>
      <div
        class="d-flex flex-column"
        @click="$router.push('/settings/security')"
      >
        <p
          class="mb-1 text-center control-item"
          :class="{ 'control-item-active': $route.name === 'Security' }"
        >
          Security
        </p>
        <b-img
          v-if="$route.name === 'Security'"
          :src="require('../../../assets/icons/history-tab-active.svg')"
          style="width: 10em; align-self: center"
        />
        <b-img
          v-else
          :src="require('../../../assets/icons/history-tab-inactive.svg')"
          style="width: 10em; align-self: center"
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
  margin-top: 1em;
}
.control-item {
  font-size: 1.125em;
  color: #3c4043;
  opacity: 0.5;
  transition: 0.5s ease;
}
.control-item-active {
  color: #c221cf;
  opacity: 1;
}
.control-item:hover {
  cursor: pointer;
}
</style>
