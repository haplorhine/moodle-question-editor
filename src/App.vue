<script setup>
import { ref, computed } from 'vue'
import { XMLParser } from 'fast-xml-parser'
import { XMLBuilder } from 'fast-xml-parser'
import FileImport from './components/FileImport.vue'
import QuestionList from './components/QuestionList.vue'
import Searchbar from './components/Searchbar.vue'
import Searchterm from './Searchterm.vue'

const parsedXML = ref(null)
const builtXmlURL = ref(null)
const filter = ref('')

// questions will be updated by reactivity system after import of xml
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
      q.questiontext.text.__cdata.toLowerCase().includes(search),
  )
})

const parseFile = (text) => {
  // XMLParser options
  const options = {
    cdataPropName: '__cdata',
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

const exportXML = (jObj) => {
  console.log(jObj)

  const options = {
    attributeNamePrefix: '@_',
    cdataPropName: '__cdata',
    ignoreAttributes: false,
    format: true,
  }

  const builder = new XMLBuilder(options)
  const xmlContent = builder.build(jObj)
  const blob = new Blob([xmlContent], { type: 'application/xml' })
  builtXmlURL.value = URL.createObjectURL(blob)
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

  <Searchterm :filteredQuestions="filteredQuestions" :filter="filter" :parsedXML="parsedXML" />

  <QuestionList v-if="filteredQuestions.length" :questions="filteredQuestions" />

  <button v-if="parsedXML" @click="exportXML(parsedXML)">Export</button>
  <a v-if="parsedXML && builtXmlURL" :href="builtXmlURL" download="questions.xml">Download XML</a>
</template>

<style scoped></style>
