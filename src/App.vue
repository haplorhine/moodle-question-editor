<script setup>
import { ref, computed } from 'vue'
import { XMLParser } from 'fast-xml-parser'
import FileImport from './components/FileImport.vue'
import QuestionEditor from './components/QuestionEditor.vue'
import Searchbar from './components/Searchbar.vue'

const parsedXML = ref(null)
const filter = ref('')

// questions will be filled by computed after import of xml
const questions = computed(() =>
  parsedXML.value ? parsedXML.value.quiz.question.filter((q) => q['@_type'] !== 'category') : null,
)

const filteredQuestions = computed(() => {
  const list = questions.value ?? []
  const search = filter.value.trim().toLowerCase()
  if (!search) return list
  return list.filter(
    (q) =>
      q.name.text.toLowerCase().includes(search) ||
      q.questiontext.text.toLowerCase().includes(search),
  )
})

const parseFile = (text) => {
  // XMLParser options
  const options = {
    ignoreAttributes: false,
  }
  const parser = new XMLParser(options)

  const jsonObj = parser.parse(text)

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

console.log('ref', parsedXML)
console.log('questions', questions)
</script>

<template>
  <h1>Moodle Question Editor</h1>

  <FileImport @importClick="(file) => handleImport(file)" />
  <Searchbar v-model="filter" v-if="parsedXML" />

  <pre v-if="filteredQuestions.length">{{ JSON.stringify(filteredQuestions, null, 4) }}</pre>

  <QuestionEditor questions="{filteredQuestions}" />
</template>

<style scoped></style>
