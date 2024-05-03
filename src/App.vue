<template>
  <div>
    <AppLayout id="app">
      <router-view />
    </AppLayout>
    <notifications position="bottom right" />
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";

export default {
  components: { AppLayout },
  mounted: function () {
    this.$root.$on("bv::dropdown::show", (bvEvent) => {
      if (bvEvent.componentId === "dropdown-2") {
        this.isDropdown2Visible = true;
      }
    });
    this.$root.$on("bv::dropdown::hide", (bvEvent) => {
      if (bvEvent.componentId === "dropdown-2") {
        this.isDropdown2Visible = false;
      }
      if (this.isDropdown2Visible) {
        bvEvent.preventDefault();
      }
    });
  },
};
</script>

<style>
@font-face {
  font-family: "Circular Std";
  src: url("./fonts/circular/CircularStd-MediumItalic.eot");
  src: local("Circular Std Medium Italic"), local("CircularStd-MediumItalic"),
    url("./fonts/circular/CircularStd-MediumItalic.eot?#iefix")
      format("embedded-opentype"),
    url("./fonts/circular/CircularStd-MediumItalic.woff2") format("woff2"),
    url("./fonts/circular/CircularStd-MediumItalic.woff") format("woff"),
    url("./fonts/circular/CircularStd-MediumItalic.ttf") format("truetype");
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: "Circular Std";
  src: url("./fonts/circular/CircularStd-Black.eot");
  src: local("Circular Std Black"), local("CircularStd-Black"),
    url("./fonts/circular/CircularStd-Black.eot?#iefix")
      format("embedded-opentype"),
    url("./fonts/circular/CircularStd-Black.woff2") format("woff2"),
    url("./fonts/circular/CircularStd-Black.woff") format("woff"),
    url("./fonts/circular/CircularStd-Black.ttf") format("truetype");
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: "Circular Std";
  src: url("./fonts/circular/CircularStd-Medium.eot");
  src: local("Circular Std Medium"), local("CircularStd-Medium"),
    url("./fonts/circular/CircularStd-Medium.eot?#iefix")
      format("embedded-opentype"),
    url("./fonts/circular/CircularStd-Medium.woff2") format("woff2"),
    url("./fonts/circular/CircularStd-Medium.woff") format("woff"),
    url("./fonts/circular/CircularStd-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Circular Std";
  src: url("./fonts/circular/CircularStd-Bold.eot");
  src: local("Circular Std Bold"), local("CircularStd-Bold"),
    url("./fonts/circular/CircularStd-Bold.eot?#iefix")
      format("embedded-opentype"),
    url("./fonts/circular/CircularStd-Bold.woff2") format("woff2"),
    url("./fonts/circular/CircularStd-Bold.woff") format("woff"),
    url("./fonts/circular/CircularStd-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Circular Std";
  src: url("./fonts/circular/CircularStd-BlackItalic.eot");
  src: local("Circular Std Black Italic"), local("CircularStd-BlackItalic"),
    url("./fonts/circular/CircularStd-BlackItalic.eot?#iefix")
      format("embedded-opentype"),
    url("./fonts/circular/CircularStd-BlackItalic.woff2") format("woff2"),
    url("./fonts/circular/CircularStd-BlackItalic.woff") format("woff"),
    url("./fonts/circular/CircularStd-BlackItalic.ttf") format("truetype");
  font-weight: 900;
  font-style: italic;
}

@font-face {
  font-family: "Circular Std Book";
  src: url("./fonts/circular/CircularStd-BookItalic.eot");
  src: local("Circular Std Book Italic"), local("CircularStd-BookItalic"),
    url("./fonts/circular/CircularStd-BookItalic.eot?#iefix")
      format("embedded-opentype"),
    url("./fonts/circular/CircularStd-BookItalic.woff2") format("woff2"),
    url("./fonts/circular/CircularStd-BookItalic.woff") format("woff"),
    url("./fonts/circular/CircularStd-BookItalic.ttf") format("truetype");
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: "Circular Std";
  src: url("./fonts/circular/CircularStd-BoldItalic.eot");
  src: local("Circular Std Bold Italic"), local("CircularStd-BoldItalic"),
    url("./fonts/circular/CircularStd-BoldItalic.eot?#iefix")
      format("embedded-opentype"),
    url("./fonts/circular/CircularStd-BoldItalic.woff2") format("woff2"),
    url("./fonts/circular/CircularStd-BoldItalic.woff") format("woff"),
    url("./fonts/circular/CircularStd-BoldItalic.ttf") format("truetype");
  font-weight: bold;
  font-style: italic;
}

@font-face {
  font-family: "Circular Std Book";
  src: url("./fonts/circular/CircularStd-Book.eot");
  src: local("Circular Std Book"), local("CircularStd-Book"),
    url("./fonts/circular/CircularStd-Book.eot?#iefix")
      format("embedded-opentype"),
    url("./fonts/circular/CircularStd-Book.woff2") format("woff2"),
    url("./fonts/circular/CircularStd-Book.woff") format("woff"),
    url("./fonts/circular/CircularStd-Book.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: "Circular Std Book", sans-serif;
}
</style>
