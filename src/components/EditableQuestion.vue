<script setup>
defineProps(['question'])
</script>
<template>
  <pre>{{ JSON.stringify(question, null, 4) }}</pre>
</template>
<style scoped>
pre {
  border: 5px solid red;
}
</style>
