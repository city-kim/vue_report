import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonGroup from '@/components/Common/ButtonGroup.vue'

describe('ButtonGroup', () => {
  const buttons = [
    { key: 'button1', text: '버튼1' },
    { key: 'but2ton', text: '버2튼' },
    { key: '3button', text: '3버튼' },
  ]

  it('buttons props에 전달된 버튼이 올바르게 표시되는지 확인', () => {
    const wrapper = mount(ButtonGroup, {
      props: {
        buttons: buttons
      }
    })
    const button = wrapper.findAll('button')
    expect(button.length).toBe(3)
    expect(button[0].text()).toBe('버튼1')
    expect(button[1].text()).toBe('버2튼')
    expect(button[2].text()).toBe('3버튼')
  })

  it('버튼 클릭시 emit이 올바르게 동작하는지 확인', () => {
    const wrapper = mount(ButtonGroup, {
      props: {
        buttons: buttons
      }
    })
    const button = wrapper.findAll('button')
    button[0].trigger('click')
    expect(wrapper.emitted().updateActive[0]).toContain('button1')
    button[1].trigger('click')
    expect(wrapper.emitted().updateActive[1]).toContain('but2ton')
    button[2].trigger('click')
    expect(wrapper.emitted().updateActive[2]).toContain('3button')
  })
  
  it('모바일 대체용 select박스가 올바르게 생성되는지 확인 (hide된 전체 option 포함)', () => {
    const wrapper = mount(ButtonGroup, {
      props: {
        buttons: buttons
      }
    })
    const option = wrapper.findAll('select option')
    expect(option.length).toBe(4)
    expect(option[0].text()).toBe('전체')
    expect(option[1].text()).toBe('버튼1')
    expect(option[2].text()).toBe('버2튼')
    expect(option[3].text()).toBe('3버튼')
  })
})