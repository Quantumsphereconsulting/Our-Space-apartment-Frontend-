<template>
  <div
    class="d-flex align-items-lg-center flex-lg-row flex-column justify-content-between mb-3"
  >
    <div class="d-flex align-items-center">
      <b-form-checkbox
        :checked="checked"
        :disabled="amenity.is_primary"
        @change="selectAmenity(amenity)"
        :value="amenity.id"
        :unchecked-value="amenity.id"
        size="lg"
      />
      <div style="margin-left: 1em">
        <Amenity
          :img-path="amenity.icon"
          :amenity-name="amenity.name"
          class="mr-5 mb-n2"
        />
      </div>
    </div>
    <b-form-spinbutton
      @change="updateQuantity(amenity)"
      size="sm"
      min="1"
      max="10"
      wrap
      placeholder="quantity"
      v-model="qty"
    />
  </div>
</template>

<script>
import Amenity from "./Amenity";
export default {
  components: {
    Amenity,
  },
  props: {
    amenity: null,
    checked: null,
    quantity: {
      default: 0,
    },
  },
  data() {
    return {
      qty: 0,
    };
  },
  methods: {
    selectAmenity(amenity) {
      // emit an event to the parent when an amenity is selected with the amenity and quantity
      let { qty } = this;
      this.$emit("changed", { amenity, qty });
    },
    updateQuantity(amenity) {
      // emit an event to the parent when an amenity is updated with the amenity and quantity
      let { qty } = this;
      this.$emit("changed", { amenity, qty });
    },
  },
  mounted() {
    this.qty = this.quantity;
  },
};
</script>

<style>
.ea-body-amenity {
  display: flex;
  align-items: center;
  //justify-content: space-between;
  margin-bottom: 1em;
}
</style>
