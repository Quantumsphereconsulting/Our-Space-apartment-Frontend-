<template>
  <div id="how-it-works-user">
    <UserHeader />
    <b-container>
      <p class="hiw-subtitle">Frequently Asked Questions</p>
      <Controls />
      <FAQ title="How do I withdraw my money?" />
      <FAQ title="How do I withdraw my money?" />
      <FAQ title="How do I withdraw my money?" />
      <FAQ title="How do I withdraw my money?" />
      <FAQ title="How do I withdraw my money?" />
      <FAQ title="How do I withdraw my money?" />
      <FAQ title="How do I withdraw my money?" />
      <FAQ title="How do I withdraw my money?" />
      <FAQ title="How do I withdraw my money?" />
      <FAQ title="How do I withdraw my money?" />
    </b-container>
  </div>
</template>

<script>
import Controls from "../components/Controls";
import UserHeader from "./UserHeader";
import FAQ from "../components/FAQ";
export default {
  components: {
    Controls,
    UserHeader,
    FAQ,
  },
};
</script>

<style>
#how-it-works-user {
  flex: 1 0 auto;
  padding-bottom: 3em;
}
.hiw-subtitle {
  margin-top: 1.5em;
  font-size: 2em;
  color: #3c4043;
}
</style>
