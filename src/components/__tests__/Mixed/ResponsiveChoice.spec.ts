import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResponsiveChoice from '@/components/Mixed/ResponsiveChoice.vue'

interface ComponentVm {
  selectItem: () => void
}

describe('ResponsiveChoice', () => {
  const options = [
    { key: 'option1', text: '옵션1' },
    { key: 'opt2ion', text: '옵2션' },
    { key: '3option', text: '3옵션' },
  ]

  it('selectDefault가 전달되면 기본값이 출력되는지 확인', () => {
    const wrapper = mount(ResponsiveChoice, {
      props: {
        selectDefault: '전체',
        items: options
      }
    })
    const vm = wrapper.vm as unknown as ComponentVm
    expect(vm.selectItem).toEqual([
      { key: '', text: '전체', isHidden: true },
      { key: 'option1', text: '옵션1' },
      { key: 'opt2ion', text: '옵2션' },
      { key: '3option', text: '3옵션' },
    ])
  })
  
  it('viewport에 맞춰서 전달된 items가 생성되는지 확인', () => {
    const wrapper = mount(ResponsiveChoice, {
      props: {
        items: options
      }
    })
    const button = wrapper.findAll('button')
    expect(button.length).toBe(3)
    expect(button[0].text()).toBe('옵션1')
    expect(button[1].text()).toBe('옵2션')
    expect(button[2].text()).toBe('3옵션')

    const option = wrapper.findAll('option')
    expect(option.length).toBe(3)
    expect(option[0].text()).toBe('옵션1')
    expect(option[1].text()).toBe('옵2션')
    expect(option[2].text()).toBe('3옵션')
  })
})