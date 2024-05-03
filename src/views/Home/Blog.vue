<template>
  <div id="blog-section">
    <div class="text-center">
      <p class="blog-section-title">Our Space Blog</p>
      <p class="blog-section-subtitle">Read exciting articles about myspace</p>
    </div>
    <div v-if="blog && body">
      <b-card
        id="blog-card"
        :img-src="blog.featured_image"
        img-alt="Card image"
        class="d-none d-lg-flex"
        img-right
        img-width="500"
      >
        <b-card-text>
          <p class="blog-card-title">{{ blog.title }}</p>
          <p class="blog-card-subtitle">
            {{ body | truncate(300) }}
          </p>
          <p id="blog-cta" class="mt-3" @click="$router.push('/blog')">
            Go to Blog
            <fa-icon :icon="['fas', 'long-arrow-alt-right']" class="ml-1" />
          </p>
        </b-card-text>
      </b-card>
      <b-card id="blog-card-mobile" class="d-lg-none">
        <h2 class="ml-4 mt-3 mb-4" style="color: #3c4043">Our Space Blog</h2>
        <h6 class="ml-4" style="color: #3c4043; font-size: 1.3em; opacity: 0.8">
          {{ body | truncate(200) }}
        </h6>
        <p id="blog-cta" class="mt-3 ml-4" @click="$router.push('/blog')">
          Go to Blog
          <fa-icon :icon="['fas', 'long-arrow-alt-right']" class="ml-1" />
        </p>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: null,
      blog: null,
      body: null,
    };
  },
  mounted() {
    this.fetchBlogs();
  },
  methods: {
    async fetchBlogs() {
      let url = `posts`;
      await this.apiGet(url).then((res) => {
        const { posts } = res.data.data;
        this.blogs = posts;
      });
      this.blog = this.blogs?.data[0];
      if (this.blog) {
        url = `posts/${this.blog.id}`;
        await this.apiGet(url).then((res) => {
          const { post } = res.data.data;
          this.body = post?.body;
        });
      }
    },
  },
};
</script>

<style>
#blog-section {
  padding-top: 4em;
  padding-bottom: 5em;
}
.blog-section-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 3em;
  color: #3c4043;
}
.blog-section-subtitle {
  font-size: 1.1em;
  margin-top: 1em;
  color: #3c4043;
}
.blog-card-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 2.5em;
  color: #3c4043;
}
.blog-card-subtitle {
  font-size: 1.375em;
  margin-top: 1em;
  color: #3c4043;
  opacity: 0.8;
}
#blog-card {
  margin-top: 4em;
  border: 1px solid #e2e2e2;
  box-shadow: 0px 5px 4px rgba(221, 221, 221, 0.25);
}
#blog-card-mobile {
  margin-top: 2em;
  border: 1px solid #e2e2e2;
  box-shadow: 0px 5px 4px rgba(221, 221, 221, 0.25);
}
#blog-cta {
  color: #c221cf;
  transition: 0.5s ease;
}
#blog-cta:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
