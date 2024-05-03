<template>
  <b-container>
    <PrivacyTermsHeader
      title="Terms of Use"
      subtitle="Read the Terms of Use governing the affairs of Our Space"
    />
    <div id="terms-body" class="os-black" style="opacity: 0.8">
      <p class="mb-4">Last updated: August 12th, 2021</p>
      <p>
        At ourspace.com, accessible from www.ourspace.com, one of our main
        priorities is the privacy of our visitors. This Privacy Policy document
        contains types of information that is collected and recorded by
        ourspace.com and how we use it.
      </p>
      <p>
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to contact us.
      </p>
      <p>
        This Privacy Policy applies only to our online activities and is valid
        for visitors to our website with regards to the information that they
        shared and/or collect in ourspace.com. This policy is not applicable to
        any information collected offline or via channels other than this
        website.
      </p>
      <p>
        Our Privacy Policy was created with the help of the
        <a href="https://www.termsfeed.com/privacy-policy-generator/"
          >TermsFeed Privacy Policy Generator</a
        >.
      </p>
      <p>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its terms.
      </p>
      <p class="text-heading">Information we collect</p>
      <p>
        The personal information that you are asked to provide, and the reasons
        why you are asked to provide it, will be made clear to you at the point
        we ask you to provide your personal information. If you contact us
        directly, we may receive additional information about you such as your
        name, email address, phone number, the contents of the message and/or
        attachments you may send us, and any other information you may choose to
        provide. When you register for an Account, we may ask for your contact
        information, including items such as name, company name, address, email
        address, and telephone number.
      </p>
      <p class="text-heading">How we use your information</p>
      <p>
        We use the information we collect in various ways, including to:Provide,
        operate, and maintain our website, Improve, personalize, and expand our
        website. Understand and analyze how you use our website Develop new
        products, services, features, and functionality Communicate with you,
        either directly or through one of our partners, including for customer
        service, to provide you with updates and other information relating to
        the website, and for marketing and promotional purposes Send you emails
        Find and prevent fraud
      </p>
    </div>
  </b-container>
</template>

<script>
import PrivacyTermsHeader from "./components/PrivacyTermsHeader";
export default {
  components: {
    PrivacyTermsHeader,
  },
};
</script>

<style>
.text-heading {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
}
#terms-body {
  margin-top: 2em;
  margin-bottom: 5em;
}
</style>
