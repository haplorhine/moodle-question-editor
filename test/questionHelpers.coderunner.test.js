import { describe, it, expect } from 'vitest'
import { createNewQuestionTemplate } from '../src/utils/questionHelpers'

describe('questionHelpers - CodeRunner', () => {
  describe('createNewQuestionTemplate with type coderunner', () => {
    it('creates a coderunner question with correct structure', () => {
      const question = createNewQuestionTemplate('coderunner')

      expect(question).toHaveProperty('@_type', 'coderunner')
      expect(question).toHaveProperty('name')
      expect(question.name).toHaveProperty('text', 'New Question')
      expect(question).toHaveProperty('questiontext')
      expect(question).toHaveProperty('uuid')
    })

    it('creates coderunner question with correct default values', () => {
      const question = createNewQuestionTemplate('coderunner')

      expect(question).toHaveProperty('defaultgrade', '1')
      expect(question).toHaveProperty('penalty', '0')
      expect(question).toHaveProperty('coderunnertype', 'cpp_program')
      expect(question).toHaveProperty('prototypetype', '0')
      expect(question).toHaveProperty('allornothing', '0')
      expect(question).toHaveProperty('penaltyregime', '10, 20, ...')
    })

    it('creates coderunner question with testcases structure', () => {
      const question = createNewQuestionTemplate('coderunner')

      expect(question).toHaveProperty('testcases')
      expect(question.testcases).toHaveProperty('testcase')
      expect(Array.isArray(question.testcases.testcase)).toBe(true)
      expect(question.testcases.testcase).toHaveLength(1)
    })

    it('creates default testcase with correct structure', () => {
      const question = createNewQuestionTemplate('coderunner')
      const testcase = question.testcases.testcase[0]

      expect(testcase).toHaveProperty('@_testtype', '0')
      expect(testcase).toHaveProperty('@_useasexample', '0')
      expect(testcase).toHaveProperty('@_hiderestiffail', '0')
      expect(testcase).toHaveProperty('@_mark', '1.0000000')
      expect(testcase).toHaveProperty('testcode')
      expect(testcase).toHaveProperty('stdin')
      expect(testcase).toHaveProperty('expected')
      expect(testcase).toHaveProperty('extra')
      expect(testcase).toHaveProperty('display')
    })

    it('creates testcase with text properties', () => {
      const question = createNewQuestionTemplate('coderunner')
      const testcase = question.testcases.testcase[0]

      expect(testcase.testcode).toHaveProperty('text', '')
      expect(testcase.stdin).toHaveProperty('text', '')
      expect(testcase.expected).toHaveProperty('text', '')
      expect(testcase.extra).toHaveProperty('text', '')
      expect(testcase.display).toHaveProperty('text', 'SHOW')
    })

    it('creates coderunner question with template field', () => {
      const question = createNewQuestionTemplate('coderunner')

      expect(question).toHaveProperty('template', '')
    })

    it('creates coderunner question with UI settings', () => {
      const question = createNewQuestionTemplate('coderunner')

      expect(question).toHaveProperty('answerboxlines', '18')
      expect(question).toHaveProperty('answerboxcolumns', '100')
      expect(question).toHaveProperty('answerpreload', '')
    })

    it('creates unique UUIDs for coderunner questions', () => {
      const question1 = createNewQuestionTemplate('coderunner')
      const question2 = createNewQuestionTemplate('coderunner')

      expect(question1.uuid).not.toBe(question2.uuid)
    })
  })
})
