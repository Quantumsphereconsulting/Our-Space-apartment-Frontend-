<template>
  <div>
    <b-container
      class="d-lg-block d-none"
      fluid
      style="padding-left: 23em; padding-right: 3em"
    >
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <div v-else>
        <Controls />
        <ViewTenantInfo :rental="rental" />
        <ViewTenantDetails :rental="rental" />
        <ViewTenantKYC :rental="rental" />
      </div>
    </b-container>
    <!--    mobile view-->
    <b-container class="d-lg-none" fluid>
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <div v-else>
        <Controls />
        <ViewTenantInfo :rental="rental" />
        <ViewTenantDetails :rental="rental" />
        <ViewTenantKYC :rental="rental" />
      </div>
    </b-container>
  </div>
</template>

<script>
import Controls from "./components/Controls";
import ViewTenantInfo from "./ViewTenantInfo";
import ViewTenantDetails from "./ViewTenantDetails";
import ViewTenantKYC from "./ViewTenantKYC";
export default {
  components: {
    Controls,
    ViewTenantInfo,
    ViewTenantDetails,
    ViewTenantKYC,
  },
  mounted() {
    this.fetchRental();
  },
  methods: {
    fetchRental() {
      let id = this.$route.params.id;
      let url = `${this.ROUTES.rentals}/${id}`;
      this.apiGet(url).then((res) => {
        const { apartment_rental } = res.data.data;
        this.rental = apartment_rental;
      });
    },
  },
  data() {
    return {
      rental: null,
    };
  },
};
</script>

<style></style>
