<script setup>
import { ref } from 'vue'
import FileImport from './components/FileImport.vue'
import HelloWorld from './components/HelloWorld.vue'
import QuestionEditor from './components/QuestionEditor.vue'
import Searchbar from './components/Searchbar.vue'

const parsedXML = ref(null)
const filter = ref('')

const handleImport = (file) => {
  if (!file) {
    return
  }

  console.log('handle file: ', file)
}
</script>

<template>
  <h1>Moodle Question Editor</h1>

  <FileImport @importClick="(file) => handleImport(file)" />
  <Searchbar v-if="parsedXML" />

  <QuestionEditor questions="{filteredQuestions}" />
</template>

<style scoped></style>
