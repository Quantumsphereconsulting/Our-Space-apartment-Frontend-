<template>
  <div id="view-blog-header">
    <b-img
      style="
        max-height: 600px;
        object-fit: cover;
        width: 100%;
        border-radius: 10px;
      "
      fluid
      :src="blog.featured_image"
    />
    <p
      style="font-size: 1.2em; color: #3c4043; opacity: 0.8; margin-top: 0.8em"
    >
      {{ blog.created_at | moment("dddd, MMMM Do YYYY") }}
    </p>
    <p style="color: #3c4043; font-size: 1.8em; margin-top: -0.4em">
      {{ blog.title }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["blog"],
};
</script>

<style>
#view-blog-header {
  margin-top: 2em;
}
</style>
