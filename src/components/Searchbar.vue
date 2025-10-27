<script setup>
const searchTerm = defineModel()
</script>
<template>
  <div>
    <label for="searchTerm">Search Question:</label>
    <input v-model="searchTerm" type="text" id="searchTerm" name="searchTerm" />
    <span v-if="searchTerm">Questions containing: {{ searchTerm }}</span>
    <span v-else>All questions</span>
  </div>
</template>
<style scoped></style>
