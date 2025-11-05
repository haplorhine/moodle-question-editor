<script setup>
const searchTerm = defineModel()
</script>
<template>
  <div class="mt-3">
    <input v-model="searchTerm" type="text" id="searchTerm" name="searchTerm" class="form-control" placeholder="Search for Questions"/>
    <label hidden for="searchTerm">Search for Questions</label>
  </div>
</template>
<style scoped></style>
