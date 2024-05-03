<template>
  <div id="faqs">
    <b-container>
      <div class="faqs-title">Frequently asked questions</div>
      <b-row>
        <b-col lg="6">
          <FAQ title="How do I withdraw my money?" />
        </b-col>
        <b-col lg="6" class="mt-lg-0 mt-3">
          <FAQ title="Is Listing free?" />
        </b-col>
      </b-row>
      <div class="view-more-faq">
        Still have questions? View more
        <span
          class="view-more-faq-action"
          @click="$router.push('/how-it-works/landlord')"
        >
          FAQS
        </span>
      </div>
    </b-container>
  </div>
</template>

<script>
import FAQ from "./components/FAQ";
export default {
  components: {
    FAQ,
  },
};
</script>

<style>
#faqs {
  padding-top: 6em;
  padding-bottom: 6em;
}
.faqs-title {
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  margin-bottom: 1em;
}
.view-more-faq {
  margin-top: 1em;
  opacity: 0.8;
}
.view-more-faq-action {
  color: #c221cf;
  cursor: pointer;
}
</style>
