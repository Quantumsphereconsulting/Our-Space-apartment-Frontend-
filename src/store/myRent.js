export default {
  namespaced: true,
  state: {
    rents: [],
    bookings: [],
  },
  getters: {
    getRents: (state) => state.rents,
    getBookings: (state) => state.bookings,
  },
  mutations: {
    SET_RENTS(state, rents) {
      state.rents = rents;
    },
    UPDATE_RENTS(state, rent) {
      state.rents = state.rents.map((element) => {
        if (element.id === rent.id) {
          element.check_in_date = rent.check_in_date;
          element.check_out_date = rent.check_out_date;
          element.is_active = rent.is_active;
        }
        return element;
      });
    },
    UPDATE_RENTS_AUTO_RENEW(state, rent) {
      state.rents = state.rents.map((element) => {
        if (element.id === rent.id) {
          element.is_autorenewal_active = !rent.is_autorenewal_active;
        }

        return element;
      });
    },
    SET_BOOKINGS(state, bookings) {
      state.bookings = bookings;
    },
    UPDATE_BOOKINGS(state, booking) {
      state.bookings = state.bookings.map((element) => {
        if (element.id === booking.id) {
          element.check_in_date = booking.check_in_date;
          element.check_out_date = booking.check_out_date;
          element.is_active = booking.is_active;
        }
        return element;
      });
    },
  },
};
