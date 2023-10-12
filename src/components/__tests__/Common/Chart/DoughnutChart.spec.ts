import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import DoughnutChart from '@/components/Common/Chart/DoughnutChart.vue'

interface ComponentVm {
  chartOptions: () => void
}
vi.mock('vue-chartjs', () => ({
  Chart: () => null
}))

describe('DoughnutChart', () => {

  const chartData = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  }
  
  it('guide가 false라면 가이드라인을 모두 삭제한다', () => {
    const wrapper = shallowMount(DoughnutChart, {
      props: {
        data: chartData,
        guide: false,
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
    expect(options).toMatchObject({
      scales: {
        x: { ticks: { display: false } },
        y: { ticks: { display: false } }
      }
    })
  })

  it('legend prop에 따라 범례 표시 설정을 확인한다', () => {
    const wrapper = shallowMount(DoughnutChart, {
      props: {
        data: chartData,
        legend: true,
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
    expect(options).toHaveProperty('plugins.legend.display', true)
  })

  it('legendPosition prop이 없다면 bottom을 출력한다', () => {
    const wrapper = shallowMount(DoughnutChart, {
      props: {
        data: chartData,
        legend: true,
        legendPosition: 'bottom',
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
    expect(options).toHaveProperty('plugins.legend.position', 'bottom')
  })

  it('legendPosition prop에 따라 범례 위치 설정을 확인한다', () => {
    const wrapper = shallowMount(DoughnutChart, {
      props: {
        data: chartData,
        legend: true,
        legendPosition: 'right',
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
    expect(options).toHaveProperty('plugins.legend.position', 'right')
  })

  it('label prop이 true일 때 데이터 라벨이 표시되는지 확인', () => {
    const wrapper = shallowMount(DoughnutChart, {
      props: {
        data: chartData,
        label: true
      },
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const options = vm.chartOptions
    expect(options).toHaveProperty('plugins.datalabels.display', true)
  })

  it('height prop에 따라 차트 높이가 설정되는지 확인', () => {
    const wrapper = shallowMount(DoughnutChart, {
      props: {
        data: chartData,
        height: 400
      }
    })
    // 차트 높이 설정이 올바르게 적용되는지 검사
    expect(wrapper.vm.height).toBe(400)
  })

})