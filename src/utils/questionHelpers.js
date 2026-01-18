/**
 * Creates a new question template with default values
 * @returns {Object} A new question object with UUID
 */
export const createNewQuestionTemplate = (type = 'multichoice') => {
  const base = {
    '@_type': type,
    name: { text: 'New Question' },
    // Moodle exportiert questiontext oft mit format="html"
    questiontext: {
      '@_format': 'html',
      text: { __cdata: '<p>Enter your question text here...</p>' },
    },
    uuid: crypto.randomUUID(), // nur für Vue-Key (später beim Export entfernen!)
  }

  // ----------------------------
  // CodeRunner (Moodle-kompatibel, "voll")
  // ----------------------------
  if (type === 'coderunner') {
    return {
      ...base,

      // Moodle-typische Standardfelder
      generalfeedback: {
        '@_format': 'html',
        text: { __cdata: '<p></p>' },
      },
      defaultgrade: '1',
      penalty: '0',
      hidden: '0',
      idnumber: '',

      // CodeRunner Kern
      coderunnertype: 'cpp_program',
      prototypetype: '0',
      allornothing: '0',
      penaltyregime: '10, 20, ...',
      precheck: '0',
      hidecheck: '0',
      showsource: '0',

      // UI/Editor Defaults (wie Moodle oft exportiert)
      answerboxlines: '18',
      answerboxcolumns: '100',
      answerpreload: '',

      globalextra: '',
      useace: '',
      resultcolumns: '',

      template: '',                // <- dein Startercode
      iscombinatortemplate: '',
      allowmultiplestdins: '',

      // answer wird bei CodeRunner oft als leeres Element mit-exportiert
      answer: '',

      validateonsave: '1',
      testsplitterre: '',

      language: '',
      acelang: '',
      sandbox: '',
      grader: '',
      cputimelimitsecs: '',
      memlimitmb: '',
      sandboxparams: '',

      templateparams: '',
      hoisttemplateparams: '1',
      extractcodefromjson: '1',
      templateparamslang: 'None',
      templateparamsevalpertry: '0',
      templateparamsevald: '{}',
      twigall: '0',
      uiplugin: '',
      uiparameters: '',

      attachments: '0',
      attachmentsrequired: '0',
      maxfilesize: '10240',
      filenamesregex: '',
      filenamesexplain: '',
      displayfeedback: '1',
      giveupallowed: '2',
      prototypeextra: '',

      // WICHTIG: testcases/testcase + stdin/expected immer mit <text>
      testcases: {
        testcase: [
          {
            '@_testtype': '0',
            '@_useasexample': '0',
            '@_hiderestiffail': '0',
            '@_mark': '1.0000000',
            testcode: { text: '' },
            stdin: { text: '' },
            expected: { text: '' },
            extra: { text: '' },
            display: { text: 'SHOW' },
          },
        ],
      },
    }
  }

  // ----------------------------
  // Default: MultiChoice (wie bisher)
  // ----------------------------
  return {
    ...base,
    defaultgrade: '1',
    penalty: '0.1',
    single: type === 'multichoice' ? 'true' : 'false',
    shuffleanswers: 'true',
    answer: [
      {
        text: 'Answer option 1',
        '@_fraction': '100',
        feedback: { text: 'Correct!' },
        uuid: crypto.randomUUID(),
      },
      {
        text: 'Answer option 2',
        '@_fraction': '0',
        feedback: { text: 'Incorrect.' },
        uuid: crypto.randomUUID(),
      },
    ],
  }
}
