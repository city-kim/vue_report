import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import progressLine from '@/components/progressLine.vue'
import { getRate } from '@/util/number_converter'

const time = 200 // 마운트시 block 변수를 200ms 후 변경

describe('progressLine', () => {
  
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
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
    
    await vi.advanceTimersByTimeAsync(time)
    expect(div.attributes().style).toContain('width: 50%')
  })

  it('퍼센트 속성이 없을 경우 비율을 계산하여 width에 사용한다', async () => {
    const base = 100
    const compare = 50
    const expectedRate = getRate(compare, base)
    const wrapper = mount(progressLine, {
      props: { base, compare }
    })
    const div = wrapper.find('.progress-line-size')
    
    await vi.advanceTimersByTimeAsync(time)
    expect(div.attributes().style).toContain(`width: ${expectedRate}%`)
  })

  it('퍼센트는 100을 넘긴다면 100으로 고정된다', async () => {
    const wrapper = mount(progressLine, {
      props: { percent: 200 }
    })
    const div = wrapper.find('.progress-line-size')
    
    await vi.advanceTimersByTimeAsync(time)
    expect(div.attributes().style).toContain('width: 100%')
  })

  it('색상이 전달된 경우 해당 색상이 사용된다', async () => {
    const customColor = '#ff0000'
    const wrapper = mount(progressLine, {
      props: { color: customColor }
    })
    const div = wrapper.find('.progress-line-size')

    await vi.advanceTimersByTimeAsync(time)
    expect(div.attributes().style).toContain(`background: rgb(255, 0, 0)`)
  })

})