<template>
  <b-container id="profile-update">
    <div class="d-flex justify-content-between align-items-center">
      <p class="pu-title">Settings</p>
      <p class="logout d-flex align-items-start" @click="logout">
        <b-img class="mr-3" :src="require('@/assets/icons/logout.svg')" />
        <span style="color: #c221cf"> Logout </span>
      </p>
    </div>
    <b-card
      no-body
      style="
        margin-top: 2em;
        margin-bottom: 3em;
        border-radius: 10px;
        border: none;
      "
      class="p-lg-4 py-2 px-3"
    >
      <Controls />
      <scale-loader v-if="apiBusy" :loading="true" :color="'#c221cf'" />
      <div
        style="border: 0.01em solid #c4c4c4; border-radius: 10px"
        class="p-lg-3 p-2"
      >
        <ProfileInfoForm />
      </div>
      <!-- <div
        style="border: 0.01em solid #c4c4c4; border-radius: 10px"
        class="mt-5 p-lg-3 p-2 mb-4"
      >
        <CompanyInfoForm />
      </div> -->
    </b-card>
    <b-modal
      ref="logging-out"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      hide-header
      centered
    >
      <div
        style="
          text-align: center;
          font-family: 'Circular Std Book', sans-serif;
          padding: clamp(2em, 5vw, 5em);
        "
      >
        <scale-loader class="mt-1" :loading="true" :color="'#c221cf'" />
        <p style="font-size: 1.5em; margin-top: 2em">
          Please wait, you are being logged out of your account...
        </p>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import Controls from "./components/Controls";
import ProfileInfoForm from "./components/ProfileInfoForm";
// import CompanyInfoForm from "./components/CompanyInfoForm";

export default {
  components: { Controls, ProfileInfoForm },
  methods: {
    logout() {
      this.$refs["logging-out"].show();
      this.apiPost(this.ROUTES.logout, {})
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.$refs["logging-out"].hide();
            this.$store.dispatch("auth/clearSession");
            this.$router.push({ name: "Login" }).then(() => {
              this.apiSuccess(message, "Thank you for using Our Space");
            });
          }
        })
        .finally(() => {
          this.$refs["logging-out"].hide();
          this.$store.dispatch("auth/clearSession");
          this.$router.push({ name: "Login" }).then(() => {
            this.apiSuccess(
              "You have logged out successfully",
              "Thank you for using Our Space"
            );
          });
        });
    },
  },
};
</script>

<style>
#profile-update {
  margin-top: 4em;
}
.pu-title {
  font-size: 2.25em;
  color: #3c4043;
}
.logout:hover {
  cursor: pointer;
}
</style>
