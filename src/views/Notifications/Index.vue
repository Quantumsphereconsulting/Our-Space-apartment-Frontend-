<template>
  <div id="notifications">
    <b-container>
      <p class="w-title">Notifications</p>
      <b-card
        no-body
        style="margin-top: 2em; margin-bottom: 3em; border-radius: 10px"
        class="border-1"
      >
        <scale-loader
          v-if="apiBusy"
          class="mt-5"
          :loading="true"
          :color="'#c221cf'"
        />
        <b-list-group flush v-else>
          <b-list-group-item
            v-for="(notification, index) in notifications"
            :key="index"
            href="#"
            @click="readNotification(notification)"
          >
            <div id="txn">
              <div
                class="d-flex justify-content-between flex-lg-row flex-column"
              >
                <div class="d-flex">
                  <b-img
                    fluid
                    :src="require('@/assets/icons/txn-success.svg')"
                    class="mr-4"
                  />
                  <div>
                    <p style="color: #3c4043" class="mb-0 pt-lg-3">
                      {{ notification.data.message }}
                    </p>
                    <p
                      style="color: #3c4043; opacity: 0.8"
                      class="mt-lg-0 mt-3"
                    >
                      {{ new Date(notification.created_at).toUTCString() }}
                    </p>
                  </div>
                </div>
                <div>
                  <small v-if="notification.read_at">
                    Read @
                    {{ new Date(notification.read_at).toUTCString() }}</small
                  >
                </div>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-container>
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
#notifications {
  margin-top: 4em;
  flex: 1 0 auto;
}
.w-title {
  font-size: 2.25em;
  color: #3c4043;
}
.rent-apartment-body {
  padding: 2em 4em 2em 4em;
}
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
