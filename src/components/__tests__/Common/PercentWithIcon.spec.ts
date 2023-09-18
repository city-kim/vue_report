import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import PercentWithIcon from '@/components/Common/PercentWithIcon.vue'

describe('PercentWithIcon', () => {
  
  it('퍼센트가 음수인경우 abs처리', async () => {
    const wrapper = mount(PercentWithIcon, {
      props: {
        percent: -50
      }
    })
    expect(wrapper.text()).toBe('50%') 
  })

  it('퍼센트가 소수점이 있는경우 소수점이 표시되는지 확인', async () => {
    const wrapper = mount(PercentWithIcon, {
      props: {
        percent: 25.123
      }
    })
    expect(wrapper.text()).toBe('25.123%')
  })
  
  it('toFixed가 전달되면 해당 값 만큼만 표시하는지 확인', async () => {
    const wrapper = mount(PercentWithIcon, {
      props: {
        percent: 33.3333333,
        toFixed: 1,
      }
    })
    expect(wrapper.text()).toBe('33.3%')
  })

})