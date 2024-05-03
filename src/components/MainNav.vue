<template>
  <b-container
    fluid
    id="main-nav"
    style="padding-left: 23em; padding-right: 3em"
  >
    <b-row class="w-100">
      <b-col xl="4">
        <p>
          <span style="color: #3c4043; opacity: 0.8; font-size: 2.205rem">
            Hello
          </span>
          <span
            style="
              font-family: 'Circular Std', sans-serif;
              font-weight: bold;
              color: #3c4043;
              font-size: 2.25em;
            "
          >
            {{ lastname }}!
          </span>
        </p>
      </b-col>
      <b-col xl="8">
        <div class="d-flex float-xl-right">
          <div
            v-if="$route.name === 'Landlord'"
            style="position: relative; transition: 0.5s ease-out"
          >
            <infinite-search
              :data-source="currentOptions"
              :value="currentValue"
              v-on:select="handleOnSelect"
            />
            <fa-icon :icon="['fas', 'search']" class="search-1" />
          </div>

          <div
            class="notification"
            @click="$router.push({ name: 'LandlordNotifications' })"
          >
            <b-img
              fluid
              style="width: 1.2em"
              :src="require('../assets/icons/notifications.svg')"
            />
            <div class="indicator"></div>
          </div>
          <b-dropdown
            no-caret
            :right="true"
            class="avatar-wrapper"
            variant="link"
            toggle-class="text-decoration-none"
          >
            <template #button-content>
              <b-img :src="avatar" class="avatar" />
            </template>
            <b-dropdown-item
              id="first-item"
              href="javascript:void(0)"
              @click="$router.push({ name: 'LandlordApartments' })"
            >
              <fa-icon :icon="['fas', 'home']" class="mr-2" />
              My Apartments
            </b-dropdown-item>
            <b-dropdown-item
              href="javascript:void(0)"
              @click="$router.push({ name: 'LandlordTenants' })"
            >
              <fa-icon :icon="['fas', 'user']" class="mr-2" /> My Tenants
            </b-dropdown-item>
            <b-dropdown-item
              href="javascript:void(0)"
              @click="$router.push({ name: 'LandlordWallet' })"
            >
              <fa-icon :icon="['fas', 'wallet']" class="mr-2" />
              Wallet
            </b-dropdown-item>
            <b-dropdown-item
              href="javascript:void(0)"
              @click="$router.push({ name: 'LandlordProfileDetails' })"
            >
              <fa-icon :icon="['fas', 'cog']" class="mr-2" />
              Settings
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item
              href="javascript:void(0)"
              @click="$router.push({ name: 'Apartments' })"
            >
              <fa-icon :icon="['fas', 'outdent']" class="mr-2" />
              Switch to Tenant
            </b-dropdown-item>
            <b-dropdown-item
              id="last-item"
              href="javascript:void(0)"
              @click="confirmLogout = true"
            >
              <fa-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
              Logout
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>
    <b-modal
      v-model="confirmLogout"
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
        <fa-icon
          :icon="['fas', 'exclamation-triangle']"
          class="text-danger"
          style="font-size: 4em"
        />
        <p style="font-size: 1.5em; margin-top: 1em; margin-bottom: 0">
          Are you sure?
        </p>
        <p>This will end your current session on OurSpace</p>
        <div class="d-flex justify-content-center mt-4">
          <b-button
            class="btn secondary-outline-btn mr-3 w-100"
            @click="confirmLogout = false"
          >
            Cancel
          </b-button>
          <b-button class="btn primary-btn w-100" @click="logout">
            Confirm
          </b-button>
        </div>
      </div>
    </b-modal>
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
import { mapGetters } from "vuex";
import VueInfiniteAutocomplete from "vue-infinite-autocomplete";

export default {
  components: {
    "infinite-search": VueInfiniteAutocomplete,
  },
  computed: {
    ...mapGetters({
      lastname: "auth/getLastname",
      avatar: "auth/getAvatar",
      isGoogleAuth: "auth/getIsGoogleAuth",
    }),
  },
  mounted() {
    this.fetchApartments();
  },
  data() {
    return {
      currentValue: "",
      currentOptions: [],
      confirmLogout: false,
    };
  },
  methods: {
    fetchApartments() {
      const url = `${this.ROUTES.apartment}`;
      this.currentOptions = [];
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        if (apartments) {
          apartments.data.forEach((apartment) => {
            this.currentOptions.push({
              text: apartment.name,
              id: apartment.slug,
            });
          });
        }
      });
    },
    async logout() {
      this.$refs["logging-out"].show();
      this.apiPost(this.ROUTES.logout, {}).then(async (res) => {
        const { success, message } = res.data;
        if (success) {
          this.$refs["logging-out"].hide();
          await this.$store.dispatch("auth/clearSession");
          if (this.isGoogleAuth) {
            await this.$gAuth.signOut();
            await this.$store.dispatch("auth/clearGoogleSession");
          }
          this.$router.push({ name: "Login" }).then(() => {
            this.apiSuccess(message, "Thank you for using Our Space");
          });
        }
      });
    },
    handleOnSelect(selectedValue) {
      if (selectedValue) {
        this.$router.push({
          name: "PreviewLandlordApartments",
          params: { slug: selectedValue.id },
        });
      }
    },
  },
};
</script>

<style>
#main-nav {
  padding-top: 2em;
}
.header-search-1 {
  height: 3.5em;
  border-radius: 10px;
  background-color: #f5f4ff;
  border: none;
  margin-right: 2em;
  width: 24.0625em;
  padding-left: 1.5em;
}
.header-search-1:focus {
  background-color: #f5f4ff;
}
.search-1 {
  position: absolute;
  bottom: 35%;
  left: 80%;
  font-size: 1.2em;
  opacity: 0.7;
}
.notification {
  position: relative;
  background-color: #f5f4ff;
  //padding: 1em;
  padding: 1em 1.2em 1em 1.2em;
  border-radius: 10px;
  height: 3.5em;
  width: 3.5em;
  margin-right: 1.2em;
}
.indicator {
  position: absolute;
  background-color: #fe6a77;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  border: 3px solid #ffffff;
  bottom: 80%;
  left: 80%;
}
.notification:hover {
  cursor: pointer;
}
.avatar {
  border-radius: 10px;
  height: 3.5em;
  width: 3.5em;
}
.avatar:hover {
  cursor: pointer;
}
.avatar-wrapper {
  margin-top: -0.5em;
}
</style>
