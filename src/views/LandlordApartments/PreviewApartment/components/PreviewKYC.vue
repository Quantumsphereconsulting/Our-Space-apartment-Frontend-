<template>
  <div id="preview-kyc">
    <p class="p-kyc-title">KYC Requirements</p>
    <b-row v-if="kycs.length">
      <b-col xl="3" v-for="kyc in kycs" :key="kyc.id">
        <p class="p-kyc-item">
          <b-img class="mr-2" :src="require('@/assets/icons/check.svg')" />
          <strong
            v-if="kyc.is_required"
            style="color: #3c4043; font-size: 1.125em"
          >
            {{ kyc.name }}
          </strong>
          <span v-else style="color: #3c4043; font-size: 1.125em">
            {{ kyc.name }}
          </span>
        </p>
      </b-col>
    </b-row>
    <b-alert v-else show variant="info">
      <h4 class="alert-heading mt-2">No KYC Options</h4>
      <p>
        Our team is currently working to offer you KYC options for your tenants.
        Thanks for your patience.
      </p>
    </b-alert>
  </div>
</template>

<script>
export default {
  props: {
    kycs: null,
  },
};
</script>

<style>
.p-kyc-title {
  font-size: 1.5em;
}
.p-kyc-container {
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.p-kyc-item {
  display: flex;
  align-items: center;
  margin-right: 4em;
}
</style>
