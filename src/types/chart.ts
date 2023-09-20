import type { Color, LayoutPosition, Align, TooltipModel, TooltipItem, ChartType, TooltipPositioner } from 'chart.js'

interface ChartPlugins {
  legend: {
    display: boolean
    position: LayoutPosition
    align: Align
    labels: {
      boxWidth: number
    }
  }
  datalabels: {
    display: boolean
    color: string
    formatter?: (value: number) => string | number
  }
  tooltip: {
    callbacks: {
      label?: (this: TooltipModel<ChartType>, tooltipItem: TooltipItem<ChartType>) => string | string[] | void
    }
  }
}

interface ChartData {
  labels: Array<string>
}

interface BarChartData extends ChartData {
  datasets: Array<{
    label?: string
    backgroundColor?: Color
    data: Array<number>
  }>
}

interface LineChartData extends ChartData {
  datasets: Array<{
    data: Array<number>
    label: string
    backgroundColor?: string
    borderColor?: string
    fill?: boolean
    borderDash?: Array<number>
  }>
}

interface PieChartData extends ChartData {
  datasets: Array<{
    data: Array<number>
    backgroundColor?: Array<Color|string>
  }>
}

export type {
  ChartPlugins,
  ChartData,
  BarChartData,
  LineChartData,
  PieChartData
}