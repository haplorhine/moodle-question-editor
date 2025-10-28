<script setup>
import TextEditor from './TextEditor.vue'

defineProps(['question'])
</script>

<template>
  <div class="questionEditing">
    <p>Name:</p>
    <input type="text" v-model="question.name.text" width="1000" />
    <p>Text:</p>
    <TextEditor v-model:html="question.questiontext.text.__cdata" />
  </div>
</template>

<style scoped>
.questionEditing {
  border: 2px solid red;
  padding: 1em;
  margin: 1em;
}
.questionEditing input {
  width: 500px;
}
</style>
