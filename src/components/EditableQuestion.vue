<script setup>
import TextEditor from './TextEditor.vue'

defineProps(['question'])
</script>

<template>
  <div class="questionEditing">
    <p>Name:</p>
    <TextEditor v-model:html="question.name.text" />
    <p>Text:</p>
    <TextEditor v-model:html="question.questiontext.text" />
  </div>
</template>

<style scoped>
.questionEditing {
  border: 2px solid red;
  padding: 1em;
  margin: 1em;
}
</style>
