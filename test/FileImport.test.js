import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FileImport from '../src/components/FileImport.vue'

describe('FileImport', () => {
  it('renders file input and import button', () => {
    const wrapper = mount(FileImport)
    expect(wrapper.find('#fileInput').exists()).toBe(true)
    expect(wrapper.find('#importButton').exists()).toBe(true)
  })

  it('import button is disabled when no file is selected', () => {
    const wrapper = mount(FileImport)
    const button = wrapper.find('#importButton')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('import button is enabled after file selection', async () => {
    const wrapper = mount(FileImport)
    const fileInput = wrapper.find('#fileInput')

    const file = new File(['content'], 'test.xml', { type: 'text/xml' })
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: false,
    })

    await fileInput.trigger('change')

    const button = wrapper.find('#importButton')
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('emits importClick event with selected file ref when import button is clicked', async () => {
    const wrapper = mount(FileImport)
    const fileInput = wrapper.find('#fileInput')

    const file = new File(['content'], 'test.xml', { type: 'text/xml' })
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
      writable: false,
    })

    await fileInput.trigger('change')
    await wrapper.find('#importButton').trigger('click')

    expect(wrapper.emitted('importClick')).toBeTruthy()
    expect(wrapper.emitted('importClick')).toHaveLength(1)
  })
})
