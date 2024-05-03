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
    <b-img
      @click="launchFilePicker()"
      fluid
      :src="require('@/assets/icons/edit-profile-pic.svg')"
      class="edit-profile-pic"
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
        formData.append("avatar", imageFile);
        let fileSize = imageFile.size / 1024 / 1024;
        if (fileSize > 2) {
          this.$notify({
            title: "Invalid Image Size",
            text: "Please select an image less than 2MB",
            type: "error",
          });
        } else {
          // upload the image here
          this.apiPost(this.ROUTES.updateAvatar, formData).then((res) => {
            const { data, message } = res.data;
            const { user } = data;
            const { avatar } = user;
            this.$store.dispatch("auth/updateAvatar", { avatar });
            this.apiSuccess("Image Uploaded", message);
          });
        }
        // Emit the FormData and image URL to the parent component
        this.$emit("input", { formData, imageURL });
      } else {
        this.$notify({
          title: "No Image Selected",
          text: "Please select an image to upload",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style>
.edit-profile-pic {
  position: absolute;
  top: 65%;
  left: 65%;
}
.edit-profile-pic:hover {
  cursor: pointer;
}
</style>
