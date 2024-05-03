<template>
  <div>
    <b-container fluid>
      <NewControls />
      <Gallery />
      <NewApartmentForm />
    </b-container>
  </div>
</template>

<script>
import NewControls from "@/views/LandlordApartments/NewApartment/components/NewControls";
import Gallery from "./NewGallery";
import NewApartmentForm from "./NewApartmentForm";
export default {
  components: { NewControls, Gallery, NewApartmentForm },
};
</script>
