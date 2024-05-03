<template>
  <div id="review">
    <div class="d-flex justify-content-between">
      <p style="color: #3c4043">
        {{ review.user.full_name }}
      </p>
      <p style="color: #3c4043; opacity: 0.5">
        {{ review.created_at | moment("dddd, MMMM Do YYYY") }}
      </p>
    </div>
    <p style="color: #3c4043; font-size: 0.8em; opacity: 0.8">
      {{ review.comment }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["review"],
};
</script>

<style>
#review {
  margin-top: 1em;
  border-radius: 10px;
  background-color: #f9f9fd;
  padding: 1em 2em 2em 2em;
}
#helpful {
  float: right;
  font-size: 0.8em;
  opacity: 0.5;
}
#helpful:hover {
  cursor: pointer;
}
</style>
