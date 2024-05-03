<template>
  <div id="view-blog">
    <b-container>
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <BlogBreadcrumbs :slug="blog.slug" />
      <ViewBlogHeader :blog="blog" />
      <ViewBlogBody :blog="blog" />
      <ViewBlogFooter />
    </b-container>
  </div>
</template>

<script>
import BlogBreadcrumbs from "./components/BlogBreadcrumbs";
import ViewBlogHeader from "./ViewBlogHeader";
import ViewBlogBody from "./ViewBlogBody";
import ViewBlogFooter from "./ViewBlogFooter";
export default {
  components: {
    BlogBreadcrumbs,
    ViewBlogHeader,
    ViewBlogBody,
    ViewBlogFooter,
  },
  data() {
    return {
      blog: null,
    };
  },
  mounted() {
    this.fetchBlog(this.$route.params.id);
  },
  methods: {
    fetchBlog(slugOrId) {
      const url = `posts/${slugOrId}`;
      this.apiGet(url).then((res) => {
        const { post } = res.data.data;
        this.blog = post;
      });
    },
  },
};
</script>
