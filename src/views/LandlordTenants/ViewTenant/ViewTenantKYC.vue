<template>
  <div id="view-tenant-kyc" class="text-lg-left text-center">
    <p class="vtk-title">KYC Information</p>
    <b-table
      class="ur-table"
      :items="kycs"
      :fields="fields"
      show-empty
      empty-text="There are no upcoming rent renewals"
    >
      <template #cell(entry)="row">
        <a
          v-if="row.item.system_apartment_kyc.datatype.name === 'image'"
          style="text-decoration: none; color: #c221cf"
          :href="row.value"
          target="_blank"
        >
          Click to view this image
        </a>
        <a
          v-else-if="row.item.system_apartment_kyc.datatype.name === 'file'"
          style="text-decoration: none; color: #c221cf"
          :href="row.value"
          target="_blank"
        >
          Click to view this file
        </a>
        <a
          v-else-if="row.item.system_apartment_kyc.datatype.name === 'url'"
          style="text-decoration: none; color: #c221cf"
          :href="row.value"
          target="_blank"
        >
          Click to view this url
        </a>
        <span
          v-else-if="row.item.system_apartment_kyc.datatype.name === 'boolean'"
        >
          <span v-if="row.value === 1">TRUE</span>
          <span v-else>FALSE</span>
        </span>
        <span
          v-else-if="
            row.item.system_apartment_kyc.datatype.name === 'date' ||
            row.item.system_apartment_kyc.datatype.name ===
              'date_after_today' ||
            row.item.system_apartment_kyc.datatype.name === 'date_before_today'
          "
        >
          {{ new Date(row.value).toDateString() }}
        </span>
        <span
          v-else-if="row.item.system_apartment_kyc.datatype.name === 'datetime'"
        >
          {{ new Date(row.value).toUTCString() }}
        </span>
        <span
          v-else-if="
            row.item.system_apartment_kyc.datatype.name === 'percentage'
          "
        >
          {{ row.value }} %
        </span>
        <span class="text-capitalize" v-else>
          {{ row.value }}
        </span>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["rental"],
  data() {
    return {
      kycs: [],
      fields: [
        {
          key: "system_apartment_kyc.name",
          label: "KYC",
          thStyle: { width: "30%" },
        },
        {
          key: "system_apartment_kyc.description",
          label: "Description",
          thStyle: { width: "50%" },
        },
        { key: "entry", label: "Tenant Submission", thStyle: { width: "20%" } },
      ],
    };
  },
  mounted() {
    this.kycs = this.rental.user.apartment_kycs;
  },
};
</script>

<style>
#view-tenant-kyc {
  margin-top: 4em;
  margin-bottom: 3em;
}
.vtk-title {
  font-size: 1.5em;
  color: #3c4043;
  margin-bottom: 1.3em;
}
</style>
