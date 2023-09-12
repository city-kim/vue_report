import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import progressLine from '@/components/progressLine.vue'
import { getRate } from '@/util/number_converter'
import { getCssVar } from '@/util/color'

const time = 200 // 마운트시 block 변수를 200ms 후 변경

describe('progressLine', () => {
  
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('높이 속성이 있을 경우 해당 값을 사용한다', async () => {
    const wrapper = mount(progressLine, {
      props: { height: '2rem' }
    })
    const div = wrapper.find('.progress-line-size')
    expect(div.attributes().style).toContain('height: 2rem')
  })

  it('높이 속성이 없을 경우 기본값 1rem을 사용한다', async () => {
    const wrapper = mount(progressLine)
    const div = wrapper.find('.progress-line-size')
    expect(div.attributes().style).toContain('height: 1rem')
  })

  it('퍼센트 속성이 전달된 경우 해당 값을 width에 사용한다', async () => {
    const wrapper = mount(progressLine, {
      props: { percent: 50 }
    })
    const div = wrapper.find('.progress-line-size')
    setTimeout(() => {
      expect(div.attributes().style).toContain('width: 50%')
    }, time)
  })

  it('퍼센트 속성이 없을 경우 비율을 계산하여 width에 사용한다', async () => {
    const base = 100
    const compare = 50
    const expectedRate = getRate(compare, base)
    const wrapper = mount(progressLine, {
      props: { base, compare }
    })
    const div = wrapper.find('.progress-line-size')
    setTimeout(() => {
      expect(div.attributes().style).toContain(`width: ${expectedRate}%`)
    }, time)
  })

  it('색상이 전달되지 않았을 때 기본 색상이 사용된다', async () => {
    const defaultColor = getCssVar('--c-blue')
    const wrapper = mount(progressLine)
    const div = wrapper.find('.progress-line-size')
    setTimeout(() => {
      expect(div.attributes().style).toContain(`background: ${defaultColor}`)
    }, time)
  })

  it('색상이 전달된 경우 해당 색상이 사용된다', async () => {
    const customColor = '#ff0000'
    const wrapper = mount(progressLine, {
      props: { color: customColor }
    })
    const div = wrapper.find('.progress-line-size')
    setTimeout(() => {
      expect(div.attributes().style).toContain(`background: ${customColor}`)
    }, time)
  })

})