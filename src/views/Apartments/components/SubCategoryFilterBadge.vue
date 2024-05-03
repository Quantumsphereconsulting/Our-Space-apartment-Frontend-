<template>
  <div>
    <div
      class="filter-badge"
      :class="[active ? 'filter-badge-active' : '']"
      @click="selectSubCategory"
    >
      {{ subCategory.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["subCategory"],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    selectCategory() {
      let currentCategories = this.$store.getters["filter/getCategories"];
      let categoryIndex = currentCategories.indexOf(this.category.id);
      if (categoryIndex >= 0 && !this.active) {
        // this.$store.dispatch("filter/updateCategories", {
        //   categories: [],
        // });
        currentCategories[categoryIndex] = this.category.id;
      } else if (categoryIndex >= 0 && this.active) {
        currentCategories.splice(categoryIndex, 1);
      } else if (categoryIndex < 0 && !this.active) {
        currentCategories.push(this.category.id);
      }
      this.$store.dispatch("filter/updateCategories", {
        categories: currentCategories,
      });
      this.active = !this.active;
      this.$emit("selectedCategory");
    },
    selectSubCategory() {
      let currentSubCategories = this.$store.getters["filter/getSubCategories"];
      let subCategoryIndex = currentSubCategories.indexOf(this.subCategory.id);
      if (subCategoryIndex >= 0 && !this.active) {
        currentSubCategories[subCategoryIndex] = this.subCategory.id;
      } else if (subCategoryIndex >= 0 && this.active) {
        currentSubCategories.splice(subCategoryIndex, 1);
      } else if (subCategoryIndex < 0 && !this.active) {
        currentSubCategories.push(this.subCategory.id);
      }
      this.$store.dispatch("filter/updateSubCategories", {
        subCategories: currentSubCategories,
      });
      this.active = !this.active;
      this.$emit("selectedSubCategory");
    },
  },
};
</script>

<style>
.filter-badge {
  border: 1px solid #3c4043;
  border-radius: 10rem;
  display: inline-block;
  /*font-size: 75%;*/
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  letter-spacing: -1px;
  padding: 0.25em 0.4em;
  padding-left: 0.6em;
  padding-right: 0.6em;
  cursor: pointer;
  transition: 0.5s ease;
}
.filter-badge:hover,
.filter-badge-active {
  background-color: #edaef2;
  box-shadow: 0 4px 2px -2px #9b9b9b;
}
</style>
