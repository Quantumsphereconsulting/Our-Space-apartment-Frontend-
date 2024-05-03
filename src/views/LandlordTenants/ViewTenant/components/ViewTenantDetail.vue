<template>
  <div id="view-tenant-detail">
    <p class="vtd-title px-2">{{ vtdTitle }}</p>
    <p class="vtd-subtitle px-2">{{ vtdSubtitle }}</p>
  </div>
</template>

<script>
export default {
  props: {
    vtdTitle: {
      type: String,
      required: true,
    },
    vtdSubtitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
#view-tenant-detail {
  width: 12.5em;
  height: 6.25em;
  border-radius: 10px;
  box-shadow: 0 60px 80px rgba(0, 0, 0, 0.05);
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.vtd-title {
  color: #3c4043;
  letter-spacing: -0.02em;
  margin-bottom: 0;
  text-align: center;
}
.vtd-subtitle {
  color: #a3aed0;
  letter-spacing: -0.02em;
  font-size: 0.875em;
  opacity: 0.8;
  text-align: center;
}
</style>
