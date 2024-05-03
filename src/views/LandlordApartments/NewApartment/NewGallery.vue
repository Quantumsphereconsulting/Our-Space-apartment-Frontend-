<template>
  <div id="gallery">
    <p class="g-lead">Select apartment main image</p>
    <div class="g-items">
      <GalleryItem :featured="true" :current-image="false" :new-image="true" />
    </div>
  </div>
</template>

<script>
import GalleryItem from "@/views/LandlordApartments/components/GalleryItem.vue";
// import AddItem from "@/views/LandlordApartments/components/AddItem.vue";
export default {
  components: {
    GalleryItem,
    // AddItem,
  },
  data() {
    return {
      items: 0,
      image: null,
    };
  },
  methods: {
    addGalleryItem() {
      this.items++;
    },
  },
};
</script>

<style>
#gallery {
  margin-top: 3em;
  margin-bottom: 3em;
}
@media only screen and (min-width: 992px),
  only screen and (min-device-width: 992px) {
  #gallery {
    padding-left: 22em;
    padding-right: 2em;
  }
}
.g-lead {
  font-size: 1.125em;
  margin-bottom: 1em;
  color: #3c4043;
}
.g-items {
  padding: 2em;
  border-radius: 10px;
  border: 1px solid #cecece;
  display: flex;
  overflow-x: auto;
}
.g-items::-webkit-scrollbar {
  display: none;
}
</style>
