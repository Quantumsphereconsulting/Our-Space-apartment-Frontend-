<template>
  <div>
    <div id="our-space" class="d-none d-lg-block">
      <b-img
        height="50"
        :src="require('@/assets/icons/vertical-divider.png')"
        style="margin-bottom: 2em"
      />
      <p class="our-space-title">Our Space?</p>
      <p class="our-space-subtitle">
        What began as a journey to provide a better stay has grown into a
        celebration of modern design and exceptional comfort. We’re working with
        world-class architects and designers to create truly remarkable
        spaces—ones that transcend hospitality and enrich lives. And we’re
        employing technology to keep those spaces affordable as we bring Our
        Space to more cities around Nigeria and Africa.
      </p>
      <b-img
        height="50"
        :src="require('@/assets/icons/vertical-divider.png')"
        style="margin-bottom: 2em"
      />
    </div>
    <div id="our-space-mobile" class="d-lg-none">
      <b-img
        height="40"
        :src="require('@/assets/icons/vertical-divider.png')"
        style="margin-bottom: 1em"
      />
      <p class="our-space-title-mobile">Our Space?</p>
      <p class="our-space-subtitle-mobile">
        What began as a journey to provide a better stay has grown into a
        celebration of modern design and exceptional comfort. We’re working with
        world-class architects and designers to create truly remarkable
        spaces—ones that transcend hospitality and enrich lives. And we’re
        employing technology to keep those spaces affordable as we bring Our
        Space to more cities around Nigeria and Africa.
      </p>
      <b-img
        height="40"
        :src="require('@/assets/icons/vertical-divider.png')"
        style="margin-bottom: 1em"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#our-space {
  margin-top: 3em;
  text-align: center;
}
#our-space-mobile {
  margin-top: 2em;
  text-align: center;
}
.our-space-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3.5em;
  letter-spacing: -4px;
  color: #3c4043;
}
.our-space-title-mobile {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 2em;
  letter-spacing: -3px;
  color: #3c4043;
}
.our-space-subtitle {
  letter-spacing: -0.03em;
  opacity: 0.6;
  text-align: center;
  color: #230b34;
  padding: 0 20em;
  margin-bottom: 2em;
}
.our-space-subtitle-mobile {
  letter-spacing: -0.03em;
  opacity: 0.6;
  text-align: center;
  color: #230b34;
  margin-bottom: 1em;
}
</style>
