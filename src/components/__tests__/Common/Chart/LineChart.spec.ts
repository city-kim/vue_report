import { nextTick } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import LineChartVue from '@/components/Common/Chart/LineChart.vue'

import type { ComponentPublicInstance } from 'vue'
type ChartWrapper<T> = VueWrapper<ComponentPublicInstance & T>

vi.mock('vue-chartjs', () => ({
  Chart: () => null
}))

describe('LineChartVue', () => {

  const chartData = {
    labels: [],
    datasets: [{
      label: 'test',
      data: [],
      borderColor: '#ffb3ba',
      backgroundColor: '#3333',
      fill: true,
      borderDash: [5, 5]
    }]
  }

  it('legend prop에 따라 범례 표시 설정을 확인한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = shallowMount(LineChartVue, {
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
    const wrapper = shallowMount(LineChartVue, {
      props: {
        data: chartData,
        height: 400
      }
    })
    // 차트 높이 설정이 올바르게 적용되는지 검사
    expect(wrapper.vm.height).toBe(400)
  })
})