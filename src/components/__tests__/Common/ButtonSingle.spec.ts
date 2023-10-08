import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonSingle from '@/components/Common/ButtonSingle.vue'

describe('ButtonSingle', () => {

  it('buttons props에 전달된 버튼이 올바르게 표시되는지 확인', () => {
    const title = '버튼명'
    const wrapper = mount(ButtonSingle, {
      props: {
        title: title
      }
    })
    const button = wrapper.find('button')
    expect(button.text()).toBe(title)
  })

  it('버튼 클릭시 emit이 올바르게 동작하는지 확인', () => {
    const wrapper = mount(ButtonSingle)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.emitted().onClick[0])
  })

  it('color 전달시 해당하는 클래스가 적용됨', async() => {
    const wrapper = mount(ButtonSingle)
    const button = wrapper.find('button')
    await wrapper.setProps({ color: 'blue' })
    expect(button.classes('blue')).toBe(true)
    await wrapper.setProps({ color: 'red' })
    expect(button.classes('red')).toBe(true)
    await wrapper.setProps({ color: 'gray' })
    expect(button.classes('gray')).toBe(true)
    await wrapper.setProps({ color: 'orange' })
    expect(button.classes('orange')).toBe(true)
    await wrapper.setProps({ color: 'purple' })
    expect(button.classes('purple')).toBe(true)
  })

  it('fontSize 전달시 올바르게 반영되는지 확인', () => {
    const wrapper = mount(ButtonSingle, {
      props: {
        fontSize: '2rem'
      }
    })
    const button = wrapper.find('button')
    expect(button.attributes().style).toContain('font-size: 2rem;')
  })
})