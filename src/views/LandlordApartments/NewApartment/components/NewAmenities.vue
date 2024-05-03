<template>
  <div>
    <div class="d-flex justify-content-between">
      <p>Amenities</p>
      <p
        v-if="false"
        class="a-form-action"
        @click="$refs['edit-amenities'].show()"
      >
        Edit selection
      </p>
    </div>
    <div v-if="false" class="a-form-container">
      <b-row>
        <b-col xl="6">
          <Amenity
            v-for="amenity in amenitiesA"
            :key="amenity.id"
            :img-path="amenity.imgPath"
            :amenity-name="amenity.amenityName"
          />
        </b-col>
        <b-col xl="6">
          <Amenity
            v-for="amenity in amenitiesB"
            :key="amenity.id"
            :img-path="amenity.imgPath"
            :amenity-name="amenity.amenityName"
          />
        </b-col>
      </b-row>
      <p
        class="mt-4 mb-n3 text-center a-form-action"
        @click="$refs['edit-amenities'].show()"
      >
        View more
      </p>
    </div>
    <div
      v-else
      class="a-form-container-empty"
      @click="$refs['edit-amenities'].show()"
    >
      <p style="color: #c221cf; text-decoration: underline; font-size: 1.3em">
        Click here to select amenities
      </p>
    </div>
    <b-modal ref="edit-amenities" hide-footer centered size="lg">
      <template #modal-header="{ close }">
        <div class="d-flex flex-lg-row flex-column align-items-center">
          <p class="ea-header">Check the Box to Add Amenities</p>
          <p class="ea-header-action">Select All</p>
        </div>
        <b-img
          style="cursor: pointer"
          :src="require('@/assets/icons/modal-close.svg')"
          @click="close()"
        />
      </template>
      <div class="ea-body px-lg-4 px-1">
        <b-row>
          <b-col xl="6">
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="washingMachine"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/washing-machine.svg')"
                amenity-name="Washing Machine"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="securityCamera"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/security-camera.svg')"
                amenity-name="Security Camera"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="kitchen"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/chef.svg')"
                amenity-name="Kitchen"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="diningSet"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/cutlery.svg')"
                amenity-name="Dining Set"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="dedicatedWorkspace"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/workspace.svg')"
                amenity-name="Dedicated Workspace"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="parking"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/parking.svg')"
                amenity-name="Free Street Parking"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="diningRoom"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/dining.svg')"
                amenity-name="Dining Room"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="swimmingPool"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/pool.svg')"
                amenity-name="Swimming Pool"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="fireExtinguisher"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/fire_extinguisher.svg')"
                amenity-name="Fire Extinguisher"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="elevator"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/elevator.svg')"
                amenity-name="Elevator"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="bluetooth"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/headset_mic.svg')"
                amenity-name="Bluetooth Sound System"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="smokeAlarm"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/smoke_free.svg')"
                amenity-name="Smoke Alarm"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="firstAid"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/first-aid.svg')"
                amenity-name="First Aid Kit"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="refrigerator"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/refrigeration.svg')"
                amenity-name="Refrigerator"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="toaster"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/toaster.svg')"
                amenity-name="Toaster"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="beachAccess"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/beach.svg')"
                amenity-name="Beach Access"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="toilet2"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/toilet.svg')"
                amenity-name="2 Toilets"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="bathroom1"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/bathroom.svg')"
                amenity-name="1 Bathroom"
              />
            </div>
          </b-col>
          <b-col xl="6">
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="homeGym"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/home-gym.svg')"
                amenity-name="Home Gym"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="walkIn"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/closet.svg')"
                amenity-name="Walk In Closet"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="homeTheatre"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/home-theatre.svg')"
                amenity-name="Home Theatre"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="cleaningProducts"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/cleaning-products.svg')"
                amenity-name="Cleaning Products"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="iron"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/iron.svg')"
                amenity-name="Iron"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="bedLinen"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/bed-linen.svg')"
                amenity-name="Bed Linen"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="television"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/tv.svg')"
                amenity-name="Television Set"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="airConditioning"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/ac.svg')"
                amenity-name="Air Conditioning"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="heating"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/heating.svg')"
                amenity-name="Heating"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="wifi"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/wifi.svg')"
                amenity-name="WiFi"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="carbonMonoAlarm"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/carbon-mono-alarm.svg')"
                amenity-name="Carbon Monoxide Alarm"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="microwave"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/microwave.svg')"
                amenity-name="Microwave"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="blender"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/blender.svg')"
                amenity-name="Blender"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="toilet1"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/toilet.svg')"
                amenity-name="1 Toilet"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="toilet3"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/toilet.svg')"
                amenity-name="3 Toilets"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="bathroom2"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/bathroom.svg')"
                amenity-name="2 Bathrooms"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="toilet4"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/toilet.svg')"
                amenity-name="4 Toilets"
              />
            </div>
            <div class="ea-body-amenity">
              <b-form-checkbox
                v-model="bathroom3"
                value="selected"
                unchecked-value="not_selected"
              />
              <Amenity
                style="margin-left: 1em; padding-top: 0.8em"
                :img-path="require('@/assets/icons/bathroom.svg')"
                amenity-name="3 Bathrooms"
              />
            </div>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Amenity from "@/views/Apartments/view-apartment/components/Amenity";

