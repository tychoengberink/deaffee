import { mount } from '@vue/test-utils'
import Settings from '@/views/Settings.vue'

describe('Settings.vue', () => {
  it('renders settings view', () => {
    const wrapper = mount(Settings)
    expect(wrapper.text()).toMatch('Settings')
  })
})

