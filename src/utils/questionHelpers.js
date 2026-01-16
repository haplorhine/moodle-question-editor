export const createNewQuestionTemplate = (type = 'multichoice') => {
  const base = {
    '@_type': type,
    name: {
      text: 'New Question',
    },
    questiontext: {
      text: {
        __cdata: '<p>Enter your question text here...</p>',
      },
    },
    uuid: crypto.randomUUID(),
  }

  // ----------------------------
  // CodeRunner (lightweight)
  // ----------------------------
  if (type === 'coderunner') {
    return {
      ...base,
      coderunnertype: 'cpp_program', // Default, kannst du im UI ändern
      template: '',                  // Startercode
      testcases: {
        testcase: [
          {
            '@_mark': '1.0000000',
            '@_useasexample': '0',
            stdin: '',
            expected: '',
          },
        ],
      },
    }
  }

  // ----------------------------
  // Default: MultiChoice
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
