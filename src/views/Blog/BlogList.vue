<template>
  <div id="blog-list">
    <b-row style="margin-bottom: 3em">
      <b-col v-for="(blog, index) in blogs.data" :key="index" lg="6">
        <BlogPost :blog="blog" />
      </b-col>
    </b-row>
    <b-pagination
      align="center"
      v-model="blogs.current_page"
      :total-rows="blogs.total"
      :per-page="blogs.per_page"
      aria-controls="my-table"
      @change="changepage"
      pills
      first-number
      last-number
      limit="8"
    />
  </div>
</template>

<script>
import BlogPost from "./components/BlogPost";
export default {
  props: ["blogs"],
  components: {
    BlogPost,
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      rows: 100,
    };
  },
  methods: {
    changepage(page) {
      this.$emit("changepage", page);
    },
  },
};
</script>

<style>
#blog-list {
  margin-top: 4em;
  margin-bottom: 4em;
}
</style>
