<template>
  <div>
    <b-img fluid :src="imgPath" />
    <p class="leader-name d-none d-lg-block">{{ leaderName }}</p>
    <p class="leader-name-mobile d-lg-none">{{ leaderName }}</p>
    <p class="leader-position d-none d-lg-block">{{ position }}</p>
    <p class="leader-position-mobile d-lg-none">{{ position }}</p>
  </div>
</template>

<script>
export default {
  props: {
    imgPath: {
      required: true,
    },
    leaderName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.leader-name {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 1.3em;
  letter-spacing: -1px;
  margin-top: 0.5em;
  color: #3c4043;
}
.leader-name-mobile {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 1em;
  letter-spacing: -1px;
  margin-top: 0.5em;
  color: #3c4043;
}
.leader-position {
  letter-spacing: -0.03em;
  opacity: 0.6;
  color: #230b34;
  margin-top: -1em;
}
.leader-position-mobile {
  letter-spacing: -0.03em;
  opacity: 0.6;
  color: #230b34;
  margin-top: -1.3em;
  font-size: 0.8em;
}
</style>
