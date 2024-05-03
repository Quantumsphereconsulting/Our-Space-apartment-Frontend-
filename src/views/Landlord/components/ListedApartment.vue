<template>
  <div class="d-inline-block">
    <div id="panel-header" @click="previewApartment">
      <b-img
        v-if="apartment.featured_image"
        id="panel-header-img"
        :src="apartment.featured_image"
        style="object-fit: cover"
        fluid
      />
      <b-img
        v-else
        id="panel-header-img"
        :src="require('@/assets/images/featured-panel.svg')"
        style="object-fit: cover"
        fluid
      />
      <div id="overlay"></div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <h5
        class="mt-3 mb-0 d-inline-flex"
        style="color: #3c4043; line-height: 0.9em"
      >
        {{ apartment.name | truncate(20, "...") }}
      </h5>
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
            style="font-size: 0.7em"
          />
        </template>
        <b-dropdown-item
          href="#"
          id="first-item"
          @click="
            $router.push({
              name: 'EditLandlordApartments',
              params: { slug: apartment.slug },
            })
          "
        >
          <fa-icon :icon="['fas', 'pen']" class="mr-2" />
          Edit
        </b-dropdown-item>
        <b-dropdown-item href="#" @click="previewApartment">
          <fa-icon :icon="['far', 'eye']" class="mr-2" /> Preview
        </b-dropdown-item>
        <b-dropdown-item
          href="#"
          id="last-item"
          @click="confirmDuplicate = true"
        >
          <fa-icon :icon="['far', 'clone']" class="mr-2" /> Duplicate
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <b-modal
      v-model="confirmDuplicate"
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
          padding: clamp(2em, 5vw, 3em);
        "
      >
        <fa-icon
          :icon="['fas', 'exclamation-triangle']"
          class="text-warning"
          style="font-size: 4em"
        />
        <p style="font-size: 1.5em; margin-top: 1em">Are you sure?</p>
        <p v-if="apartment">
          Please note, this will duplicate
          <strong>{{ apartment.name }}</strong> on Our Space.
        </p>
        <div class="d-flex justify-content-center mt-4">
          <b-button
            class="btn secondary-outline-btn mr-3 w-100"
            @click="confirmDuplicate = false"
          >
            Cancel
          </b-button>
          <b-button class="btn primary-btn w-100" @click="duplicateApartment">
            Confirm
          </b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model="duplicating"
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
        <scale-loader class="mt-1" :loading="true" :color="'#c221cf'" />
        <p v-if="apartment" style="font-size: 1.5em; margin-top: 2em">
          Please wait, <strong>{{ apartment.name }}</strong> is being
          duplicated...
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDuplicate: false,
      duplicating: false,
    };
  },
  props: {
    location: {
      type: String,
    },
    apartment: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
  methods: {
    duplicateApartment() {
      this.confirmDuplicate = false;
      this.duplicating = true;
      let url = `${this.ROUTES.apartment}/${this.apartment.id}/duplicate`;
      this.apiPost(url)
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.apiSuccess("Action Successful", message);
            this.duplicating = false;
            this.$emit("duplicated");
          }
        })
        .catch(() => {
          this.duplicating = false;
        });
    },
    previewApartment() {
      this.$router.push({
        name: "PreviewLandlordApartments",
        params: { slug: this.apartment?.slug },
      });
    },
  },
};
</script>

<style>
#panel-header {
  position: relative;
}
#panel-header-img {
  display: block;
  width: 100%;
  height: 177px;
  border-radius: 10px;
  transition: 0.5s ease;
}
@media only screen and (min-width: 992px),
  only screen and (min-device-width: 992px) {
  #panel-header-img {
    width: 17.5em;
    height: 14.375em;
  }
}
#panel-header:hover #panel-header-img {
  opacity: 0.7;
  cursor: pointer;
}

#panel-header-action {
  position: absolute;
  top: 50%;
  left: 230px;
  color: #ffffff;
  font-size: 1.3em;
  transition: 0.5s ease;
}

#panel-header-action:hover {
  font-size: 1.5em;
  cursor: pointer;
}
.more {
  margin-top: 1em;
  margin-right: 0.5em;
}
.more:hover {
  cursor: pointer;
}
.dropdown-toggle {
  background-color: #ffffff;
  border-color: #ffffff;
  color: #3c4043;
}
.dropdown-toggle:hover,
.dropdown-toggle:focus,
.dropdown-toggle:active,
.dropdown-toggle.active {
  background-color: #ffffff;
  border-color: #ffffff;
  color: #3c4043 !important;
}
</style>
