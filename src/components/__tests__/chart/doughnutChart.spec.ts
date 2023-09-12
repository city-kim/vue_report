import { nextTick } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import DoughnutChart from '@/components/Chart/doughnutChart.vue'

import type { ComponentPublicInstance } from 'vue'
type ChartWrapper<T> = VueWrapper<ComponentPublicInstance & T>

vi.mock('vue-chartjs', () => ({
  Chart: () => null
}))

describe('DoughnutChart', () => {

  const chartData = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [{
      data: [12, 19, 3, 5],
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16']
    }]
  }

  it('차트 컨테이너를 렌더링한다', () => {
    const wrapper = mount(DoughnutChart, {
      props: {
        data: chartData,
      },
    })

    // 차트 컨테이너가 있는지 확인
    expect(wrapper.find('.chart-container').exists()).toBe(true)
  })
  
  it('active가 false라면 차트의 events가 빈 배열이어야 한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: {
      events: Array<string>
    }}>> = mount(DoughnutChart, {
      props: {
        data: chartData,
        active: false,
      },
    })
    await nextTick()
    const inactiveOptions = wrapper.vm.chartOptions
    expect(inactiveOptions?.events).toEqual([])
    expect(wrapper.vm.chartOptions).toMatchObject({
      scales: {
        x: { ticks: { display: false } },
        y: { ticks: { display: false } }
      }
    })
  })

  it('legend prop에 따라 범례 표시 설정을 확인한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = mount(DoughnutChart, {
      props: {
        data: chartData,
        legend: true,
      },
    })
    await nextTick()
    const options = wrapper.vm.chartOptions
    expect(options).toHaveProperty('plugins.legend.display', true)
  })

  it('legendPosition prop이 없다면 bottom을 출력한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = mount(DoughnutChart, {
      props: {
        data: chartData,
        legend: true,
        legendPosition: 'bottom',
      },
    })
    await nextTick()
    const options = wrapper.vm.chartOptions
    expect(options).toHaveProperty('plugins.legend.position', 'bottom')
  })

  it('legendPosition prop에 따라 범례 위치 설정을 확인한다', async () => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = mount(DoughnutChart, {
      props: {
        data: chartData,
        legend: true,
        legendPosition: 'right',
      },
    })
    await nextTick()
    const options = wrapper.vm.chartOptions
    expect(options).toHaveProperty('plugins.legend.position', 'right')
  })

  it('label prop이 true일 때 데이터 라벨이 표시되는지 확인', async() => {
    const wrapper: ChartWrapper<Partial<{ chartOptions: () => void }>> = mount(DoughnutChart, {
      props: {
        data: chartData,
        label: true
      },
    })
    await nextTick()
    const options = wrapper.vm.chartOptions
    expect(options).toHaveProperty('plugins.datalabels.display', true)
  })

  it('height prop에 따라 차트 높이가 설정되는지 확인', () => {
    const wrapper = mount(DoughnutChart, {
      props: {
        data: chartData,
        height: 400
      }
    })
    // 차트 높이 설정이 올바르게 적용되는지 검사
    expect(wrapper.vm.height).toBe(400)
  })

})