import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BarChart from '@/components/Common/Chart/BarChart.vue'

interface ComponentVm {
  chartOptions: () => void
}

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

  it('legend prop에 따라 범례 표시 설정을 확인한다', () => {
    const wrapper = shallowMount(BarChart, {
      props: {
        data: chartData,
        legend: true,
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
    expect(options).toHaveProperty('plugins.legend.display', true)
  })

  it ('stacked가 true면 차트의 스택 설정을 확인한다', () => {
    const wrapper = shallowMount(BarChart, {
      props: {
        data: chartData,
        stacked: true,
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
    expect(options).toHaveProperty('scales.x.stacked', true)
    expect(options).toHaveProperty('scales.y.stacked', true)
  })
  
  it ('horizontal이 false라면 축은 x가된다', () => {
    const wrapper = shallowMount(BarChart, {
      props: {
        data: chartData,
        horizontal: false
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
    expect(options).toHaveProperty('indexAxis', 'x')
  })

  it ('horizontal이 true라면 축은 y가된다', () => {
    const wrapper = shallowMount(BarChart, {
      props: {
        data: chartData,
        horizontal: true
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
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

  it('barPercentage prop이 categoryPercentage에 반영된다', () => {
    const wrapper = shallowMount(BarChart, {
      props: {
        data: chartData,
        barPercent: 0.2
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
    expect(options).toHaveProperty('categoryPercentage', 0.2)
  })
})