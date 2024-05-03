<template>
  <div>
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <input
      type="file"
      multiple
      ref="file"
      :name="uploadFieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
      style="display: none"
      accept="image/*"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    uploadFieldName: "file",
  }),
  props: {
    value: null,
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      if (file.length > 0) {
        this.$emit("input", file);
      }
    },
  },
};
</script>
