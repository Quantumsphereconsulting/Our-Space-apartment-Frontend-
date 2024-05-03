<template>
  <div>
    <div id="leadership" class="d-none d-lg-block">
      <p class="leadership-title">Our Leadership</p>
      <b-row class="mt-5">
        <b-col v-for="leader in leaders" :key="leader.id" lg="3">
          <Leader
            :img-path="leader.imgPath"
            :leader-name="leader.name"
            :position="leader.position"
          />
        </b-col>
      </b-row>
    </div>
    <div id="leadership-mobile" class="d-lg-none">
      <p class="leadership-title-mobile">Our Leadership</p>
      <b-row class="mt-5 text-center">
        <b-col v-for="leader in leaders" :key="leader.id" lg="3">
          <Leader
            :img-path="leader.imgPath"
            :leader-name="leader.name"
            :position="leader.position"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Leader from "./components/Leader";
export default {
  components: {
    Leader,
  },
  data() {
    return {
      leaders: [
        {
          id: 1,
          imgPath: require("../../assets/images/leader-1.png"),
          name: "Seun Oni",
          position: "CEO, Our Space",
        },
        {
          id: 2,
          imgPath: require("../../assets/images/leader-2.png"),
          name: "Seun Oni",
          position: "CEO, Our Space",
        },
        {
          id: 3,
          imgPath: require("../../assets/images/leader-3.png"),
          name: "Seun Oni",
          position: "CEO, Our Space",
        },
        {
          id: 4,
          imgPath: require("../../assets/images/leader-4.png"),
          name: "Seun Oni",
          position: "CEO, Our Space",
        },
      ],
    };
  },
};
</script>

<style>
#leadership {
  //margin-top: 2em;
  margin-bottom: 4em;
}
#leadership-mobile {
  margin-top: 1em;
  margin-bottom: 2em;
}
.leadership-title {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 3.5em;
  letter-spacing: -4px;
  text-align: center;
  color: #3c4043;
}
.leadership-title-mobile {
  font-family: "Circular Std", sans-serif;
  font-weight: bold;
  font-size: 2em;
  letter-spacing: -2px;
  text-align: center;
  color: #3c4043;
}
</style>
