import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import PercentWithIcon from '@/components/Common/PercentWithIcon.vue'
import { numberExpression } from '@/util/number_converter'

describe('PercentWithIcon', () => {
  
  it('퍼센트가 음수인경우 abs처리', async () => {
    const wrapper = mount(PercentWithIcon, {
      props: {
        percent: -50
      }
    })
    expect(wrapper.text()).toContain(50) 
  })

  it('퍼센트가 소수점이 있는경우 소수점이 표시되는지 확인', async () => {
    const percent = 25.123
    const wrapper = mount(PercentWithIcon, {
      props: {
        percent: 25.123
      }
    })
    expect(wrapper.text()).toContain(numberExpression(percent))
  })
  
  it('toFixed가 전달되면 해당 값 만큼만 표시하는지 확인', async () => {
    const percent = 33.3333333
    const toFixed = 1
    const wrapper = mount(PercentWithIcon, {
      props: {
        percent: 33.3333333,
        toFixed: 1,
      }
    })
    expect(wrapper.text()).toContain(numberExpression(percent, toFixed))
  })

  it('퍼센트가 크다면 콤마가 추가된 값으로 출력', async () => {
    const percent = 100000000
    const wrapper = mount(PercentWithIcon, {
      props: {
        percent: percent
      }
    })
    expect(wrapper.text()).toContain(numberExpression(percent))
  })

})