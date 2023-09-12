import { nextTick } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import BarChartVue from '@/components/Chart/barChart.vue'

import type { ComponentPublicInstance } from 'vue'
type ChartWrapper<T> = VueWrapper<ComponentPublicInstance & T>

vi.mock('vue-chartjs', () => ({
  Bar: () => null
}))

describe('BarChartVue', () => {
  const chartData = {
    labels: ['빨강', '파랑', '노랑', '초록', '보라', '주황'],
    datasets: [{
      label: '투표 수',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#3333',
    }]
  }
  it('차트 컨테이너를 렌더링한다', () => {
    const wrapper = mount(BarChartVue, {
      props: {
        data: chartData
      },
    })

    // 차트 컨테이너가 있는지 확인
    expect(wrapper.find('.chart-container').exists()).toBe(true)
  })
  
  it('active false라면 차트의 events가 빈 배열이어야 한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: {
      events: Array<string>
    }}>> = mount(BarChartVue, {
      props: {
        data: chartData,
        active: false,
      },
    })
    await nextTick()
    const inactiveOptions = wrapper.vm.chartOptions
    expect(inactiveOptions?.events).toEqual([])
  })

  it('legend prop에 따라 범례 표시 설정을 확인한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = mount(BarChartVue, {
      props: {
        data: chartData,
        legend: true,
      },
    })
    await nextTick()
    const options = wrapper.vm.chartOptions
    expect(options).toHaveProperty('plugins.legend.display', true)
  })

  it ('stacked가 true면 차트의 스택 설정을 확인한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = mount(BarChartVue, {
      props: {
        data: chartData,
        stacked: true,
      },
    })
    await nextTick()
    const options = wrapper.vm.chartOptions
    expect(options).toHaveProperty('scales.x.stacked', true)
    expect(options).toHaveProperty('scales.y.stacked', true)
  })

  it('height prop에 따라 차트 높이가 설정되는지 확인', () => {
    const wrapper = mount(BarChartVue, {
      props: {
        data: chartData,
        height: 400
      }
    })
    // 차트 높이 설정이 올바르게 적용되는지 검사
    expect(wrapper.vm.height).toBe(400)
  })
})