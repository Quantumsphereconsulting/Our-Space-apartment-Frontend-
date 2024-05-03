<template>
  <div id="mobile-gallery" class="d-lg-none">
    <b-carousel :interval="10000" controls indicators fade>
      <b-carousel-slide
        v-for="(gallery, index) in Gallries"
        :key="index"
        :img-src="gallery"
      />
    </b-carousel>
  </div>
</template>

<script>
export default {
  props: ["Gallries"],
};
</script>

<style>
#mobile-gallery {
  margin-bottom: 2em;
}
.carousel-indicators li {
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 8px;
  height: 8px;
  margin-right: 3px;
  margin-left: 3px;
  border-radius: 50%;
  text-indent: -999px;
  cursor: pointer;
  background-color: #ffffff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: 0.5;
  transition: opacity 0.6s ease;
}
.carousel-indicators .active {
  opacity: 1;
}
.carousel-control-prev-icon {
  background-image: url("../../../assets/icons/carousel-left.svg");
  height: 1.1em;
}
.carousel-control-next-icon {
  background-image: url("../../../assets/icons/carousel-right.svg");
  height: 1.1em;
}
.carousel-item img {
  height: 400px !important;
  object-fit: cover;
}
</style>
