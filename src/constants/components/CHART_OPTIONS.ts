import type { ChartPlugins } from '@/types/components/chart'

const PLUGINS: ChartPlugins = {
  legend: {
    display: false, // 기본값은 false
    position: 'top',
    align: 'end',
    labels: {
      boxWidth: 15,
    }
  },
  datalabels: {
    display: false,
    color: '#ffffff',
  },
  tooltip: {
    callbacks: {}
  }
}

const WITH_GUIDE = {
  responsive: true, // 반응형
  maintainAspectRatio: false, // 종횡비 유지여부
  plugins: PLUGINS,
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
    },
    y: {
      grid: { display: true, drawTicks: false },
      border: { display: false, dash: [5, 5] }, // y축으로 표시되는 가로선은 기본적으로 점선으로 표시
    }
  }
}

const WITHOUT_GUIDE = {
  responsive: true, // 반응형
  maintainAspectRatio: false, // 종횡비 유지여부
  plugins: PLUGINS,
  scales: { //  축 삭제
    x: {
      ticks: { display: false }, // 라벨 삭제
      grid: { display: false }, // 그리드 삭제
      border: { display: false }, // border 삭제
    },
    y: {
      ticks: { display: false },
      grid: { display: false },
      border: { display: false },
    },
  }
}

export {
  WITH_GUIDE,
  WITHOUT_GUIDE
}
