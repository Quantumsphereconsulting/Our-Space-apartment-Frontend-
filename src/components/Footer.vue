<template>
  <footer id="footer" class="footer">
    <div
      class="d-lg-none"
      v-if="isLoggedIn && !emailVerifiedAt && !isGoogleAuth"
      style="
        width: 100%;
        background-color: red;
        color: white;
        right: 0;
        left: 0;
      "
    >
      <b-alert class="m-0 rounded-0" show variant="info">
        <div
          class="d-flex flex-lg-row flex-column justify-content-lg-center align-items-lg-center align-items-start m-0"
        >
          <p class="pb-0 pr-lg-3 m-0">
            We have sent a verification link to your email address
          </p>
          <b-button
            class="mt-lg-0 mt-2"
            @click="reSendVerificationEmail"
            variant="info"
          >
            Re-send link
          </b-button>
        </div>
      </b-alert>
    </div>
    <b-container class="d-none d-lg-block">
      <b-row class="pt-5 pb-3" id="footer-inner">
        <b-col lg="4" class="mb-1">
          <b-img
            :src="require('../assets/logos/our-space-logo-white-medium.svg')"
            height="40"
          />
          <p id="footer-logo-text">Go where you feel at home</p>
        </b-col>
        <b-col lg="4" class="mb-1">
          <p class="footer-menu-header">Quick Links</p>
          <ul class="list-unstyled">
            <li class="py-0 py-md-1">
              <router-link class="footer-menu-text" to="/about-us">
                About Us
              </router-link>
            </li>
            <li class="py-0 py-md-1">
              <router-link class="footer-menu-text" to="/list-your-apartment">
                List Your Apartment
              </router-link>
            </li>
            <li class="py-0 py-md-1">
              <router-link class="footer-menu-text" to="/blog">
                Blog
              </router-link>
            </li>
          </ul>
        </b-col>
        <b-col lg="4" class="mb-1" id="support-wrapper">
          <p class="footer-menu-header">Support</p>
          <ul class="list-unstyled">
            <li class="py-0 py-md-1">
              <router-link class="footer-menu-text" to="/how-it-works/user">
                How It Works
              </router-link>
            </li>
          </ul>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" class="mb-1">
          <p id="footer-copyright" class="text-nowrap">
            &copy; {{ new Date().getFullYear() }} Our Space. All rights
            reserved.
          </p>
        </b-col>
        <b-col lg="3" class="mb-1">
          <p id="privacy-wrapper">
            <router-link to="/privacy-policy" id="privacy">
              Privacy Policy
            </router-link>
          </p>
        </b-col>
        <b-col lg="3" class="mb-1" style="padding-left: 5.5%">
          <p id="terms-wrapper">
            <router-link to="/terms" id="terms" class="text-nowrap">
              Terms of Use
            </router-link>
          </p>
        </b-col>
        <b-col lg="2" class="mb-1">
          <div id="social-wrapper" class="text-end">
            <b-img
              :src="require('../assets/icons/facebook-footer.svg')"
              height="15"
              class="social-link"
              @click="routeTo('fb')"
            />
            <b-img
              :src="require('../assets/icons/twitter-footer.svg')"
              height="15"
              class="social-link"
              @click="routeTo('twitter')"
            />
            <b-img
              :src="require('../assets/icons/ig-footer.svg')"
              height="15"
              class="social-link"
              @click="routeTo('ig')"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="d-lg-none">
      <b-row>
        <b-col cols="12">
          <ul id="mobile-footer" class="list-unstyled pt-4">
            <li class="py-0 py-md-1" style="text-align: center">
              <router-link
                class="footer-menu-text-mobile"
                to="/how-it-works/user"
              >
                How It Works
              </router-link>
            </li>
            <li class="mt-2 py-md-1" style="text-align: center">
              <router-link class="footer-menu-text-mobile" to="/about-us">
                About Us
              </router-link>
            </li>
            <li class="mt-2 py-md-1" style="text-align: center">
              <router-link class="footer-menu-text-mobile" to="/terms">
                Terms of Use
              </router-link>
            </li>
            <li class="mt-2 py-md-1" style="text-align: center">
              <router-link class="footer-menu-text-mobile" to="/privacy-policy">
                Privacy Policy
              </router-link>
            </li>
          </ul>
          <div id="social-wrapper-mobile">
            <b-img
              :src="require('../assets/icons/facebook-footer.svg')"
              height="20"
              class="social-link-mobile"
              @click="routeTo('fb')"
            />
            <b-img
              :src="require('../assets/icons/twitter-footer.svg')"
              height="20"
              class="social-link-mobile mr-4 ml-4"
              @click="routeTo('twitter')"
            />
            <b-img
              :src="require('../assets/icons/ig-footer.svg')"
              height="20"
              class="social-link-mobile"
              @click="routeTo('ig')"
            />
          </div>
          <p
            style="
              color: #ffffff;
              /*margin-left: 15vw;*/
              margin-top: 3vh;
              margin-bottom: 5vh;
              text-align: center;
            "
          >
            &copy; {{ new Date().getFullYear() }} Our Space. All rights
            reserved.
            <br />
            <small style="font-size: 0.6em; opacity: 0.8; margin-bottom: 2em">
              Powered by
              <a
                style="text-decoration: none; color: #ffffff"
                href="https://softwebdigital.com"
                target="_blank"
              >
                Soft-Web Digital
              </a>
            </small>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: {
    ...mapGetters({
      avatar: "auth/getAvatar",
      isLoggedIn: "auth/getIsLoggedIn",
      emailVerifiedAt: "auth/getEmailVerifiedAt",
      isGoogleAuth: "auth/getIsGoogleAuth",
    }),
  },
  methods: {
    reSendVerificationEmail() {
      const formData = new FormData();
      formData.append("callbackUrl", `${this.callbackBaseUrl}/auth/verify`);
      this.apiPost("user/email/resend", formData).then((res) => {
        const { message } = res.data;
        this.apiSuccess(
          message,
          "The verification link has been sent to your email address"
        );
      });
    },
    routeTo(service) {
      if (service === "fb") {
        window.open("https://facebook.com", "_blank");
      } else if (service === "twitter") {
        window.open("https://twitter.com", "_blank");
      } else {
        window.open("https://instagram.com", "_blank");
      }
    },
  },
};
</script>

