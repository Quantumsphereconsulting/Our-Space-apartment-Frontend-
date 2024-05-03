export default {
  namespaced: true,
  state: {
    histories: [],
  },
  getters: {
    gethistories: (state) => state.histories,
  },
  mutations: {
    SET_HISTORIES(state, histories) {
      state.histories = histories;
    },
  },
};
