import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuestionList from '../src/components/QuestionList.vue'
import EditableQuestion from '../src/components/EditableQuestion.vue'

describe('QuestionList', () => {
  it('renders EditableQuestion for each question', () => {
    const questions = [
      {
        uuid: '1',
        '@_type': 'multichoice',
        name: { text: 'Question 1' },
        questiontext: { text: { __cdata: 'Text 1' } },
      },
      {
        uuid: '2',
        '@_type': 'multichoice',
        name: { text: 'Question 2' },
        questiontext: { text: { __cdata: 'Text 2' } },
      },
    ]

    const wrapper = mount(QuestionList, {
      props: { questions },
      global: {
        stubs: {
          EditableQuestion: true,
        },
      },
    })

    const editableQuestions = wrapper.findAllComponents(EditableQuestion)
    expect(editableQuestions).toHaveLength(2)
  })

  it('renders nothing when questions array is empty', () => {
    const wrapper = mount(QuestionList, {
      props: { questions: [] },
      global: {
        stubs: {
          EditableQuestion: true,
        },
      },
    })

    const editableQuestions = wrapper.findAllComponents(EditableQuestion)
    expect(editableQuestions).toHaveLength(0)
  })
})
