<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import TextEditor from './TextEditor.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const addAnswer = () => {
  if (!props.question.answer) {
    props.question.answer = [];
  }
  props.question.answer.push({
    text: '',
    '@_fraction': '100',
    feedback: {
      text: ''
    }
  });
};
const removeAnswer = (question, index) => {
  question.answer.splice(index, 1);
};
</script>

<template>
  <div>
    <!-- äußere Card -->
    <div class="card mb-4 shadow-sm">

      <!-- HEADER: toggelt die Frage ein/aus -->
      <div
        class="card-header bg-primary text-white fw-bold"
        data-bs-toggle="collapse"
        :data-bs-target="`#question-collapse-${question.uuid}`"
        :aria-controls="`question-collapse-${question.uuid}`"
        aria-expanded="false"
        style="cursor: pointer"
      >
        <div class="row">
          <div class="col">
            {{ question.name.text }}
          </div>
          <div class="col text-end">
            {{ question['@_type'] }}
          </div>
        </div>
      </div>

      <!-- Collapse-Wrapper um den Body: am Anfang ZU -->
      <div
        :id="`question-collapse-${question.uuid}`"
        class="collapse"
      >
        <div class="card-body">
          <!-- Titel -->
          <div class="mb-3 form-floating">
            <input type="text" class="form-control" v-model="question.name.text" />
            <label class="form-label">Titel</label>
          </div>

          <!-- Fragetext -->
          <div class="mb-3">
            <label class="form-label" hidden>Fragetext</label>
            <TextEditor
              v-model="question.questiontext.text['__cdata']"
              placeholder="Hier den Fragetext eingeben…"
            />
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
          <div class="accordion mb-4" :id="`answersAccordion-${question.uuid}`">
            <div
              class="accordion-item bg-light"
              v-for="(ans, i) in question.answer"
              :key="i"
            >
              <h2 class="accordion-header" :id="`answer-heading-${question.uuid}-${i}`">
                <div class="d-flex align-items-center gap-2">
                  <button
                    class="accordion-button flex-grow-1 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#answer-collapse-${question.uuid}-${i}`"
                    :aria-controls="`answer-collapse-${question.uuid}-${i}`"
                    aria-expanded="false"
                  >
                    {{ ans.text }}
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm me-3"
                    @click.stop="removeAnswer(question, i)"
                  >
                    Entfernen
                  </button>
                </div>
              </h2>

              <div
                :id="`answer-collapse-${question.uuid}-${i}`"
                class="accordion-collapse collapse"
                :aria-labelledby="`answer-heading-${question.uuid}-${i}`"
              >
                <div class="accordion-body">
                  <div class="mb-3 form-floating">
                    <input type="text" class="form-control" v-model="ans.text" />
                    <label class="form-label">Antworttext</label>
                  </div>

                  <div class="mb-3 form-floating">
                    <input
                      type="number"
                      class="form-control"
                      v-model="ans['@_fraction']"
                      min="-100"
                      max="100"
                    />
                    <label class="form-label">Bewertung</label>
                  </div>

                  <div class="mb-3">
                    <div class="card">
                      <div class="card-header">
                        Antwort-Feedback
                      </div>
                      <div class="card-body p-0 border border-0">
                        <TextEditor v-model="ans.feedback.text" placeholder="Feedback" />
                      </div>
                    </div>
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
  </div>
</template>

