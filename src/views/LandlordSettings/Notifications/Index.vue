<template>
  <div>
    <b-container
      class="d-lg-block d-none"
      fluid
      style="padding-left: 23em; padding-right: 3em"
    >
      <Controls />
      <NotificationList />
    </b-container>
    <!--    mobile view-->
    <b-container class="d-lg-none" fluid>
      <Controls />
      <NotificationList />
    </b-container>
  </div>
</template>

<script>
import Controls from "../components/Controls.vue";
import NotificationList from "./NotificationList";
export default {
  components: { Controls, NotificationList },
};
</script>
