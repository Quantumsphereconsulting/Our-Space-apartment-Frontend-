<template>
  <div class="rent-duration-wrapper">
    <div id="rent-duration">
      <p>{{ type }}</p>
      <vac :end-time="new Date(expiredAt).getTime()">
        <template v-slot:process="{ timeObj }">
          <div class="d-flex justify-content-around p-2">
            <div class="px-1">
              <div class="rent-duration-tab">{{ timeObj.d }}</div>
              <span class="rent-duration-text">Days</span>
            </div>
            <div class="px-1">
              <div class="rent-duration-tab">{{ timeObj.h }}</div>
              <span class="rent-duration-text">Hours</span>
            </div>
            <div class="px-1">
              <div class="rent-duration-tab">{{ timeObj.s }}</div>
              <span class="rent-duration-text">Seconds</span>
            </div>
          </div>
        </template>
        <template v-slot:finish>
          <span>Done!</span>
        </template>
      </vac>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    expiredAt: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  methods: {
    rentDurationAction() {
      if (this.$route.name === "Bookings") {
        this.$refs["cancelled-booking"].show();
      }
    },
  },
};
</script>

<style>
@media screen and (max-width: 1920px) {
  #rent-duration {
    max-width: 220px;
    width: 220px;
  }
  .rent-duration-wrapper {
    width: 220px;
  }
}
@media screen and (max-width: 600px) {
  #rent-duration {
    max-width: 100%;
    width: 100%;
  }
  .rent-duration-wrapper {
    width: 100%;
  }
}

#rent-duration {
  margin-top: 1em;
  background: rgba(194, 33, 207, 0.05);
  border-radius: 5px;
  text-align: center;
  padding: 1em;
  color: #3c4043;
}
.rent-duration-tab {
  background-color: #c221cf;
  border-radius: 5px;
  color: #ffffff;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  width: 3em;
  height: 2.6em;
}
.rent-duration-text {
  font-size: 0.7em;
}
#cancelled-booking {
  text-align: center;
  font-family: "Circular Std Book", sans-serif;
}
.cancelled-booking-text {
  font-size: 1.5em;
  color: #3c4043;
}
</style>
