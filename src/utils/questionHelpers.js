/**
 * Creates a new question template with default values
 * @returns {Object} A new question object with UUID
 */
export const createNewQuestionTemplate = () => {
  return {
    '@_type': 'multichoice',
    name: {
      text: 'New Question',
    },
    questiontext: {
      text: {
        __cdata: '<p>Enter your question text here...</p>',
      },
    },
    defaultgrade: '1',
    penalty: '0.1',
    single: 'true',
    shuffleanswers: 'true',
    answer: [
      {
        text: 'Answer option 1',
        '@_fraction': '100',
        feedback: {
          text: 'Correct!',
        },
        uuid: crypto.randomUUID(),
      },
      {
        text: 'Answer option 2',
        '@_fraction': '0',
        feedback: {
          text: 'Incorrect.',
        },
        uuid: crypto.randomUUID(),
      },
    ],
    uuid: crypto.randomUUID(),
  }
}

/**
 * Creates a new answer template with default values
 * @returns {Object} A new answer object with UUID
 */
export const createNewAnswerTemplate = () => {
  return {
    text: 'New answer option',
    '@_fraction': '0',
    feedback: {
      text: 'Feedback for this answer',
    },
    uuid: crypto.randomUUID(),
  }
}