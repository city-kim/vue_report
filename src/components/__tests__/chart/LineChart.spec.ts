import { nextTick } from 'vue'
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import LineChartVue from '@/components/Chart/lineChart.vue'

import type { ComponentPublicInstance } from 'vue'
type ChartWrapper<T> = VueWrapper<ComponentPublicInstance & T>

describe('LineChartVue', () => {

  const chartData = {
    labels: ['빨강', '파랑', '노랑', '초록', '보라', '주황'],
    datasets: [{
      label: '투표 수',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#ffb3ba',
      backgroundColor: '#3333',
      fill: true,
      borderDash: [5, 5]
    }]
  }
  it('차트 컨테이너를 렌더링한다', () => {
    const wrapper = mount(LineChartVue, {
      props: {
        data: chartData
      },
    })

    // 차트 컨테이너가 있는지 확인
    expect(wrapper.find('.chart-container').exists()).toBe(true)
  })
  
  it('active가 false라면 차트의 events가 빈 배열이어야 한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: {
      events: Array<string>
    }}>> = mount(LineChartVue, {
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
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = mount(LineChartVue, {
      props: {
        data: chartData,
        legend: true,
      },
    })
    await nextTick()
    const options = wrapper.vm.chartOptions
    expect(options).toHaveProperty('plugins.legend.display', true)
  })

  it('height prop에 따라 차트 높이가 설정되는지 확인', () => {
    const wrapper = mount(LineChartVue, {
      props: {
        data: chartData,
        height: 400
      }
    })
    // 차트 높이 설정이 올바르게 적용되는지 검사
    expect(wrapper.vm.height).toBe(400)
  })
})