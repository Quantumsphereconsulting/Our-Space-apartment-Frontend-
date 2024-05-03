<template>
  <div id="upcoming-rent" v-if="rental">
    <p
      style="font-size: 1.125em; color: #c221cf; margin-bottom: 0"
      @click="
        $router.push({
          name: 'PreviewLandlordApartments',
          params: { slug: rental.apartment.slug },
        })
      "
    >
      {{ rental.apartment.name }}
    </p>
    <p style="font-size: 0.75em; color: #3c4043; opacity: 0.8">
      {{ new Date(rental.expired_at).toDateString() }}
    </p>
    <div class="d-flex justify-content-between">
      <p style="font-size: 1.125em; color: #3c4043; margin-bottom: 0em">
        <span style="font-size: 0.75em; color: #3c4043; opacity: 0.8">
          Amount:
        </span>
        &#8358; {{ parseFloat(rental.apartment.price).toLocaleString() }}
      </p>
      <p
        style="
          font-size: 0.75em;
          color: #3c4043;
          opacity: 0.8;
          padding-top: 0.3em;
        "
      >
        {{
          (
            (today / new Date(rental.expired_at).getTime()) *
            100
          ).toLocaleString()
        }}% to renewal
      </p>
    </div>
    <b-progress
      :value="(today / new Date(rental.expired_at).getTime()) * 100"
      :max="
        (new Date(rental.expired_at).getTime() /
          new Date(rental.expired_at).getTime()) *
        100
      "
      class="mb-3"
    />
    <div class="d-flex justify-content-between" style="margin-bottom: -1em">
      <p style="font-size: 0.75em; opacity: 0.8; display: inline-block">
        Tenant:
        <span
          style="color: #c221cf"
          @click="
            $router.push({
              name: 'ViewLandlordTenant',
              params: { id: rental.id },
            })
          "
          class="text-capitalize"
        >
          {{ rental.user.first_name }}
          {{ rental.user.last_name }}
        </span>
      </p>
      <p
        style="
          font-size: 0.75em;
          color: #3c4043;
          opacity: 0.8;
          display: inline-block;
        "
        @click="sendReminder(rental)"
      >
        <b-img
          style="width: 1.2em; margin-right: 0.6em"
          @click="sendReminder(rental)"
          :src="require('@/assets/icons/carbon_reminder.svg')"
        />
        Send Reminder
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 65,
      max: 100,
      today: new Date().getTime(),
    };
  },
  props: ["rental"],
  methods: {
    async sendReminder(rental) {
      this.currentRental = rental;
      const url = `${this.ROUTES.rentals}/${rental.id}/reminder`;
      await this.apiPost(url, {}).then((res) => {
        const { success, message } = res.data;
        if (success) {
          this.apiSuccess("Action Successful", message);
        }
      });
    },
  },
};
</script>

<style>
#upcoming-rent {
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #cecece;
  border-radius: 10px;
}
.progress {
  height: 0.25em;
  background-color: rgba(194, 33, 207, 0.3);
}
.progress-bar {
  background-color: #c221cf;
}
</style>
