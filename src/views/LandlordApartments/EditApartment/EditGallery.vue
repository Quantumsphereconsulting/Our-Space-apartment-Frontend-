<template>
  <div id="gallery">
    <p class="g-lead">Select apartment pictures and their categories</p>
    <div class="g-items">
      <GalleryItem
        v-if="apartment"
        :featured-image="apartment.featured_image"
        :featured="true"
        :current-image="true"
      />
      <GalleryItem
        v-for="(gallery, index) in galleries"
        :key="index"
        :gallery="gallery"
        @deleted="fetchGalleries"
      />
      <AddItem @addItem="addGalleryItem" />
    </div>
    <b-modal
      v-model="addGallery"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
      @hidden="formReset"
    >
      <form
        @submit.prevent="createGallery"
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <p style="font-size: 1.5em; margin-bottom: 0.8em">Add Image Category</p>
        <b-form-group>
          <b-form-input
            class="g-select"
            v-model="galleryName"
            placeholder="E.g. Kitchen"
            :class="{ 'form-error': $v.galleryName.$error }"
          />
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.galleryName.required"
          >
            <p class="invalid-text">the category name is required</p>
          </div>
          <div
            class="invalid-prompt"
            v-if="submitted && !$v.galleryName.minLength"
          >
            <p class="invalid-text">
              The category name must have at least 3 characters
            </p>
          </div>
        </b-form-group>
        <div v-if="!submitting" class="d-flex justify-content-center mt-4">
          <b-button
            class="btn secondary-outline-btn mr-3 w-100"
            @click="addGallery = false"
          >
            Cancel
          </b-button>
          <b-button type="submit" class="btn primary-btn w-100">
            Confirm
          </b-button>
        </div>
        <scale-loader v-else :loading="true" :color="'#c221cf'" />
      </form>
    </b-modal>
  </div>
</template>

<script>
import GalleryItem from "@/views/LandlordApartments/components/GalleryItem.vue";
import AddItem from "@/views/LandlordApartments/components/AddItem.vue";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  components: {
    GalleryItem,
    AddItem,
  },
  validations: {
    galleryName: { required, minLength: minLength(3) },
  },
  data() {
    return {
      items: 0,
      addGallery: false,
      galleryName: null,
      submitted: false,
      galleries: [],
    };
  },
  mounted() {
    if (this.apartment) {
      this.fetchGalleries();
    }
  },
  methods: {
    addGalleryItem() {
      this.addGallery = true;
    },
    formReset() {
      this.galleryName = null;
      this.submitted = false;
      this.$v.$reset();
    },
    fetchGalleries() {
      const url = `${this.ROUTES.apartment}/${this.apartment.id}/galleries`;
      this.apiGet(url).then((res) => {
        const { success, data } = res.data;
        const { galleries } = data;
        if (success) {
          this.galleries = galleries;
        }
      });
    },
    createGallery() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        const url = `${this.ROUTES.apartment}/${this.apartment.id}/galleries`;
        let data = new FormData();
        data.append("title", this.galleryName);
        this.apiPost(url, data).then((res) => {
          const { message, success, data } = res.data;
          const { apartment_gallery } = data;
          if (success) {
            this.apiSuccess(
              message,
              `You created the ${apartment_gallery.title} category.`
            );
          }
          this.addGallery = false;
          this.formReset();
          this.fetchGalleries();
        });
      }
    },
  },
  props: {
    apartment: null,
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
.form-error {
  border-color: red;
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
.invalid-prompt {
  height: 1em;
  text-align: left;
  margin: 0;
}
.invalid-text {
  font-size: 0.8em;
  color: #ff0000;
  opacity: 0.6;
}
</style>
