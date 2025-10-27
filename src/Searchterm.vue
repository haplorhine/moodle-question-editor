<script setup>
const { filteredQuestions, filter, parsedXML } = defineProps({
  filteredQuestions: Array,
  filter: String,
  parsedXML: Object,
})
</script>

<template>
  <div>
    <p v-if="filter && parsedXML && filteredQuestions.length == 0">
      No questions contain: {{ filter }}
    </p>
    <p v-else-if="filter && parsedXML">Questions containing: {{ filter }}</p>
    <p v-else-if="parsedXML">All questions</p>
  </div>
</template>
