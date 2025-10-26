<script setup>
import { ref } from 'vue'
import { XMLParser } from 'fast-xml-parser'
import FileImport from './components/FileImport.vue'
import QuestionEditor from './components/QuestionEditor.vue'
import Searchbar from './components/Searchbar.vue'

const parsedXML = ref(null)
const filter = ref('')

const parseFile = (text) => {
  // XMLParser options
  const options = {
    ignoreAttributes: false,
  }
  const parser = new XMLParser(options)

  const jsonObj = parser.parse(text)
  // debugger;

  // uuid um vue ein key attribute zu geben bei iteration
  jsonObj.quiz.question = jsonObj.quiz.question.map((question) => ({
    ...question,
    uuid: crypto.randomUUID(),
    answer: question.answer?.map((answer) => ({
      ...answer,
      uuid: crypto.randomUUID(),
    })),
  }))
  parsedXML.value = jsonObj
}

const handleImport = (file) => {
  if (!file) {
    return
  }

  file.text().then((text) => parseFile(text))
}
</script>

<template>
  <h1>Moodle Question Editor</h1>

  <FileImport @importClick="(file) => handleImport(file)" />
  <Searchbar v-if="parsedXML" />

  <!-- <p v-for="question of parsedXML.data"><pre>{{ JSON.stringify(question) }}</pre></p> -->
  <pre v-if="parsedXML">{{ JSON.stringify(parsedXML.quiz.question, null, 4) }}</pre>

  <QuestionEditor questions="{filteredQuestions}" />
</template>

<style scoped></style>
