export default {
  namespaced: true,
  state: {
    featured_image: {},
    current_apartment: {},
    apartment_galleries: {},
    favoritiesIds: [],
    favorities: [],
  },
  getters: {
    getFeaturedImage: (state) => state.featured_image,
    getCurrentApartment: (state) => state.current_apartment,
    getFavorities: (state) => state.favoritiesIds,
    getFavoritiesData: (state) => state.favorities,
    getFavoriteById: (state) => (findId) => {
      return state.favoritiesIds.find((id) => id === findId);
    },
  },
  mutations: {
    SET_FEATURED_IMAGE(state, image) {
      state.featured_image = image;
    },
    SET_CURRENT_APARTMENT(state, apartment) {
      state.current_apartment = apartment;
    },
    SET_FAVORITIES_IDS(state, favorite) {
      // check if saved
      const isSaved = state.favoritiesIds.find((id) => id === favorite);
      if (isSaved) {
        state.favoritiesIds = state.favoritiesIds.filter(
          (id) => id !== favorite
        );
      } else {
        state.favoritiesIds.push(favorite);
      }
    },
    SET_FAVORITIES(state, favorities) {
      // check if saved
      state.favorities = [];
      favorities.map((favorite) => {
        state.favorities.push(favorite);
      });
    },
    SET_FAVORITIES_IDS_FRESH(state, favorities) {
      // check if saved
      state.favoritiesIds = [];
      favorities.map((favorite) => {
        state.favoritiesIds.push(favorite.id);
      });
    },
  },
  actions: {
    saveFeaturedImage({ commit }, { image }) {
      commit("SET_FEATURED_IMAGE", image);
    },
    storeCurrentApartment({ commit }, { apartment }) {
      commit("SET_CURRENT_APARTMENT", apartment);
    },
  },
};
