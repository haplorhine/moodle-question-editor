<script setup>
import { Text } from 'vue';
import TextEditor from './TextEditor.vue'

defineProps(['question'])
</script>

<template>
  <div>
    <!-- äußere Card -->
    <div class="card mb-4 shadow-sm">
      <div class="card-header bg-primary text-white fw-bold">
        <div class="row">
          <div class="col">
            {{ question.name.text }}
          </div>
          <div class="col text-end">
            {{ question['@_type'] }}
          </div>
        </div>
      </div>

      <div class="card-body">
        <!-- Titel -->
        <div class="mb-3 form-floating">
          <input type="text" class="form-control" v-model="question.name.text" />
          <label class="form-label">Titel</label>
        </div>

        <!-- Fragetext -->
        <div class="mb-3">
          <label class="form-label" hidden>Fragetext</label>
          <TextEditor v-model="question.questiontext.text['__cdata']" placeholder="Hier den Fragetext eingeben…" />
        </div>

        <!-- Default grade / Penalty / Single / Shuffle -->
        <div class="row">
          <div class="col-md-3">
            <div class="mb-3 form-floating">
              <input type="number" class="form-control" v-model="question.defaultgrade" />
              <label class="form-label">Default Grade</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3 form-floating">
              <input type="number" class="form-control" v-model="question.penalty" />
              <label class="form-label">Penalty</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3 form-floating">
              <select class="form-select" v-model="question.single">
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <label class="form-label">Single Choice</label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3 form-floating">
              <select class="form-select" v-model="question.shuffleanswers">
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <label class="form-label">Shuffle Answers</label>
            </div>
          </div>
        </div>

        <hr />

        <!-- Antworten -->
        <div v-for="(ans, i) in question.answer" :key="i"
          class="card mb-3 border-0 border-start border-4 border-info bg-light">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-semibold">Antwort {{ i + 1 }}</span>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeAnswer(i)">
                Entfernen
              </button>
            </div>

            <div class="mb-3 form-floating">
              <input type="text" class="form-control" v-model="ans.text" />
              <label class="form-label">Antworttext</label>
            </div>

            <div class="mb-3 form-floating">
              <input type="number" class="form-control" v-model="ans['@_fraction']" min="-100" max="100" />
              <label class="form-label">Bewertung</label>
            </div>

            <div class="mb-3">
              <div class="card">
                <div class="card-header">
                  Antwort-Feedback
                </div>
                <div class="card-body p-0 border border-0">
                  <TextEditor v-model="ans.feedback.text" placeholder="Feedback"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-success btn-sm" @click="addAnswer">
            + Antwort hinzufügen
          </button>
      </div>
    </div>
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
