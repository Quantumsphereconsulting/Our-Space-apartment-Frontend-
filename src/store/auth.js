export default {
  namespaced: true,
  state: {
    avatar: null,
    email: null,
    finder: null,
    firstname: null,
    fullname: null,
    id: null,
    is_2fa_active: null,
    is_blocked: null,
    lastname: null,
    phoneNumber: null,
    type: "",
    walletBalance: null,
    token: null,
    isLoggedIn: false,
    isGoogleAuth: false,
    emailVerifiedAt: null,
  },
  getters: {
    getAvatar: (state) => state.avatar,
    getEmail: (state) => state.email,
    getFinder: (state) => state.finder,
    getFirstname: (state) => state.firstname,
    getFullname: (state) => state.fullname,
    getID: (state) => state.id,
    get2faActive: (state) => state.is_2fa_active,
    getIsBlocked: (state) => state.is_blocked,
    getLastname: (state) => state.lastname,
    getPhoneNumber: (state) => state.phoneNumber,
    getType: (state) => state.type,
    getWalletBalance: (state) => state.walletBalance,
    getToken: (state) => state.token,
    getIsLoggedIn: (state) => state.isLoggedIn,
    getIsGoogleAuth: (state) => state.isGoogleAuth,
    getEmailVerifiedAt: (state) => state.emailVerifiedAt,
  },
  mutations: {
    SET_AVATAR(state, avatar) {
      state.avatar = avatar;
    },
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_FINDER(state, finder) {
      state.finder = finder;
    },
    SET_FIRSTNAME(state, firstname) {
      state.firstname = firstname;
    },
    SET_FULLNAME(state, fullname) {
      state.fullname = fullname;
    },
    SET_ID(state, id) {
      state.id = id;
    },
    SET_2FA_ACTIVE(state, is_2fa_active) {
      state.is_2fa_active = is_2fa_active;
    },
    SET_IS_BLOCKED(state, is_blocked) {
      state.is_blocked = is_blocked;
    },
    SET_LASTNAME(state, lastname) {
      state.lastname = lastname;
    },
    SET_PHONE_NUMBER(state, phoneNumber) {
      state.phoneNumber = phoneNumber;
    },
    SET_TYPE(state, type) {
      state.type = type;
    },
    SET_WALLET_BALANCE(state, walletBalance) {
      state.walletBalance = walletBalance;
    },
    UPDATE_WALLET_BALANCE(state, walletBalance) {
      state.walletBalance = walletBalance;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_IS_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    SET_IS_GOOGLE_AUTH(state, isGoogleAuth) {
      state.isGoogleAuth = isGoogleAuth;
    },
    SET_EMAIL_VERIFIED_AT(state, emailVerifiedAt) {
      state.emailVerifiedAt = emailVerifiedAt;
    },
  },
  actions: {
    clearSession({ commit }) {
      commit("SET_AVATAR", null);
      commit("SET_EMAIL", null);
      commit("SET_FINDER", null);
      commit("SET_FIRSTNAME", null);
      commit("SET_FULLNAME", null);
      commit("SET_ID", null);
      commit("SET_2FA_ACTIVE", null);
      commit("SET_IS_BLOCKED", null);
      commit("SET_LASTNAME", null);
      commit("SET_PHONE_NUMBER", null);
      commit("SET_TYPE", "");
      commit("SET_WALLET_BALANCE", null);
      commit("SET_TOKEN", null);
      commit("SET_IS_LOGGED_IN", false);
      commit("SET_EMAIL_VERIFIED_AT", null);
    },
    initSession({ commit }, { user, token } = {}) {
      commit("SET_AVATAR", user.avatar);
      commit("SET_EMAIL", user.email);
      commit("SET_FINDER", user.finder);
      commit("SET_FIRSTNAME", user.first_name);
      commit("SET_FULLNAME", user.full_name);
      commit("SET_ID", user.id);
      commit("SET_2FA_ACTIVE", user.is_2fa_active);
      commit("SET_IS_BLOCKED", user.is_blocked);
      commit("SET_LASTNAME", user.last_name);
      commit("SET_PHONE_NUMBER", user.phone_number);
      commit("SET_TYPE", user.type);
      commit("SET_WALLET_BALANCE", user.wallet_balance);
      commit("SET_TOKEN", token);
      commit("SET_IS_LOGGED_IN", true);
      commit("SET_EMAIL_VERIFIED_AT", user.email_verified_at);
    },
    setToken({ commit }, { token }) {
      commit("SET_TOKEN", token);
    },
    updateAvatar({ commit }, { avatar }) {
      commit("SET_AVATAR", avatar);
    },
    clearGoogleSession({ commit }) {
      commit("SET_IS_GOOGLE_AUTH", false);
    },
    initGoogleSession({ commit }) {
      commit("SET_IS_GOOGLE_AUTH", true);
    },
    updateWalletBalance({ commit }, { balance }) {
      commit("SET_WALLET_BALANCE", balance);
    },
    update2faStatus({ commit }, { is_2fa_active }) {
      commit("SET_2FA_ACTIVE", is_2fa_active);
    },
  },
};
