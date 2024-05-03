<template>
  <div id="upcoming-rents">
    <div class="d-flex justify-content-between">
      <p style="font-size: 1.375em; color: #3c4043">Upcoming Rent Renewal</p>
      <div class="search-date">
        <date-picker
          valueType="MM/YYYY"
          placeholder="Search by Date"
          type="month"
          v-model="dateRented"
          @input="filter"
        />
      </div>
    </div>
    <b-table
      class="ur-table"
      :items="items"
      :fields="fields"
      show-empty
      empty-text="There are no upcoming rent renewals"
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
    <Paginator
      v-if="rentals"
      :current-page="rentals.current_page"
      :last-page="rentals.last_page"
      :go-to-next="rentals.next_page_url"
      :go-to-prev="rentals.prev_page_url"
      @click="paginate"
    />
    <b-modal
      v-model="reminding"
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
        <div v-if="currentRental" style="font-size: 1.5em; margin-top: 2em">
          Please wait, we're sending a reminder to
          <strong class="text-capitalize">{{
            currentRental.user.first_name
          }}</strong>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Paginator from "./components/Paginator";
export default {
  components: { Paginator },
  props: ["apartmentRentals"],
  mounted() {
    this.rentals = this.apartmentRentals;
    this.items = this.apartmentRentals.data;
  },
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
      rentals: null,
      currentRental: null,
      reminding: false,
      dateRented: null,
    };
  },
  methods: {
    paginate(apartmentRentals) {
      if (apartmentRentals) {
        this.items = apartmentRentals.data;
        this.rentals = apartmentRentals;
      }
    },
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
    filter() {
      this.$emit("filter", this.dateRented);
    },
  },
};
</script>

<style>
#upcoming-rents {
  margin-top: 3em;
  margin-bottom: 3em;
  border-radius: 10px;
}
.search-date {
  position: relative;
  width: 248px;
}
.search-date-icon {
  position: absolute;
  bottom: 41%;
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
<style>
.mx-datepicker {
  width: 100%;
}
.mx-input-wrapper {
  height: 3.125em;
}
.mx-input {
  height: 100%;
  /*background-color: #f5f4ff;*/
  border-color: #ced4da !important;
  box-shadow: none;
  color: #3c4043;
  font-size: 1rem;
}
.mx-input:hover,
.mx-input:focus {
  border-color: #c221cf;
}
</style>
