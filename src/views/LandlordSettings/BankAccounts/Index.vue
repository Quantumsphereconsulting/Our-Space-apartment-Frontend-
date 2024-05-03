<template>
  <div>
    <b-container
      class="d-lg-block d-none"
      fluid
      style="padding-left: 23em; padding-right: 3em"
    >
      <Controls />
      <BankAccounts />
    </b-container>
    <!--    mobile view-->
    <b-container class="d-lg-none" fluid>
      <Controls />
      <BankAccounts />
    </b-container>
  </div>
</template>

<script>
import Controls from "../components/Controls.vue";
import BankAccounts from "./BankAccounts";
export default {
  components: { Controls, BankAccounts },
};
</script>
