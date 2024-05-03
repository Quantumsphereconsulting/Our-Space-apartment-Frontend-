<template>
  <div id="gallery" class="d-none d-lg-block">
    <b-row style="height: 360px" cols="4">
      <b-col class="pr-0" style="height: 360px" lg="6">
        <b-img
          style="
            background-position: center;
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 10px;
          "
          fluid
          :src="apartment.featured_image"
        />
      </b-col>
      <b-col class="pr-0" style="height: 360px" v-if="Gallery.length > 0">
        <b-img
          v-bind="fronGalleryImg"
          style="
            background-position: center;
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 10px;
          "
          :src="Gallery[0]"
        />
      </b-col>
      <b-col
        style="height: 360px"
        @click="viewMorePictures"
        class="img-wrapper pr-0"
        v-if="Gallery.length > 0"
      >
        <b-img
          v-bind="fronGalleryImg"
          style="
            background-position: center;
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 10px;
          "
          class="more-img"
          :src="Gallery[0]"
        />
        <div
          class="overlay text-center d-flex justify-content-center align-items-center"
        >
          View {{ Gallery.length }} other <br />photos
        </div>
      </b-col>
    </b-row>

    <b-modal
      v-if="Gallery.length > 0"
      ref="more-pictures"
      hide-footer
      centered
      scrollable
      size="xl"
    >
      <template #modal-header="{ close }" style="text-align: right">
        <p style="visibility: hidden">Pictures</p>
        <fa-icon
          :icon="['fas', 'times']"
          @click="close()"
          style="font-size: 1.5em"
          id="modal-close"
        />
      </template>
      <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="3" class="px-5">
        <b-col class="p-3" :key="index" v-for="(media, index) in Gallery">
          <b-img
            rounded
            style="background-position: center; object-fit: cover; width: 100%"
            v-bind="modalGalleryImg"
            :src="media"
            @click="viewImageModal(index)"
          />
        </b-col>
      </b-row>
    </b-modal>

    <b-modal ref="my-modal" hide-footer size="xl">
      <div class="d-block text-center">
        <div>
          <hooper ref="carousel">
            <slide v-for="(media, index) in Gallery" :key="index">
              <b-img :src="media" fluid-grow alt="Fluid-grow image"></b-img>
            </slide>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
          </hooper>
        </div>
      </div>
    </b-modal>

    <div v-show="viewImage" class="fixed inset bg-opacity-70">
      <div>
        <hooper>
          <slide v-for="(media, index) in Gallery" :key="index">
            <b-img
              style="max-height: 400px; object-fit: cover"
              :src="media"
              alt="Fluid-grow image"
            />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  // props: ["apartment"],
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
  props: ["apartment", "Gallery"],
  data() {
    return {
      fronGalleryImg: { blank: false, width: 260, height: 330, class: "m1" },
      modalGalleryImg: { blank: false, height: 330, class: "m1" },
      viewImage: false,
      carousel: 0,
    };
  },
  methods: {
    viewMorePictures() {
      this.$refs["more-pictures"].show();
    },
    viewImageModal(index) {
      this.$refs["my-modal"].show();
      this.carousel = index;
    },
  },
};
</script>

<style>
.hooper {
  height: 100% !important;
  max-height: 600px;
  /* object-fit: cover; */
}
.bg-opacity-70 {
  background: rgba(0, 0, 0, 0.767);
}
.fixed {
  position: fixed;
  z-index: 800;
}
.inset {
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
#gallery {
  margin-top: 4em;
  margin-bottom: 2em;
}
.img-wrapper {
  position: relative;
}
.overlay {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.767);
  color: #ffffff;
  font-size: 1.2em;
  text-align: center;
  margin-left: 15px;
  border-radius: 10px;
}
.img-wrapper .more-img {
  transition: 0.8s ease;
}

.img-wrapper .more-img:hover,
.overlay {
  cursor: pointer;
  opacity: 0.8;
  transition: 0.8s ease;
}

.more-pictures-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.3em;
  color: #3c4043;
}
#modal-close:hover {
  cursor: pointer;
}
</style>
