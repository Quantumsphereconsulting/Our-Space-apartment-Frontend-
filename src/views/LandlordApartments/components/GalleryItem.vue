<template>
  <div id="g-item">
    <ImageInput
      v-if="image || currentImage || newImage"
      v-model="image"
      @input="saveFeaturedImage"
    >
      <div slot="activator">
        <!--        if there's an image, display it-->
        <div class="image" v-if="image">
          <b-img
            style="height: 8.125em; width: 13.9375em; object-fit: cover"
            rounded
            :src="image.imageURL"
          />
        </div>
        <!--        if it's the main featured image display it-->
        <div class="image" v-else-if="currentImage">
          <b-img
            style="height: 8.125em; width: 13.9375em; object-fit: cover"
            rounded
            :src="featuredImage"
          />
        </div>
        <!--        otherwise, display the placeholder-->
        <div class="placeholder" v-else>
          <b-img
            class="mb-2"
            :src="require('@/assets/icons/placeholder.svg')"
          />
          <small> Click to upload main image </small>
        </div>
      </div>
    </ImageInput>
    <!--    manage the image here-->
    <div class="placeholder" v-else @click="manage">
      <b-img :src="require('@/assets/icons/placeholder.svg')" />
      <span class="mb-2 mt-2">{{ imageCount }} images</span>
      <small> Click to manage </small>
    </div>
    <div
      v-if="!currentImage && !newImage"
      class="d-flex justify-content-between align-items-center"
    >
      <div>
        <b-form-input
          v-if="featured"
          class="g-select"
          placeholder="Main Image"
          disabled
        />
        <div v-else>
          <b-form-input
            v-if="currentGallery"
            class="g-select"
            placeholder="Add Category"
            disabled
            :value="currentGallery.title"
          />
        </div>
      </div>
      <!--      more actions-->
      <b-dropdown
        variant="link"
        toggle-class="text-decoration-none mr-n3 pt-3"
        no-caret
        dropup
        :right="true"
      >
        <template #button-content>
          <fa-icon
            class="more"
            :icon="['fas', 'ellipsis-v']"
            style="font-size: 1em"
          />
        </template>
        <b-dropdown-item href="#" id="first-item" @click="update">
          <fa-icon :icon="['fas', 'pen']" class="mr-2" />
          Update
        </b-dropdown-item>
        <b-dropdown-item href="#" @click="manage">
          <fa-icon :icon="['far', 'images']" class="mr-2" /> Manage Images
        </b-dropdown-item>
        <b-dropdown-item href="#" id="last-item" @click="confirmDelete = true">
          <fa-icon :icon="['far', 'trash-alt']" class="mr-2" />
          Delete
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-else>
      <div>
        <b-form-input
          v-if="featured"
          class="g-select"
          placeholder="Main Image"
          disabled
        />
        <div v-else>
          <b-form-input
            v-if="currentGallery"
            class="g-select"
            placeholder="Add Category"
            disabled
            :value="currentGallery.title"
          />
        </div>
      </div>
    </div>
    <b-modal
      v-model="editGallery"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
      @hidden="formReset"
    >
      <form
        @submit.prevent="updateGallery"
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <p style="font-size: 1.5em; margin-bottom: 0.8em">Update Category</p>
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
            @click="editGallery = false"
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
    <b-modal
      v-model="confirmDelete"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 4em);
        "
      >
        <fa-icon
          :icon="['fas', 'exclamation-triangle']"
          class="text-danger"
          style="font-size: 4em"
        />
        <p style="font-size: 1.5em; margin-top: 1em; margin-bottom: 0">
          Are you sure?
        </p>
        <p v-if="currentGallery">
          Please note, this will remove
          <strong>{{ currentGallery.title }}</strong> category and all its
          associated images from Our Space. This action is irreversible.
        </p>
        <div class="d-flex justify-content-center mt-4">
          <b-button
            class="btn secondary-outline-btn mr-3 w-100"
            @click="confirmDelete = false"
          >
            Cancel
          </b-button>
          <b-button class="btn primary-btn w-100" @click="deleteCategory">
            Confirm
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="deleting"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <scale-loader class="mt-1" :loading="true" :color="'#c221cf'" />
        <p v-if="currentGallery" style="font-size: 1.5em; margin-top: 2em">
          Please wait, <strong>{{ currentGallery.title }}</strong> category is
          being deleted...
        </p>
      </div>
    </b-modal>
    <b-modal
      v-model="manageImages"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
      size="lg"
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <ImageInputMultiple v-model="images" @input="uploadImages">
          <div slot="activator">
            <div class="upload-images">
              <b-img
                :src="require('@/assets/icons/placeholder.svg')"
                class="mb-2"
              />
              Click here to upload one or more images
            </div>
          </div>
        </ImageInputMultiple>
        <scale-loader
          v-if="uploading"
          class="mt-4"
          :loading="true"
          :color="'#c221cf'"
        />
        <div v-else>
          <b-alert
            v-if="imageCount === 0"
            show
            variant="info"
            class="mt-4 text-left"
          >
            <h4 class="alert-heading mt-2">No Images</h4>
            <p>
              This category does not have images yet. Any images you upload will
              be shown here.
            </p>
          </b-alert>
          <div v-else>
            <b-card
              class="mt-3"
              v-for="(image, index) in galleryImages"
              :key="index"
            >
              <b-media>
                <template #aside>
                  <b-img :src="image.original_url" width="70" rounded />
                </template>
                <div
                  class="d-flex w-100 justify-content-between align-items-center"
                >
                  <div class="text-left">
                    <p class="mb-0">
                      {{
                        image.file_name | truncate(45, `...${image.extension}`)
                      }}
                    </p>
                    <small class="text-muted">
                      {{ image.size | fileSizeFormat }}
                    </small>
                  </div>
                  <fa-icon
                    @click="confirmDeleteImagee(image)"
                    style="cursor: pointer"
                    class="text-danger"
                    :icon="['far', 'trash-alt']"
                  />
                </div>
              </b-media>
            </b-card>
          </div>
          <b-button
            class="btn primary-btn w-100 mb-n4 mt-4"
            @click="manageImages = false"
          >
            Done
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="confirmDeleteImage"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 4em);
        "
      >
        <fa-icon
          :icon="['fas', 'exclamation-triangle']"
          class="text-danger"
          style="font-size: 4em"
        />
        <p style="font-size: 1.5em; margin-top: 1em; margin-bottom: 0">
          Are you sure?
        </p>
        <p v-if="selectedImage">
          Please note, this will remove
          <strong>{{ selectedImage.file_name }}</strong> from Our Space. This
          action is irreversible.
        </p>
        <div class="d-flex justify-content-center mt-4">
          <b-button
            class="btn secondary-outline-btn mr-3 w-100"
            @click="
              confirmDeleteImage = false;
              manageImages = true;
            "
          >
            Cancel
          </b-button>
          <b-button class="btn primary-btn w-100" @click="deleteImage">
            Confirm
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="deletingImage"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <scale-loader class="mt-1" :loading="true" :color="'#c221cf'" />
        <p v-if="selectedImage" style="font-size: 1.5em; margin-top: 2em">
          Please wait, <strong>{{ selectedImage.file_name }}</strong> is being
          deleted...
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ImageInput from "./ImageInput.vue";
import ImageInputMultiple from "./ImageInputMultiple";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  components: {
    ImageInput,
    ImageInputMultiple,
  },
  validations: {
    galleryName: { required, minLength: minLength(3) },
  },
  mounted() {
    if (this.gallery) {
      this.currentGallery = this.gallery;
      this.fetchGallery();
    }
  },
  data() {
    return {
      image: null,
      category: null,
      categories: [{ text: "Category", value: null }],
      allCategory: null,
      allCategoryImages: [{ text: "All Categories", value: null }],
      editGallery: false,
      galleryName: null,
      submitted: false,
      currentGallery: null,
      confirmDelete: false,
      deleting: false,
      manageImages: false,
      images: null,
      galleryImages: [],
      uploading: false,
      imageCount: 0,
      confirmDeleteImage: false,
      selectedImage: null,
      deletingImage: false,
    };
  },
  methods: {
    saveFeaturedImage() {
      let { image } = this;
      this.$store.dispatch("apartment/saveFeaturedImage", { image });
    },
    formReset() {
      this.galleryName = null;
      this.submitted = false;
      this.$v.$reset();
    },
    update() {
      this.galleryName = this.currentGallery.title;
      this.editGallery = true;
    },
    fetchGallery() {
      const url = `${this.ROUTES.apartment}/${this.currentGallery.apartment_id}/galleries/${this.currentGallery.id}`;
      this.apiGet(url).then((res) => {
        const { apartment_gallery } = res.data.data;
        const { images } = apartment_gallery;
        this.galleryImages = images;
        this.imageCount = Object.keys(images).length;
      });
    },
    updateGallery() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.apiInvalidForm();
      } else {
        const url = `${this.ROUTES.apartment}/${this.currentGallery.apartment_id}/galleries/${this.currentGallery.id}`;
        let data = new FormData();
        data.append("title", this.galleryName);
        data.append("_method", "PUT");
        this.apiPost(url, data).then((res) => {
          const { message, success, data } = res.data;
          const { apartment_gallery } = data;
          if (success) {
            this.apiSuccess(
              message,
              `You updated the ${apartment_gallery.title} category.`
            );
          }
          this.editGallery = false;
          this.formReset();
          this.currentGallery = apartment_gallery;
        });
      }
    },
    deleteCategory() {
      this.confirmDelete = false;
      this.deleting = true;
      const url = `${this.ROUTES.apartment}/${this.currentGallery.apartment_id}/galleries/${this.currentGallery.id}`;
      this.apiDelete(url).then(() => {
        this.deleting = false;
        this.$emit("deleted");
      });
    },
    manage() {
      this.manageImages = true;
    },
    async uploadImages() {
      this.uploading = true;
      let data = new FormData();
      await this.images.forEach((image, index) => {
        data.append(`images[${index}]`, image);
      });
      const url = `${this.ROUTES.apartment}/${this.currentGallery.apartment_id}/galleries/${this.currentGallery.id}/images`;
      await this.apiPost(url, data)
        .then((res) => {
          const { message, success } = res.data;
          if (success) {
            this.apiSuccess("Upload Successful", message);
          }
        })
        .catch(() => (this.uploading = false));
      await this.fetchGallery();
      this.uploading = false;
    },
    confirmDeleteImagee(image) {
      this.selectedImage = image;
      this.manageImages = false;
      this.confirmDeleteImage = true;
    },
    deleteImage() {
      this.confirmDeleteImage = false;
      this.deletingImage = true;
      const url = `${this.ROUTES.apartment}/${this.currentGallery.apartment_id}/galleries/${this.currentGallery.id}/images/${this.selectedImage.uuid}`;
      this.apiDelete(url)
        .then(async () => {
          await this.fetchGallery();
          this.deletingImage = false;
          this.manageImages = true;
        })
        .catch(() => {
          this.deletingImage = false;
        });
    },
  },
  props: {
    currentImage: null,
    allCategories: null,
    featured: null,
    featuredImage: null,
    gallery: null,
    newImage: null,
  },
};
</script>

<style>
#g-item {
  margin-top: 1em;
  margin-right: 1.5em;
  display: inline-block;
}
.placeholder {
  width: 13.9375em;
  height: 8.125em;
  border-radius: 5px;
  border: 1px dashed #cecece;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.5s ease;
}
.placeholder:hover {
  cursor: pointer;
  background-color: #f5f4ff;
  border: 1px dashed #cecece;
}
.upload-images {
  width: 100%;
  height: 8.125em;
  border-radius: 5px;
  border: 1px dashed #cecece;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease;
}
.upload-images:hover {
  cursor: pointer;
  background-color: #f5f4ff;
  border: 1px dashed #cecece;
}
.image {
  width: 13.9375em;
  height: auto;
  border-radius: 5px;
  transition: 0.5s ease;
}
.image:hover {
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
