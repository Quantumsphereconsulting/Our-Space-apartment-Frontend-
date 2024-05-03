<template>
  <div>
    <b-form-checkbox
      v-model="selectedCategory"
      :value="category.id"
      unchecked-value=""
      @change="selectCategory"
    >
      <span style="letter-spacing: -1px">
        {{ category.name }}
      </span>
    </b-form-checkbox>
    <b-collapse :id="category.id" :ref="category.id" v-model="visible">
      <div v-if="category.sub_categories.length" class="border-top">
        <div
          class="pl-3"
          v-for="(subCategory, index) in category.sub_categories"
          :key="index"
        >
          <b-form-checkbox
            :checked="checkSelected(subCategory.id)"
            :value="subCategory.id"
            :unchecked-value="subCategory.id"
            @change="selectSubCategory"
          >
            <span style="letter-spacing: -1px">
              {{ subCategory.name }}
            </span>
          </b-form-checkbox>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ["category"],
  data() {
    return {
      visible: false,
      selectedCategory: null,
      selectedSubs: [],
    };
  },
  methods: {
    selectCategory(event) {
      let currentCategories = this.$store.getters["filter/getCategories"];
      this.visible = !this.visible;
      if (!event) {
        // if deselecting a category, deselect all it's sub categories
        // and update the vuex store filter to reflect this.
        this.selectedSubs = [];
        let currentSubCategories =
          this.$store.getters["filter/getSubCategories"];
        this.category.sub_categories.forEach((sub) => {
          let subIndex = currentSubCategories.indexOf(sub.id);
          if (subIndex >= 0) {
            currentSubCategories.splice(subIndex, 1);
          }
        });
        this.$store.dispatch("filter/updateSubCategories", {
          subCategories: currentSubCategories,
        });
        let categoryIndex = currentCategories.indexOf(this.category.id);
        if (categoryIndex >= 0) {
          currentCategories.splice(categoryIndex, 1);
        }
      } else {
        currentCategories.push(event);
      }
      this.$store.dispatch("filter/updateCategories", {
        categories: currentCategories,
      });
      this.$emit("selectedCategory", event);
    },
    selectSubCategory(event) {
      let currentSubCategories = this.$store.getters["filter/getSubCategories"];
      let eventIndex = this.selectedSubs.indexOf(event);
      if (eventIndex < 0) {
        this.selectedSubs.push(event);
      } else {
        this.selectedSubs.splice(eventIndex, 1);
      }
      eventIndex = currentSubCategories.indexOf(event);
      if (eventIndex < 0) {
        currentSubCategories.push(event);
      } else {
        currentSubCategories.splice(eventIndex, 1);
      }
      this.$store.dispatch("filter/updateSubCategories", {
        subCategories: currentSubCategories,
      });
      this.$emit("selectedSubs", this.selectedSubs);
    },
    checkSelected(val) {
      // check if this subcategory is selected
      if (this.selectedSubs.includes(val)) {
        return val;
      }
    },
  },
};
</script>