export default {
  components: {
    Amenity,
  },
  data() {
    return {
      amenitiesA: [
        {
          id: 1,
          amenityName: "Washing Machine",
          imgPath: require("@/assets/icons/washing-machine.svg"),
        },
        {
          id: 2,
          amenityName: "Security Camera",
          imgPath: require("@/assets/icons/security-camera.svg"),
        },
        {
          id: 3,
          amenityName: "Kitchen",
          imgPath: require("@/assets/icons/chef.svg"),
        },
      ],
      amenitiesB: [
        {
          id: 4,
          amenityName: "Dining Set",
          imgPath: require("@/assets/icons/cutlery.svg"),
        },
        {
          id: 5,
          amenityName: "Dedicated Workspace",
          imgPath: require("@/assets/icons/workspace.svg"),
        },
        {
          id: 6,
          amenityName: "Free Street Parking",
          imgPath: require("@/assets/icons/parking.svg"),
        },
      ],
      washingMachine: "un_selected",
      securityCamera: "un_selected",
      kitchen: "un_selected",
      diningSet: "un_selected",
      dedicatedWorkspace: "un_selected",
      parking: "un_selected",
      diningRoom: "un_selected",
      swimmingPool: "un_selected",
      fireExtinguisher: "un_selected",
      elevator: "un_selected",
      bluetooth: "un_selected",
      smokeAlarm: "un_selected",
      firstAid: "un_selected",
      refrigerator: "un_selected",
      toaster: "un_selected",
      beachAccess: "un_selected",
      toilet2: "un_selected",
      bathroom1: "un_selected",
      homeGym: "un_selected",
      walkIn: "un_selected",
      homeTheatre: "un_selected",
      cleaningProducts: "un_selected",
      iron: "un_selected",
      bedLinen: "un_selected",
      television: "un_selected",
      airConditioning: "un_selected",
      heating: "un_selected",
      wifi: "un_selected",
      carbonMonoAlarm: "un_selected",
      microwave: "un_selected",
      blender: "un_selected",
      toilet1: "un_selected",
      toilet3: "un_selected",
      bathroom2: "un_selected",
      toilet4: "un_selected",
      bathroom3: "un_selected",
    };
  },
};
</script>

<style>
.a-form-container {
  background-color: #f5f4ff;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 2em;
}
.a-form-container-empty {
  background-color: #f5f4ff;
  border: 1px dashed #c221cf;
  border-radius: 5px;
  padding-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.ea-header {
  font-family: "Circular Std", sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  padding-top: 0.6em;
  color: #3c4043;
}
.ea-header-action {
  font-family: "Circular Std Book", sans-serif;
  font-size: 1em;
  color: #c221cf;
  cursor: pointer;
  margin-left: 0.8em;
  padding-top: 1em;
}
.ea-body {
  font-family: "Circular Std Book", sans-serif;
}
.ea-body-amenity {
  display: flex;
  align-items: center;
}
</style>
