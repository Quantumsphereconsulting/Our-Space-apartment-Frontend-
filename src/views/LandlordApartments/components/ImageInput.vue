<template>
  <div>
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <input
      type="file"
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
    value: Object,
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      let imageFile = file[0];
      if (file.length > 0) {
        let formData = new FormData();
        let imageURL = URL.createObjectURL(imageFile);
        formData.append(fieldName, imageFile);
        // Emit the FormData and image URL to the parent component
        this.$emit("input", { formData, imageURL, imageFile });
      }
    },
  },
};
</script>
