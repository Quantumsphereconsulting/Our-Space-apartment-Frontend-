<template>
  <b-row
    id="blog-header"
    class="d-flex justify-content-center align-items-center"
  >
    <b-col lg="6">
      <p id="blog-header-title">Blog Posts</p>
      <p id="blog-header-subtitle">I think so, this is it.</p>
      <p style="color: #3c4043; opacity: 0.8">
        Design begins after I begin to think about how to present an experience
        most successfully, whether a button I put in can solve a problem. The
        only point in design is not ui design, if the user does not have a good
        experience at the end of the product, the design will be considered
        unsuccessful in my opinion.
      </p>
      <div class="mt-lg-5 mt-4 d-flex flex-lg-row flex-column">
        <b-button
          class="secondary-outline-btn mb-lg-0 mb-4"
          style="border-radius: 0; padding: 1em 2em"
          @click="routeLinks('twitter')"
        >
          <fa-icon :icon="['fab', 'twitter']" class="mr-1" />
          TWITTER
        </b-button>
        <b-button
          class="secondary-outline-btn ml-lg-3 mb-lg-0 mb-4"
          style="border-radius: 0; padding: 1em 2em"
          @click="routeLinks('linkedin')"
        >
          <fa-icon :icon="['fab', 'linkedin']" class="mr-1" />
          LINKEDIN
        </b-button>
        <b-button
          class="secondary-outline-btn ml-lg-3"
          style="border-radius: 0; padding: 1em 2em"
          @click="routeLinks('medium')"
        >
          <fa-icon :icon="['fab', 'medium']" class="mr-1" />
          MEDIUM
        </b-button>
      </div>
    </b-col>
    <b-col lg="6" class="d-none d-lg-flex">
      <b-img fluid :src="require('@/assets/images/blog-header.png')" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  methods: {
    routeLinks(link) {
      switch (link) {
        case "twitter":
          location.href = "https://twitter.com";
          break;
        case "linkedin":
          location.href = "https://linkedin.com";
          break;
        case "medium":
          location.href = "https://medium.com";
          break;
      }
    },
  },
};
</script>

<style>
#blog-header {
  margin-top: 4em;
  margin-bottom: 4em;
}
#blog-header-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3em;
  color: #3c4043;
}
#blog-header-subtitle {
  font-size: 3em;
  color: #3c4043;
  margin-top: -0.5em;
}
</style>
