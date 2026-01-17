import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Searchbar from '../src/components/Searchbar.vue'

describe('Searchbar', () => {
  it('renders the input field', () => {
    const wrapper = mount(Searchbar)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('has correct placeholder text', () => {
    const wrapper = mount(Searchbar)
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Search for Questions')
  })

  it('updates modelValue when user types', async () => {
    const wrapper = mount(Searchbar)
    const input = wrapper.find('input')

    await input.setValue('test search')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test search'])
  })

  it('displays initial modelValue', () => {
    const wrapper = mount(Searchbar, {
      props: {
        modelValue: 'initial value',
      },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('initial value')
  })
})
