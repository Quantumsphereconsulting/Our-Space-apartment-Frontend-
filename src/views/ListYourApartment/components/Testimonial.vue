<template>
  <div id="testimonial">
    <div class="t-body">
      <b-img width="30" :src="require('@/assets/icons/quote.svg')" />
      <div class="t-comment mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget facilisis
        leo, mauris aliquet ut scelerisque.
      </div>
      <div>
        <b-img
          class="mt-4"
          width="50"
          :src="require('@/assets/icons/testimonial-divider.svg')"
        />
      </div>

      <b-img
        class="mt-4"
        width="80"
        :src="require('@/assets/images/testimonial-avatar.svg')"
      />
      <div class="t-name mt-3 mb-3">Adora N.</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#testimonial {
}
.t-body {
  background-color: #ffffff;
  border-radius: 0.8em;
  text-align: center;
  padding: 2em 1em;
  box-shadow: 0 1px 10px rgba(24, 1, 26, 0.06);
}
.t-comment {
  color: #3c4043;
  font-size: 1.3em;
}
.t-name {
  color: #3c4043;
  font-style: italic;
  opacity: 0.65;
  font-size: 1em;
}
.vueperslide--active {
  -webkit-transform: scale(1) !important;
  transform: scale(1) !important;
}
.vueperslide {
  -webkit-transform: scale(0.85);
  transform: scale(0.85);
  transition: 0.3s ease-in-out;
}
</style>
