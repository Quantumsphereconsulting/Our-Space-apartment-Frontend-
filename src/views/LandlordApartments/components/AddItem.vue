<template>
  <div id="g-item">
    <div class="placeholder-add" @click="addItem">
      <b-img :src="require('@/assets/icons/add-item.svg')" />
      <p style="font-size: 0.7em; padding-top: 1em">ADD IMAGE CATEGORY</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addItem() {
      this.$emit("addItem");
    },
  },
};
</script>

<style>
#g-item {
  margin-top: 1em;
  margin-right: 1.5em;
  display: inline-block;
}
.placeholder-add {
  width: 10.9375em;
  height: 8.125em;
  border-radius: 5px;
  border: 1px dashed #c221cf;
  padding-top: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease;
  text-align: center;
}
.placeholder-add:hover {
  cursor: pointer;
  background-color: #f5f4ff;
  border: 1px dashed #c221cf;
}
</style>
