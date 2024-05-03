<template>
  <div id="avatar">
    <DpInput v-model="image">
      <div slot="activator">
        <div style="width: 100px; height: 100px" v-if="!image">
          <img
            style="
              border-radius: 50%;
              width: 100%;
              height: 100%;
              background-position: center;
              object-fit: cover;
            "
            :src="avatar"
          />
        </div>
        <div style="width: 100px; height: 100px" v-else>
          <img
            style="
              border-radius: 50%;
              width: 100%;
              height: 100%;
              background-position: center;
              object-fit: cover;
            "
            :src="image.imageURL"
          />
        </div>
      </div>
    </DpInput>
  </div>
</template>

<script>
import DpInput from "./DpInput";
export default {
  components: {
    DpInput,
  },
  data() {
    return {
      image: null,
      avatar: this.$store.getters["auth/getAvatar"],
      category: null,
      categories: [{ text: "Category", value: null }],
      featuredImage: null,
      featuredImages: [{ text: "Featured", value: null }],
      allCategory: null,
      allCategoryImages: [{ text: "All Categories", value: null }],
    };
  },
  props: {
    currentImage: null,
    allCategories: null,
    featured: null,
  },
};
</script>

<style>
#avatar {
  margin-top: 1em;
  margin-right: 1.5em;
  display: inline-block;
}
.img {
  background-position: center;
  background-size: cover;
}
.avatar-image {
  width: 8em;
  height: 8em;
  border-radius: 5px;
  transition: 0.5s ease;
}
.avatar-image:hover {
  cursor: pointer;
  opacity: 0.8;
}
.g-select {
  margin-top: 1.1em;
  height: 3.125em;
  background-color: #f5f4ff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
}
</style>
