<template>
  <div id="p-gallery">
    <b-img
      v-if="apartment"
      class="g-image cursor-pointer"
      fluid
      :src="apartment.featured_image"
      @click="previewImages(0)"
    />
    <b-img
      v-for="(image, id, index) in images"
      :key="image.uuid"
      class="g-image cursor-pointer"
      fluid
      :src="image.original_url"
      @click="previewImages(index + 1)"
    />
    <vue-easy-lightbox
      scrollDisabled
      escDisabled
      moveDisabled
      :visible="visible"
      :imgs="allImages"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
export default {
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      images: null,
      visible: false,
      allImages: null,
      index: 0,
    };
  },
  mounted() {
    if (this.apartment) {
      this.fetchImages();
    }
  },
  props: {
    featuredImage: null,
    apartment: null,
  },
  methods: {
    fetchImages() {
      let url = `${this.ROUTES.apartment}/${this.apartment.id}/galleries`;
      this.apiGet(url).then((res) => {
        const { success, data } = res.data;
        const { galleries } = data;
        if (success) {
          galleries.forEach(async (gallery) => {
            url = `${this.ROUTES.apartment}/${gallery.apartment_id}/galleries/${gallery.id}`;
            await this.apiGet(url).then((res) => {
              const { apartment_gallery } = res.data.data;
              const { images, title } = apartment_gallery;
              for (const imageID in images) {
                images[imageID]["gallery"] = title;
              }
              this.images = { ...this.images, ...images };
            });
          });
        }
      });
    },
    previewImages(index) {
      // preview images using vue lightbox
      this.allImages = [];
      this.allImages.push({ title: "Featured Image", src: this.featuredImage });
      for (const imageID in this.images) {
        let currentImage = this.images[imageID];
        this.allImages.push({
          title: currentImage.gallery,
          src: currentImage.original_url,
        });
      }
      this.index = index;
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
};
</script>

<style>
#p-gallery {
  margin-top: 3em;
  margin-bottom: 3em;
  display: flex;
  overflow-x: auto;
}
#p-gallery::-webkit-scrollbar {
  display: none;
}
.g-image {
  margin-right: 1.2em;
  width: 17.5em;
  height: 14.375em;
  border-radius: 10px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
