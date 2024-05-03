<template>
  <div>
    <b-container
      class="d-lg-block d-none"
      fluid
      style="padding-left: 23em; padding-right: 3em"
    >
      <Controls />
      <ProfileDetailsForm />
    </b-container>
    <!--    mobile view-->
    <b-container class="d-lg-none" fluid>
      <Controls />
      <ProfileDetailsForm />
    </b-container>
  </div>
</template>

<script>
import Controls from "../components/Controls.vue";
import ProfileDetailsForm from "./ProfileDetailsForm";
export default {
  components: { Controls, ProfileDetailsForm },
};
</script>

<style></style>
