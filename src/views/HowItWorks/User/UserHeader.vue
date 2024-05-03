<template>
  <div id="hiw-user-header">
    <b-container>
      <p class="hiw-title">
        How It Works For <span class="hiw-type">Users</span>
      </p>
      <b-img
        fluid
        class="mt-2"
        :src="require('@/assets/images/hiw-user.svg')"
      />
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
#hiw-user-header {
  background-color: #f4f7fe;
  padding-top: 4em;
  padding-bottom: 4em;
}
.hiw-title {
  font-size: 2.25em;
  color: #3c4043;
}
.hiw-type {
  color: #c221cf;
}
</style>
