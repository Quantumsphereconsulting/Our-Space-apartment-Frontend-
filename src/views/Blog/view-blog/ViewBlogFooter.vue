<template>
  <div id="view-blog-footer">
    <div style="padding: 0 5em" class="d-none d-lg-block">
      <p class="os-black" style="font-size: 2em">Leave a reply</p>
      <b-form-textarea
        id="textarea"
        placeholder="Enter your comment here"
        rows="3"
        style="padding-top: 1.5em; padding-left: 1.5em"
      />
    </div>
    <div class="d-lg-none">
      <p class="os-black" style="font-size: 1.5em">Leave a reply</p>
      <b-form-textarea
        id="textarea"
        placeholder="Enter your comment here"
        rows="4"
        style="padding-top: 1em; padding-left: 1em"
      />
    </div>
    <b-row class="mt-5">
      <b-col lg="6">
        <BlogPost />
      </b-col>
      <b-col lg="6">
        <BlogPost />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost";
export default {
  components: {
    BlogPost,
  },
};
</script>

<style>
#view-blog-footer {
  margin-top: 3em;
  margin-bottom: 4em;
}
</style>
