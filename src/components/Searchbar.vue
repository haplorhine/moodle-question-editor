<script setup>
const searchTerm = defineModel()
</script>
<template>
  <div>
    <label for="searchTerm">Filter Questions:</label>
    <input v-model="searchTerm" type="text" id="searchTerm" name="searchTerm" />
  </div>
</template>
<style scoped></style>
