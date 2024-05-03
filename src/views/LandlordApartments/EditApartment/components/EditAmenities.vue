<template>
  <div>
    <div class="d-flex justify-content-between">
      <p>Amenities</p>
      <p class="a-form-action" @click="$refs['edit-amenities'].show()">
        Edit selection
      </p>
    </div>
    <div class="a-form-container">
      <b-row>
        <b-col v-for="(amenity, index) in chosen" :key="index" xl="6">
          <DisplayAmenity :amenity="amenity" />
        </b-col>
      </b-row>
      <p
        class="mt-4 mb-n3 text-center a-form-action"
        @click="$refs['edit-amenities'].show()"
      >
        View more
      </p>
    </div>
    <b-modal
      ref="edit-amenities"
      hide-footer
      centered
      size="lg"
      @hidden="submitAmenities"
    >
      <template #modal-header="{ close }">
        <div class="d-flex align-items-center">
          <p class="ea-header">Check the Box to Add Amenities</p>
        </div>
        <b-img
          style="cursor: pointer"
          :src="require('@/assets/icons/modal-close.svg')"
          @click="close()"
        />
      </template>
      <div class="ea-body px-lg-4 px-1">
        <b-row>
          <b-col xl="6" v-for="amenity in amenities" :key="amenity.id">
            <FullAmenity
              :checked="checkStatus(amenity.id)"
              :amenity="amenity"
              :quantity="getQuantity(amenity.id)"
              @changed="selectAmenity"
            />
          </b-col>
        </b-row>
        <b-button
          type="btn"
          @click="$refs['edit-amenities'].hide()"
          class="primary-btn mt-4 btn-block"
        >
          Submit
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import DisplayAmenity from "@/views/LandlordApartments/components/DisplayAmenity";
import FullAmenity from "@/views/LandlordApartments/components/FullAmenity";

export default {
  components: {
    DisplayAmenity,
    FullAmenity,
  },
  data() {
    return {
      chosen: [],
    };
  },
  props: {
    amenities: null,
    chosenAmenities: null,
  },
  mounted() {
    if (this.chosenAmenities) {
      this.chosen = this.chosenAmenities;
    }
  },
  methods: {
    checkStatus(id) {
      let checkedStatus = false;
      this.chosen.every((amenity) => {
        if (amenity.id === id) {
          checkedStatus = id;
          return false;
        }
        return true;
      });
      return checkedStatus;
    },
    getQuantity(id) {
      let quantity = 0;
      this.chosen.every((amenity) => {
        if (amenity.id === id) {
          quantity = amenity.total;
          return false;
        }
        return true;
      });
      return quantity;
    },
    selectAmenity(val) {
      let { amenity, qty } = val;
      let found = false;
      this.chosen.every((chosenAmenity, index) => {
        if (chosenAmenity.id === amenity.id) {
          found = true;
          if (chosenAmenity.total === qty) {
            this.chosen.splice(index, 1);
          } else {
            this.chosen[index].total = qty;
          }
          return false;
        }
        return true;
      });
      if (!found) {
        this.chosen.push({
          id: amenity.id,
          name: amenity.name,
          total: qty,
          icon: amenity.icon,
        });
      }
    },
    submitAmenities() {
      this.$emit("selected", this.chosen);
    },
  },
};
</script>

<style>
.a-form-container {
  background-color: #f5f4ff;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 2em;
}
.ea-header {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  padding-top: 0.6em;
  color: #3c4043;
}
.ea-header-action {
  font-family: "Circular Std Book", sans-serif;
  font-size: 1em;
  color: #c221cf;
  cursor: pointer;
  margin-left: 0.8em;
  padding-top: 1em;
}
.ea-body {
  font-family: "Circular Std Book", sans-serif;
}
.ea-body-amenity {
  display: flex;
  align-items: center;
}
</style>
