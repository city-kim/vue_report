import { nextTick } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import BarChart from '@/components/Common/Chart/BarChart.vue'

import type { ComponentPublicInstance } from 'vue'
type ChartWrapper<T> = VueWrapper<ComponentPublicInstance & T>

vi.mock('vue-chartjs', () => ({
  Bar: () => null
}))

describe('BarChart', () => {
  const chartData = {
    labels: [],
    datasets: [{
      label: 'test',
      data: [],
      backgroundColor: '#3333',
    }]
  }

  it('legend prop에 따라 범례 표시 설정을 확인한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = shallowMount(BarChart, {
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
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = shallowMount(BarChart, {
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
  
  it ('horizontal에 따라 축 정렬을 변경한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = shallowMount(BarChart, {
      props: {
        data: chartData
      },
    })
    await nextTick()
    const options = wrapper.vm.chartOptions
    expect(options).toHaveProperty('indexAxis', 'x')
    await wrapper.setProps({ horizontal: true })
    expect(options).toHaveProperty('indexAxis', 'y')
  })

  it('height prop에 따라 차트 높이가 설정되는지 확인', () => {
    const wrapper = shallowMount(BarChart, {
      props: {
        data: chartData,
        height: 400
      }
    })
    // 차트 높이 설정이 올바르게 적용되는지 검사
    expect(wrapper.vm.height).toBe(400)
  })

  it('barPercentage prop에 따라 차트의 categoryPercentage가 설정되는지 확인', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = shallowMount(BarChart, {
      props: {
        data: chartData
      },
    })
    await nextTick()
    const options = wrapper.vm.chartOptions
    expect(options).toHaveProperty('categoryPercentage', 0.8)
    await wrapper.setProps({ barPercent: 0.2 })
    expect(options).toHaveProperty('categoryPercentage', 0.2)
  })
})