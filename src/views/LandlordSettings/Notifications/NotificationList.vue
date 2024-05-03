<template>
  <div class="mb-5">
    <scale-loader v-if="apiBusy" :loading="true" :color="'#c221cf'" />
    <b-list-group flush v-else>
      <b-list-group-item
        v-for="(notification, index) in notifications"
        :key="index"
        href="#"
        @click="readNotification(notification)"
        :disabled="notification.read_at"
      >
        <div id="txn">
          <div class="d-flex justify-content-between flex-lg-row flex-column">
            <div class="d-flex">
              <b-img
                fluid
                :src="require('@/assets/icons/txn-success.svg')"
                class="mr-4"
              />
              <div>
                <p
                  v-if="notification.read_at"
                  style="color: #3c4043"
                  class="mb-0 pt-lg-3"
                >
                  {{ notification.data.message }}
                </p>
                <strong v-else style="color: #3c4043" class="mb-0 pt-lg-3">
                  {{ notification.data.message }}
                </strong>

                <p style="color: #3c4043; opacity: 0.8" class="mt-lg-0 mt-3">
                  {{ new Date(notification.created_at).toUTCString() }}
                </p>
              </div>
            </div>
            <div>
              <small v-if="notification.read_at">
                <span class="d-none d-lg-flex">
                  Read @
                  {{ new Date(notification.read_at).toUTCString() }}
                </span>
              </small>
            </div>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-modal
      v-model="viewNotification"
      hide-footer
      hide-header
      no-close-on-backdrop
      no-close-on-esc
      centered
      size=""
      @hidden="fetchNotifications"
    >
      <div class="rent-apartment-body">
        <p class="rent-apartment-title">Notification</p>
        <p class="rent-apartment-subtitle" v-if="currentNotification">
          {{ currentNotification.data.message }} <br />
          <small class="mt-4">
            {{ new Date(currentNotification.created_at).toDateString() }}
          </small>
        </p>
        <div class="d-flex align-items-center mt-4">
          <b-button
            class="primary-btn rent-apartment-btn"
            style="
              padding-right: 1em;
              padding-left: 1em;
              width: 100%;
              height: 50px;
            "
            @click="
              viewNotification = false;
              currentNotification = null;
            "
          >
            Close
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    fetchNotifications() {
      this.apiGet(this.ROUTES.notifications).then((res) => {
        const { notifications } = res.data.data;
        this.notifications = notifications.data;
      });
    },
    readNotification(notification) {
      this.currentNotification = notification;
      this.viewNotification = true;
      const url = `${this.ROUTES.notifications}/${notification.id}`;
      this.apiPatch(url).then(() => {});
    },
  },
  mounted() {
    this.fetchNotifications();
  },
  data() {
    return {
      notifications: [],
      viewNotification: false,
      currentNotification: null,
    };
  },
};
</script>

<style>
.w-title {
  font-size: 2.25em;
  color: #3c4043;
}
.rent-apartment-body {
  padding: 2em 4em 2em 4em;
}
/*@media only screen and (min-width: 992px),*/
/*  only screen and (min-device-width: 992px) {*/
/*  .rent-apartment-body {*/
/*    padding: 2em 4em 2em 4em;*/
/*  }*/
/*}*/
.rent-apartment-title {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  color: #3c4043;
}
.rent-apartment-subtitle {
  font-family: "Circular Std Book", sans-serif;
  margin-top: 1em;
  color: #3c4043;
  opacity: 0.8;
}
.rent-apartment-btn {
  font-family: "Circular Std Book", sans-serif;
}
</style>
