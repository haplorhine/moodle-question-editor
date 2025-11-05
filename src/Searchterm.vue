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
  </div>
</template>
