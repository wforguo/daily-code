import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeButton from '../WeButton.vue'

describe('WeButton', () => {
    test('renders properly', () => {
        const wrapper = mount(WeButton, { props: { loading: true }, slots: { default: 'WeButton' } })
        expect(wrapper.text()).toContain('WeButton')
        wrapper.trigger('click')
    })
})
