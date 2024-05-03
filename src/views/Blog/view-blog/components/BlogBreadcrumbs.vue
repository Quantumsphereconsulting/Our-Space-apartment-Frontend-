<template>
  <div id="blog-breadcrumbs">
    <div class="d-none d-lg-flex">
      <span class="crumb" @click="$router.push('/blog')"> Blog </span>
      <span style="margin-right: 1em; color: #c221cf"> >> </span>
      <span style="margin-right: 1em; color: #c221cf">
        {{ slug }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["slug"],
};
</script>

<style>
#blog-breadcrumbs {
  margin-top: 4em;
}
.crumb {
  margin-right: 1em;
  color: #c221cf;
  transition: 0.5s ease;
}
.crumb:hover {
  cursor: pointer;
  color: #84168d;
}
</style>
