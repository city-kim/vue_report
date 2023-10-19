import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SelectBox from '@/components/Common/SelectBox.vue'

describe('SelectBox', () => {
  const options = [
    { key: 'option1', text: '옵션1' },
    { key: 'opt2ion', text: '옵2션' },
    { key: '3option', text: '3옵션' },
  ]

  it('options props에 전달된 option이 올바르게 표시되는지 확인', () => {
    const wrapper = shallowMount(SelectBox, {
      props: {
        options: options
      }
    })
    const option = wrapper.findAll('option')
    expect(option.length).toBe(3)
    expect(option[0].text()).toBe('옵션1')
    expect(option[1].text()).toBe('옵2션')
    expect(option[2].text()).toBe('3옵션')
  })

  it('select options 선택시 emit이 올바르게 동작하는지 확인', () => {
    const wrapper = shallowMount(SelectBox, {
      props: {
        options: options
      }
    })
    wrapper.find('select').setValue('option1')
    expect(wrapper.emitted().updateSelected[0]).toContain('option1')
    wrapper.find('select').setValue('opt2ion')
    expect(wrapper.emitted().updateSelected[1]).toContain('opt2ion')
    wrapper.find('select').setValue('3option')
    expect(wrapper.emitted().updateSelected[2]).toContain('3option')
  })
})