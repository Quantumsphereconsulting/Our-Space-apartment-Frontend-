<template>
  <div id="controls">
    <b-sidebar
      bg-variant="white"
      text-variant="dark"
      id="sidebar-1"
      no-header
      shadow="lg"
    >
      <template #default="{ hide }">
        <div class="py-3">
          <div
            class="d-flex justify-content-between align-content-end pl-4 pr-4 border-bottom"
          >
            <h5 class="pl-3" style="letter-spacing: -1px">Filter</h5>
            <span @click="hide" style="cursor: pointer; padding-bottom: 1em">
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 1L1 11" stroke="#230B34" stroke-linecap="round" />
                <path d="M1 1L11 11" stroke="#230B34" stroke-linecap="round" />
              </svg>
            </span>
          </div>
          <!-- category -->
          <div class="px-4 py-4 border-bottom">
            <p class="pl-3" style="font-size: 1.1em; letter-spacing: -1px">
              Categories
            </p>
            <div
              class="pl-3"
              v-for="(category, index) in categories"
              :key="index"
            >
              <CategoryFilter
                :category="category"
                @selectedCategory="filter"
                @selectedSubs="filter"
              />
            </div>
          </div>
          <!-- Rating -->
          <div class="px-4 py-4 border-bottom">
            <p class="pl-3" style="font-size: 1.1em; letter-spacing: -1px">
              Ratings
            </p>
            <div class="pl-3">
              <RatingsFilter @selectedRatings="filter" />
            </div>
          </div>
          <!-- Price Range -->
          <div class="px-4 py-4 border-bottom">
            <p class="pl-3" style="font-size: 1.1em; letter-spacing: -1px">
              Price Range
            </p>
            <div class="pl-3">
              <PriceRangeFilter @selectedPriceRange="filter" />
            </div>
          </div>
          <!-- Date -->
          <div class="px-4 py-4 border-bottom">
            <p class="pl-3" style="font-size: 1.1em; letter-spacing: -1px">
              Date of Availability
            </p>
            <div class="pl-3">
              <DateFilter @selectedDate="filter" />
            </div>
          </div>
          <!-- Amenities -->
          <div class="px-4 py-4 border-bottom">
            <p class="pl-3" style="font-size: 1.1em; letter-spacing: -1px">
              Amenities
            </p>
            <div
              v-for="(amenity, index) in amenitiesA"
              :key="index"
              class="pl-3"
            >
              <AmenitiesFilter :amenity="amenity" @selectedAmenity="filter" />
            </div>
            <b-collapse :id="`amenities`">
              <div
                v-for="(amenity, index) in amenitiesB"
                :key="index"
                class="pl-3"
              >
                <AmenitiesFilter :amenity="amenity" @selectedAmenity="filter" />
              </div>
            </b-collapse>
            <b-button
              class="secondary-outline-btn mt-3"
              style="width: 100%; padding: 10px"
              v-b-toggle="'amenities'"
            >
              <span style="letter-spacing: -1px">
                See all {{ amenitiesCount }} amenities
              </span>
            </b-button>
          </div>
        </div>
      </template>
    </b-sidebar>
    <div
      class="d-flex align-content-center justify-content-between flex-column flex-lg-row"
    >
      <div class="d-none d-lg-flex align-items-center category-filters">
        <div class="mr-2">
          <CategoryFilterBadge type="all" />
        </div>
        <div
          class="mr-2"
          v-for="(category, index) in croppedCategories1"
          :key="index"
        >
          <CategoryFilterBadge
            @selectedCategory="filter"
            :category="category"
          />
        </div>
        <div class="ml-n2">
          <b-dropdown variant="link" :right="true">
            <template #button-content>
              <CategoryFilterBadge type="more" />
            </template>
            <b-dropdown-item
              id="first-item"
              @click="selectCategory(firstItem.id)"
            >
              {{ firstItem.name }}
            </b-dropdown-item>
            <b-dropdown-item
              v-for="(category, index) in croppedCategories2"
              :key="index"
              @click="selectCategory(category.id)"
            >
              {{ category.name }}
            </b-dropdown-item>
            <b-dropdown-item
              id="last-item"
              @click="selectCategory(lastItem.id)"
            >
              {{ lastItem.name }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="d-lg-none">
        <div class="d-flex flex-row category-mobile-filters">
          <div class="mr-2">
            <CategoryFilterBadge type="all" />
          </div>
          <div
            class="mr-2"
            v-for="(category, index) in categories"
            :key="index"
          >
            <CategoryFilterBadge
              @selectedCategory="filter"
              :category="category"
              v-b-toggle="category.id"
            />
            <b-collapse :id="category.id">
              <div class="sub-category-filters mt-1">
                <div
                  class="mb-1"
                  v-for="(subCategory, index) in category.sub_categories"
                  :key="index"
                >
                  <SubCategoryFilterBadge
                    @selectedSubCategory="filter"
                    :sub-category="subCategory"
                  />
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div style="cursor: pointer" class="d-flex justify-content-between">
          <span @click="toggleView2">Show map</span>
          <b-form-checkbox
            ref="show-map"
            class="mb-lg-0 mb-3 ml-2 mr-3"
            switch
            size=""
            @change="toggleView"
            v-model="mapView"
            :value="true"
            :unchecked-value="false"
          />
        </div>
        <p id="filter-popover" v-b-toggle.sidebar-1 class="control-item-main">
          Filters
          <b-img :src="require('@/assets/icons/filter.svg')" class="ml-2" />
        </p>
        <b-popover
          target="filter-popover"
          ref="popover"
          placement="bottom"
          triggers="hover"
        >
          <template #title>Apartment Filter</template>
          Click here to quickly filter apartments
        </b-popover>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryFilter from "./CategoryFilter";
import RatingsFilter from "./RatingsFilter";
import CategoryFilterBadge from "./CategoryFilterBadge";
import SubCategoryFilterBadge from "./SubCategoryFilterBadge";
import PriceRangeFilter from "./PriceRangeFilter";
import DateFilter from "./DateFilter";
import AmenitiesFilter from "./AmenitiesFilter";

export default {
  components: {
    CategoryFilter,
    RatingsFilter,
    CategoryFilterBadge,
    SubCategoryFilterBadge,
    PriceRangeFilter,
    DateFilter,
    AmenitiesFilter,
  },
  data() {
    return {
      value: [],
      categoriesSelected: [],
      from: null,
      to: null,
      rating: [],
      active: "",
      categories: [],
      croppedCategories1: [],
      croppedCategories2: [],
      mapView: false,
      selectedCategory: "More",
      firstItem: null,
      lastItem: null,
      filterCategory: null,
      visibleModels: [],
      visible: false,
      amenitiesA: [],
      amenitiesB: [],
      amenitiesCount: 0,
      filPop: false,
    };
  },
  methods: {
    selectCategory(category) {
      let currentCategories = this.$store.getters["filter/getCategories"];
      let categoryIndex = currentCategories.indexOf(category);
      if (categoryIndex >= 0 && !this.active) {
        currentCategories[categoryIndex] = category;
      } else if (categoryIndex >= 0 && this.active) {
        currentCategories.splice(categoryIndex, 1);
      } else if (categoryIndex < 0 && !this.active) {
        currentCategories.push(category);
      }
      this.$store.dispatch("filter/updateCategories", {
        categories: currentCategories,
      });
      this.filter();
    },
    fetchCategory() {
      const url = `categories?include=subCategories`;
      let temp = [];
      this.apiGet(url).then((res) => {
        this.categories = res.data.data.categories;
        this.categories.forEach((category) => {
          temp.push(category);
        });
        this.croppedCategories1 = temp.splice(0, 4);
        this.croppedCategories2 = temp;
        this.firstItem = this.croppedCategories2.shift();
        this.lastItem = this.croppedCategories2.pop();
      });
    },
    fetchAmenities() {
      const url = `amenities`;
      this.amenitiesCount = 0;
      this.apiGet(url).then((res) => {
        this.amenitiesCount = res?.data?.data?.amenities?.length;
        res?.data?.data?.amenities?.forEach((amenity, index) => {
          if (index <= 3) {
            this.amenitiesA.push(amenity);
          } else {
            this.amenitiesB.push(amenity);
          }
        });
      });
    },
    toggleView() {
      this.$emit("toggleView", this.mapView);
    },
    toggleView2() {
      this.mapView = !this.mapView;
      this.toggleView();
    },
    filter() {
      this.$store.dispatch("filter/buildQueryString");
      this.$emit("filter");
    },
    managePopup() {
      const popup = localStorage.getItem("popup");
      if (popup) {
        this.$refs.popover.$emit("disable");
      } else {
        localStorage.setItem("popup", "true");
      }
    },
  },
  mounted() {
    this.$store.dispatch("filter/clearFilter");
    this.fetchCategory();
    this.fetchAmenities();
  },
};
</script>

<style>
@media screen and (min-width: 1024px) {
  .multiselect__tags {
    border: none !important;
  }
}

.multiselect__option--highlight {
  background: #c221cf !important;
}

.multiselect__option--highlight::after {
  background: #c221cf !important;
}

#controls {
  margin-top: 5em;
}
.control-item-main,
.dropdown-icon {
  transition: 0.3s ease;
}
.custom-checkbox {
  padding: 5px 21px;
}
.custom-control-label {
  color: #3c4043;
  opacity: 0.7;
}
.control-item-main:hover {
  cursor: pointer;
  color: #c221cf;
}

.filterActive {
  color: #c221cf;
  border-bottom: 2px solid #c221cf;
}
.btn-link:hover {
  text-decoration: none;
}
.dropdown-key:hover + .dropdown-icon {
  cursor: pointer;
  color: #c221cf;
}
.btn:focus,
.btn.focus {
  box-shadow: none;
}
.custom-switch.b-custom-control-lg .custom-control-label::before,
.input-group-lg .custom-switch .custom-control-label::before {
  cursor: pointer;
}
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #c221cf;
  background-color: #c221cf;
}
.custom-control-label::before {
  border: #000000 solid 2px;
}
.custom-control-label::after {
  /*border: #000000 solid 2px;*/
}
.category-filters {
  margin-top: -1em;
}
.category-filters::-webkit-scrollbar {
  display: none;
}
.category-mobile-filters {
  overflow-x: auto;
  margin-top: -1em;
  margin-bottom: 2em;
}
.category-mobile-filters::-webkit-scrollbar {
  display: none;
}
/*.sub-category-filters {*/
/*  max-height: 30px;*/
/*  overflow: auto;*/
/*}*/
/*.sub-category-filters::-webkit-scrollbar {*/
/*  display: none;*/
/*}*/
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
