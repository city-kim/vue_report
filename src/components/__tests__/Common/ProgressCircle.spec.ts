import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ProgressCircle from '@/components/Common/ProgressCircle.vue'

describe('ProgressCircle', () => {

  it ('size가 있을경우 width와 height에 반영된다', async () => {
    const wrapper = mount(ProgressCircle, {
      props: { size: '2rem', percent: 50 }
    })
    const svg = wrapper.find('.progress-circle svg')
    expect(svg.attributes().width).toBe('2rem')
    expect(svg.attributes().height).toBe('2rem')
  })

  it ('percent가 있을경우 퍼센트 출력', async () => {
    const wrapper = mount(ProgressCircle, {
      props: { percent: 50 }
    })
    const percent = wrapper.find('.progress-circle p')
    expect(percent.text()).toContain('50%')
  })
  
  it ('percent가 100이 넘을경우 100으로 출력', async () => {
    const wrapper = mount(ProgressCircle, {
      props: { percent: 200 }
    })
    const percent = wrapper.find('.progress-circle p')
    expect(percent.text()).toContain('100%')
  })

  it('색상이 전달된 경우 해당 색상이 사용된다', async () => {
    const customColor = '#ff0000'
    const wrapper = mount(ProgressCircle, {
      props: { color: customColor, percent: 50 }
    })
    const circle = wrapper.find('.progress-circle svg circle:last-child')
    
    expect(circle.attributes().style).toContain(`stroke: ${customColor}`)
  })

  it('strokeWidth가 전달된 경우 해당 값이 사용된다', async () => {
    const customStrokeWidth = 10
    const wrapper = mount(ProgressCircle, {
      props: { strokeWidth: customStrokeWidth, percent: 50 }
    })
    expect(wrapper.find('.progress-circle svg circle:first-child').attributes()['stroke-width']).toBe('10')
    expect(wrapper.find('.progress-circle svg circle:last-child').attributes()['stroke-width']).toBe('10')
  })
})