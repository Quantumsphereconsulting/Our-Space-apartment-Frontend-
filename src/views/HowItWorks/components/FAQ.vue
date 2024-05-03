<template>
  <div id="faq-hiw">
    <div class="faq-title" @click="visible = !visible">
      <p class="d-inline">
        {{ title }}
      </p>
      <b-img
        v-if="closed"
        width="30"
        :src="require('@/assets/icons/faq-closed.svg')"
      />
      <b-img
        v-else
        width="30"
        :src="require('@/assets/icons/faq-opened.svg')"
      />
    </div>
    <b-collapse
      v-model="visible"
      class="faq-body"
      @hidden="closed = true"
      @shown="closed = false"
    >
      On your profile page, you will get to add your bank account details and
      all withdrawals can be made to it.
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ["title", "body"],
  data() {
    return {
      visible: false,
      closed: true,
      opened: false,
    };
  },
};
</script>

<style>
#faq-hiw {
  /*border-top: 1px solid #cecece;*/
  border-bottom: 1px solid #cecece;
}
.faq-title {
  display: flex;
  justify-content: space-between;
  /*align-items: center;*/
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  cursor: pointer;
}
.faq-title p {
  font-size: 1.235em;
  color: #3c4043;
  opacity: 0.8;
  margin-bottom: 0;
}
.faq-body {
  transition: 0.1s ease-in-out;
  margin-bottom: 1em;
  color: #3c4043;
  opacity: 0.8;
}
</style>
