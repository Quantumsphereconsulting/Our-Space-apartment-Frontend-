import { ROUTES, API, apiConfig } from "@/api";
import store from "@/store";

export default {
  data() {
    return {
      apiBusy: false,
      submitting: false,
      ROUTES,
      callbackBaseUrl: `https://apptest.ourspace.ng`, // please update based on the current domain
      token: store.getters["auth/getToken"],
      invalidLogin: false,
    };
  },
  methods: {
    apiGet(url) {
      this.apiBusy = true;
      return new Promise((resolve, reject) => {
        API.get(url, apiConfig(this.token))
          .then((res) => resolve(res))
          .catch((err) => {
            this.apiErrorHandler(err);
            reject(err);
          })
          .finally(() => (this.apiBusy = false));
      });
    },
    apiPost(url, data, type) {
      this.submitting = true;
      return new Promise((resolve, reject) => {
        API.post(url, data, apiConfig(this.token, type))
          .then((res) => resolve(res))
          .catch((err) => {
            this.apiErrorHandler(err);
            reject(err);
          })
          .finally(() => (this.submitting = false));
      });
    },
    apiPostAuth(url, data, type) {
      this.submitting = true;
      return new Promise((resolve) => {
        API.post(url, data, apiConfig(this.token, type))
          .then((res) => resolve(res))
          .catch((err) => this.apiErrorHandlerAuth(err))
          .finally(() => (this.submitting = false));
      });
    },
    apiPostAuthSignUp(url, data, type) {
      this.submitting = true;
      return new Promise((resolve) => {
        API.post(url, data, apiConfig(this.token, type))
          .then((res) => resolve(res))
          .catch((err) => this.apiErrorHandlerAuthSignUp(err))
          .finally(() => (this.submitting = false));
      });
    },
    apiPatch(url, data) {
      this.submitting = true;
      return new Promise((resolve, reject) => {
        API.patch(url, data, apiConfig(this.token))
          .then((res) => resolve(res))
          .catch((err) => {
            this.apiErrorHandler(err);
            reject(err);
          })
          .finally(() => (this.submitting = false));
      });
    },
    apiDelete(url) {
      return new Promise((resolve, reject) => {
        API.delete(url, apiConfig(this.token))
          .then((res) => resolve(res))
          .catch((err) => {
            this.apiErrorHandler(err);
            reject(err);
          });
      });
    },
    apiInvalidForm() {
      this.$notify({
        title: "Invalid Form Submission",
        text: "Please fill in all fields correctly",
        type: "error",
      });
    },
    apiSuccess(title, text) {
      this.$notify({
        title,
        text,
        type: "success",
      });
    },
    apiErrorHandler(err) {
      const title = `An error occurred`;
      const text = err.response.data.message;
      if (err.response.status === 401) {
        this.$store.dispatch("auth/clearSession");
        this.$router.push({ name: "Login" }).then(() => {
          this.apiSuccess(text, "Thank you for using Our Space");
        });
      } else {
        this.$notify({
          title,
          text,
          type: "error",
        });
      }
    },
    apiErrorHandlerAuth() {
      this.invalidLogin = true;
      const title = `An error occurred`;
      const text = "Invalid email or password";
      this.$notify({
        title,
        text,
        type: "error",
      });
    },
    apiErrorHandlerAuthSignUp(error) {
      const email = error?.response?.data?.errors?.email;
      if (email && email.length) {
        email.forEach((message) => {
          const title = `An error occurred`;
          const text = `${message}`;
          this.$notify({
            title,
            text,
            type: "error",
          });
        });
      }
    },
  },
};
