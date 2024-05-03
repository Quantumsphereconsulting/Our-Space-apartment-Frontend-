export default {
  namespaced: true,
  state: {
    queryString: null,
    categories: [],
    subCategories: [],
    ratings: [],
    priceRange: {
      to: null,
      from: null,
    },
    date: null,
    amenities: [],
    resetAction: false,
  },
  getters: {
    getQueryString: (state) => state.queryString,
    getCategories: (state) => state.categories,
    getSubCategories: (state) => state.subCategories,
    getRatings: (state) => state.ratings,
    getPriceRange: (state) => state.priceRange,
    getDate: (state) => state.date,
    getAmenities: (state) => state.amenities,
    getResetAction: (state) => state.resetAction,
  },
  mutations: {
    SET_QUERY_STRING(state, queryString) {
      state.queryString = queryString;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_SUB_CATEGORIES(state, subCategories) {
      state.subCategories = subCategories;
    },
    SET_RATINGS(state, ratings) {
      state.ratings = ratings;
    },
    SET_PRICE_RANGE(state, priceRange) {
      state.priceRange = priceRange;
    },
    SET_DATE(state, date) {
      state.date = date;
    },
    SET_AMENITIES(state, amenities) {
      state.amenities = amenities;
    },
    SET_RESET_ACTION(state, resetAction) {
      state.resetAction = resetAction;
    },
  },
  actions: {
    clearFilter({ commit }) {
      commit("SET_QUERY_STRING", null);
      commit("SET_CATEGORIES", []);
      commit("SET_SUB_CATEGORIES", []);
      commit("SET_RATINGS", []);
      commit("SET_PRICE_RANGE", { to: null, from: null });
      commit("SET_DATE", null);
      commit("SET_AMENITIES", []);
    },
    updateCategories({ commit }, { categories }) {
      commit("SET_CATEGORIES", categories);
    },
    updateSubCategories({ commit }, { subCategories }) {
      commit("SET_SUB_CATEGORIES", subCategories);
    },
    updateRatings({ commit }, { ratings }) {
      commit("SET_RATINGS", ratings);
    },
    updatePriceRange({ commit }, { priceRange }) {
      commit("SET_PRICE_RANGE", priceRange);
    },
    updateDate({ commit }, { date }) {
      commit("SET_DATE", date);
    },
    updateAmenities({ commit }, { amenities }) {
      commit("SET_AMENITIES", amenities);
    },
    buildQueryString({ commit, state }) {
      let categories = state.categories;
      let subCategories = state.subCategories;
      let ratings = state.ratings;
      let to = state.priceRange.to;
      let from = state.priceRange.from;
      let date = state.date;
      let amenities = state.amenities;
      let queryString = "";
      if (categories.length > 0) {
        queryString = "categories=";
        categories.forEach((category, index) => {
          if (index === categories.length - 1) {
            queryString = `${queryString}${category}&`;
          } else {
            queryString = `${queryString}${category},`;
          }
        });
      }
      if (subCategories.length > 0) {
        queryString = `${queryString}sub_categories=`;
        subCategories.forEach((subCategory, index) => {
          if (index === subCategories.length - 1) {
            queryString = `${queryString}${subCategory}&`;
          } else {
            queryString = `${queryString}${subCategory},`;
          }
        });
      }
      if (ratings.length > 0) {
        queryString = `${queryString}ratings=`;
        ratings.forEach((rating, index) => {
          if (index === ratings.length - 1) {
            queryString = `${queryString}${rating}&`;
          } else {
            queryString = `${queryString}${rating},`;
          }
        });
      }
      if (to && from) {
        queryString = `${queryString}price_range=${from},${to}&`;
      } else if (to) {
        queryString = `${queryString}price_range=${to}&`;
      } else if (from) {
        queryString = `${queryString}price_range=${from}&`;
      }
      if (date) {
        queryString = `${queryString}available_date=${date}&`;
      }
      if (amenities.length > 0) {
        queryString = `${queryString}amenities=`;
        amenities.forEach((amenity, index) => {
          if (index === amenities.length - 1) {
            queryString = `${queryString}${amenity}&`;
          } else {
            queryString = `${queryString}${amenity},`;
          }
        });
      }
      commit("SET_QUERY_STRING", queryString);
    },
    resetFilter({ commit }) {
      commit("SET_RESET_ACTION", true);
    },
    setFilter({ commit }) {
      commit("SET_RESET_ACTION", false);
    },
  },
};
