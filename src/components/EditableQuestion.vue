<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import TextEditor from './TextEditor.vue'
import { computed } from 'vue';

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
    '@_fraction': '0',
    feedback: {
      text: ''
    }
  });
};

const removeAnswer = (question, index) => {
  question.answer.splice(index, 1);
};

const questionType = (type) => {
  switch (type) {
    case 'multichoice':
      return 'Multiple Choice';
    case 'oumultiresponse':
      return 'Multiple Choice';
    case 'coderunner':
      return 'Coderunner';
    default:
      return 'Unknown Type';
  }
};

function asArray(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

/**
 * v-model Bridge für Moodle-XML Textfelder (CDATA/Non-CDATA tolerant).
 * Unterstützt string | {text:string} | {text:{__cdata}} | {__cdata} | {"#text"}.
 * Schreibt möglichst in der vorhandenen Form zurück (bewahrt CDATA-Stil).
 */
function moodleTextModel(rootObj, path) {
  const keys = Array.isArray(path) ? path : String(path).split(".");

  function getTarget(create = true) {
    let cur = rootObj;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (cur[k] == null) {
        if (!create) return { parent: null, key: null };
        cur[k] = {};
      }
      if (typeof cur[k] !== "object") {
        if (!create) return { parent: null, key: null };
        cur[k] = {};
      }
      cur = cur[k];
    }
    return { parent: cur, key: keys[keys.length - 1] };
  }

  function readVal(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;

    if (typeof v.text === "string") return v.text;

    if (v.text && typeof v.text === "object") {
      return v.text.__cdata ?? v.text["#text"] ?? "";
    }

    return v.__cdata ?? v["#text"] ?? "";
  }

  function writeVal(parent, key, val) {
    const cur = parent[key];

    // Bewahre vorhandene Struktur (CDATA/Non-CDATA) wenn möglich
    if (cur && typeof cur === "object") {
      if (cur.text && typeof cur.text === "object") {
        if ("__cdata" in cur.text) {
          cur.text.__cdata = val;
          return;
        }
        if ("#text" in cur.text) {
          cur.text["#text"] = val;
          return;
        }
      }
      if ("__cdata" in cur) {
        cur.__cdata = val;
        return;
      }
      if ("#text" in cur) {
        cur["#text"] = val;
        return;
      }
      if (typeof cur.text === "string") {
        cur.text = val;
        return;
      }
    }

    // Default: leichtgewichtig als String
    parent[key] = val;
  }

  return computed({
    get() {
      const { parent, key } = getTarget(false);
      if (!parent) return "";
      return readVal(parent[key]);
    },
    set(val) {
      const { parent, key } = getTarget(true);
      writeVal(parent, key, val);
    },
  });
}

function ensureCoderunnerTestcases(question) {
  if (!question.testcases) question.testcases = {};
  const raw = question.testcases.testcase;
  question.testcases.testcase = asArray(raw);

  // Normalize relevante Felder (nur die, die wir im Lightweight-UI editieren)
  question.testcases.testcase.forEach(tc => {
    if (tc["@_mark"] == null) tc["@_mark"] = "1.0000000";
    if (tc["@_useasexample"] == null) tc["@_useasexample"] = "0";
    if (tc.stdin == null) tc.stdin = "";
    if (tc.expected == null) tc.expected = "";
  });
}

function addTestcase(question) {
  ensureCoderunnerTestcases(question);
  question.testcases.testcase.push({
    "@_mark": "1.0000000",
    "@_useasexample": "0",
    stdin: "",
    expected: "",
  });
}

function removeTestcase(question, index) {
  ensureCoderunnerTestcases(question);
  question.testcases.testcase.splice(index, 1);
}

const stripCDataWrapper = (s) => {
  if (typeof s !== 'string') return s
  const t = s.trim()
  if (t.startsWith('<![CDATA[') && t.endsWith(']]>')) {
    return t.slice(9, -3) // Inhalt zwischen <![CDATA[  und ]]>
  }
  return s
}

