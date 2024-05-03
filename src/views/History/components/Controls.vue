<template>
  <div id="controls">
    <div
      class="d-flex"
      style="border-bottom: 0.01em solid #cfcfcf; margin-bottom: 3em"
    >
      <div
        class="d-flex flex-column"
        @click="$router.push('/history/favorite-property')"
      >
        <p
          class="mb-1 text-center control-item"
          :class="{ 'control-item-active': $route.name === 'FavoriteProperty' }"
        >
          Favorite Property
        </p>
        <b-img
          v-if="$route.name === 'FavoriteProperty'"
          :src="require('@/assets/icons/history-tab-active.svg')"
        />
        <b-img
          v-else
          :src="require('@/assets/icons/history-tab-inactive.svg')"
        />
      </div>
      <div
        class="d-flex flex-column"
        @click="$router.push('/history/recently-viewed')"
      >
        <p
          class="mb-1 text-center control-item"
          :class="{ 'control-item-active': $route.name === 'RecentlyViewed' }"
        >
          Recently Viewed
        </p>
        <b-img
          v-if="$route.name === 'RecentlyViewed'"
          :src="require('@/assets/icons/history-tab-active.svg')"
        />
        <b-img
          v-else
          :src="require('@/assets/icons/history-tab-inactive.svg')"
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
