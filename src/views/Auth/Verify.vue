<template>
  <div>kk</div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      SET_EMAIL_VERIFIED_AT: "auth/SET_EMAIL_VERIFIED_AT",
    }),
    fetchProfile() {
      this.apiGet(this.ROUTES.profile).then((res) => {
        const { data, success } = res.data;
        const { user } = data;
        if (success) {
          this.SET_EMAIL_VERIFIED_AT(user.email_verified_at);
        }
      });
    },
  },
  mounted() {
    this.apiGet(
      `user/email/verify?expires=${this.$route.query.expires}&hash=${this.$route.query.hash}&id=${this.$route.query.id}&signature=${this.$route.query.signature}`
    ).then((res) => {
      const { success, message } = res.data;
      if (success) {
        this.apiSuccess(
          message,
          "The verification link has been sent to your email address"
        );
        this.fetchProfile();
        this.$router.push("/");
      } else {
        this.apiErrorHandler();
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
