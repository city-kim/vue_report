import { reactive, computed, toRaw, watch, ref } from 'vue'
import { defineStore } from 'pinia'
import { DateTime, Interval } from 'luxon'

import { PURCHASERS } from '@/constants/STORES'
import { dateStore } from '@/stores/date'
import { productByDate, purchaseByDate } from '@/service/data_generator'
import { sumArrayByKey } from '@/util/data_converter'
import { getPercent } from '@/util/number_converter'

import type { Product, Purchase } from '@/types/store'

export const productStore = defineStore('product', () => {
  const date = dateStore()
  const { beforeDate, afterDate } = date

  const product = reactive<{ value: Array<Product> }>({ value: [] })
  const purchase = reactive<{ value: Purchase }>({ value: { data: [], filters: [] } })

  const isProductLoading = ref<boolean>(false)
  function fetechProductData () {
    // 서버 데이터를 가져온다
    product.value = []
    isProductLoading.value = true
    setTimeout(() => {
      updateProductData(productByDate({beforeDate, afterDate}))
    }, Math.random() * 1000)
  }
  function updateProductData (payload: Array<Product>) {
    // 데이터 업데이트 unit 테스트에도 사용됨
    isProductLoading.value = false
    product.value = structuredClone(payload)
  }
  
  const isPurchaseLoading = ref<boolean>(false)
  function fetechPurchaseData () {
    // 서버 데이터를 가져온다
    purchase.value = { data: [], filters: [] }
    isPurchaseLoading.value = true
    setTimeout(() => {
      updatePurchaseData(purchaseByDate({beforeDate, afterDate}))
    }, 1000)
  }
  function updatePurchaseData (payload: Purchase) {
    // 데이터 업데이트 unit 테스트에도 사용됨
    isPurchaseLoading.value = false
    purchase.value = structuredClone(payload)
  }
  watch([beforeDate, afterDate], () => {
    // 날짜가 변경된다면 데이터를 다시요청한다
    fetechProductData()
    fetechPurchaseData()
  })

  function getDataForProductOnDate (from: DateTime, to: DateTime) {
    // 시작점과 종료점을 받아서 그 사이의 데이터를 반환
    const interval = Interval.fromDateTimes(from.startOf('day'), to.endOf('day'))
    const result = product.value.filter((x) => interval.contains(DateTime.fromISO(x.date))).map(x => toRaw(x))

    // 상품별 합계
    const flat = result.map((x) => structuredClone(toRaw(x).products)).flat()
    return {
      array: result,
      sum: {
        products: sumArrayByKey(flat, 'name'), // 상품별 합계
      }
    }
  }

  const baseCount = computed(() => (getDataForProductOnDate(afterDate.from, afterDate.to))) // 기준 데이터
  const compareCount = computed(() => (getDataForProductOnDate(beforeDate.from, beforeDate.to))) // 비교 데이터

  // 일자별만 있는 차트데이터
  const salesChartData = computed(() => {
    let result: Array<{label: string, data: Array<number>}> = []
    for (const day of baseCount.value.array) {
      if (result.length < 1) {
        // result가 비어있으면 초기화
        result = day.products.map(x => ({label: x.name, data: [x.count]}))
      } else {
        // 이미 있다면 데이터만 채워준다
        for (const [index, item] of day.products.entries()) {
          result[index].data.push(item.count)
        }
      }
    }
    return {
      labels: baseCount.value.array.map((x) => x.date),
      data: result
    }
  })

  const tableData = computed(() => {
    const before = { // 이전 날짜
      diff: beforeDate.to.diff(beforeDate.from, 'days').days,
      index: product.value.findIndex((x) => x.date === beforeDate.from.toFormat('yyyy-LL-dd'))
    }
    const after = { // 선택된 날짜
      diff: afterDate.to.diff(afterDate.from, 'days').days,
      index: product.value.findIndex((x) => x.date === afterDate.from.toFormat('yyyy-LL-dd'))
    }

    const beforeData = getPurchaseRows(before.diff, before.index)
    const afterData = getPurchaseRows(after.diff, after.index)

    return {
      columns: purchase.value.filters,
      rows: afterData.map(x => {
        // 반환값은 columns의 key값을 key로 text를 value로 하는 객체
        const result = {} as {[key: string]: {image?:string, text: Array<string|number>}}
        for (const [key, value] of Object.entries(x)) {
          if (key === 'id') {
            // id는 user의 정보를 담아준다
            const user = PURCHASERS.find(x => x.id === value)
            if (user) {
              result.category = { text: [ user.first_name, user.last_name], image: user.image }
            }
          } else if (key == 'sales') {
            // sales는 이전 결제금액과 비교하여 매출의 증감을 담아준다
            const beforeRevenue = beforeData.find(o => o.id === x.id)?.revenue
            if (beforeRevenue) {
              // 이전기간에 값을 찾았다면 입력
              result.sales = { text: [getPercent(x.revenue, beforeRevenue)] }
            } else {
              // 없다면 입력하지않음
              result.sales = { text: [] }
            }
          } else {
            result[key] = { text: [value] }
          }
        }
        return result
      })
    }
  })

  // 정렬할때 사용할 데이터를 반환한다
  const tableSortTarget = computed(() => (tableData.value.columns.filter(x => x.sortable)))

  function getPurchaseRows (diff: number, index: number) {
    return sumArrayByKey(
        purchase.value.data.slice(index - diff, index + 1) // 선택된 날짜의 데이터
        .map((x) => x.purchasers) // purchasers만 뽑아낸다
        .reduce((acc, cur) => ([...acc, ...cur]), [])
      , 'id') // purchasers 배열을 나열하여 sumArrayByKey에 전달하여 id기준으로 합산한다
  }
  
  const categoryChart = computed(() => ({
    // 차트의 자료형태를 맞춰준다
    labels: baseCount.value.sum.products.map(x => x.name),
    dataset:[
      {
        data: baseCount.value.sum.products.map(x => x.price)
      }
    ]
  }))
  
  return {
    isProductLoading,
    isPurchaseLoading,
    fetechProductData,
    updateProductData,
    fetechPurchaseData,
    updatePurchaseData,
    baseCount,
    compareCount,
    salesChartData,
    categoryChart,
    tableData,
    tableSortTarget
  }
})
