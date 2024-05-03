<template>
  <b-container>
    <BlogHeader />
    <scale-loader
      v-if="apiBusy"
      class="mt-5"
      :loading="true"
      :color="'#c221cf'"
    />
    <BlogList @changepage="changepage($event)" :blogs="blogs" />
  </b-container>
</template>

<script>
import BlogHeader from "./BlogHeader";
import BlogList from "./BlogList";

export default {
  components: {
    BlogHeader,
    BlogList,
  },
  data() {
    return {
      blogs: [],
    };
  },
  mounted() {
    this.fetchBlogs(1);
  },
  methods: {
    changepage(page) {
      this.fetchBlogs(page);
    },
    fetchBlogs(page) {
      const url = `posts?per_page=6&page=${page}`;
      this.apiGet(url).then((res) => {
        const { posts } = res.data.data;
        this.blogs = posts;
      });
    },
  },
};
</script>

<style></style>
