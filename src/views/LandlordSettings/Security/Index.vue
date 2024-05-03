<template>
  <div>
    <b-container
      class="d-lg-block d-none"
      fluid
      style="padding-left: 23em; padding-right: 3em"
    >
      <Controls />
      <SecurityForm />
    </b-container>
    <!--    mobile view-->
    <b-container class="d-lg-none" fluid>
      <Controls />
      <SecurityForm />
    </b-container>
  </div>
</template>

<script>
import Controls from "../components/Controls.vue";
import SecurityForm from "./SecurityForm";
export default {
  components: { Controls, SecurityForm },
};
</script>

<style></style>
