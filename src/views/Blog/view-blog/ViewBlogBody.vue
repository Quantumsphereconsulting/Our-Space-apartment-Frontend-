<template>
  <div
    v-html="blog.body"
    id="view-blog"
    class="os-black"
    style="opacity: 0.8"
  />
</template>

<script>
export default {
  props: ["blog"],
};
</script>

<style>
.text-heading {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
}
</style>
