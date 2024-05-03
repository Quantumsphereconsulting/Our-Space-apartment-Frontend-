<template>
  <div id="blog-post">
    <b-img rounded width="600" fluid :src="blog.featured_image" />
    <p
      style="font-size: 1.2em; color: #3c4043; opacity: 0.8; margin-top: 0.8em"
    >
      {{ blog.created_at | moment("dddd, MMMM Do YYYY") }}
    </p>
    <p style="color: #3c4043; font-size: 1.8em; margin-top: -0.4em">
      {{ blog.title }}
    </p>
    <d style="color: #3c4043; opacity: 0.8; margin-top: -0.4em">
      {{ blog.highlight }}
    </d>
    <p
      id="read-more"
      class="d-inline-block"
      @click="$router.push(`/blog/${blog.slug}`)"
    >
      READ MORE
    </p>
  </div>
</template>

<script>
export default {
  props: ["blog"],
};
</script>

<style>
#blog-post {
  margin-top: 1em;
  margin-bottom: 1em;
}
#read-more {
  color: #c221cf;
  border-bottom: 0.01em solid #c221cf;
  transition: 0.5s ease;
}
#read-more:hover {
  cursor: pointer;
  color: #84168d;
  border-bottom: 0.01em solid #84168d;
}
</style>
