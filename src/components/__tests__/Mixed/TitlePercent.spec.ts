import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import { numberExpression } from '@/util/number_converter'

import TitlePercent from '@/components/Mixed/TitlePercent.vue'
import PercentWithIcon from '@/components/Common/PercentWithIcon.vue'

describe('TitleCounter', () => {
  const props = {
    title: 'TEST',
    base: 100,
    compare: 200,
  }
  const wrapper = shallowMount(TitlePercent, { props })


  it('base가 기본 counter로 출력됨', () => {
    expect(wrapper.find('.mixed-title-percent h3').text()).toContain(numberExpression(props.base))
  })
  
  it('title이 전달되면 title을 출력', () => {
    expect(wrapper.find('.mixed-title-percent p').text()).toContain(props.title)
  })

  it ('PercentWithIcon 컴포넌트 출력확인', () => {
    const div = wrapper.find('.mixed-title-percent')

    const percentWithIconComponent = div.findComponent(PercentWithIcon)
    expect(percentWithIconComponent.exists()).toBe(true)
  })

})