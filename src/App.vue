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

const acceptedTypes = ['multichoice', 'oumultiresponse']

// questions will be updated by reactivity system after import of xml
const questions = computed(() => {
  if (parsedXML.value) {
    const allQuestions = parsedXML.value.quiz.question
    console.log('hallo', allQuestions)
    return allQuestions
  }
  return null
})

const editableQuestions = computed(() => {
  const isOfAcceptedType = (question) => acceptedTypes.some((type) => type === question['@_type'])
  if (questions.value === null) {
    return null
  }
  return questions.value.filter(isOfAcceptedType)
})

const filteredQuestions = computed(() => {
  const list = editableQuestions.value ?? []
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

  const alwaysArray = ['quiz.question.answer']

  const options = {
    cdataPropName: '__cdata',
    ignoreAttributes: false,
    // damit antworten immer in array umgewandelt werden
    isArray: (name, jpath, isLeafNode, isAttribute) => {
      if (alwaysArray.indexOf(jpath) !== -1) return true
    },
  }
  const parser = new XMLParser(options)

  const jsonObj = parser.parse(text)

  console.log(jsonObj)
  // uuid um vue ein key attribute zu geben bei iteration
  jsonObj.quiz.question = jsonObj.quiz.question.map((question) => {
    console.log(question['@_type'], 'question.answer content', question.answer)
    const answerWithID = question.answer?.map((answer) => ({
      ...answer,
      uuid: crypto.randomUUID(),
    }))
    return {
      ...question,
      uuid: crypto.randomUUID(),
      answer: answerWithID,
    }
  })
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
  <h1 class="display-1 d-flex justify-content-center bg-primary text-white pb-3 fw-bold">
    Moodle Question Editor
  </h1>

  <div class="d-flex justify-content-center" v-if="!parsedXML">
    <FileImport @importClick="(file) => handleImport(file)" />
  </div>

  <div class="container">
    <Searchbar v-model="filter" v-if="parsedXML" />
    <Searchterm :filteredQuestions="filteredQuestions" :filter="filter" :parsedXML="parsedXML" />
  </div>

  <div class="container mt-3 border bg-secondary-subtle rounded p-2" v-if="parsedXML">
    <div class="mb-5">
      <QuestionList v-if="filteredQuestions.length" :questions="filteredQuestions" />
    </div>

    <div class="fixed-bottom container py-2 mt-3 justify-content-end d-flex">
      <button
        class="btn btn-success me-3"
        v-if="parsedXML"
        @click="exportXML(parsedXML)"
        data-bs-toggle="modal"
        data-bs-target="#downloadmodal"
      >
        Export
      </button>
      <a
        :href="builtXmlURL"
        download="questions.xml"
        v-if="parsedXML && builtXmlURL"
        class="btn btn-success"
        >Download XML</a
      >
    </div>
  </div>
</template>

<style scoped></style>
