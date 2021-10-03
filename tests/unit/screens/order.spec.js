import { mount } from '@vue/test-utils'
import Order from '@/views/Order.vue'

describe('Order.vue', () => {
  it('renders order view', () => {
    const wrapper = mount(Order)
    expect(wrapper.text()).toMatch('Order page')
  })
})

