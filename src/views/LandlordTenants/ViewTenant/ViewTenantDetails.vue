<template>
  <div>
    <div v-if="rental" class="mt-4 d-lg-block d-none">
      <div class="d-flex justify-content-between flex-wrap">
        <ViewTenantDetail
          vtd-title="Phone Number"
          :vtd-subtitle="rental.user.phone_number"
        />
        <ViewTenantDetail
          vtd-title="Country"
          :vtd-subtitle="rental.user.country"
        />
        <ViewTenantDetail
          vtd-title="State of Residence"
          :vtd-subtitle="rental.user.state"
        />
        <ViewTenantDetail
          vtd-title="Gender"
          :vtd-subtitle="rental.user.gender.toUpperCase()"
        />
        <ViewTenantDetail
          vtd-title="Date of Birth"
          :vtd-subtitle="new Date(rental.user.date_of_birth).toDateString()"
        />
      </div>
      <div class="mt-5">
        <p class="vtk-title mb-3">Rental Information</p>
        <b-badge v-if="rental.is_active" pill variant="success">
          Active
        </b-badge>
        <b-badge href="javascript:void(0)" v-else pill variant="warning">
          Inactive
        </b-badge>
        <div class="d-flex mt-2">
          <p class="mr-2 mb-0">Date Rented</p>
          <p class="mb-0" style="opacity: 0.6">
            {{ new Date(rental.created_at).toUTCString() }}
          </p>
        </div>
        <div class="d-flex mt-2">
          <p class="mr-2 mb-0">Date Due</p>
          <p class="mb-0" style="opacity: 0.6">
            {{ new Date(rental.expired_at).toUTCString() }}
          </p>
        </div>
        <div class="d-flex mt-2">
          <p class="mr-2 mb-0">Checked In</p>
          <p class="mb-0" style="opacity: 0.6" v-if="rental.check_in_date">
            {{ new Date(rental.check_in_date).toUTCString() }}
          </p>
          <p v-else class="mb-0">---</p>
        </div>
        <div class="d-flex mt-2">
          <p class="mr-2 mb-0">Checked Out</p>
          <p class="mb-0" style="opacity: 0.6" v-if="rental.check_out_date">
            {{ new Date(rental.check_out_date).toUTCString() }}
          </p>
          <p v-else class="mb-0">---</p>
        </div>
        <div class="d-flex mt-2">
          <p class="mr-2 mb-0">Auto-renewal</p>
          <p
            class="mb-0"
            style="opacity: 0.6; color: #c221cf"
            v-if="rental.is_autorenewal_active"
          >
            ON
          </p>
          <p class="mb-0" style="opacity: 0.6; color: #ff0000" v-else>OFF</p>
        </div>
        <div class="d-flex mt-2">
          <p class="mr-2 mb-0">Last Reminder Sent</p>
          <p
            class="mb-0"
            style="opacity: 0.6"
            v-if="rental.last_reminder_sent_at"
          >
            {{ new Date(rental.last_reminder_sent_at).toUTCString() }}
          </p>
          <p v-else class="mb-0">---</p>
        </div>
        <div class="d-flex mt-2">
          <p class="mr-2 mb-0">Rental Period Started</p>
          <p class="mb-0" style="opacity: 0.6" v-if="rental.started_at">
            {{ new Date(rental.started_at).toUTCString() }}
          </p>
          <p v-else class="mb-0">---</p>
        </div>
        <div class="d-flex mt-2">
          <p class="mr-2 mb-0">Rental Terminated</p>
          <p class="mb-0" style="opacity: 0.6" v-if="rental.terminated_at">
            {{ new Date(rental.terminated_at).toUTCString() }}
          </p>
          <p v-else class="mb-0">---</p>
        </div>
        <div class="d-flex mt-2">
          <p class="mr-2 mb-0">Termination Reason</p>
          <p class="mb-0" style="opacity: 0.6" v-if="rental.termination_reason">
            {{ rental.termination_reason }}
          </p>
          <p v-else class="mb-0">---</p>
        </div>
      </div>
    </div>
    <div class="mt-2 d-lg-none">
      <div class="d-flex justify-content-between">
        <ViewTenantDetail
          vtd-title="Phone Number"
          :vtd-subtitle="rental.user.phone_number"
        />
        <ViewTenantDetail
          vtd-title="Country"
          :vtd-subtitle="rental.user.country"
        />
      </div>
      <div class="mt-4 d-flex justify-content-between">
        <ViewTenantDetail
          vtd-title="State of Residence"
          :vtd-subtitle="rental.user.state"
        />
        <ViewTenantDetail
          vtd-title="Gender"
          :vtd-subtitle="rental.user.gender.toUpperCase()"
        />
      </div>
      <div class="mt-4 d-flex justify-content-between">
        <ViewTenantDetail
          vtd-title="Date of Birth"
          :vtd-subtitle="new Date(rental.user.date_of_birth).toDateString()"
        />
      </div>
    </div>
    <div class="mt-5 d-lg-none">
      <p class="vtk-title mb-3">Rental Information</p>
      <b-badge v-if="rental.is_active" pill variant="success"> Active </b-badge>
      <b-badge href="javascript:void(0)" v-else pill variant="warning">
        Inactive
      </b-badge>
      <div class="d-flex mt-2">
        <p class="mr-2 mb-0">Date Rented</p>
        <p class="mb-0" style="opacity: 0.6">
          {{ new Date(rental.created_at).toUTCString() }}
        </p>
      </div>
      <div class="d-flex mt-2">
        <p class="mr-2 mb-0">Date Due</p>
        <p class="mb-0" style="opacity: 0.6">
          {{ new Date(rental.expired_at).toUTCString() }}
        </p>
      </div>
      <div class="d-flex mt-2">
        <p class="mr-2 mb-0">Checked In</p>
        <p class="mb-0" style="opacity: 0.6" v-if="rental.check_in_date">
          {{ new Date(rental.check_in_date).toUTCString() }}
        </p>
        <p v-else class="mb-0">---</p>
      </div>
      <div class="d-flex mt-2">
        <p class="mr-2 mb-0">Checked Out</p>
        <p class="mb-0" style="opacity: 0.6" v-if="rental.check_out_date">
          {{ new Date(rental.check_out_date).toUTCString() }}
        </p>
        <p v-else class="mb-0">---</p>
      </div>
      <div class="d-flex mt-2">
        <p class="mr-2 mb-0">Auto-renewal</p>
        <p
          class="mb-0"
          style="opacity: 0.6; color: #c221cf"
          v-if="rental.is_autorenewal_active"
        >
          ON
        </p>
        <p class="mb-0" style="opacity: 0.6; color: #ff0000" v-else>OFF</p>
      </div>
      <div class="d-flex mt-2">
        <p class="mr-2 mb-0">Last Reminder Sent</p>
        <p
          class="mb-0"
          style="opacity: 0.6"
          v-if="rental.last_reminder_sent_at"
        >
          {{ new Date(rental.last_reminder_sent_at).toUTCString() }}
        </p>
        <p v-else class="mb-0">---</p>
      </div>
      <div class="d-flex mt-2">
        <p class="mr-2 mb-0">Rental Period Started</p>
        <p class="mb-0" style="opacity: 0.6" v-if="rental.started_at">
          {{ new Date(rental.started_at).toUTCString() }}
        </p>
        <p v-else class="mb-0">---</p>
      </div>
      <div class="d-flex mt-2">
        <p class="mr-2 mb-0">Rental Terminated</p>
        <p class="mb-0" style="opacity: 0.6" v-if="rental.terminated_at">
          {{ new Date(rental.terminated_at).toUTCString() }}
        </p>
        <p v-else class="mb-0">---</p>
      </div>
      <div class="d-flex mt-2">
        <p class="mr-2 mb-0">Termination Reason</p>
        <p class="mb-0" style="opacity: 0.6" v-if="rental.termination_reason">
          {{ rental.termination_reason }}
        </p>
        <p v-else class="mb-0">---</p>
      </div>
    </div>
  </div>
</template>

<script>
import ViewTenantDetail from "./components/ViewTenantDetail";
export default {
  components: {
    ViewTenantDetail,
  },
  props: ["rental"],
};
</script>

<style></style>
