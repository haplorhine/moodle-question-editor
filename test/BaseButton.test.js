import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BaseButton from '../src/components/BaseButton.vue'

describe('BaseButton', () => {
  it('renders the button text', () => {
    const wrapper = shallowMount(BaseButton, {
      props: { text: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = shallowMount(BaseButton, {
      props: { text: 'Click me' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click').length).toBe(1)
  })

  it('sets the title attribute', () => {
    const wrapper = shallowMount(BaseButton, {
      props: { title: 'My Title' },
    })
    const button = wrapper.find('button')
    expect(button.attributes('title')).toBe('My Title')
  })
})
