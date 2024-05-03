<template>
  <div>
    <b-form-group>
      <date-picker
        v-model="date"
        valueType="format"
        placeholder="Select Date"
        @input="selectDate"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: null,
    };
  },
  methods: {
    selectDate() {
      this.$store.dispatch("filter/updateDate", { date: this.date });
      this.$emit("selectedDate");
    },
  },
};
</script>

<style>
.mx-datepicker {
  width: 100%;
}
.mx-input-wrapper {
  height: 3.125em;
}
.mx-input {
  height: 100%;
  box-shadow: none;
  font-size: 1rem;
  letter-spacing: -1px;
}
.mx-input:hover,
.mx-input:focus {
  border-color: #c221cf;
}
.mx-calendar-content .cell.active {
  background-color: #c221cf;
}
.mx-calendar-content .cell:hover {
  background-color: #f5d0f8;
}
.mx-table-date .today {
  color: #c221cf;
}
</style>
