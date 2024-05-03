<template>
  <div>
    <b-container
      class="d-lg-block d-none"
      fluid
      style="padding-left: 23em; padding-right: 3em"
    >
      <Controls @filtered="filter" />
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <ListedApartments
        @duplicated="duplicated"
        v-else
        :apartments="apartments"
      />
    </b-container>
    <!--    mobile view-->
    <b-container class="d-lg-none" fluid>
      <Controls @filtered="filter" />
      <scale-loader
        v-if="apiBusy"
        class="mt-5"
        :loading="true"
        :color="'#c221cf'"
      />
      <MobileListedApartments v-else :apartments="apartments" />
    </b-container>
  </div>
</template>

<script>
import Controls from "./components/Controls.vue";
import ListedApartments from "./ListedApartments.vue";
import MobileListedApartments from "./MobileListedApartments.vue";

export default {
  components: { Controls, ListedApartments, MobileListedApartments },
  created() {
    this.fetchApartments();
  },
  data() {
    return {
      apartments: {},
    };
  },
  methods: {
    fetchApartments() {
      const url = `${this.ROUTES.apartment}?per_page=8&page=1`;
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments;
      });
    },
    duplicated() {
      this.fetchApartments();
    },
    filter(url) {
      this.apiGet(url).then((res) => {
        const { apartments } = res.data.data;
        this.apartments = apartments;
      });
    },
  },
};
</script>

<style scoped></style>
