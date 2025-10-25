<script setup>
import { ref } from 'vue'
const searchTerm = ref('')
</script>
<template>
  <label for="searchTerm">Search Question:</label>
  <input v-model="searchTerm" type="text" id="searchTerm" name="searchTerm" />
  <span v-if="searchTerm">Questions containing: {{ searchTerm }}</span>
  <span v-else>All questions</span>
</template>
<style scoped></style>
