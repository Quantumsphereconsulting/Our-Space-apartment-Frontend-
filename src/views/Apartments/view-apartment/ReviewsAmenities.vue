<template>
  <div id="reviews-amenities" class="d-none d-lg-block">
    <b-row>
      <b-col lg="9" class="pe-5">
        <div class="d-flex justify-content-between">
          <p style="font-size: 1.3em; color: #3c4043">
            Reviews ({{ apartment.reviews.length }})
          </p>
          <p @click="viewAllReviews" id="view-all">View all</p>
        </div>
        <div class="mb-5">
          <Review
            v-show="index < 2"
            v-for="(review, index) in reviews"
            :review="review"
            :key="index"
          />
        </div>
      </b-col>
      <b-col lg="3">
        <p
          style="
            font-size: 1.3em;
            color: #3c4043;
            padding-left: 1em;
            margin-bottom: 1.5em;
          "
        >
          Amenities
        </p>
        <div style="padding-left: 2em">
          <Amenity
            v-for="(amenity, index) in apartment.amenities"
            :index="index"
            :key="amenity.id"
            :list="true"
            :img-path="amenity.icon"
            :amenity-name="amenity.name"
            :pivot="amenity.pivot.total_number"
          />
        </div>
        <b-button
          class="secondary-outline-btn btn-lg mt-3"
          style="width: 12em; padding: 10px; margin-left: 1.7em"
          @click="viewMoreAmenities"
        >
          See all {{ apartment.amenities.length }} amenities
        </b-button>
      </b-col>
    </b-row>
    <b-modal ref="more-amenities" hide-footer centered scrollable size="lg">
      <template #modal-header="{ close }" style="text-align: right">
        <p class="more-amenities-title">Amenities</p>
        <fa-icon
          :icon="['fas', 'times']"
          @click="close()"
          style="font-size: 1.5em"
          id="modal-close"
        />
      </template>
      <div class="more-amenities-body">
        <b-row>
          <b-col
            :key="amenity.id"
            v-for="amenity in apartment.amenities"
            lg="6"
          >
            <Amenity
              :img-path="amenity.icon"
              :amenity-name="amenity.name"
              :pivot="amenity.pivot.total_number"
              :list="false"
            />
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <b-modal ref="more-reviews" hide-footer centered scrollable size="lg">
      <template #modal-header="{ close }" style="text-align: right">
        <p class="more-amenities-title">Reviews</p>
        <fa-icon
          :icon="['fas', 'times']"
          @click="close()"
          style="font-size: 1.5em"
          id="modal-close"
        />
      </template>
      <div class="more-amenities-body">
        <Review
          v-for="(review, index) in reviews"
          :review="review"
          :key="index"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import Review from "./components/Review";
import Amenity from "./components/Amenity";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Review,
    Amenity,
  },
  props: ["apartment", "reviews"],
  data() {
    return {
      review: "",
    };
  },
  computed: {
    ...mapState({
      userAvatar: (state) => state.auth.avatar,
    }),
    ...mapGetters({
      getFullname: "auth/getFullname",
    }),
  },
  methods: {
    viewMoreAmenities() {
      this.$refs["more-amenities"].show();
    },
    viewAllReviews() {
      this.$refs["more-reviews"].show();
    },
    async postReview(id) {
      const formData = new FormData();

      formData.append("model_type", "apartment");
      formData.append("model_id", id);
      formData.append("comment", this.review);
      formData.append("rating", 1);

      try {
        const url = `user/reviews`;
        const res = await this.apiPost(url, formData);

        const { review } = res.data.data;

        const user = {
          full_name: this.getFullname,
        };

        review.user = user;

        this.reviews.unshift(review);

        this.review = "";
      } catch (err) {
        //
      }
    },
  },
};
</script>

<style>
.send-btn {
  background-color: transparent;
  border: none;
}
.send-btn:focus {
  outline: none;
}
.rotate {
  transform: rotate(90deg);
}
.w-6 {
  width: 1.5rem;
}
.w-8 {
  width: 1.6rem;
}
.h-6 {
  height: 1.5rem;
}
.h-8 {
  height: 1.6rem;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.inset {
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
}
.right {
  right: 0;
}
.inset-y {
  top: 0;
  bottom: 0;
}
#reviews-amenities {
  margin-top: 2em;
  margin-bottom: 2em;
  padding-bottom: 3em;
  border-bottom: 0.01em solid #cfcfcf;
}
#view-all {
  text-decoration: underline;
  color: #3c4043;
  opacity: 0.8;
  font-size: 0.9em;
  padding-top: 0.5em;
}
#view-all:hover {
  cursor: pointer;
}
#review-form {
  height: 3em;
  margin-top: 0.5em;
}
#review-form:focus {
  color: #3c4043;
  border-color: #e68ded;
  box-shadow: none;
}
.more-amenities-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.4em;
}
.more-amenities-body {
  font-family: "Circular Std Book", sans-serif;
  padding-left: 2em;
  padding-right: 2em;
  margin-bottom: 3em;
}
</style>
