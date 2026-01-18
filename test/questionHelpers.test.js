import { describe, it, expect } from 'vitest'
import { createNewQuestionTemplate } from '../src/utils/questionHelpers'

describe('questionHelpers', () => {
  describe('createNewQuestionTemplate', () => {
    it('creates a question with correct structure', () => {
      const question = createNewQuestionTemplate()

      expect(question).toHaveProperty('@_type', 'multichoice')
      expect(question).toHaveProperty('name')
      expect(question.name).toHaveProperty('text', 'New Question')
      expect(question).toHaveProperty('questiontext')
      expect(question).toHaveProperty('defaultgrade', '1')
      expect(question).toHaveProperty('penalty', '0.1')
      expect(question).toHaveProperty('single', 'true')
      expect(question).toHaveProperty('shuffleanswers', 'true')
      expect(question).toHaveProperty('uuid')
    })

    it('creates a question with default answers', () => {
      const question = createNewQuestionTemplate()

      expect(question.answer).toHaveLength(2)
      expect(question.answer[0]).toHaveProperty('text', 'Answer option 1')
      expect(question.answer[0]).toHaveProperty('@_fraction', '100')
      expect(question.answer[0]).toHaveProperty('uuid')
      expect(question.answer[1]).toHaveProperty('@_fraction', '0')
    })

    it('creates unique UUIDs', () => {
      const question1 = createNewQuestionTemplate()
      const question2 = createNewQuestionTemplate()

      expect(question1.uuid).not.toBe(question2.uuid)
    })
  })

  // createNewAnswerTemplate tests removed because the function does not exist in questionHelpers.js
})
