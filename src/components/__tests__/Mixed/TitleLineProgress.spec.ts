import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import { numberExpression } from '@/util/number_converter'

import TitleLineProgress from '@/components/Mixed/TitleLineProgress.vue'
import ProgressLine from '@/components/Common/ProgressLine.vue'

describe('정상적인 값이 전달된경우', () => {
  const props = {
    title: 'TEST',
    count: 1000000,
    percent: 1000000,
  }
  
  const wrapper = shallowMount(TitleLineProgress, { props })
  it('title이 전달되면 title을 출력', () => {
    expect(wrapper.find('.mixed-title-line-progress h3').text()).toContain(props.title)
  })
  
  it('count가 전달되면 콤마가 추가된 count를 출력', () => {
    expect(wrapper.find('.mixed-title-line-progress div p span').text()).toContain(numberExpression(props.count))
  })

  it('percent가 전달되면 콤마가 추가된 percent를 출력', () => {
    expect(wrapper.find('.mixed-title-line-progress div p strong').text()).toContain(numberExpression(props.percent))
  })
  
  it ('PercentWithIcon 컴포넌트 출력확인', () => {
    const div = wrapper.find('.mixed-title-line-progress')

    const progressLineComponent = div.findComponent(ProgressLine)
    expect(progressLineComponent.exists()).toBe(true)
  })
})

describe('비정상적인 값이 전달된경우', () => {
  it('percent에 NaN 전달되면 0을 출력', () => {
    const wrapper = shallowMount(TitleLineProgress, {
      props: {
        title: 'TEST',
        count: NaN,
        percent: NaN
      }
    })
    expect(wrapper.find('.mixed-title-line-progress div p strong').text()).toContain('0')
  })
  
  it('percent에 Infinity가 전달되면 0을 출력', () => {
    const wrapper = shallowMount(TitleLineProgress, {
      props: {
        title: 'TEST',
        count: NaN,
        percent: NaN
      }
    })
    expect(wrapper.find('.mixed-title-line-progress div p strong').text()).toContain('0')
  })
})