<style>
#footer {
  background-color: #c221cf;
  transition: 0.5s ease;
  flex-shrink: 0;
}
#footer-inner {
  border-bottom: 0.01em solid #ffffff;
}
#footer-logo-text {
  color: #ffffff;
  font-size: 0.8em;
  font-weight: lighter;
  margin-top: 1.5em;
  opacity: 0.6;
}
.footer-menu-header {
  color: #ffffff;
  margin-bottom: 0.8em;
  letter-spacing: 0.05em;
  font-size: 1.5em;
}
.footer-menu-text {
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: 0.5s ease;
}

.footer-menu-text-mobile {
  color: #ffffff;
  text-decoration: none;
  //padding-left: 1.7em;
  letter-spacing: 0.05em;
}
#support-wrapper {
  margin-left: -3em;
}
#footer-copyright {
  margin-top: 1.5em;
  font-size: 0.9em;
  color: #ffffff;
}
#privacy-wrapper {
  margin-top: 1em;
}
#privacy {
  text-decoration: none;
  color: #ffffff;
  letter-spacing: 0.05em;
  font-size: 0.9em;
  transition: 0.5s ease;
}
#terms-wrapper {
  margin-top: 1em;
}
#terms {
  text-decoration: none;
  color: #ffffff;
  letter-spacing: 0.05em;
  transition: 0.5s ease;

  font-size: 0.9em;
}
#social-wrapper {
  margin-top: 1em;
}
.social-link {
  margin-right: 1.5em;
  cursor: pointer;
}
.social-link-mobile {
}
#mobile-footer {
  font-size: 1.2em;
}
#social-wrapper-mobile {
  margin-top: 4vh;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 2.5vh;
}
</style>

<style scoped>
a:hover {
  color: #ffffff;
  opacity: 0.8;
}
</style>
