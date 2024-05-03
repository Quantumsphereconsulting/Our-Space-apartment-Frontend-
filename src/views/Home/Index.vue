<template>
  <div>
    <b-container>
      <HeaderBanner />
    </b-container>
    <FeaturedApartments />
    <b-container>
      <CheckIn />
      <BecomeHost />
    </b-container>
    <b-container>
      <Blog />
    </b-container>
  </div>
</template>

<script>
import HeaderBanner from "./HeaderBanner";
import FeaturedApartments from "./FeaturedApartments";
import CheckIn from "./CheckIn";
import BecomeHost from "./BecomeHost";
import Blog from "./Blog";

export default {
  components: {
    HeaderBanner,
    FeaturedApartments,
    CheckIn,
    BecomeHost,
    Blog,
  },
};
</script>
