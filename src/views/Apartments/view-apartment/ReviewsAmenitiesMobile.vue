<template>
  <div id="mobile-reviews-amenities" class="d-lg-none">
    <p style="font-size: 1.3em; color: #3c4043; margin-bottom: 1.5em">
      Amenities
    </p>
    <div style="padding-left: 1.2em">
      <Amenity
        :key="amenity.id"
        v-for="(amenity, index) in apartment.amenities"
        :index="index"
        :img-path="amenity.icon"
        :amenity-name="amenity.name"
        :pivot="amenity.pivot.total_number"
        :list="true"
      />
    </div>
    <b-button
      class="secondary-outline-btn mt-2"
      style="width: 12em; padding: 10px; margin-left: 1.2em"
      @click="viewMoreAmenities"
    >
      See all {{ apartment.amenities.length }} amenities
    </b-button>
    <div class="d-flex justify-content-between mt-5">
      <p style="font-size: 1.3em; color: #3c4043">
        Reviews ({{ apartment.reviews.length }})
      </p>
      <div>
        <button
          @click="reviewPageNumber--"
          :disabled="reviewPageNumber < 2"
          class="review-btn"
        >
          <fa-icon :icon="['fas', 'chevron-left']" class="mr-3" />
        </button>
        <button
          @click="reviewPageNumber++"
          :disabled="reviewPageNumber === totalNumberOfPages(reviews, 2)"
          class="review-btn"
        >
          <fa-icon :icon="['fas', 'chevron-right']" />
        </button>
      </div>
    </div>
    <Review
      v-for="(review, index) in paginate(reviews, 2, reviewPageNumber)"
      :review="review"
      :key="index"
    />
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
        <Amenity
          :key="amenity.id"
          v-for="amenity in apartment.amenities"
          :img-path="amenity.icon"
          :pivot="amenity.pivot.total_number"
          :amenity-name="amenity.name"
          :list="false"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import Amenity from "./components/Amenity";
import Review from "./components/Review";

export default {
  props: ["apartment", "reviews"],
  components: {
    Amenity,
    Review,
  },
  data() {
    return {
      reviewPageNumber: 1,
      amenities: [
        {
          id: 1,
          amenityName: "Washing Machine",
          imgPath: require("../../../assets/icons/washing-machine.svg"),
        },
        {
          id: 2,
          amenityName: "Security Camera",
          imgPath: require("../../../assets/icons/security-camera.svg"),
        },
        {
          id: 3,
          amenityName: "Kitchen",
          imgPath: require("../../../assets/icons/chef.svg"),
        },
        {
          id: 4,
          amenityName: "Dining Set",
          imgPath: require("../../../assets/icons/cutlery.svg"),
        },
        {
          id: 5,
          amenityName: "Dedicated Workspace",
          imgPath: require("../../../assets/icons/workspace.svg"),
        },
        {
          id: 6,
          amenityName: "Free Street Parking",
          imgPath: require("../../../assets/icons/parking.svg"),
        },
      ],
    };
  },
  methods: {
    totalNumberOfPages(totalItems, pageSize) {
      let totalPages = Math.ceil(totalItems.length / pageSize);

      return totalPages;
    },
    paginate(array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },
    viewMoreAmenities() {
      this.$refs["more-amenities"].show();
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

        this.reviews.unshift(review);

        this.review = "";
      } catch (err) {
        // console.log(err);
      }
    },
  },
};
</script>

<style>
.review-btn {
  border: none;
  background-color: transparent;
}
.review-btn:focus {
  outline: none;
}
#mobile-reviews-amenities {
  margin-bottom: 3em;
}
.more-amenities-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.4em;
}
.more-amenities-body {
  font-family: "Circular Std", sans-serif;
  padding-left: 2em;
  padding-right: 2em;
}
</style>
