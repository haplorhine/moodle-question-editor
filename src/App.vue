<script setup>
import { ref } from 'vue'
import FileImport from './components/FileImport.vue'
import HelloWorld from './components/HelloWorld.vue'
import QuestionEditor from './components/QuestionEditor.vue'
import Searchbar from './components/Searchbar.vue'

const parsedXML = ref(null)
const filter = ref('')

console.log(parsedXML.value)

const handleImport = (file) => console.log('handle file: ', file.value)
</script>

<template>
  <h1>Moodle Question Editor</h1>

  <FileImport @response="(file) => handleImport(file)" />
  <Searchbar v-if="parsedXML" />

  <QuestionEditor questions="{filteredQuestions}" />
</template>

<style scoped></style>
