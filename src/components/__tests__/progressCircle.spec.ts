import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'

import progressCircle from '@/components/progressCircle.vue'
import { getRate } from '@/util/number_converter'

import type { ComponentPublicInstance } from 'vue'

type ComponentWrapper<T> = VueWrapper<ComponentPublicInstance & T>

const time = 200 // 마운트시 block 변수를 200ms 후 변경

describe('progressCircle', () => {
    
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it ('size가 있을경우 width와 height에 반영된다', async () => {
    const wrapper = mount(progressCircle, {
      props: { size: '2rem' }
    })
    const svg = wrapper.find('.progress-circle svg')
    expect(svg.attributes().width).toBe('2rem')
    expect(svg.attributes().height).toBe('2rem')
  })

  it ('percent가 있을경우 그대로 쓰지만 없을경우 base와 compare를 통해 계산한다', async () => {
    const base = 100
    const compare = 50
    const expectedRate = getRate(compare, base)
    const wrapper: ComponentWrapper<Partial<{ percent: number}>> = mount(progressCircle, {
      props: { base, compare }
    })
    let percent = wrapper.vm.percent
    expect(percent).toBe(expectedRate)

    await wrapper.setProps({ percent: 33 })
    percent = wrapper.vm.percent
    expect(percent).toBe(33)
  })

  it('색상이 전달된 경우 해당 색상이 사용된다', async () => {
    const customColor = '#ff0000'
    const wrapper = mount(progressCircle, {
      props: { color: customColor }
    })
    const circle = wrapper.find('.progress-circle svg circle:last-child')
    
    await vi.advanceTimersByTimeAsync(time)
    expect(circle.attributes().style).toContain(`stroke: ${customColor}`)
  })

})