const readText = (v) => {
  if (v == null) return ''

  // falls es als roher String mit <![CDATA[...]]> kommt
  if (typeof v === 'string') return stripCDataWrapper(v)

  if (typeof v.__cdata === 'string') return v.__cdata
  if (typeof v['#text'] === 'string') return stripCDataWrapper(v['#text'])

  if (typeof v.text === 'string') return stripCDataWrapper(v.text)

  if (v.text && typeof v.text === 'object') {
    const inner = v.text.__cdata ?? v.text['#text'] ?? ''
    return stripCDataWrapper(inner)
  }

  return ''
}


</script>

<template>
  <div>
    <!-- äußere Card -->
    <div class="card mb-4 shadow-sm">

      <!-- HEADER: toggelt die Frage ein/aus -->
      <div class="card-header bg-primary text-white fw-bold" data-bs-toggle="collapse"
        :data-bs-target="`#question-collapse-${question.uuid}`" :aria-controls="`question-collapse-${question.uuid}`"
        aria-expanded="false" style="cursor: pointer">
        <div class="row">
          <div class="col">
            {{ question.name.text }}
          </div>
          <div class="col text-end">
            {{ questionType(question['@_type']) }}
          </div>
        </div>
      </div>


      <!-- Collapse-Wrapper um den Body: am Anfang ZU -->
      <div :id="`question-collapse-${question.uuid}`" class="collapse">
        <div class="card-body">
          <!-- Titel -->
          <div class="mb-3 form-floating">
            <input type="text" class="form-control" v-model="question.name.text" />
            <label class="form-label">Title</label>
          </div>

          <!-- Fragetext -->
          <div class="mb-3">
            <label class="form-label" hidden>Question Text</label>
            <TextEditor v-model="question.questiontext.text['__cdata']" placeholder="Enter question text here…" />
          </div>
          <!-- Multiple Choice spezifische Felder -->
          <div v-if="question['@_type'] == 'multichoice' || question['@_type'] == 'oumultiresponse'">
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
              <div class="accordion-item mb-3 bg-light" v-for="(ans, i) in question.answer" :key="i">
                <h2 class="accordion-header" :id="`answer-heading-${question.uuid}-${i}`">
                  <div class="d-flex align-items-center gap-2">
                    <button class="accordion-button flex-grow-1 collapsed" type="button" data-bs-toggle="collapse"
                      :data-bs-target="`#answer-collapse-${question.uuid}-${i}`"
                      :aria-controls="`answer-collapse-${question.uuid}-${i}`" aria-expanded="false">
                      {{ ans.text }}
                    </button>

                    <button type="button" class="btn btn-outline-danger btn-sm me-3"
                      @click.stop="removeAnswer(question, i)">
                      Remove
                    </button>
                  </div>
                </h2>

                <div :id="`answer-collapse-${question.uuid}-${i}`" class="accordion-collapse collapse"
                  :aria-labelledby="`answer-heading-${question.uuid}-${i}`">
                  <div class="accordion-body">
                    <div class="mb-3 form-floating">
                      <input type="text" class="form-control" :value="readText(ans.text)"
                        @input="ans.text = $event.target.value" />
                      <label class="form-label">Answer Text</label>
                    </div>

                    <div class="mb-3 form-floating">
                      <input type="number" class="form-control" v-model="ans['@_fraction']" min="-100" max="100" />
                      <label class="form-label">Grade</label>
                    </div>

                    <div class="mb-3">
                      <div class="card">
                        <div class="card-header">
                          Antwort-Feedback
                        </div>
                        <div class="card-body p-0 border border-0">
                          <TextEditor :modelValue="readText(ans.feedback?.text)"
                            @update:modelValue="(v) => { if (!ans.feedback) ans.feedback = {}; ans.feedback.text = v }"
                            placeholder="Feedback" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" class="btn btn-success btn-sm" @click="addAnswer">
              + Add answer
            </button>
          </div>

          <!--Coderunner spezifische Felder -->
          <div v-if="props.question['@_type'] === 'coderunner'">

            <!-- CodeRunner Type -->
            <div class="mb-3 form-floating">
              <select class="form-select" v-model="props.question.coderunnertype">
                <option value="">– please select –</option>

                <!-- C / C++ -->
                <option value="c_program">C</option>
                <option value="cpp_program">C++</option>

                <!-- Python -->
                <option value="python3">Python 3</option>

                <!-- Java -->
                <option value="java_program">Java</option>

                <!-- SQL -->
                <option value="mysql">SQL (MySQL)</option>

                <!-- Sonstige (häufig) -->
                <option value="bash">Bash</option>
                <option value="matlab">Matlab</option>
              </select>
              <label class="form-label">CodeRunner Type</label>
            </div>

            <!-- Startercode: TEMPLATE -->
            <div class="mb-3">
              <div class="card">
                <div class="card-header">Startercode (template)</div>
                <div class="card-body p-0 border border-0">
                  <textarea class="form-control border-0" rows="10" :value="moodleTextModel(question, 'template').value"
                    @input="moodleTextModel(question, 'template').value = $event.target.value"
                    placeholder="Startercode"></textarea>
                </div>
              </div>
            </div>

            <hr />

            <!-- Testcases -->
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="fw-semibold">Testcases</div>
              <button type="button" class="btn btn-success btn-sm" @click="addTestcase(props.question)">
                + Testcase
              </button>
            </div>

            <div class="accordion mb-3" :id="`testcasesAccordion-${props.question.uuid}`"
              v-if="(ensureCoderunnerTestcases(props.question), true)">
              <div class="accordion-item mb-2 bg-light" v-for="(tc, i) in props.question.testcases.testcase" :key="i">
                <h2 class="accordion-header" :id="`tc-heading-${props.question.uuid}-${i}`">
                  <div class="d-flex align-items-center gap-2">
                    <button class="accordion-button flex-grow-1 collapsed" type="button" data-bs-toggle="collapse"
                      :data-bs-target="`#tc-collapse-${props.question.uuid}-${i}`"
                      :aria-controls="`tc-collapse-${props.question.uuid}-${i}`" aria-expanded="false">
                      Testcase {{ i + 1 }} — Mark: {{ tc['@_mark'] }}
                    </button>

                    <button type="button" class="btn btn-outline-danger btn-sm me-3"
                      @click.stop="removeTestcase(props.question, i)">
                      Remove
                    </button>
                  </div>
                </h2>

                <div :id="`tc-collapse-${props.question.uuid}-${i}`" class="accordion-collapse collapse"
                  :aria-labelledby="`tc-heading-${props.question.uuid}-${i}`">
                  <div class="accordion-body">

                    <div class="row">
                      <div class="col-md-4">
                        <div class="mb-3 form-floating">
                          <input type="number" step="0.0000001" class="form-control" v-model="tc['@_mark']" />
                          <label class="form-label">Mark</label>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="mb-3 form-floating">
                          <select class="form-select" v-model="tc['@_useasexample']">
                            <option value="1">1</option>
                            <option value="0">0</option>
                          </select>
                          <label class="form-label">Use as example</label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <div class="card">
                            <div class="card-header">stdin</div>
                            <div class="card-body p-0 border border-0">
                              <textarea class="form-control border-0" rows="6"
                                :value="moodleTextModel(tc, 'stdin').value"
                                @input="moodleTextModel(tc, 'stdin').value = $event.target.value"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="mb-3">
                          <div class="card">
                            <div class="card-header">expected</div>
                            <div class="card-body p-0 border border-0">
                              <textarea class="form-control border-0" rows="6"
                                :value="moodleTextModel(tc, 'expected').value"
                                @input="moodleTextModel(tc, 'expected').value = $event.target.value"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>
      </div>

    </div>
  </div>
</template>
