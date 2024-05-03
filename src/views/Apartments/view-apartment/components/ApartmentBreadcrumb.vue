<template>
  <div id="apartment-breadcrumbs">
    <div class="d-none d-lg-flex">
      <router-link
        style="margin-right: 1em; color: #c221cf"
        :to="{ name: 'Apartments' }"
      >
        Apartments
      </router-link>
      <span style="margin-right: 1em; color: #c221cf"> >> </span>
      <span style="margin-right: 1em; color: #c221cf">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
#apartment-breadcrumbs {
  margin-top: 4em;
}
</style>
