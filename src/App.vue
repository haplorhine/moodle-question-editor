<script setup>
import FileImport from './components/FileImport.vue'
import HelloWorld from './components/HelloWorld.vue'
import QuestionEditor from './components/QuestionEditor.vue'
import Searchbar from './components/Searchbar.vue'

const data = true
</script>

<template>
  <h1>Moodle Question Editor</h1>

  <FileImport />
  <Searchbar v-if="data" />

  <QuestionEditor questions="{filteredQuestions}" />
</template>

<style scoped></style>
