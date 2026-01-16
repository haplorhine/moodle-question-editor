<script setup>
const searchTerm = defineModel()
</script>
<template>
  <div class="mt-2">
    <input v-model="searchTerm" type="text" id="searchTerm" name="searchTerm" class="form-control" placeholder="Search for Questions" style="height: 58px"/>
    <label hidden for="searchTerm">Search for Questions</label>
  </div>
</template>
<style scoped></style>
