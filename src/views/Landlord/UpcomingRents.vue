<template>
  <div id="upcoming-rents">
    <div class="d-flex justify-content-between">
      <p style="font-size: 1.375em; color: #3c4043">
        Upcoming Tenant Rent Renewal
      </p>
    </div>
    <b-table
      show-empty
      empty-text="There are no upcoming rent renewals"
      class="ur-table"
      :items="rentals"
      :fields="fields"
    >
      <template #cell(due_date)="row">
        <p
          style="
            color: #3c4043;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
          "
        >
          {{ new Date(row.item.expired_at).toDateString() }}
        </p>
      </template>
      <template #cell(tenant)="row">
        <p
          style="
            color: #c221cf;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
            cursor: pointer;
            display: inline-block;
          "
          @click="
            $router.push({
              name: 'ViewLandlordTenant',
              params: { id: row.item.id },
            })
          "
          class="text-capitalize"
        >
          {{ row.item.user.first_name }}
          {{ row.item.user.last_name }}
        </p>
      </template>
      <template #cell(apartment)="row">
        <p
          style="
            color: #c221cf;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
            cursor: pointer;
            display: inline-block;
          "
          @click="
            $router.push({
              name: 'PreviewLandlordApartments',
              params: { slug: row.item.apartment.slug },
            })
          "
        >
          {{ row.item.apartment.name }}
        </p>
      </template>
      <template #cell(amount_due)="row">
        <p
          style="
            color: #3c4043;
            opacity: 0.8;
            font-size: 1.125em;
            margin-top: 1em;
          "
        >
          &#8358; {{ parseFloat(row.item.apartment.price).toLocaleString() }}
        </p>
      </template>
      <template #cell(send_reminder)="row">
        <b-img
          class="send-reminder"
          @click="sendReminder(row.item)"
          fluid
          :src="require('@/assets/icons/carbon_reminder.svg')"
        />
      </template>
    </b-table>
    <div class="d-flex mb-n4 justify-content-end">
      <p class="ur-view-all" @click="$router.push({ name: 'LandlordTenants' })">
        View all >>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rentals"],
  data() {
    return {
      fields: [
        "due_date",
        "tenant",
        "apartment",
        "amount_due",
        "send_reminder",
      ],
      items: [],
    };
  },
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

<style scoped>
#upcoming-rents {
  margin-top: 3em;
  margin-bottom: 3em;
  border: 1px solid #cecece;
  border-radius: 10px;
  padding: 2em;
}
.search-date {
  position: relative;
}
.search-date-icon {
  position: absolute;
  bottom: 45%;
  left: 90%;
}
.ur-table {
  margin-top: 2em;
}
.send-reminder {
  margin-left: 3em;
  margin-top: 1.3em;
  transition: 0.5s ease;
}
.send-reminder:hover {
  cursor: pointer;
  opacity: 0.8;
}
.ur-view-all {
  color: #c221cf;
  transition: 0.5s ease;
}
.ur-view-all:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
