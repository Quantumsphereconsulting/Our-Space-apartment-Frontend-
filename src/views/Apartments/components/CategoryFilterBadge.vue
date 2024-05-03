<template>
  <div>
    <div
      v-if="type === 'all'"
      :class="[categories.length === 0 ? 'filter-badge-active' : '']"
      class="filter-badge"
      @click="resetFilter"
    >
      All
    </div>
    <div v-else-if="type === 'more'" class="filter-badge">
      More
      <fa-icon
        style="font-size: 0.7em; margin-left: 0.5em"
        :icon="['fas', 'chevron-down']"
      />
    </div>
    <div
      v-else
      class="filter-badge"
      :class="[active ? 'filter-badge-active' : '']"
      @click="selectCategory"
    >
      {{ category.name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["category", "type", "more"],
  computed: {
    ...mapGetters({
      categories: "filter/getCategories",
      reset: "filter/getResetAction",
    }),
  },
  data() {
    return {
      active: false,
      allActive: false,
    };
  },
  mounted() {},
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
    selectSubCategory() {},
    resetFilter() {
      location.reload();
    },
  },
};
</script>

<style>
.filter-badge {
  border: 1px solid #3c4043;
  border-radius: 10rem;
  display: inline-block;
  font-size: 1.1em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  letter-spacing: -1px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  color: #3c4043;
  padding: 0.5em 1em !important;
}
.filter-badge:hover,
.filter-badge-active {
  background-color: #c221cf !important;
  border: 1px solid #c221cf !important;
  color: #ffffff !important;
  box-shadow: none !important;
  /*box-shadow: 0 4px 2px -2px #9b9b9b;*/
}
</style>
